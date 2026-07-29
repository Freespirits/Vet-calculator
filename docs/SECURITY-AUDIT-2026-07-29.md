# Security Audit & Remediation — vet-holim.work

**Date:** 2026-07-29
**Target:** `https://vet-holim.work` (production) + the `Vet-calculator` repository
**Owner:** authorized — this is the owner's own property
**Scope:** EXTERNAL perimeter + configuration + static-source review.
**Explicitly NOT in scope:** application-logic / authenticated / injection testing — see "Why" below.

> **Scope is the honest part of this document.** This was a perimeter and configuration
> assessment of a **static prerendered site**. It is complete and defensible *as that*. It is
> **not** a full application penetration test, and must never be signed or sold as one — there is
> no backend here to penetration-test (see § "Architecture — why the surface is small"). Grade
> what was proven; declare what was not.

---

## 0 · How this was tested (three independent methods, one conclusion)

| Method | Tooling | What it looked at |
|---|---|---|
| Static source analysis | ClaudeGuardIL (own tool) | the repo: routes, secrets, RLS, config, a11y |
| External recon | Linux box (nmap, WhatWeb, curl), authorized, IP-whitelisted through the Vercel firewall | live perimeter: ports, TLS, headers, exposed paths |
| Offensive scan | Strix / HexStrike | dynamic probing of the live host |

**All three converged on the same result: no backend, clean perimeter, one real class of
finding (missing headers).** That convergence is itself the strongest evidence in this report —
a static analyzer, an external scanner, and an offensive tool independently agreeing that there
is no application attack surface.

---

## 1 · Architecture — why the surface is small (and that's correct, not lucky)

`vet-holim.work` is a **static, prerendered single-page site**:

- Vite + React 19 + Three.js, prerendered to static HTML by `vite-react-ssg`.
- Served as HTML/JS/CSS from Vercel's CDN, behind Cloudflare DNS.
- **No backend, no server routes, no database, no authentication, no user accounts, no file
  uploads, no payment flow.** ClaudeGuardIL confirms `routes: 0`, `tables: 0`, `envVars: 0`,
  `supabaseClients: 0`. External recon confirms `/api → 404`, `/admin → 404`.

**Consequence for the audit:** the entire class of "real pentest" findings — SQLi, IDOR, auth
bypass, SSRF, business-logic abuse — **cannot exist here**, because the code paths that produce
them do not exist. This is not a gap in the testing; it is the architecture. A booking flow that
isn't there cannot be attacked.

> ⚠️ **Correction to prior recon.** An earlier WhatWeb pass guessed "probably WordPress." **That
> is wrong.** There is no WordPress, no PHP, no WP-JSON — verified against `package.json` and the
> built `dist/` bundle. Do not carry that claim into any report; it is a WhatWeb false positive
> on a static export.

---

## 2 · What was tested and PASSED (✅)

### Network
- Only **80/tcp and 443/tcp** open. No stray services.
- `http://` → `https://` redirect present (308).

### TLS
- Let's Encrypt certificate, `CN=vet-holim.work`, valid until **2026-10-15**.
- TLS 1.2 / 1.3, A-grade ciphers.

### Exposure (sensitive-path probing)
- `/.env` → 404 · `/.git/config` → 404 · `/api` → 404 · `/admin` → 404
- `/robots.txt` → 200, `/sitemap.xml` → 200 (intended; public marketing site).
- No admin panels, no exposed config, no directory listing.

### Source-code exposure
- `/_src` → 307 → `https://vercel.com/deployments/vet-holim.work/source`, which itself → **302
  `/login`**. **Not a leak** — the Vercel source view requires authentication. Correctly
  adjudicated; no finding.

### Secrets / code hygiene (static)
- ClaudeGuardIL: **0 leaked secrets, 0 fake-crypto, 0 client-side token storage, 0 placeholder
  credentials.** Clean.

### Bot / WAF
- Vercel Bot Protection active (intentional). The audit box was IP-whitelisted to test the real
  origin — working as designed.

