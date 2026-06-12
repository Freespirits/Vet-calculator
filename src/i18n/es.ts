import type { TKey } from './he';

/** Spanish dictionary. UI chrome only; clinical data falls back to English. */
export const es: Record<TKey, string> = {
  // Brand
  'brand.name': 'Calculadora Veterinaria',
  'brand.tagline': 'Calculadora veterinaria clínica · Perros y gatos',

  // Header / controls
  'ctl.language': 'Idioma',
  'ctl.language.select': 'Seleccionar idioma',
  'ctl.theme.toDark': 'Oscuro',
  'ctl.theme.toLight': 'Claro',
  'ctl.theme.toggle': 'Cambiar tema de color',

  // Hero
  'hero.title': 'Calculadora Veterinaria',
  'hero.subtitle': 'Dosis de fármacos y cálculos de toxicidad: precisos, rápidos, en la palma de tu mano.',
  'hero.cta': 'Empezar a calcular',
  'hero.scroll': 'Desplázate',

  // Tool switcher
  'tab.dosage': 'Dosis',
  'tab.toxins': 'Tóxicos',
  'tab.patient': 'Paciente',
  'tab.plants': 'Plantas',
  'tabs.aria': 'Elegir calculadora',

  // Patient session
  'patient.title': 'Sesión del paciente',
  'patient.subtitle': 'Calcula varios medicamentos para un paciente y exporta un único informe.',
  'patient.new': 'Nuevo paciente',
  'patient.name': 'Nombre del paciente',
  'patient.namePlaceholder': 'p. ej. Rex',
  'patient.start': 'Iniciar sesión',
  'patient.active': 'Paciente activo',
  'patient.end': 'Finalizar sesión',
  'patient.meds': 'Medicamentos',
  'patient.medsCount': 'medicamentos añadidos',
  'patient.addMed': 'Añadir a la lista del paciente',
  'patient.addMedCta': 'Añadir un medicamento',
  'patient.added': 'Añadido a la lista',
  'patient.noMeds': 'Aún no hay medicamentos: calcula una dosis y añádela.',
  'patient.report': 'Informe de medicación',
  'patient.shareReport': 'Compartir informe',
  'patient.copyReport': 'Copiar informe',
  'patient.clearAll': 'Borrar todo',
  'patient.remove': 'Eliminar',
  'patient.draw': 'Extraer',

  // Plant library
  'plants.title': 'Biblioteca de plantas tóxicas',
  'plants.subtitle': 'Identifica plantas peligrosas para perros y gatos, con fotos.',
  'plants.search': 'Buscar una planta…',
  'plants.filter.all': 'Todas',
  'plants.filter.deadly': 'Mortal ☠',
  'plants.filter.severe': 'Grave',
  'plants.filter.cats': 'Solo gatos',
  'plants.level.mild': 'Leve',
  'plants.level.moderate': 'Moderado',
  'plants.level.severe': 'Grave',
  'plants.level.deadly': 'Mortal',
  'plants.toxin': 'Toxina',
  'plants.symptoms': 'Síntomas',
  'plants.action': 'Qué hacer',
  'plants.affected': 'En riesgo',
  'plants.noResults': 'No hay plantas coincidentes.',
  'plants.catsOnly': 'Gatos',
  'plants.both': 'Perros y gatos',
  'plants.photoCredit': 'Créditos de fotos: Wikimedia Commons',

  // Common
  'common.calculate': 'Calcular',
  'common.reset': 'Restablecer',
  'common.copy': 'Copiar',
  'common.copied': '¡Copiado!',
  'common.share': 'Compartir',
  'common.close': 'Cerrar',
  'common.sources': 'Fuentes médicas',
  'common.optional': 'opcional',
  'common.select': 'Seleccionar',
  'common.search': 'Buscar',
  'common.required': 'obligatorio',
  'common.back': 'Atrás',
  'common.details': 'Detalles',
  'common.example': 'p. ej.',
  'common.unit': 'Unidad',

  // Species
  'species.label': 'Especie',
  'species.dog': 'Perro',
  'species.cat': 'Gato',

  // Units / fields
  'field.weight': 'Peso corporal',
  'unit.kg': 'kg',
  'unit.g': 'g',
  'unit.oz': 'oz',
  'unit.mg': 'mg',
  'unit.ml': 'ml',
  'unit.mgkg': 'mg/kg',
  'unit.gkg': 'g/kg',
  'unit.tablets': 'comprimidos',
  'unit.pieces': 'unidades',
  'unit.perDay': 'al día',

  // Dosage calculator
  'dose.title': 'Calculadora de dosis de fármacos',
  'dose.subtitle': 'Volumen a extraer según peso, dosis y concentración.',
  'dose.drug': 'Nombre del fármaco',
  'dose.drugPlaceholder': 'Busca o escribe un fármaco…',
  'dose.perKg': 'Dosis por kg',
  'dose.doseUnit': 'Unidad de dosis',
  'dose.concentration': 'Concentración',
  'dose.concUnit': 'Unidad de conc.',
  'dose.route': 'Vía',
  'dose.rounding': 'Redondeo',
  'dose.frequency': 'Frecuencia',
  'dose.freqPlaceholder': 'p. ej. cada 8 h',
  'dose.duration': 'Duración',
  'dose.durationPlaceholder': 'p. ej. 7 días',
  'dose.volumeToDraw': 'Volumen a extraer',
  'dose.totalDose': 'Dosis total',
  'dose.therapeuticRange': 'Rango de referencia de Plumb\'s',
  'dose.belowRange': 'Por debajo del rango',
  'dose.inRange': 'En rango',
  'dose.aboveRange': 'Por encima del rango',
  'dose.plumbsRef': 'Dosis de referencia de Plumb\'s',
  'dose.plumbsRefNone': 'No hay dosis de referencia de Plumb\'s para esta especie',
  'dose.plumbsRefHint': 'Solo de referencia: verifica antes de dosificar, bajo tu responsabilidad profesional.',
  'dose.vetOnly':
    'Solo para uso veterinario autorizado. La responsabilidad clínica recae en el veterinario tratante. Las dosis de referencia de Plumb\'s son orientativas y deben verificarse de forma independiente antes de su administración — uso bajo tu responsabilidad profesional.',
  'dose.noRange': 'No hay rango de referencia para esta combinación',
  'dose.breakdown': 'Desglose del cálculo',
  'dose.bodyWeight': 'Peso corporal',
  'dose.doseGiven': 'Dosis administrada',
  'dose.rawVolume': 'Volumen sin redondear',
  'dose.roundedVolume': 'Volumen redondeado',
  'dose.warnings': 'Advertencias',
  'dose.noWarnings': 'Sin advertencias',
  'dose.enterToCalc': 'Introduce peso, dosis y concentración para calcular.',

  // Routes
  'route.IV': 'Intravenosa (IV)',
  'route.IM': 'Intramuscular (IM)',
  'route.SC': 'Subcutánea (SC)',
  'route.PO': 'Oral (VO)',

  // Toxicity suite
  'tox.title': 'Calculadoras de toxicidad',
  'tox.subtitle': 'Estimación del riesgo según peso y cantidad ingerida. Una herramienta de apoyo, no un sustituto del veterinario.',
  'tox.choose': 'Elige un tóxico',
  'tox.amount': 'Cantidad ingerida',
  'tox.source': 'Tipo / fuente',
  'tox.riskLevel': 'Nivel de riesgo',
  'tox.dosePerKg': 'Dosis estimada',
  'tox.expectedSigns': 'Signos clínicos esperados',
  'tox.action': 'Acción recomendada',
  'tox.decon': 'Ventana de descontaminación',
  'tox.context': 'Contexto clínico',
  'tox.notForSpecies': 'Este cálculo no se aplica a esta especie.',
  'tox.idiosyncratic': 'Toxicidad idiosincrásica: sin umbral seguro',

  // Risk bands
  'risk.minimal': 'Mínimo',
  'risk.mild': 'Leve',
  'risk.moderate': 'Moderado',
  'risk.severe': 'Grave',
  'risk.critical': 'Crítico',
  'risk.emergency': 'Emergencia',

  // Emergency
  'emergency.title': '¿Una emergencia?',
  'emergency.text':
    'Si sospechas envenenamiento, llama de inmediato a tu clínica más cercana. No esperes a que aparezcan signos y llama antes para confirmar horario y disponibilidad.',
  'emergency.network': 'Red de clínicas TeddyVets',
  'emergency.allClinics': 'Todas las clínicas TeddyVets',
  'emergency.note': 'Las clínicas funcionan dentro del horario indicado. Fuera de ese horario, o en un caso que ponga en peligro la vida, llama antes para comprobar la disponibilidad.',
  'emergency.callVet': 'Llama a tu veterinario',
  'emergency.generic.title': '¿Una emergencia?',
  'emergency.generic.text':
    'Si sospechas envenenamiento, contacta de inmediato con tu clínica veterinaria o servicio de urgencias más cercano. No esperes a que aparezcan signos y llama antes para confirmar disponibilidad.',
  'emergency.submit.title': '¿Diriges una clínica veterinaria de urgencias?',
  'emergency.submit.text':
    'Estamos ampliando nuestro directorio de clínicas de urgencias para tu región. Para que aparezca tu clínica, envíanos su nombre, zona, teléfono y horario.',
  'emergency.submit.cta': 'Escríbenos',

  // Disclaimer / footer
  'disclaimer.title': 'Aviso legal',
  'disclaimer.text':
    'Esta calculadora es una herramienta de apoyo a la decisión clínica y no sustituye el juicio veterinario profesional ni a un centro de toxicología. Verifica cada cálculo con referencias farmacológicas antes del tratamiento. Los tóxicos idiosincrásicos (uvas, lirios) nunca muestran un resultado "seguro".',
  'footer.text': 'Asistentes para asistentes · Todos los derechos reservados',
  'footer.madeWith': 'Hecho con rigor clínico',
  'footer.partner': 'Socio clínico',
};
