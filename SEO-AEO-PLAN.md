# Vet-Holim Calculator: SEO + AI Answer-Engine Plan

Deep-research report, 2026-07-22. 104 agents, 22 sources fetched, 110 claims extracted,
25 adversarially verified (3 votes each): 22 confirmed, 3 refuted. Combined with a local
audit of this repo and the live site.

## The one decisive fact

**No major AI crawler executes JavaScript.** GPTBot, OAI-SearchBot, ChatGPT-User,
ClaudeBot, Claude-SearchBot, PerplexityBot, Meta-ExternalAgent, Bytespider: all of them
fetch raw HTML and never run JS (verified against the Vercel/MERJ telemetry study of
500M+ fetches, reconfirmed by multiple sources through June 2026). A client-rendered
React + Vite SPA is an **empty page** to ChatGPT, Claude, and Perplexity.

**Google is the exception.** Gemini and AI Overviews use Googlebot's rendering service
and do execute JS (on a deferred queue). So the site can look "fine on Google" while
being completely invisible to every other AI engine. Do not use Google indexing as a
proxy for AI visibility.

## Local audit (this repo)

Already good in `index.html`:
- Hebrew meta description, canonical to vet-holim.work
- Full OG + Twitter cards with og.png
- JSON-LD `WebApplication` with `applicationCategory: MedicalApplication`, 14 languages, `offers.price: 0`

Missing:
- No `robots.txt` in `public/`
- No `sitemap.xml` in `public/`
- No hreflang annotations
- Single URL with client-side language toggle (no `/he/` and `/en/` routes)
- All visible content client-rendered (the AI-crawler blocker above)
- Live site may be serving an older build; verify with view-source after next deploy

## Action plan (in order)

### 1. Prerender: the gating requirement (high confidence)
Ship the descriptive copy, headings, and metadata as static HTML at build time.
- **vite-react-ssg** fits this stack directly. The app has no react-router-dom, so use
  its single-page mode (`vite-react-ssg/single-page`). Actively maintained, v0.9.2
  released 2026-07-15.
- Interactive calculator output and Lottie/3D stay client-side; that is fine. Crawlers
  need the descriptive text, not live calculations.
- Verify with view-source (JS disabled): the raw HTML must contain the real content.
- Alternatives: Next.js SSR (bigger migration) or Prerender.io (Google calls it a
  workaround, not a long-term fix).

### 2. Split languages into distinct URLs (high confidence)
Google determines language **only from visible rendered text**. It ignores the `lang`
attribute and the URL, and Googlebot crawls from the US with no Accept-Language header.
A single-URL JS toggle risks one language never being crawled at all.
- Create `/he/` and `/en/` routes, each shipping its language's text in static HTML
  with its own title + meta description.
- hreflang: bidirectional (each version lists itself and the other, or Google ignores
  the tags), ISO 639-1 codes (`he`, `en`, optionally `he-IL` / `en-IL`; a bare country
  code is invalid), plus `x-default` pointing at the preferred fallback.
- Declare via HTML link tags, HTTP headers, or the XML sitemap; the three are
  equivalent, and the sitemap method is the convenient one for a static build.

### 3. Sitemap + robots.txt + Search Console
- `public/robots.txt`: allow all, and explicitly do NOT block GPTBot, OAI-SearchBot,
  ClaudeBot, Claude-SearchBot, PerplexityBot. Point to the sitemap.
- `public/sitemap.xml`: list both language URLs with hreflang annotations.
- Verify the domain in Google Search Console, submit the sitemap, request indexing.
- Note: OpenAI and Anthropic run separate training vs search crawlers (GPTBot vs
  OAI-SearchBot, ClaudeBot vs Claude-SearchBot). Blocking the search ones removes
  citation eligibility.
- llms.txt: Google's May 2026 guidance says it has no effect on AI Overviews. Skip it.

### 4. Structured data (high confidence)
- Keep `WebApplication` (one of the four types Google supports for Software App rich
  results). Required for the rich result: `name`, `offers.price: 0`, and either
  `aggregateRating` or `review`.
- **Do not fabricate ratings.** Ship the markup now for machine-readability; the rich
  result becomes reachable only once real user ratings exist. Consider adding a small
  rating prompt in the app to start collecting them honestly.
- Add `MedicalWebPage` typing on medical-content pages (schema.org V30.0 confirmed;
  the vocabulary includes veterinary medicine via VeterinaryCare).
- Caution: the specific properties `medicalAudience` / `specialty` on MedicalWebPage
  FAILED verification (1-2). Re-check schema.org before using them.
- Add FAQ content with FAQPage schema on the toxicity pages (what dose of chocolate is
  dangerous, etc.); question-answer pairs are what answer engines extract. Note Google
  restricts FAQ rich results to authoritative health/gov sites since Aug 2023, but the
  markup still feeds AI extraction.

### 5. Entity consolidation with vet-holim.com (inference, not verified)
- Cross-link bidirectionally: the clinic site links to the calculator as its official
  tool; the calculator links back.
- Share consistent Organization / VeterinaryCare schema on both, so engines resolve
  the two domains as one entity instead of competitors.
- This step follows standard entity-SEO practice but was not independently verified in
  the adversarial round.

## Refuted claims (do not build on these)
- "92% of ChatGPT search responses draw on Bing's index": refuted 0-3. Do not treat
  Bing indexing as a ChatGPT proxy.
- MedicalWebPage `medicalAudience` / `specialty` property definitions: refuted 1-2.
- The exact 500M-fetch phrasing from one blog was refuted as stated; the underlying
  Vercel/MERJ no-JS-execution finding stands via other sources.

## Caveats
- Crawler behavior claims trace mainly to one primary empirical study (Vercel/MERJ)
  amplified by SEO vendors with prerendering products. The Google and schema.org claims
  are primary-source verbatim and strongest.
- Fetch-rate figures (GPTBot 11.5%, ClaudeBot 23.84%) are Dec 2024 snapshots; the
  no-execution conclusion holds through June 2026 but the space moves fast.
- Agentic browser modes (ChatGPT Atlas/Operator, Perplexity Comet) DO render JS, but
  they are distinct from the citation/indexing pipelines.
- Hebrew keyword strategy and Israeli local-search specifics were not covered by
  surviving claims; treat those as open work.

## Key sources
- Vercel/MERJ: https://vercel.com/blog/the-rise-of-the-ai-crawler
- Google Software App structured data: https://developers.google.com/search/docs/appearance/structured-data/software-app
- Google localized versions (hreflang): https://developers.google.com/search/docs/specialty/international/localized-versions
- Google multi-regional sites: https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites
- vite-react-ssg: https://github.com/Daydreamer-riri/vite-react-ssg
- schema.org MedicalWebPage: https://schema.org/MedicalWebPage
