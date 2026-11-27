# Facebook post — global reach + the new critical-care tools (Hebrew)

A Hebrew Facebook post with one job: **announce the four tools added in
[PR #7](https://github.com/Freespirits/Vet-calculator/pull/7)** — Code Blue, the
MDR1 check, the emergency and critical-care tab, and the bedside calculators —
framed as the response to the calculator's international search traffic. It also
states who the calculator is for, what it is based on and its limits.

The product is presented as a **Vet-Flow** product; the former name is
deliberately not used anywhere in the post or the images. The only place the old
wording survives is the site address `vet-holim.work`, which is the real URL
readers must click.

> **Publish only after PR #7 is merged and deployed.** At the time of writing the
> four new tools are on the PR branch and are not on the live site. Until then,
> delete the "הוספנו למחשבון ארבעה כלים חדשים" block (the four emoji lines under
> it) and the "חדש" chip row would be wrong too — re-render the images without it.

## Image to attach

| File | What it is | When to use |
|---|---|---|
| `global-reach-card.png` | The Search Console figures redrawn in the brand style (1080×1350, rendered @2x) | **Recommended** — sharp, readable on a phone |
| `global-reach-screenshot.png` | The real Search Console screenshot, cut into its two panels and framed | When showing the authentic screenshot matters more |

Both carry a "חדש" (new) chip row naming the four new tools, and a facts line
(free · 14 languages · 130 drugs · 14 toxicity calculators · Plumb's 10th ed.).

Sources: `global-reach-card.html`, `global-reach-screenshot.html` (shared styles
in `global-reach-card.css`; `search-console-*.png` are the cuts of the original
screenshot). To re-render, open the HTML at a 1080×1350 viewport in headless
Chromium with `deviceScaleFactor: 2` and screenshot the viewport.

Every number and page title in both images is copied from the screenshot. Pages
whose previous-period value was 0 are labelled "חדש" (new) rather than given a
percentage, exactly as Search Console reports them. In the framed-screenshot
variant the small page thumbnails are painted out because they show the former
product name; nothing else in the screenshot is retouched.

## The post (copy from here)

```text
🌍 המחשבון הווטרינרי של Vet-Flow חוצה גבולות — ובזכותכם הוא ממשיך לגדול!

בנינו אותו כדי לעזור לצוותים וטרינריים כאן בארץ. היום מחפשים ומוצאים אותו בגוגל בכל העולם:

📈 כ־2,390 כניסות מגוגל — עלייה של 7,033% לעומת התקופה הקודמת
👀 כ־3,640 הופעות בתוצאות החיפוש — עלייה של 9,228%
🗣️ והעמודים המובילים? דווקא ברוסית, בספרדית, בפולנית, ביפנית ובאיטלקית

ההצלחה הזו מחייבת. אז הוספנו למחשבון ארבעה כלים חדשים, לרגעים הכי דחופים במרפאה:

🚨 קוד כחול — עזר החייאה לצוות וטרינרי: שעון מחזורים של 2 דקות, מטרונום לעיסויים, מינונים לפי משקל ורישום אירועים עם חותמת זמן, לפי הנחיות ההחייאה הבינלאומיות לכלבים ולחתולים (2024)
🧬 בדיקת MDR1 בתוך מחשבון המינון: התרעה לפי גזע ולפי תוצאת הבדיקה הגנטית, בתרופות רגישות כמו איברמקטין ולופרמיד
🆘 לשונית "חירום וטיפול נמרץ": מכת חום, הכשת נחש (כולל צפע ארץ־ישראלי), זחל תהלוכן האורן והרעלת זרחנים אורגניים וקרבמטים — וליד כל קביעה, המחקר שמאחוריה
🩺 מחשבונים ליד המיטה: מדד הלם לכלבים, סולם כאב לחתולים (Feline Grimace Scale), נפח עירוי דם וקצב עירוי מתמשך (CRI)

וכל זה לצד מה שכבר מחכה לכם: 130 תרופות עם מינוני ייחוס, 14 מחשבוני רעילות וספריית 35 צמחים רעילים — ב־14 שפות, וגם בלי אינטרנט.

💚 והכול בחינם — בלי הרשמה ובלי חשבון.
המחשבון פתוח לרופאות ולרופאים וטרינרים, לאחיות, לטכנאים ולאסיסטנטים, לסטודנטים — וגם לקהל הרחב.

📚 על מה זה מבוסס?
מינוני הייחוס לקוחים מתוך Plumb's Veterinary Drug Handbook, מהדורה 10 — ספר המינונים המקובל על וטרינרים בכל העולם לטיפול בכלבים ובחתולים. כל הכלים נשענים על מחקר וספרות וטרינרית קלינית שפורסמו, והמקור מצוטט ליד כל נתון.

⚠️ חשוב לדעת: המחשבון הוא כלי עזר מייעץ בלבד. הוא אינו הנחיה לביצוע טיפול מכל סוג, אינו אבחנה ואינו תחליף לבדיקה ולשיקול דעת של רופא/ה וטרינר/ית. יש לאמת כל חישוב מול המקור לפני מתן טיפול, והשימוש בו באחריות המשתמש בלבד.
חושדים שחיית המחמד נחשפה לרעל, או שהיא במצוקה? לא מחכים לחישוב — פונים מיד לווטרינר/ית או למרפאת חירום.

👉 נסו בעצמכם: https://vet-holim.work
מכירים וטרינר/ית, אחות או סטודנט/ית שזה יכול לעזור להם? תייגו ושתפו 🙏

#וטרינריה #רפואה_וטרינרית #וטרינר #כלבים #חתולים #החייאה #רפואת_חירום #הרעלות #VetFlow #veterinary #vetmed #vettech
```

## Image alt text (Hebrew)

```text
נתוני Google Search Console של המחשבון הווטרינרי של Vet-Flow: כ־2,390 קליקים (עלייה של 7,033%) וכ־3,640 הופעות (עלייה של 9,228%). העמודים המובילים: רוסית 50 קליקים, ספרדית 47, פולנית 40, יפנית 25, איטלקית 20. חדש במחשבון: קוד כחול להחייאה, בדיקת MDR1, חירום וטיפול נמרץ ומחשבונים ליד המיטה. חינם, 14 שפות, 130 תרופות, 14 מחשבוני רעילות, מבוסס Plumb's מהדורה 10.
```

## Where each claim comes from

Paths marked *(PR #7)* exist on branch `claude/vibrant-gates-uvq9fh`, not yet on
the default branch.

| Claim in the post | Source |
|---|---|
| ~2,390 clicks (+7,033%), ~3,640 impressions (+9,228%) | Owner's Search Console screenshot (shown as 2.39K / 3.64K). The screenshot does not show the date range, so the post says "the previous period" without naming one |
| Top pages: Russian 50, Spanish 47, Polish 40, Japanese 25, Italian 20 clicks | Same screenshot, "התוכן שלך → מובילים". These are page *languages*; the screenshot says nothing about visitors' countries, so the post names languages only |
| Code Blue: 2-minute cycle clock, compression metronome, weight-based doses, time-stamped event log, for veterinary teams, per the 2024 international CPR guidelines | *(PR #7)* `src/cpr/`, `src/features/cpr/strings.ts`, README "Code Blue (CPR aid)" |
| MDR1 check by breed and genotype inside the dosage calculator; ivermectin and loperamide among the flagged drugs | *(PR #7)* `src/data/mdr1.ts`, README "MDR1 (P-glycoprotein) check" |
| Emergency tab: heat-related illness, snake envenomation incl. *Vipera palaestinae*, pine processionary caterpillar, organophosphate/carbamate poisoning; a study named beside every statement | *(PR #7)* `src/emergencies/fieldFacts.ts`, `heatIllness.ts`; `fieldFacts.test.ts` fails if a statement lacks a source |
| Bedside calculators: canine shock index, Feline Grimace Scale, transfusion volume, infusion rate (CRI) | *(PR #7)* `src/features/er/bedsideMeta.ts`, `src/critical/` |
| 130 drugs with reference doses | `src/data/drugDatabase.ts` (130 entries) |
| 14 toxicity calculators | `src/toxins/` (14 modules) |
| 35 toxic plants | `src/data/toxicPlants.ts`, `public/plants/` |
| 14 languages | `src/i18n/`. New clinical wording is Hebrew and English; the other 12 languages show it in English with translated tabs and buttons |
| Works offline | PWA precache; `faq.a4` in `src/i18n/he.ts` |
| Free, no sign-up, no account | `faq.a1` in `src/i18n/he.ts` |
| Reference doses from Plumb's Veterinary Drug Handbook, 10th ed. | Header of `src/data/drugDatabase.ts` |
| A source cited beside every figure | Toxin result views, the `dose.plumbsRef` line, and *(PR #7)* `er.subtitle` ("כל נתון עם מקור") |

## Wording decisions worth knowing

- **Plumb's is described as "the dosing reference accepted by veterinarians
  worldwide", not as "authorized".** No international body authorizes a drug
  handbook, and the publisher has not reviewed or endorsed this product, so
  "authorized" would be a claim we cannot back.
- **The CPR guidelines are described, not named.** The post says "the
  international CPR guidelines for dogs and cats (2024)" and leaves the RECOVER
  name out. PR #7 lists permission to use RECOVER material as an open owner
  decision, and a promotional post is the place where a brand name is most
  easily read as an endorsement. The in-app citation still names the paper in
  full. Once the owner has settled that question, the name can be added.
- **"Also for the general public" sits next to an explicit safety line, and Code
  Blue is labelled as a tool for veterinary teams.** The app itself still says it
  is intended for licensed veterinary use (`dose.vetOnly`, `about.who` in
  `src/i18n/he.ts`), and Code Blue opens behind a professional-use
  acknowledgment. The post therefore invites the public in while telling owners
  to go to a vet immediately instead of acting on a calculation.
- **Percentages are written out in words** ("עלייה של 7,033%") because a leading
  `+` sign next to a number tends to jump to the wrong side in right-to-left
  Facebook text.
