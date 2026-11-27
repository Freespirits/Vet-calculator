/**
 * Crash-cart setup: a collapsible list of the vial drugs with one strength
 * field each. Whatever the clinic types is saved on this device and is the
 * only source of draw-up volumes in the dose sheet. Fields start empty.
 */
import { useCallback, useState } from 'react';
import { useI18n } from '../../i18n/LanguageProvider';
import { tr } from '../../types/toxins';
import { GlassCard } from '../../components/primitives';
import { NumberField } from '../../components/forms';
import { ChevronDownIcon } from '../../components/Icons';
import { CPR_INTERVENTIONS, type CprInterventionId } from '../../cpr/recoverGuideline';
import {
  CART_DRUG_IDS,
  loadCrashCart,
  saveCrashCart,
  withCartStrength,
  type CrashCart,
} from '../../cpr/crashCart';
import { CPR_TEXT } from './strings';

const CART_DRUGS = CPR_INTERVENTIONS.filter((intervention) => CART_DRUG_IDS.includes(intervention.id));

function readSavedCart(): CrashCart {
  return typeof window === 'undefined' ? {} : loadCrashCart(window.localStorage);
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCrashCart() {
  const [cart, setCart] = useState<CrashCart>(readSavedCart);
  const setStrength = useCallback((drugId: CprInterventionId, strength: number | undefined) => {
    setCart((current) => {
      const next = withCartStrength(current, drugId, strength);
      saveCrashCart(window.localStorage, next);
      return next;
    });
  }, []);
  return { cart, setStrength };
}

function StrengthField({
  drugId,
  label,
  saved,
  onStrength,
}: {
  drugId: CprInterventionId;
  label: string;
  saved: number | undefined;
  onStrength: (drugId: CprInterventionId, strength: number | undefined) => void;
}) {
  const [text, setText] = useState(saved === undefined ? '' : String(saved));
  const update = (next: string) => {
    setText(next);
    onStrength(drugId, next.trim() === '' ? undefined : Number(next));
  };
  return <NumberField label={label} value={text} onChange={update} placeholder="—" />;
}

export function CrashCartSetup({
  cart,
  onStrength,
}: {
  cart: CrashCart;
  onStrength: (drugId: CprInterventionId, strength: number | undefined) => void;
}) {
  const { lang } = useI18n();
  const [open, setOpen] = useState(false);
  return (
    <GlassCard className="p-2">
      <button
        type="button"
        onClick={() => setOpen((isOpen) => !isOpen)}
        aria-expanded={open}
        className="flex min-h-[48px] w-full items-center justify-between gap-3 rounded-2xl px-3 text-start text-sm font-semibold text-ink"
      >
        {tr(CPR_TEXT.cartButton, lang)}
        <ChevronDownIcon size={18} className={`shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="flex flex-col gap-3 px-3 pb-3 pt-1">
          <p className="text-xs leading-relaxed text-muted">{tr(CPR_TEXT.cartIntro, lang)}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {CART_DRUGS.map((drug) => (
              <StrengthField
                key={drug.id}
                drugId={drug.id}
                label={`${tr(drug.name, lang)} — ${drug.cartUnit}`}
                saved={cart[drug.id]}
                onStrength={onStrength}
              />
            ))}
          </div>
        </div>
      )}
    </GlassCard>
  );
}
