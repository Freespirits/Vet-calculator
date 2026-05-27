/**
 * Safety Rules and Validation Layer
 *
 * Clinical safety guardrails for veterinary drug dosing.
 * These rules provide soft warnings (non-blocking) to help
 * clinicians catch potential errors.
 *
 * Dosing information based on Plumb's Veterinary Drug Handbook.
 */

import type {
  CalculationInput,
  CalculationWarning,
  DrugInfo,
  ValidationResult,
  ValidationError,
  Species,
  AdministrationRoute,
} from '../types';

/**
 * Maximum weight limits by species (kg)
 */
const MAX_WEIGHT_BY_SPECIES: Record<Species, number> = {
  dog: 100,
  cat: 15,
};

/**
 * Minimum practical weight for dosing (kg)
 */
const MIN_WEIGHT = 0.1;

/**
 * Validates all input fields before calculation
 */
export function validateInput(input: Partial<CalculationInput>): ValidationResult {
  const errors: ValidationError[] = [];

  if (input.weightKg === undefined || input.weightKg === null) {
    errors.push({
      field: 'weightKg',
      message: 'Weight is required',
      messageHe: 'משקל הוא שדה חובה',
    });
  } else if (input.weightKg <= 0) {
    errors.push({
      field: 'weightKg',
      message: 'Weight must be greater than zero',
      messageHe: 'המשקל חייב להיות גדול מאפס',
    });
  } else if (input.weightKg < MIN_WEIGHT) {
    errors.push({
      field: 'weightKg',
      message: `Weight seems too low (minimum ${MIN_WEIGHT} kg)`,
      messageHe: `המשקל נראה נמוך מדי (מינימום ${MIN_WEIGHT} ק"ג)`,
    });
  }

  if (input.dosePerKg === undefined || input.dosePerKg === null) {
    errors.push({
      field: 'dosePerKg',
      message: 'Dose per kg is required',
      messageHe: 'מינון לק"ג הוא שדה חובה',
    });
  } else if (input.dosePerKg <= 0) {
    errors.push({
      field: 'dosePerKg',
      message: 'Dose must be greater than zero',
      messageHe: 'המינון חייב להיות גדול מאפס',
    });
  }

  if (input.doseUnit !== 'mL/kg') {
    if (input.concentration === undefined || input.concentration === null) {
      errors.push({
        field: 'concentration',
        message: 'Drug concentration is required',
        messageHe: 'ריכוז התרופה הוא שדה חובה',
      });
    } else if (input.concentration <= 0) {
      errors.push({
        field: 'concentration',
        message: 'Concentration must be greater than zero',
        messageHe: 'הריכוז חייב להיות גדול מאפס',
      });
    }
  }

  if (!input.drugName || input.drugName.trim() === '') {
    errors.push({
      field: 'drugName',
      message: 'Drug name is required',
      messageHe: 'שם התרופה הוא שדה חובה',
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Generates species-specific warnings
 */
export function generateSpeciesWarnings(
  input: CalculationInput
): CalculationWarning[] {
  const warnings: CalculationWarning[] = [];
  const maxWeight = MAX_WEIGHT_BY_SPECIES[input.species];

  if (input.weightKg > maxWeight) {
    warnings.push({
      id: 'weight_exceeds_typical',
      severity: 'warning',
      message: `Weight exceeds typical maximum for ${input.species} (${maxWeight} kg)`,
      messageHe: `המשקל עולה על המקסימום האופייני ל${getSpeciesNameHe(input.species)} (${maxWeight} ק"ג)`,
    });
  }

  return warnings;
}

/**
 * Generates drug-specific warnings based on Plumb's dosing data
 */
export function generateDrugWarnings(
  input: CalculationInput,
  drugInfo: DrugInfo | null
): CalculationWarning[] {
  const warnings: CalculationWarning[] = [];

  if (!drugInfo) {
    return warnings;
  }

  // High-risk medication flag
  if (drugInfo.isHighRisk) {
    warnings.push({
      id: 'high_risk_drug',
      severity: 'danger',
      message: `${drugInfo.name} is a high-risk medication - verify dose carefully`,
      messageHe: `${drugInfo.nameHe} היא תרופה בסיכון גבוה - יש לאמת את המינון בקפידה`,
    });
  }

  // Controlled substance warning
  if (drugInfo.isControlled) {
    warnings.push({
      id: 'controlled_substance',
      severity: 'warning',
      message: `${drugInfo.name} is a controlled substance - document usage`,
      messageHe: `${drugInfo.nameHe} הוא חומר מפוקח - יש לתעד שימוש`,
    });
  }

  // Check dose against Plumb's therapeutic ranges
  const relevantDose = drugInfo.plumbsDosing.find(
    (d) => d.species === input.species && d.route === input.route
  );

  if (relevantDose) {
    if (input.dosePerKg < relevantDose.minDose) {
      warnings.push({
        id: 'dose_below_range',
        severity: 'warning',
        message: `Dose is below Plumb's range (${relevantDose.minDose}-${relevantDose.maxDose} ${relevantDose.unit})`,
        messageHe: `המינון נמוך מטווח Plumb's (${relevantDose.minDose}-${relevantDose.maxDose} ${relevantDose.unit})`,
      });
    } else if (input.dosePerKg > relevantDose.maxDose) {
      warnings.push({
        id: 'dose_above_range',
        severity: 'danger',
        message: `Dose exceeds Plumb's maximum (${relevantDose.maxDose} ${relevantDose.unit})`,
        messageHe: `המינון עולה על מקסימום Plumb's (${relevantDose.maxDose} ${relevantDose.unit})`,
      });
    }

    // Show Plumb's dosing notes if available
    if (relevantDose.notesHe) {
      warnings.push({
        id: 'plumbs_note',
        severity: 'info',
        message: relevantDose.notes || relevantDose.notesHe,
        messageHe: relevantDose.notesHe,
      });
    }

    // Show frequency if available
    if (relevantDose.frequency) {
      warnings.push({
        id: 'plumbs_frequency',
        severity: 'info',
        message: `Recommended frequency: ${relevantDose.frequency}`,
        messageHe: `תדירות מומלצת: ${relevantDose.frequency}`,
      });
    }
  }

  // Add any drug-specific warnings
  if (drugInfo.warningsHe) {
    drugInfo.warningsHe.forEach((warning, index) => {
      warnings.push({
        id: `drug_warning_${index}`,
        severity: 'warning',
        message: drugInfo.warnings?.[index] || warning,
        messageHe: warning,
      });
    });
  }

  return warnings;
}

/**
 * Generates route-specific warnings
 */
export function generateRouteWarnings(
  route: AdministrationRoute,
  volumeMl: number
): CalculationWarning[] {
  const warnings: CalculationWarning[] = [];

  if (route === 'SC' && volumeMl > 10) {
    warnings.push({
      id: 'sc_volume_high',
      severity: 'warning',
      message: 'SC injection volume is high - consider multiple injection sites',
      messageHe: 'נפח ההזרקה התת-עורית גבוה - יש לשקול מספר נקודות הזרקה',
    });
  }

  if (route === 'IM' && volumeMl > 5) {
    warnings.push({
      id: 'im_volume_high',
      severity: 'warning',
      message: 'IM injection volume is high - consider multiple injection sites',
      messageHe: 'נפח ההזרקה התוך-שרירית גבוה - יש לשקול מספר נקודות הזרקה',
    });
  }

  return warnings;
}

/**
 * Helper: Get Hebrew species name
 */
function getSpeciesNameHe(species: Species): string {
  const names: Record<Species, string> = {
    dog: 'כלב',
    cat: 'חתול',
  };
  return names[species];
}

/**
 * Combine all safety checks into one comprehensive check
 */
export function runAllSafetyChecks(
  input: CalculationInput,
  drugInfo: DrugInfo | null,
  volumeMl: number
): CalculationWarning[] {
  return [
    ...generateSpeciesWarnings(input),
    ...generateDrugWarnings(input, drugInfo),
    ...generateRouteWarnings(input.route, volumeMl),
  ];
}

/**
 * Medical disclaimer text
 */
export const MEDICAL_DISCLAIMER = {
  en: 'This calculator is a clinical decision support tool and does not replace professional veterinary judgment. Always verify calculations and consult drug references before administration.',
  he: 'מחשבון זה הוא כלי תמיכה קלינית ואינו מחליף שיקול דעת וטרינרי מקצועי. יש לאמת את החישובים ולעיין בהפניות תרופתיות לפני מתן התרופה.',
};