---

## 3 · FINDINGS to fix

Severity here is **configuration-hardening**, not breach. Nothing below is a confirmed exploit on
a static site; they are defense-in-depth headers and DNS records that *should* be present.

### 3.1 — Missing security response headers  ·  **Priority: HIGH (real, fix it)**

The live site sends only `Strict-Transport-Security`. Missing: **CSP, X-Frame-Options,
X-Content-Type-Options, Referrer-Policy, Permissions-Policy**, and HSTS is not preloaded.

- **Impact:** clickjacking (no frame-ancestors), MIME-sniffing, referrer leakage, and no
  defense-in-depth against injected content. On a static site the blast radius is limited, but
  these are free and standard.
- **Fix:** the `vercel.json` in § 4. **This closes the finding.**

### 3.2 — HSTS not preloaded  ·  **Priority: MEDIUM**

Current: `max-age=63072000` only. Missing `includeSubDomains; preload`.

- **Fix:** included in the `vercel.json` below. After it deploys, submit the apex at
  **https://hstspreload.org** to enter the browser preload list.

### 3.3 — No SPF / DMARC / DKIM  ·  **Priority: MEDIUM (spoofing)**

The domain publishes no email-authentication records.

- **Key fact:** there is **no MX record** — the domain receives no mail. So the correct fix is a
  **null-sender lockdown**, which is *stronger* than a permissive record and breaks nothing.
- **Records (add in Cloudflare DNS):**

  | Type | Name | Value |
  |---|---|---|
  | TXT | `vet-holim.work` (`@`) | `v=spf1 -all` |
  | TXT | `_dmarc.vet-holim.work` | `v=DMARC1; p=reject; sp=reject; adkim=s; aspf=s;` |
  | TXT | `*._domainkey.vet-holim.work` | `v=DKIM1; p=` (empty key = "no valid DKIM exists") |

  *(If you ever start sending mail from this domain, these must be rewritten to permit your real
  sender. Until then, this lockdown says "nobody is authorized to send as us" — the safest state.)*

### 3.4 — No CAA record  ·  **Priority: LOW**

No DNS CAA record restricting which CAs may issue certs for the domain.

