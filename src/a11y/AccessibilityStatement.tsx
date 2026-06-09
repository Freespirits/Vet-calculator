/**
 * AccessibilityStatement — the legally-required IS 5568 declaration modal.
 *
 * Israel's Equal Rights for Persons with Disabilities (Service Accessibility)
 * Regulations require a public accessibility statement naming the conformance
 * standard, what was done, known limitations, and an accessibility coordinator
 * to contact. Content is bilingual he/en (English is the fallback for the other
 * UI languages), matching how clinical reference copy is handled in the app.
 *
 * Opened from the accessibility menu and from the footer; reads its open state
 * from the AccessibilityProvider.
 */
import { useEffect, useRef } from 'react';
import { useI18n } from '../i18n/LanguageProvider';
import { useA11y } from './AccessibilityProvider';
import { a11yStrings } from './strings';
import { XIcon, MailIcon } from '../components/Icons';

const ACCESSIBILITY_EMAIL = 'admin@hack-tech.org';

interface StatementContent {
  updatedLabel: string;
  updatedDate: string;
  intro: string;
  standardTitle: string;
  standard: string;
  measuresTitle: string;
  measures: string[];
  menuTitle: string;
  menu: string;
  limitsTitle: string;
  limits: string;
  contactTitle: string;
  contact: string;
  coordinatorRole: string;
}

const EN: StatementContent = {
  updatedLabel: 'Last updated',
  updatedDate: '9 June 2026',
  intro:
    'We are committed to making this Veterinary Calculator accessible to the widest possible audience, including people with disabilities, and we work continually to improve it.',
  standardTitle: 'Conformance standard',
  standard:
    'This website strives to conform to Israeli Standard IS 5568 (“Web content accessibility”), which adopts the international WCAG 2.0 guidelines at Level AA, in line with the Equal Rights for Persons with Disabilities (Service Accessibility) Regulations, 5773–2013.',
  measuresTitle: 'What we have done',
  measures: [
    'Semantic HTML structure and ARIA landmarks for screen readers',
    'Full keyboard operation with clearly visible focus indicators',
    'Sufficient colour contrast, plus high-contrast and monochrome modes',
    'Text resizing up to 160% and full page-zoom support',
    'Respect for the operating-system “reduced motion” preference',
    'Logical right-to-left (Hebrew/Arabic) and left-to-right layouts',
  ],
  menuTitle: 'Accessibility menu',
  menu:
    'An accessibility menu is available from the button in the bottom corner of every page. It lets you enlarge the text, switch to high contrast or monochrome, highlight links and titles, choose a more readable font, enlarge the cursor, and stop animations. Your choices are saved on your device.',
  limitsTitle: 'Known limitations',
  limits:
    'The decorative animated background is purely visual and is hidden from assistive technologies. Despite our efforts, some content — particularly third-party material such as external links — may not yet be fully accessible. We are working to resolve any remaining gaps.',
  contactTitle: 'Accessibility coordinator',
  contact:
    'If you encounter an accessibility barrier, or need assistance, please contact our accessibility coordinator. We will make every effort to respond and provide a solution promptly.',
  coordinatorRole: 'Accessibility coordinator',
};

