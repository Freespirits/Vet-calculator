#!/usr/bin/env python3
"""Helper to extract per-drug dose sections from the Plumb's text dump.

Not part of the app. Used only to source/verify dosing data for drugDatabase.ts.
"""
import re
import sys
import io
from pathlib import Path

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace")

TXT = Path(__file__).resolve().parent.parent / "plumbs_extracted.txt"
# Split on real newlines only. .splitlines() also splits on form-feed (page
# breaks) and other unicode separators, which misaligns monograph detection.
RAW = TXT.read_text(encoding="utf-8", errors="replace")
LINES = RAW.replace("\f", "").split("\n")

# A monograph is anchored by a pronunciation line like "(mel-ox-i-kam) ...".
# The drug title is the nearest non-blank line above it, in ALL-CAPS.
PRON = re.compile(r"^\s*\([a-z][a-z0-9\-’'/ .]+\)")


def find_monographs():
    """Return list of (title_line_index, title) for every monograph start."""
    out = []
    for i, ln in enumerate(LINES):
        if not PRON.match(ln):
            continue
        # Walk back to the nearest non-blank line = the title.
        j = i - 1
        while j >= 0 and not LINES[j].strip():
            j -= 1
        if j < 0:
            continue
        title = LINES[j].strip()
        # Titles are short and predominantly uppercase letters.
        letters = [c for c in title if c.isalpha()]
        if not letters or len(title) > 55:
            continue
        upper_ratio = sum(c.isupper() for c in letters) / len(letters)
        if upper_ratio < 0.7:
            continue
        out.append((j, title))
    return out


def list_all():
    monos = find_monographs()
    for i, title in monos:
        print(f"{i}\t{title}")
    print(f"\nTOTAL MONOGRAPHS: {len(monos)}", file=sys.stderr)


def show(query):
    monos = find_monographs()
    q = query.lower()
    matches = [(i, t) for (i, t) in monos if q in t.lower()]
    if not matches:
        print(f"NO MONOGRAPH MATCH for {query!r}", file=sys.stderr)
        return
    starts = [i for (i, _) in monos]
    for (idx, title) in matches:
        pos = starts.index(idx)
        end = starts[pos + 1] if pos + 1 < len(starts) else len(LINES)
        block = LINES[idx:end]
        # Find the Doses section within the monograph.
        dose_start = None
        for j, ln in enumerate(block):
            if re.match(r"^\s*Doses\s*$", ln):
                dose_start = j
                break
        print("=" * 80)
        print(f"### {title}  (lines {idx}-{end})")
        print("=" * 80)
        if dose_start is None:
            print("(no 'Doses' section found; showing first 40 lines)")
            print("\n".join(block[:40]))
            continue
        # Print from Doses until the next ALL-CAPS section header that is not a
        # species label, capped to keep output readable.
        dose_block = block[dose_start:]
        printed = 0
        for ln in dose_block:
            print(ln)
            printed += 1
            # Stop at the section that usually follows Doses.
            if printed > 8 and re.match(r"^(Monitoring|Client Information|Chemistry|"
                                        r"Storage|Dosage Forms|Pharmacokinetics)\b", ln.strip()):
                break
            if printed > 220:
                print("... [truncated]")
                break


SPECIES_HDR = re.compile(r"^\s*(DOGS?|CATS?|HORSES?|CATTLE|SWINE|BIRDS?|REPTILES?|"
                         r"RABBITS|RODENTS|FERRETS?|ZOO|SMALL MAMMALS|PRIMATES)\b[:\s]")


def doses(query):
    """Compact: print only the DOGS and CATS dose lines for a drug."""
    monos = find_monographs()
    q = query.lower()
    matches = [(i, t) for (i, t) in monos if q in t.lower()]
    starts = [i for (i, _) in monos]
    if not matches:
        print(f"## {query}: NO MATCH")
        return
    idx, title = matches[0]
    pos = starts.index(idx)
    end = starts[pos + 1] if pos + 1 < len(starts) else len(LINES)
    block = LINES[idx:end]
    ds = next((j for j, ln in enumerate(block) if re.match(r"^\s*Doses\s*$", ln)), None)
    print(f"## {title}")
    if ds is None:
        print("   (no Doses section)")
        return
    end_hdr = re.compile(r"^(Monitoring|Client Information|Chemistry|Synonyms|Storage|"
                         r"Stability|Dosage Forms|Pharmacokinetics|Pharmacology|"
                         r"Compatibility|Compounding|References|Adverse|Contraindications|"
                         r"Overdosage|Drug Interactions|Doses)\b")
    capture = False
    for ln in block[ds + 1:]:
        s = ln.strip()
        if end_hdr.match(s):
            break
        m = SPECIES_HDR.match(ln)
        if m:
            sp = m.group(1).upper()
            capture = sp.startswith("DOG") or sp.startswith("CAT")
            if capture:
                print(f" {sp}:")
            continue
        if capture and s:
            print(f"   {s}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("usage: extract_plumbs.py list | doses <drug>... | <drug>...")
        sys.exit(1)
    if sys.argv[1] == "list":
        list_all()
    elif sys.argv[1] == "doses":
        for arg in sys.argv[2:]:
            doses(arg)
            print()
    else:
        for arg in sys.argv[1:]:
            show(arg)