- **Record (Cloudflare DNS):**

  | Type | Name | Value |
  |---|---|---|
  | CAA | `vet-holim.work` (`@`) | `0 issue "letsencrypt.org"` |
  | CAA | `vet-holim.work` (`@`) | `0 issuewild ";"` (no wildcard certs) |

  *(Vercel provisions via Let's Encrypt, so `letsencrypt.org` is the correct issuer to allow.)*

### 3.5 — `access-control-allow-origin: *`  ·  **Priority: INFORMATIONAL (near non-issue)**

Wildcard CORS on public HTML.

- **Why it barely matters here:** there is no authenticated API, no cookies, no credentials.
  A wildcard `ACAO` on public static content only lets another origin read what is *already*
  public. There is nothing private to leak.
- **Action:** none required for the current architecture. Revisit only if a credentialed API is
  ever added.

---

## 4 · The fix — `vercel.json` (BROWSER-VERIFIED, ready to commit)

> This file was tested against the **real built `dist/` bundle** in a headless browser under the
> **enforcing** CSP. Every external resource this app loads returned **200 with zero CSP
> violations**: the TeddyVets logo (`teddyvets.co.il`), the dotLottie player **and its five
> dynamically-loaded chunks** (`unpkg.com`), the animated mascot (`lottie.host`), and Vercel
> Analytics (`va.vercel-scripts.com` / `vitals.vercel-insights.com`). A hand-written or
> boilerplate CSP that omits any of these **blanks the logo and kills the mascot** on a clinical
> tool vets open mid-emergency — which is why it was verified, not guessed.

Place at repo root as `vercel.json`:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; script-src 'self' 'unsafe-inline' https://unpkg.com https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://teddyvets.co.il; font-src 'self' data:; connect-src 'self' https://lottie.host https://va.vercel-scripts.com https://vitals.vercel-insights.com; media-src 'self' data: blob: https://lottie.host; worker-src 'self' blob:; manifest-src 'self'; upgrade-insecure-requests"
        },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        {
          "key": "Permissions-Policy",
          "value": "accelerometer=(), autoplay=(self), camera=(), display-capture=(), encrypted-media=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), payment=(), usb=(), xr-spatial-tracking=()"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=63072000; includeSubDomains; preload"
        }
      ]
    }
  ]
}
```

### Notes on specific CSP directives (so the next person doesn't "tidy" them and break the site)
- `script-src 'unsafe-inline'` — required by the JSON-LD structured-data block in `index.html`
  and by the SSG hydration inline script. Removing it breaks rendering.
- `style-src 'unsafe-inline'` — Tailwind and framer-motion set inline styles. Required.
- `unpkg.com` in `script-src` — the dotLottie player *and* its lazily-imported chunks. All five
  were observed loading; do not narrow to a single file.
- `lottie.host` in `connect-src` + `media-src` — the mascot `.lottie` is fetched at runtime.
- No `'unsafe-eval'` — the bundle contains no `eval` / `new Function`. Keep it out.

### Optional safer rollout (recommended for the first deploy)
Ship CSP as **report-only** on deploy #1, confirm a clean console in production, then flip to
enforcing (it already passed locally, so this is belt-and-suspenders):
- change the header key to `Content-Security-Policy-Report-Only`, deploy, verify, then change it
  back to `Content-Security-Policy`.

---

## 5 · Apply it — exact steps

```bash
# in the Vet-calculator repo root
git add vercel.json docs/SECURITY-AUDIT-2026-07-29.md
git commit -m "security: add CSP + hardening headers (browser-verified against dist)"
git push
# Vercel auto-redeploys the production branch.
```

**After deploy — verify the headers actually landed** (run from the whitelisted box, since the
apex is behind Bot Protection):

```bash
curl -sSI https://vet-holim.work | grep -iE 'content-security|x-frame|x-content-type|referrer-policy|permissions-policy|strict-transport'
```

Then, separately, in the **Cloudflare dashboard → DNS**, add the TXT and CAA records from § 3.3
and § 3.4. (Those are DNS, not Vercel — `vercel.json` cannot set them.)

Finally, submit the apex to **https://hstspreload.org** once `includeSubDomains; preload` is live.

---

## 6 · Verification checklist (what "done" looks like)

- [ ] `vercel.json` committed and deployed
- [ ] `curl -I` shows all 6 headers on the live apex
- [ ] Site loads with no CSP console errors (logo, mascot, analytics all present)
- [ ] SPF `v=spf1 -all` TXT record live
- [ ] DMARC `p=reject` TXT record live
- [ ] CAA record live
- [ ] Submitted to hstspreload.org

---

## 7 · The honest scope statement (put this in any report you hand over)

> This assessment covered the **external perimeter, TLS/DNS configuration, HTTP security headers,
> exposed-path enumeration, and static source review** of a **static, prerendered website with no
> server-side application logic**. It did **not** — and given the architecture, **could not** —
> test application logic, authentication, authorization, injection, or business-logic flows,
> because no such server-side surface exists on this target. Findings are limited to
> configuration hardening. This is a perimeter/configuration audit and must not be represented as
> a full application penetration test.

---

## 8 · If you want a "real pentest" deliverable later

That requires a target with a backend. **`Vet-Flow+`** (the sibling app: `services/`, admin app,
Supabase, auth, RLS, real routes) is that target. The right sequence there is:

1. **Written authorization + scope** naming the exact hosts and the test window (even for your own
   property — it is what makes the identical tool run legally defensible if anyone ever asks).
2. **ClaudeGuardIL static scan first** → produces the route/RLS/auth worklist.
3. **Point the dynamic tools at that worklist**, against a deployment you own, from an authorized
   IP.

That produces a signable *application* pentest — on the app that actually has an application.
`vet-holim` does not, and no amount of tooling changes that.
```
```