const HE: StatementContent = {
  updatedLabel: 'עודכן לאחרונה',
  updatedDate: '9 ביוני 2026',
  intro:
    'אנו רואים חשיבות רבה בהנגשת המחשבון הווטרינרי לקהל הרחב ביותר האפשרי, לרבות אנשים עם מוגבלות, ופועלים באופן מתמיד לשיפור נגישות האתר.',
  standardTitle: 'תקן הנגישות',
  standard:
    'אתר זה שואף לעמוד בדרישות התקן הישראלי ת״י 5568 («נגישות תכנים באינטרנט»), המאמץ את הנחיות WCAG 2.0 ברמת AA, בהתאם לתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע״ג–2013.',
  measuresTitle: 'מה עשינו',
  measures: [
    'מבנה HTML סמנטי ואזורי ARIA עבור קוראי מסך',
    'הפעלה מלאה באמצעות מקלדת עם סימון פוקוס ברור',
    'ניגודיות צבעים מספקת, וכן מצבי ניגודיות גבוהה וגווני אפור',
    'הגדלת טקסט עד 160% ותמיכה מלאה בהגדלת העמוד',
    'כיבוד העדפת «צמצום תנועה» של מערכת ההפעלה',
    'פריסה לוגית מימין-לשמאל (עברית/ערבית) ומשמאל-לימין',
  ],
  menuTitle: 'תפריט הנגישות',
  menu:
    'בכל עמוד זמין תפריט נגישות באמצעות הכפתור שבפינה התחתונה. ניתן באמצעותו להגדיל את הטקסט, לעבור לניגודיות גבוהה או לגווני אפור, להדגיש קישורים וכותרות, לבחור גופן קריא, להגדיל את הסמן ולעצור אנימציות. הבחירות נשמרות במכשיר שלך.',
  limitsTitle: 'מגבלות ידועות',
  limits:
    'הרקע המונפש הוא דקורטיבי בלבד ומוסתר מטכנולוגיות מסייעות. על אף מאמצינו, ייתכן שחלק מהתכנים — בייחוד תכנים של צד שלישי כגון קישורים חיצוניים — אינם נגישים במלואם. אנו פועלים לתיקון כל פער שיימצא.',
  contactTitle: 'רכז הנגישות',
  contact:
    'נתקלתם בבעיית נגישות באתר או זקוקים לסיוע? נשמח שתפנו לרכז הנגישות שלנו, ונעשה כל מאמץ לתת מענה ופתרון בהקדם.',
  coordinatorRole: 'רכז נגישות',
};

export function AccessibilityStatement() {
  const { lang, dir } = useI18n();
  const { statementOpen, closeStatement } = useA11y();
  const s = a11yStrings(lang);
  const c = lang === 'he' ? HE : EN;
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = 'a11y-statement-title';

  useEffect(() => {
    if (!statementOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeStatement();
    };
    document.addEventListener('keydown', onKey);
    const id = window.requestAnimationFrame(() => closeRef.current?.focus());
    // Prevent the page behind from scrolling while the dialog is open.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      window.cancelAnimationFrame(id);
      document.body.style.overflow = prevOverflow;
    };
  }, [statementOpen, closeStatement]);

  if (!statementOpen) return null;

  return (
    <div
      className="a11y-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) closeStatement();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        dir={dir}
        className="a11y-statement glass"
      >
        <div className="a11y-statement-head">
          <h2 id={titleId} className="a11y-statement-title">
            {s.statement}
          </h2>
          <button
            ref={closeRef}
            type="button"
            className="a11y-icon-btn"
            aria-label={s.close}
            onClick={closeStatement}
          >
            <XIcon size={18} />
          </button>
        </div>

        <div className="a11y-statement-body">
          <p className="a11y-statement-updated">
            {c.updatedLabel}: {c.updatedDate}
          </p>
          <p>{c.intro}</p>

          <h3>{c.standardTitle}</h3>
          <p>{c.standard}</p>

          <h3>{c.measuresTitle}</h3>
          <ul>
            {c.measures.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>

          <h3>{c.menuTitle}</h3>
          <p>{c.menu}</p>

          <h3>{c.limitsTitle}</h3>
          <p>{c.limits}</p>

          <h3>{c.contactTitle}</h3>
          <p>{c.contact}</p>
          <p className="a11y-statement-contact">
            <MailIcon size={18} />
            <span>
              <span className="a11y-statement-role">{c.coordinatorRole}</span>
              <a href={`mailto:${ACCESSIBILITY_EMAIL}`}>{ACCESSIBILITY_EMAIL}</a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
