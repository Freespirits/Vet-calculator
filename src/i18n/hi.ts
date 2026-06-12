import type { TKey } from './he';

/** Hindi dictionary. UI chrome only; clinical data falls back to English. */
export const hi: Record<TKey, string> = {
  // Brand
  'brand.name': 'पशु चिकित्सा कैलकुलेटर',
  'brand.tagline': 'क्लिनिकल पशु चिकित्सा कैलकुलेटर · कुत्ते और बिल्लियाँ',

  // Header / controls
  'ctl.language': 'भाषा',
  'ctl.language.select': 'भाषा चुनें',
  'ctl.theme.toDark': 'डार्क',
  'ctl.theme.toLight': 'लाइट',
  'ctl.theme.toggle': 'रंग थीम बदलें',

  // Hero
  'hero.title': 'पशु चिकित्सा कैलकुलेटर',
  'hero.subtitle': 'दवा की खुराक और विषाक्तता की गणना — सटीक, तेज़, आपकी हथेली में।',
  'hero.cta': 'गणना शुरू करें',
  'hero.scroll': 'स्क्रॉल करें',

  // Tool switcher
  'tab.dosage': 'खुराक',
  'tab.toxins': 'विष',
  'tab.patient': 'रोगी',
  'tab.plants': 'पौधे',
  'tabs.aria': 'कैलकुलेटर चुनें',

  // Patient session
  'patient.title': 'रोगी सत्र',
  'patient.subtitle': 'एक रोगी के लिए कई दवाओं की गणना करें, फिर एक ही रिपोर्ट निर्यात करें।',
  'patient.new': 'नया रोगी',
  'patient.name': 'रोगी का नाम',
  'patient.namePlaceholder': 'जैसे रेक्स',
  'patient.start': 'सत्र शुरू करें',
  'patient.active': 'सक्रिय रोगी',
  'patient.end': 'सत्र समाप्त करें',
  'patient.meds': 'दवाएँ',
  'patient.medsCount': 'दवाएँ जोड़ी गईं',
  'patient.addMed': 'रोगी की सूची में जोड़ें',
  'patient.addMedCta': 'एक दवा जोड़ें',
  'patient.added': 'सूची में जोड़ा गया',
  'patient.noMeds': 'अभी तक कोई दवा नहीं जोड़ी गई — खुराक की गणना करें और जोड़ें।',
  'patient.report': 'दवा रिपोर्ट',
  'patient.shareReport': 'रिपोर्ट साझा करें',
  'patient.copyReport': 'रिपोर्ट कॉपी करें',
  'patient.clearAll': 'सब हटाएँ',
  'patient.remove': 'हटाएँ',
  'patient.draw': 'खींचें',

  // Plant library
  'plants.title': 'विषैले पौधों की लाइब्रेरी',
  'plants.subtitle': 'कुत्तों और बिल्लियों के लिए खतरनाक पौधों को फ़ोटो सहित पहचानें।',
  'plants.search': 'पौधा खोजें…',
  'plants.filter.all': 'सभी',
  'plants.filter.deadly': 'घातक ☠',
  'plants.filter.severe': 'गंभीर',
  'plants.filter.cats': 'केवल बिल्लियाँ',
  'plants.level.mild': 'हल्का',
  'plants.level.moderate': 'मध्यम',
  'plants.level.severe': 'गंभीर',
  'plants.level.deadly': 'घातक',
  'plants.toxin': 'विष',
  'plants.symptoms': 'लक्षण',
  'plants.action': 'क्या करें',
  'plants.affected': 'जोखिम में',
  'plants.noResults': 'कोई मिलता-जुलता पौधा नहीं।',
  'plants.catsOnly': 'बिल्लियाँ',
  'plants.both': 'कुत्ते और बिल्लियाँ',
  'plants.photoCredit': 'फ़ोटो श्रेय: विकिमीडिया कॉमन्स',

  // Common
  'common.calculate': 'गणना करें',
  'common.reset': 'रीसेट करें',
  'common.copy': 'कॉपी करें',
  'common.copied': 'कॉपी हो गया!',
  'common.share': 'साझा करें',
  'common.close': 'बंद करें',
  'common.sources': 'चिकित्सा स्रोत',
  'common.optional': 'वैकल्पिक',
  'common.select': 'चुनें',
  'common.search': 'खोजें',
  'common.required': 'आवश्यक',
  'common.back': 'वापस',
  'common.details': 'विवरण',
  'common.example': 'जैसे',
  'common.unit': 'इकाई',

  // Species
  'species.label': 'प्रजाति',
  'species.dog': 'कुत्ता',
  'species.cat': 'बिल्ली',

  // Units / fields
  'field.weight': 'शारीरिक वज़न',
  'unit.kg': 'कि.ग्रा.',
  'unit.g': 'ग्रा.',
  'unit.oz': 'औंस',
  'unit.mg': 'मि.ग्रा.',
  'unit.ml': 'मि.ली.',
  'unit.mgkg': 'मि.ग्रा./कि.ग्रा.',
  'unit.gkg': 'ग्रा./कि.ग्रा.',
  'unit.tablets': 'गोलियाँ',
  'unit.pieces': 'टुकड़े',
  'unit.perDay': 'प्रतिदिन',

  // Dosage calculator
  'dose.title': 'दवा खुराक कैलकुलेटर',
  'dose.subtitle': 'वज़न, खुराक और सांद्रता से खींचने योग्य मात्रा।',
  'dose.drug': 'दवा का नाम',
  'dose.drugPlaceholder': 'दवा खोजें या टाइप करें…',
  'dose.perKg': 'प्रति कि.ग्रा. खुराक',
  'dose.doseUnit': 'खुराक इकाई',
  'dose.concentration': 'सांद्रता',
  'dose.concUnit': 'सांद्रता इकाई',
  'dose.route': 'मार्ग',
  'dose.rounding': 'राउंडिंग',
  'dose.frequency': 'आवृत्ति',
  'dose.freqPlaceholder': 'जैसे हर 8 घंटे',
  'dose.duration': 'अवधि',
  'dose.durationPlaceholder': 'जैसे 7 दिन',
  'dose.volumeToDraw': 'खींचने योग्य मात्रा',
  'dose.totalDose': 'कुल खुराक',
  'dose.therapeuticRange': 'Plumb\'s संदर्भ सीमा',
  'dose.belowRange': 'सीमा से नीचे',
  'dose.inRange': 'सीमा में',
  'dose.aboveRange': 'सीमा से ऊपर',
  'dose.plumbsRef': 'Plumb\'s संदर्भ खुराक',
  'dose.plumbsRefNone': 'इस प्रजाति के लिए कोई Plumb\'s संदर्भ खुराक नहीं',
  'dose.plumbsRefHint': 'केवल संदर्भ के लिए — खुराक देने से पहले अपनी पेशेवर ज़िम्मेदारी पर सत्यापित करें।',
  'dose.vetOnly':
    'केवल लाइसेंस प्राप्त पशु चिकित्सा उपयोग के लिए। नैदानिक ज़िम्मेदारी उपचार करने वाले पशु चिकित्सक की है। Plumb\'s संदर्भ खुराकें मार्गदर्शक हैं और देने से पहले स्वतंत्र रूप से सत्यापित की जानी चाहिए — उपयोग आपकी पेशेवर ज़िम्मेदारी पर।',
  'dose.noRange': 'इस संयोजन के लिए कोई संदर्भ सीमा नहीं',
  'dose.breakdown': 'गणना विवरण',
  'dose.bodyWeight': 'शारीरिक वज़न',
  'dose.doseGiven': 'दी गई खुराक',
  'dose.rawVolume': 'राउंडिंग से पहले की मात्रा',
  'dose.roundedVolume': 'राउंड की गई मात्रा',
  'dose.warnings': 'चेतावनियाँ',
  'dose.noWarnings': 'कोई चेतावनी नहीं',
  'dose.enterToCalc': 'गणना के लिए वज़न, खुराक और सांद्रता दर्ज करें।',

  // Routes
  'route.IV': 'अंतःशिरा (IV)',
  'route.IM': 'अंतःपेशीय (IM)',
  'route.SC': 'त्वचा के नीचे (SC)',
  'route.PO': 'मौखिक (PO)',

  // Toxicity suite
  'tox.title': 'विषाक्तता कैलकुलेटर',
  'tox.subtitle': 'वज़न और खाई गई मात्रा से जोखिम का अनुमान। एक सहायक उपकरण — पशु चिकित्सक का विकल्प नहीं।',
  'tox.choose': 'एक विष चुनें',
  'tox.amount': 'खाई गई मात्रा',
  'tox.source': 'प्रकार / स्रोत',
  'tox.riskLevel': 'जोखिम स्तर',
  'tox.dosePerKg': 'अनुमानित खुराक',
  'tox.expectedSigns': 'अपेक्षित नैदानिक लक्षण',
  'tox.action': 'अनुशंसित कार्रवाई',
  'tox.decon': 'विषमुक्ति की अवधि',
  'tox.context': 'नैदानिक संदर्भ',
  'tox.notForSpecies': 'यह गणना इस प्रजाति पर लागू नहीं होती।',
  'tox.idiosyncratic': 'विशिष्ट विषाक्तता — कोई सुरक्षित सीमा नहीं',

  // Risk bands
  'risk.minimal': 'न्यूनतम',
  'risk.mild': 'हल्का',
  'risk.moderate': 'मध्यम',
  'risk.severe': 'गंभीर',
  'risk.critical': 'अत्यंत गंभीर',
  'risk.emergency': 'आपातकाल',

  // Emergency
  'emergency.title': 'आपातकाल?',
  'emergency.text':
    'यदि विषाक्तता का संदेह हो, तो तुरंत निकटतम क्लिनिक को कॉल करें। लक्षणों की प्रतीक्षा न करें — और समय व उपलब्धता की पुष्टि के लिए पहले से कॉल करें।',
  'emergency.network': 'TeddyVets क्लिनिक नेटवर्क',
  'emergency.allClinics': 'सभी TeddyVets क्लिनिक',
  'emergency.note': 'क्लिनिक दिखाए गए समय के भीतर काम करते हैं। इन घंटों के बाहर, या जानलेवा स्थिति में, उपलब्धता जाँचने के लिए पहले से कॉल करें।',
  'emergency.callVet': 'अपने पशु चिकित्सक को कॉल करें',
  'emergency.generic.title': 'आपातकाल?',
  'emergency.generic.text':
    'यदि विषाक्तता का संदेह हो, तो तुरंत निकटतम पशु चिकित्सा क्लिनिक या आपातकालीन सेवा से संपर्क करें। लक्षणों की प्रतीक्षा न करें — और उपलब्धता की पुष्टि के लिए पहले से कॉल करें।',
  'emergency.submit.title': 'क्या आप एक आपातकालीन पशु चिकित्सा क्लिनिक चलाते हैं?',
  'emergency.submit.text':
    'हम आपके क्षेत्र के लिए आपातकालीन क्लिनिक निर्देशिका का विस्तार कर रहे हैं। अपनी क्लिनिक सूचीबद्ध कराने के लिए हमें उसका नाम, क्षेत्र, फ़ोन और समय ईमेल करें।',
  'emergency.submit.cta': 'हमें ईमेल करें',

  // Disclaimer / footer
  'disclaimer.title': 'अस्वीकरण',
  'disclaimer.text':
    'यह कैलकुलेटर एक नैदानिक निर्णय-सहायता उपकरण है और पेशेवर पशु चिकित्सा निर्णय या ज़हर नियंत्रण का विकल्प नहीं है। उपचार से पहले हर गणना को दवा संदर्भों के विरुद्ध सत्यापित करें। विशिष्ट विष (अंगूर, लिली) कभी भी "सुरक्षित" परिणाम नहीं दिखाते।',
  'footer.text': 'सहायकों के लिए सहायक · सर्वाधिकार सुरक्षित',
  'footer.madeWith': 'नैदानिक सावधानी से निर्मित',
  'footer.partner': 'नैदानिक साझेदार',
};
