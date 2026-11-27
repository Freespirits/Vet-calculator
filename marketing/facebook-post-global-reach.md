# Facebook post: search reach and the new critical-care tools (Hebrew)

A Hebrew Facebook post that announces the four tools added in
[PR #7](https://github.com/Freespirits/Vet-calculator/pull/7): Code Blue, the
MDR1 check, the emergency and critical-care tab, and the bedside calculators.
It opens with the calculator's Google Search Console figures, then says who the
calculator is for, what it is based on and where its limits are.

The calculator is presented as a Vet-Flow product. The former name appears
nowhere in the post or the images. The site address `vet-holim.work` stays
because it is the URL readers click.

Publish after PR #7 is merged and deployed. Today the four tools are on the PR
branch and not on the live site. To post earlier, delete the paragraph that
starts "בעקבות זה הוספנו" and the four paragraphs after it, and remove the
"חדש במחשבון" band from the images.

## The post

Written to read like a person wrote it: plain sentences, no emoji, no dashes,
no hashtags. Add two or three hashtags when posting if the page normally uses
them.

```text
המחשבון הווטרינרי של Vet-Flow נכתב קודם כול בעברית. לפי Google Search Console, חמשת העמודים שלו שמקבלים הכי הרבה כניסות מגוגל הם ברוסית, בספרדית, בפולנית, ביפנית ובאיטלקית.

בסך הכול נרשמו כ־2,390 כניסות מגוגל וכ־3,640 הופעות בתוצאות החיפוש. לעומת התקופה הקודמת זו עלייה של 7,033% בכניסות ושל 9,228% בהופעות. תודה לכל מי שמשתמש בו.

בעקבות זה הוספנו למחשבון ארבעה כלים:

קוד כחול, עזר החייאה לצוות וטרינרי. שעון מחזורים של 2 דקות, מטרונום לעיסויים, מינונים לפי משקל ורישום אירועים עם שעה, לפי הנחיות ההחייאה הבינלאומיות לכלבים ולחתולים מ־2024.

בדיקת MDR1 בתוך מחשבון המינון. אפשר להזין גזע ותוצאה של בדיקה גנטית, ומקבלים התרעה בתרופות כמו איברמקטין ולופרמיד.

לשונית חירום וטיפול נמרץ: מכת חום, הכשת נחש (כולל צפע ארץ־ישראלי), זחל תהלוכן האורן והרעלת זרחנים אורגניים וקרבמטים. ליד כל משפט מופיע המחקר שהוא לקוח ממנו.

ארבעה מחשבונים ליד המיטה: מדד הלם לכלבים, Feline Grimace Scale להערכת כאב בחתולים, נפח עירוי דם וקצב עירוי מתמשך (CRI).

כל זה נוסף על 130 תרופות עם מינוני ייחוס, 14 מחשבוני רעילות וספרייה של 35 צמחים רעילים. הממשק זמין ב־14 שפות ועובד גם בלי אינטרנט.

השימוש חינם, בלי הרשמה. המחשבון מיועד לרופאים וטרינרים, לאחיות ולטכנאים, וגם מי שאינו איש מקצוע יכול להשתמש בו.

מינוני הייחוס לקוחים מ־Plumb's Veterinary Drug Handbook, מהדורה 10, ספר המינונים שווטרינרים בכל העולם עובדים איתו בכלבים ובחתולים. שאר הכלים מבוססים על מחקר וטרינרי קליני שפורסם, והמקור מצוטט ליד כל נתון.

המחשבון מייעץ בלבד. הוא אינו הנחיה לביצוע טיפול מכל סוג ואינו מחליף בדיקה של רופא וטרינר. כל חישוב צריך לאמת מול המקור לפני מתן תרופה, והשימוש באחריות המשתמש בלבד. אם יש חשד להרעלה או שהחיה במצוקה, פונים מיד לווטרינר או למרפאת חירום.

vet-holim.work
```

## Images

| File | What it shows |
|---|---|
| `global-reach-card.png` | The Search Console figures set as a table: site totals, then the five top pages. Recommended. |
| `global-reach-screenshot.png` | The real Search Console screenshot, cut into its two panels. |

Both are 1080×1350 (rendered at 2x) and carry the "חדש במחשבון" band with the
four tools, four standing facts (free, 14 languages, 130 drugs, 14 toxicity
calculators), the Plumb's line and the advisory notice.

Every number and page title is copied from the owner's screenshot. A page whose
previous-period value was 0 is marked "חדש" instead of a percentage, as Search
Console reports it. In the screenshot variant the small page thumbnails are
painted out because they show the former product name, and the cut starts at
the "מובילים" tab row. Nothing else in the screenshot is retouched.

The images were designed with [Hallmark](https://github.com/nutlope/hallmark)
(theme: Almanac). Sources: `global-reach-card.html` and
`global-reach-screenshot.html`, sharing `global-reach-card.css`, which imports
Hallmark's `tokens.css` and `base.css`; `search-console-*.png` are the two cuts
of the screenshot. The design decisions and the waived checks are stamped in the
first lines of `global-reach-card.css`. To re-render, open either HTML file at a
1080×1350 viewport in headless Chromium with `deviceScaleFactor: 2` and
screenshot the viewport.

Alt text for the image:

```text
נתוני Google Search Console של המחשבון הווטרינרי של Vet-Flow: כ־2,390 כניסות מגוגל, עלייה של 7,033%, וכ־3,640 הופעות, עלייה של 9,228%. העמודים המובילים: רוסית 50 כניסות, ספרדית 47, פולנית 40, יפנית 25, איטלקית 20. חדש במחשבון: קוד כחול להחייאה, בדיקת MDR1, חירום וטיפול נמרץ ומחשבונים ליד המיטה. חינם, 14 שפות, 130 תרופות, 14 מחשבוני רעילות. מינוני הייחוס לפי Plumb's, מהדורה 10.
```

## Where each claim comes from

Paths marked (PR #7) are on branch `claude/vibrant-gates-uvq9fh`, not yet on the
default branch.

| Claim in the post | Source |
|---|---|
| The calculator was written in Hebrew first | README: "Hebrew-first" |
| About 2,390 clicks (up 7,033%) and 3,640 impressions (up 9,228%) | The owner's Search Console screenshot, which shows 2.39K and 3.64K. It shows no date range, so the post says "the previous period" |
| Top pages: Russian 50, Spanish 47, Polish 40, Japanese 25, Italian 20 | Same screenshot, "התוכן שלך", "מובילים" tab. These are page languages. The screenshot says nothing about visitors' countries, so the post names languages only |
| Code Blue: 2-minute cycle clock, compression metronome, weight-based doses, time-stamped event log, for veterinary teams, per the 2024 international CPR guidelines | (PR #7) `src/cpr/`, `src/features/cpr/strings.ts`, README "Code Blue (CPR aid)" |
| MDR1 check by breed and genotype in the dosage calculator, flagging ivermectin and loperamide among others | (PR #7) `src/data/mdr1.ts`, README "MDR1 (P-glycoprotein) check" |
| Emergency tab: heat-related illness, snake envenomation including *Vipera palaestinae*, pine processionary caterpillar, organophosphate and carbamate poisoning, with the study beside every statement | (PR #7) `src/emergencies/fieldFacts.ts`, `heatIllness.ts`. `fieldFacts.test.ts` fails if a statement lacks a source |
| Bedside calculators: canine shock index, Feline Grimace Scale, transfusion volume, infusion rate (CRI) | (PR #7) `src/features/er/bedsideMeta.ts`, `src/critical/` |
| 130 drugs with reference doses | `src/data/drugDatabase.ts`, 130 entries |
| 14 toxicity calculators | `src/toxins/`, 14 modules |
| 35 toxic plants | `src/data/toxicPlants.ts`, `public/plants/` |
| 14 interface languages | `src/i18n/`. New clinical wording is Hebrew and English. The other 12 languages show it in English with translated tabs and buttons |
| Works offline | PWA precache, and `faq.a4` in `src/i18n/he.ts` |
| Free, no sign-up | `faq.a1` in `src/i18n/he.ts` |
| Reference doses from Plumb's Veterinary Drug Handbook, 10th edition | Header of `src/data/drugDatabase.ts` |
| A source cited beside every figure | Toxin result views, the `dose.plumbsRef` line, and (PR #7) `er.subtitle` |

## Wording decisions

Plumb's is described as the dosing book veterinarians around the world work
with. It is not called "authorized": no international body authorizes a drug
handbook, and its publisher has not reviewed or endorsed this product.

The CPR guidelines are described and not named. PR #7 lists permission to use
RECOVER material as an open owner decision, and a promotional post is where a
name most easily reads as an endorsement. The in-app citation names the paper
in full. The name can be added once that question is settled.

The post says people who are not professionals can use the calculator, and the
app itself says it is intended for licensed veterinary use (`dose.vetOnly` and
`about.who` in `src/i18n/he.ts`). Code Blue also opens behind a
professional-use acknowledgment. The post therefore labels Code Blue as a tool
for veterinary teams and tells owners to go to a vet at once if they suspect
poisoning.

Percentages are written in words ("עלייה של 7,033%") because a plus sign next
to a number tends to jump to the wrong side in right-to-left Facebook text.
