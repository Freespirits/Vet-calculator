import type { TKey } from './he';

/** Russian dictionary. UI chrome only; clinical data falls back to English. */
export const ru: Record<TKey, string> = {
  // Brand
  'brand.name': 'Ветеринарный калькулятор',
  'brand.tagline': 'Клинический ветеринарный калькулятор · Собаки и кошки',

  // Header / controls
  'ctl.language': 'Язык',
  'ctl.language.select': 'Выбрать язык',
  'ctl.theme.toDark': 'Тёмная',
  'ctl.theme.toLight': 'Светлая',
  'ctl.theme.toggle': 'Переключить цветовую тему',

  // Hero
  'hero.title': 'Ветеринарный калькулятор',
  'hero.subtitle': 'Расчёт доз препаратов и токсичности — точно, быстро, у вас в руке.',
  'hero.cta': 'Начать расчёт',
  'hero.scroll': 'Прокрутить',

  // Tool switcher
  'tab.dosage': 'Доза',
  'tab.toxins': 'Токсины',
  'tab.patient': 'Пациент',
  'tab.plants': 'Растения',
  'tabs.aria': 'Выбрать калькулятор',

  // Patient session
  'patient.title': 'Сеанс пациента',
  'patient.subtitle': 'Рассчитайте несколько препаратов для одного пациента и экспортируйте единый отчёт.',
  'patient.new': 'Новый пациент',
  'patient.name': 'Имя пациента',
  'patient.namePlaceholder': 'напр. Рекс',
  'patient.start': 'Начать сеанс',
  'patient.active': 'Активный пациент',
  'patient.end': 'Завершить сеанс',
  'patient.meds': 'Препараты',
  'patient.medsCount': 'препаратов добавлено',
  'patient.addMed': 'Добавить в список пациента',
  'patient.addMedCta': 'Добавить препарат',
  'patient.added': 'Добавлено в список',
  'patient.noMeds': 'Препараты пока не добавлены — рассчитайте дозу и добавьте.',
  'patient.report': 'Отчёт по препаратам',
  'patient.shareReport': 'Поделиться отчётом',
  'patient.copyReport': 'Копировать отчёт',
  'patient.clearAll': 'Очистить всё',
  'patient.remove': 'Удалить',
  'patient.draw': 'Набрать',

  // Plant library
  'plants.title': 'Библиотека ядовитых растений',
  'plants.subtitle': 'Определяйте опасные для собак и кошек растения, с фотографиями.',
  'plants.search': 'Поиск растения…',
  'plants.filter.all': 'Все',
  'plants.filter.deadly': 'Смертельно ☠',
  'plants.filter.severe': 'Тяжёлая',
  'plants.filter.cats': 'Только кошки',
  'plants.level.mild': 'Лёгкая',
  'plants.level.moderate': 'Умеренная',
  'plants.level.severe': 'Тяжёлая',
  'plants.level.deadly': 'Смертельная',
  'plants.toxin': 'Токсин',
  'plants.symptoms': 'Симптомы',
  'plants.action': 'Что делать',
  'plants.affected': 'В группе риска',
  'plants.noResults': 'Подходящих растений нет.',
  'plants.catsOnly': 'Кошки',
  'plants.both': 'Собаки и кошки',
  'plants.photoCredit': 'Фото: Wikimedia Commons',

  // Common
  'common.calculate': 'Рассчитать',
  'common.reset': 'Сбросить',
  'common.copy': 'Копировать',
  'common.copied': 'Скопировано!',
  'common.share': 'Поделиться',
  'common.close': 'Закрыть',
  'common.sources': 'Медицинские источники',
  'common.optional': 'необязательно',
  'common.select': 'Выбрать',
  'common.search': 'Поиск',
  'common.required': 'обязательно',
  'common.back': 'Назад',
  'common.details': 'Подробности',
  'common.example': 'напр.',
  'common.unit': 'Единица',

  // Species
  'species.label': 'Вид',
  'species.dog': 'Собака',
  'species.cat': 'Кошка',

  // Units / fields
  'field.weight': 'Масса тела',
  'unit.kg': 'кг',
  'unit.g': 'г',
  'unit.oz': 'унц.',
  'unit.mg': 'мг',
  'unit.ml': 'мл',
  'unit.mgkg': 'мг/кг',
  'unit.gkg': 'г/кг',
  'unit.tablets': 'таблеток',
  'unit.pieces': 'шт.',
  'unit.perDay': 'в день',

  // Dosage calculator
  'dose.title': 'Калькулятор дозы препарата',
  'dose.subtitle': 'Объём для набора по массе, дозе и концентрации.',
  'dose.drug': 'Название препарата',
  'dose.drugPlaceholder': 'Найдите или введите препарат…',
  'dose.perKg': 'Доза на кг',
  'dose.doseUnit': 'Единица дозы',
  'dose.concentration': 'Концентрация',
  'dose.concUnit': 'Ед. концентрации',
  'dose.route': 'Путь введения',
  'dose.rounding': 'Округление',
  'dose.frequency': 'Частота',
  'dose.freqPlaceholder': 'напр. каждые 8 ч',
  'dose.duration': 'Длительность',
  'dose.durationPlaceholder': 'напр. 7 дней',
  'dose.volumeToDraw': 'Объём для набора',
  'dose.totalDose': 'Общая доза',
  'dose.therapeuticRange': 'Референсный диапазон Plumb\'s',
  'dose.belowRange': 'Ниже диапазона',
  'dose.inRange': 'В диапазоне',
  'dose.aboveRange': 'Выше диапазона',
  'dose.plumbsRef': 'Референсная доза Plumb\'s',
  'dose.plumbsRefNone': 'Нет референсной дозы Plumb\'s для этого вида',
  'dose.plumbsRefHint': 'Только для справки — проверьте перед дозированием под свою профессиональную ответственность.',
  'dose.vetOnly':
    'Только для лицензированного ветеринарного применения. Клиническая ответственность лежит на лечащем ветеринаре. Референсные дозы Plumb\'s носят ориентировочный характер и должны быть независимо проверены перед введением — применение под вашу профессиональную ответственность.',
  'dose.noRange': 'Нет референсного диапазона для этой комбинации',
  'dose.breakdown': 'Детали расчёта',
  'dose.bodyWeight': 'Масса тела',
  'dose.doseGiven': 'Введённая доза',
  'dose.rawVolume': 'Объём до округления',
  'dose.roundedVolume': 'Округлённый объём',
  'dose.warnings': 'Предупреждения',
  'dose.noWarnings': 'Предупреждений нет',
  'dose.enterToCalc': 'Введите массу, дозу и концентрацию для расчёта.',

  // Routes
  'route.IV': 'Внутривенно (IV)',
  'route.IM': 'Внутримышечно (IM)',
  'route.SC': 'Подкожно (SC)',
  'route.PO': 'Перорально (PO)',

  // Toxicity suite
  'tox.title': 'Калькуляторы токсичности',
  'tox.subtitle': 'Оценка риска по массе и съеденному количеству. Вспомогательный инструмент — не замена ветеринару.',
  'tox.choose': 'Выберите токсин',
  'tox.amount': 'Съеденное количество',
  'tox.source': 'Тип / источник',
  'tox.riskLevel': 'Уровень риска',
  'tox.dosePerKg': 'Расчётная доза',
  'tox.expectedSigns': 'Ожидаемые клинические признаки',
  'tox.action': 'Рекомендуемые действия',
  'tox.decon': 'Окно деконтаминации',
  'tox.context': 'Клинический контекст',
  'tox.notForSpecies': 'Этот расчёт неприменим к данному виду.',
  'tox.idiosyncratic': 'Идиосинкразическая токсичность — безопасного порога нет',

  // Risk bands
  'risk.minimal': 'Минимальный',
  'risk.mild': 'Лёгкий',
  'risk.moderate': 'Умеренный',
  'risk.severe': 'Тяжёлый',
  'risk.critical': 'Критический',
  'risk.emergency': 'Неотложный',

  // Emergency
  'emergency.title': 'Чрезвычайная ситуация?',
  'emergency.text':
    'При подозрении на отравление немедленно позвоните в ближайшую клинику. Не ждите появления признаков — и позвоните заранее, чтобы уточнить часы работы и доступность.',
  'emergency.network': 'Сеть клиник TeddyVets',
  'emergency.allClinics': 'Все клиники TeddyVets',
  'emergency.note': 'Клиники работают в указанные часы. Вне этих часов или при угрозе жизни звоните заранее, чтобы уточнить доступность.',
  'emergency.callVet': 'Позвоните своему ветеринару',
  'emergency.generic.title': 'Чрезвычайная ситуация?',
  'emergency.generic.text':
    'При подозрении на отравление немедленно свяжитесь с ближайшей ветеринарной клиникой или службой неотложной помощи. Не ждите появления признаков — и позвоните заранее, чтобы уточнить доступность.',
  'emergency.submit.title': 'Управляете ветеринарной клиникой неотложной помощи?',
  'emergency.submit.text':
    'Мы расширяем каталог клиник неотложной помощи для вашего региона. Чтобы добавить вашу клинику, напишите нам название, район, телефон и часы работы.',
  'emergency.submit.cta': 'Напишите нам',

  // Disclaimer / footer
  'disclaimer.title': 'Отказ от ответственности',
  'disclaimer.text':
    'Этот калькулятор — инструмент поддержки клинических решений, он не заменяет профессионального ветеринарного суждения или токсикологического центра. Проверяйте каждый расчёт по фармакологическим справочникам перед лечением. Идиосинкразические токсины (виноград, лилии) никогда не показывают «безопасный» результат.',
  'footer.text': 'Ассистенты для ассистентов · Все права защищены',
  'footer.madeWith': 'Создано с клинической тщательностью',
  'footer.partner': 'Клинический партнёр',
};
