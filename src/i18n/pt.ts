import type { TKey } from './he';

/** Portuguese dictionary. UI chrome only; clinical data falls back to English. */
export const pt: Record<TKey, string> = {
  // Brand
  'brand.name': 'Calculadora Veterinária',
  'brand.tagline': 'Calculadora veterinária clínica · Cães e gatos',

  // Header / controls
  'ctl.language': 'Idioma',
  'ctl.language.select': 'Selecionar idioma',
  'ctl.theme.toDark': 'Escuro',
  'ctl.theme.toLight': 'Claro',
  'ctl.theme.toggle': 'Alternar tema de cor',

  // Hero
  'hero.title': 'Calculadora Veterinária',
  'hero.subtitle':
    'Cálculos de dose e toxicidade para cães e gatos: mais de 130 faixas de dose de referência, 14 calculadoras de toxicidade com fontes e uma biblioteca fotográfica de plantas tóxicas. Grátis e funciona offline.',
  'hero.cta': 'Começar a calcular',
  'hero.scroll': 'Rolar',

  // Tool switcher
  'tab.dosage': 'Dose',
  'tab.toxins': 'Tóxicos',
  'tab.patient': 'Paciente',
  'tab.plants': 'Plantas',
  'tabs.aria': 'Escolher calculadora',

  // Patient session
  'patient.title': 'Sessão do paciente',
  'patient.subtitle': 'Calcule vários medicamentos para um paciente e exporte um único relatório.',
  'patient.new': 'Novo paciente',
  'patient.name': 'Nome do paciente',
  'patient.namePlaceholder': 'ex. Rex',
  'patient.start': 'Iniciar sessão',
  'patient.active': 'Paciente ativo',
  'patient.end': 'Encerrar sessão',
  'patient.meds': 'Medicamentos',
  'patient.medsCount': 'medicamentos adicionados',
  'patient.addMed': 'Adicionar à lista do paciente',
  'patient.addMedCta': 'Adicionar um medicamento',
  'patient.added': 'Adicionado à lista',
  'patient.noMeds': 'Nenhum medicamento adicionado — calcule uma dose e adicione.',
  'patient.report': 'Relatório de medicação',
  'patient.shareReport': 'Compartilhar relatório',
  'patient.copyReport': 'Copiar relatório',
  'patient.clearAll': 'Limpar tudo',
  'patient.remove': 'Remover',
  'patient.draw': 'Aspirar',

  // Plant library
  'plants.title': 'Biblioteca de plantas tóxicas',
  'plants.subtitle': 'Identifique plantas perigosas para cães e gatos, com fotos.',
  'plants.search': 'Pesquisar uma planta…',
  'plants.filter.all': 'Todas',
  'plants.filter.deadly': 'Mortal ☠',
  'plants.filter.severe': 'Grave',
  'plants.filter.cats': 'Apenas gatos',
  'plants.level.mild': 'Leve',
  'plants.level.moderate': 'Moderado',
  'plants.level.severe': 'Grave',
  'plants.level.deadly': 'Mortal',
  'plants.toxin': 'Toxina',
  'plants.symptoms': 'Sintomas',
  'plants.action': 'O que fazer',
  'plants.affected': 'Em risco',
  'plants.noResults': 'Nenhuma planta correspondente.',
  'plants.catsOnly': 'Gatos',
  'plants.both': 'Cães e gatos',
  'plants.photoCredit': 'Créditos das fotos: Wikimedia Commons',
  'treat.title': 'Tratar agora — doses veterinárias',
  'treat.emesis': 'Induzir emese',
  'treat.charcoal': 'Carvão ativado',
  'treat.monitoring': 'Monitorização',
  'treat.status.indicated': 'Indicado',
  'treat.status.caution': 'Cautela',
  'treat.status.no': 'Não recomendado',
  'treat.disclaimer': 'Doses para profissionais veterinários — verifique a fonte citada antes de administrar.',

  // Common
  'common.calculate': 'Calcular',
  'common.reset': 'Redefinir',
  'common.copy': 'Copiar',
  'common.copied': 'Copiado!',
  'common.share': 'Compartilhar',
  'common.close': 'Fechar',
  'common.sources': 'Fontes médicas',
  'common.optional': 'opcional',
  'common.select': 'Selecionar',
  'common.search': 'Pesquisar',
  'common.required': 'obrigatório',
  'common.back': 'Voltar',
  'common.details': 'Detalhes',
  'common.example': 'ex.',
  'common.unit': 'Unidade',

  // Species
  'species.label': 'Espécie',
  'species.dog': 'Cão',
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
  'unit.perDay': 'por dia',

  // Dosage calculator
  'dose.title': 'Calculadora de dose de medicamentos',
  'dose.subtitle': 'Volume a aspirar a partir do peso, dose e concentração.',
  'dose.drug': 'Nome do medicamento',
  'dose.drugPlaceholder': 'Pesquise ou digite um medicamento…',
  'dose.perKg': 'Dose por kg',
  'dose.doseUnit': 'Unidade de dose',
  'dose.concentration': 'Concentração',
  'dose.concUnit': 'Unidade de conc.',
  'dose.route': 'Via',
  'dose.rounding': 'Arredondamento',
  'dose.frequency': 'Frequência',
  'dose.freqPlaceholder': 'ex. a cada 8 h',
  'dose.duration': 'Duração',
  'dose.durationPlaceholder': 'ex. 7 dias',
  'dose.volumeToDraw': 'Volume a aspirar',
  'dose.totalDose': 'Dose total',
  'dose.therapeuticRange': 'Faixa de referência Plumb\'s',
  'dose.belowRange': 'Abaixo da faixa',
  'dose.inRange': 'Na faixa',
  'dose.aboveRange': 'Acima da faixa',
  'dose.plumbsRef': 'Dose de referência Plumb\'s',
  'dose.plumbsRefNone': 'Sem dose de referência Plumb\'s para esta espécie',
  'dose.plumbsRefHint': 'Apenas para referência — verifique antes de dosar, sob sua responsabilidade profissional.',
  'dose.vetOnly':
    'Apenas para uso veterinário licenciado. A responsabilidade clínica é do veterinário responsável. As doses de referência Plumb\'s são um guia e devem ser verificadas de forma independente antes da administração — uso sob sua responsabilidade profissional.',
  'dose.noRange': 'Sem faixa de referência para esta combinação',
  'dose.breakdown': 'Detalhamento do cálculo',
  'dose.bodyWeight': 'Peso corporal',
  'dose.doseGiven': 'Dose administrada',
  'dose.rawVolume': 'Volume antes do arredondamento',
  'dose.roundedVolume': 'Volume arredondado',
  'dose.warnings': 'Alertas',
  'dose.noWarnings': 'Sem alertas',
  'dose.enterToCalc': 'Insira peso, dose e concentração para calcular.',

  // Routes
  'route.IV': 'Intravenosa (IV)',
  'route.IM': 'Intramuscular (IM)',
  'route.SC': 'Subcutânea (SC)',
  'route.PO': 'Oral (VO)',

  // Toxicity suite
  'tox.title': 'Calculadoras de toxicidade',
  'tox.subtitle': 'Estimativa de risco a partir do peso e da quantidade ingerida. Uma ferramenta de apoio — não substitui o veterinário.',
  'tox.choose': 'Escolha um tóxico',
  'tox.amount': 'Quantidade ingerida',
  'tox.source': 'Tipo / fonte',
  'tox.riskLevel': 'Nível de risco',
  'tox.dosePerKg': 'Dose estimada',
  'tox.expectedSigns': 'Sinais clínicos esperados',
  'tox.action': 'Ação recomendada',
  'tox.decon': 'Janela de descontaminação',
  'tox.context': 'Contexto clínico',
  'tox.notForSpecies': 'Este cálculo não se aplica a esta espécie.',
  'tox.idiosyncratic': 'Toxicidade idiossincrática — sem limiar seguro',

  // Risk bands
  'risk.minimal': 'Mínimo',
  'risk.mild': 'Leve',
  'risk.moderate': 'Moderado',
  'risk.severe': 'Grave',
  'risk.critical': 'Crítico',
  'risk.emergency': 'Emergência',

  // Emergency
  'emergency.title': 'Uma emergência?',
  'emergency.text':
    'Se suspeitar de envenenamento, ligue imediatamente para a clínica mais próxima. Não espere o surgimento de sinais — e ligue antes para confirmar horário e disponibilidade.',
  'emergency.network': 'Rede de clínicas TeddyVets',
  'emergency.allClinics': 'Todas as clínicas TeddyVets',
  'emergency.note': 'As clínicas funcionam dentro do horário indicado. Fora desse horário, ou em casos com risco de vida, ligue antes para verificar a disponibilidade.',
  'emergency.callVet': 'Ligue para o seu veterinário',
  'emergency.generic.title': 'Uma emergência?',
  'emergency.generic.text':
    'Se suspeitar de envenenamento, contate imediatamente a clínica veterinária ou o serviço de urgência mais próximo. Não espere o surgimento de sinais — e ligue antes para confirmar a disponibilidade.',
  'emergency.submit.title': 'Administra uma clínica veterinária de urgência?',
  'emergency.submit.text':
    'Estamos ampliando nosso diretório de clínicas de urgência para a sua região. Para listar a sua clínica, envie-nos o nome, a área, o telefone e o horário de funcionamento.',
  'emergency.submit.cta': 'Envie-nos um e-mail',

  // Disclaimer / footer
  'disclaimer.title': 'Aviso legal',
  'disclaimer.text':
    'Esta calculadora é uma ferramenta de apoio à decisão clínica e não substitui o julgamento veterinário profissional nem um centro de controle de envenenamentos. Verifique cada cálculo com referências farmacológicas antes do tratamento. Tóxicos idiossincráticos (uvas, lírios) nunca mostram um resultado "seguro".',
  'footer.text': 'Assistentes para assistentes · Todos os direitos reservados',
  'footer.madeWith': 'Feito com rigor clínico',
  'footer.partner': 'Parceiro clínico',

  // About / FAQ — server-rendered SEO content
  'about.title': 'Sobre esta calculadora veterinária',
  'about.lead':
    'O Vet-Holim é uma ferramenta gratuita de apoio à decisão clínica para médicos-veterinários, enfermeiros e técnicos que tratam cães e gatos. Reúne quatro coisas numa só página: uma calculadora de dose que devolve o volume a aspirar, um conjunto de calculadoras de toxicidade com fontes, uma biblioteca fotográfica de plantas tóxicas e uma sessão de paciente com vários medicamentos que pode exportar como um único relatório. Tudo corre no seu navegador — sem conta, sem envio e sem que os dados do paciente saiam do dispositivo.',
  'about.dosage.title': 'Calculadora de dose',
  'about.dosage.body':
    "Indique espécie, peso corporal, dose por quilograma e concentração do frasco, e a calculadora devolve o volume exato a aspirar, arredondado à precisão de seringa escolhida (0,01, 0,05 ou 0,1 ml). Cobre mais de 130 fármacos com faixas de referência do Plumb's Veterinary Drug Handbook, assinala doses fora da faixa publicada e aceita mg/kg, mcg/kg, UI/kg e ml/kg, além das vias IV, IM, SC e PO.",
  'about.toxins.title': 'Calculadoras de toxicidade',
  'about.toxins.body':
    'Catorze ferramentas de toxicidade com fontes estimam o risco a partir do peso corporal e da quantidade ingerida: chocolate e outras metilxantinas, uvas e passas, xilitol, cebola e alho, nozes de macadâmia, ibuprofeno, paracetamol, permetrina, lírios, rodenticidas, etilenoglicol, canábis, álcool e cafeína. Cada resultado indica um nível de risco, os sinais clínicos esperados, a janela de descontaminação e uma ação recomendada. Tóxicos idiossincráticos nunca devolvem um veredicto seguro.',
  'about.plants.title': 'Biblioteca de plantas tóxicas',
  'about.plants.body':
    'Uma biblioteca pesquisável e ilustrada de plantas de interior e de jardim perigosas para cães e gatos, filtrável por gravidade, do ligeiro ao mortal. Cada ficha indica o princípio tóxico, as partes da planta envolvidas, os sinais clínicos esperados e a urgência com que o animal deve ser observado.',
  'about.patient.title': 'Sessão de paciente',
  'about.patient.body':
    'Um caso com vários medicamentos? Inicie uma sessão de paciente, acrescente cada dose calculada à lista e depois copie ou partilhe um relatório de medicação único com nomes, doses, volumes a aspirar, vias e frequências — útil para a passagem de turno, folhas de tratamento e instruções ao tutor.',
  'about.who.title': 'A quem se destina',
  'about.who.body':
    'Feita para profissionais veterinários licenciados e estudantes. A responsabilidade clínica é sempre do médico-veterinário assistente: verifique cada valor nas suas próprias referências antes de administrar. Tutores que suspeitem de intoxicação devem contactar de imediato uma clínica veterinária ou serviço de urgência, em vez de agir com base num cálculo.',
  'faq.title': 'Perguntas frequentes',
  'faq.q1': 'A calculadora veterinária é gratuita?',
  'faq.a1':
    'Sim. Todas as calculadoras, a biblioteca de plantas e a sessão de paciente são de uso gratuito, sem conta e sem registo.',
  'faq.q2': 'Que animais abrange?',
  'faq.a2':
    'Cães e gatos. As faixas de dose, os limiares de toxicidade e os sinais clínicos diferem entre as duas espécies, por isso escolha primeiro a espécie — alguns cálculos de toxicidade aplicam-se apenas a uma delas e indicam-no.',
  'faq.q3': 'De onde vêm as faixas de dose?',
  'faq.a3':
    "As faixas de referência vêm do Plumb's Veterinary Drug Handbook e os limiares de toxicidade de fontes publicadas de toxicologia veterinária citadas dentro de cada ferramenta. São apenas orientação e devem ser verificadas de forma independente antes do tratamento.",
  'faq.q4': 'Posso usar offline?',
  'faq.a4':
    'Sim. O site é uma aplicação web progressiva instalável: adicione-o uma vez ao ecrã inicial e as calculadoras continuam a funcionar sem ligação à rede.',
  'faq.q5': 'Os dados do paciente ficam guardados algures?',
  'faq.a5':
    'Não. Todos os cálculos correm localmente no seu navegador e nada é enviado para um servidor. A sessão de paciente existe apenas no separador atual.',
  'faq.q6': 'O que fazer perante suspeita de intoxicação?',
  'faq.a6':
    'Contacte imediatamente o seu médico-veterinário ou a urgência mais próxima, antes de surgirem sinais. Use a calculadora de toxicidade para estimar a exposição e sustentar essa conversa — nunca para decidir não procurar assistência.',
};
