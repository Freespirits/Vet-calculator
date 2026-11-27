# Facebook post — "the calculator crosses borders" (Hebrew)

A Hebrew Facebook post celebrating the calculator's international search traffic,
announcing the recently shipped features, and stating who it is for, what it is
based on and its limits. The product is presented as a **Vet-Flow** product; the
former name is deliberately not used anywhere in the post or the images. The only
place the old wording survives is the site address `vet-holim.work`, which is the
real URL readers must click.

## Image to attach

| File | What it is | When to use |
|---|---|---|
| `global-reach-card.png` | The Search Console figures redrawn in the brand style (1080×1350, rendered @2x) | **Recommended** — sharp, readable on a phone |
| `global-reach-screenshot.png` | The real Search Console screenshot, cut into its two panels and framed | When showing the authentic screenshot matters more |

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
🌍 המחשבון הווטרינרי של Vet-Flow חוצה גבולות — ותודה לכם!

בנינו אותו כדי לעזור לצוותים וטרינריים כאן בארץ. היום מחפשים ומוצאים אותו בגוגל בכל העולם:

📈 כ־2,390 כניסות מגוגל — עלייה של 7,033% לעומת התקופה הקודמת
👀 כ־3,640 הופעות בתוצאות החיפוש — עלייה של 9,228%
🗣️ והעמודים המובילים? דווקא ברוסית, בספרדית, בפולנית, ביפנית ובאיטלקית

ההצלחה הזו מחייבת, אז המשכנו לבנות. מה חדש במחשבון:

💊 130 תרופות עם מינוני ייחוס לכלבים ולחתולים
☠️ 14 מחשבוני רעילות — נוספו קפאין, אתילן גליקול (נוזל קירור), קנאביס (THC) ושלושה רעלי מכרסמים
🚑 "טיפול מיידי" בכל תוצאת רעילות: השראת הקאה, פחם פעיל ואנטידוטים — עם המקור המצוטט ליד כל מינון
🌿 ספריית 35 צמחים רעילים, עם תמונות וחיפוש
🌐 14 שפות, ולכל שפה עמוד משלה
📲 עובד גם בלי אינטרנט — אפשר להתקין למסך הבית

💚 והכול בחינם — בלי הרשמה ובלי חשבון.
המחשבון פתוח לרופאות ולרופאים וטרינרים, לאחיות, לטכנאים ולאסיסטנטים, לסטודנטים — וגם לקהל הרחב.

📚 על מה זה מבוסס?
מינוני הייחוס לקוחים מתוך Plumb's Veterinary Drug Handbook, מהדורה 10 — ספר המינונים המקובל על וטרינרים בכל העולם לטיפול בכלבים ובחתולים. כל המחשבונים נשענים על מחקר וספרות וטרינרית קלינית, והמקורות מצוטטים לצד התוצאות.

⚠️ חשוב לדעת: המחשבון הוא כלי עזר מייעץ בלבד. הוא אינו הנחיה לביצוע טיפול מכל סוג, אינו אבחנה ואינו תחליף לבדיקה ולשיקול דעת של רופא/ה וטרינר/ית. יש לאמת כל חישוב מול המקור לפני מתן טיפול, והשימוש בו באחריות המשתמש בלבד.
חושדים שחיית המחמד נחשפה לרעל? לא מחכים לחישוב — פונים מיד לווטרינר/ית או למרפאת חירום.

👉 נסו בעצמכם: https://vet-holim.work
מכירים וטרינר/ית, אחות או סטודנט/ית שזה יכול לעזור להם? תייגו ושתפו 🙏

#וטרינריה #רפואה_וטרינרית #וטרינר #כלבים #חתולים #הרעלות #מחשבון_מינון #VetFlow #veterinary #vetmed #vettech
```

## Image alt text (Hebrew)

```text
נתוני Google Search Console של המחשבון הווטרינרי של Vet-Flow: כ־2,390 קליקים (עלייה של 7,033%) וכ־3,640 הופעות (עלייה של 9,228%). העמודים המובילים: רוסית 50 קליקים, ספרדית 47, פולנית 40, יפנית 25, איטלקית 20. חינם, 14 שפות, 130 תרופות, 14 מחשבוני רעילות, מבוסס Plumb's מהדורה 10.
```

## Where each claim comes from

| Claim in the post | Source |
|---|---|
| ~2,390 clicks (+7,033%), ~3,640 impressions (+9,228%) | Owner's Search Console screenshot (shown as 2.39K / 3.64K). The screenshot does not show the date range, so the post says "the previous period" without naming one |
| Top pages: Russian 50, Spanish 47, Polish 40, Japanese 25, Italian 20 clicks | Same screenshot, "התוכן שלך → מובילים". These are page *languages*; the screenshot says nothing about visitors' countries, so the post names languages only |
| 130 drugs with reference doses | `src/data/drugDatabase.ts` (130 entries) |
| 14 toxicity calculators; caffeine, ethylene glycol, THC and three rodenticides added | `src/toxins/` (14 modules); commit `379b82e` |
| "Treat now" panel: emesis, activated charcoal, antidotes, each with its cited source | `src/data/toxinTreatments.ts`; commit `eb3df39` |
| 35 toxic plants with photos and search | `src/data/toxicPlants.ts`, `public/plants/` |
| 14 languages, one page each | `src/i18n/`; commit `cd185a7` |
| Works offline, installable | PWA precache, commit `fc6a502`; `faq.a4` in `src/i18n/he.ts` |
| Free, no sign-up, no account | `faq.a1` in `src/i18n/he.ts` |
| Reference doses from Plumb's Veterinary Drug Handbook, 10th ed. | Header of `src/data/drugDatabase.ts` |
| Sources cited next to the results | Toxin result views and the `dose.plumbsRef` reference line |

## Wording decisions worth knowing

- **Plumb's is described as "the dosing reference accepted by veterinarians
  worldwide", not as "authorized".** No international body authorizes a drug
  handbook, and the publisher has not reviewed or endorsed this product, so
  "authorized" would be a claim we cannot back.
- **"Also for the general public" sits next to an explicit safety line.** The app
  itself still says it is intended for licensed veterinary use (`dose.vetOnly`,
  `about.who` in `src/i18n/he.ts`). The post therefore invites the public to use
  it while telling owners who suspect poisoning to go to a vet immediately
  instead of acting on a calculation.
- **Percentages are written out in words** ("עלייה של 7,033%") because a leading
  `+` sign next to a number tends to jump to the wrong side in right-to-left
  Facebook text.
