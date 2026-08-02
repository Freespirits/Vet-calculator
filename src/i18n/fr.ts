import type { TKey } from './he';

/** French dictionary. UI chrome only; clinical data falls back to English. */
export const fr: Record<TKey, string> = {
  // Brand
  'brand.name': 'Calculateur Vétérinaire',
  'brand.tagline': 'Calculateur vétérinaire clinique · Chiens et chats',

  // Header / controls
  'ctl.language': 'Langue',
  'ctl.language.select': 'Choisir la langue',
  'ctl.theme.toDark': 'Sombre',
  'ctl.theme.toLight': 'Clair',
  'ctl.theme.toggle': 'Changer le thème de couleur',

  // Hero
  'hero.title': 'Calculateur Vétérinaire',
  'hero.subtitle':
    'Calculs de posologie et de toxicité pour chiens et chats : plus de 130 fourchettes de doses de référence, 14 calculateurs de toxicité sourcés et une bibliothèque photo de plantes toxiques. Gratuit et utilisable hors ligne.',
  'hero.cta': 'Commencer le calcul',
  'hero.scroll': 'Faire défiler',

  // Tool switcher
  'tab.dosage': 'Posologie',
  'tab.toxins': 'Toxiques',
  'tab.patient': 'Patient',
  'tab.plants': 'Plantes',
  'tabs.aria': 'Choisir le calculateur',

  // Patient session
  'patient.title': 'Session patient',
  'patient.subtitle': 'Calculez plusieurs médicaments pour un patient, puis exportez un seul rapport.',
  'patient.new': 'Nouveau patient',
  'patient.name': 'Nom du patient',
  'patient.namePlaceholder': 'ex. Rex',
  'patient.start': 'Démarrer la session',
  'patient.active': 'Patient actif',
  'patient.end': 'Terminer la session',
  'patient.meds': 'Médicaments',
  'patient.medsCount': 'médicaments ajoutés',
  'patient.addMed': 'Ajouter à la liste du patient',
  'patient.addMedCta': 'Ajouter un médicament',
  'patient.added': 'Ajouté à la liste',
  'patient.noMeds': 'Aucun médicament ajouté — calculez une dose et ajoutez-la.',
  'patient.report': 'Rapport de médication',
  'patient.shareReport': 'Partager le rapport',
  'patient.copyReport': 'Copier le rapport',
  'patient.clearAll': 'Tout effacer',
  'patient.remove': 'Retirer',
  'patient.draw': 'Prélever',

  // Plant library
  'plants.title': 'Bibliothèque de plantes toxiques',
  'plants.subtitle': 'Identifiez les plantes dangereuses pour les chiens et les chats, avec photos.',
  'plants.search': 'Rechercher une plante…',
  'plants.filter.all': 'Toutes',
  'plants.filter.deadly': 'Mortel ☠',
  'plants.filter.severe': 'Grave',
  'plants.filter.cats': 'Chats uniquement',
  'plants.level.mild': 'Léger',
  'plants.level.moderate': 'Modéré',
  'plants.level.severe': 'Grave',
  'plants.level.deadly': 'Mortel',
  'plants.toxin': 'Toxine',
  'plants.symptoms': 'Symptômes',
  'plants.action': 'Que faire',
  'plants.affected': 'À risque',
  'plants.noResults': 'Aucune plante correspondante.',
  'plants.catsOnly': 'Chats',
  'plants.both': 'Chiens et chats',
  'plants.photoCredit': 'Crédits photos : Wikimedia Commons',
  'treat.title': 'Traiter maintenant — doses vétérinaires',
  'treat.emesis': 'Induire le vomissement',
  'treat.charcoal': 'Charbon activé',
  'treat.monitoring': 'Surveillance',
  'treat.status.indicated': 'Indiqué',
  'treat.status.caution': 'Prudence',
  'treat.status.no': 'Déconseillé',
  'treat.disclaimer': 'Doses destinées aux professionnels vétérinaires — vérifiez la source citée avant administration.',

  // Common
  'common.calculate': 'Calculer',
  'common.reset': 'Réinitialiser',
  'common.copy': 'Copier',
  'common.copied': 'Copié !',
  'common.share': 'Partager',
  'common.close': 'Fermer',
  'common.sources': 'Sources médicales',
  'common.optional': 'facultatif',
  'common.select': 'Sélectionner',
  'common.search': 'Rechercher',
  'common.required': 'obligatoire',
  'common.back': 'Retour',
  'common.details': 'Détails',
  'common.example': 'ex.',
  'common.unit': 'Unité',

  // Species
  'species.label': 'Espèce',
  'species.dog': 'Chien',
  'species.cat': 'Chat',

  // Units / fields
  'field.weight': 'Poids corporel',
  'unit.kg': 'kg',
  'unit.g': 'g',
  'unit.oz': 'oz',
  'unit.mg': 'mg',
  'unit.ml': 'ml',
  'unit.mgkg': 'mg/kg',
  'unit.gkg': 'g/kg',
  'unit.tablets': 'comprimés',
  'unit.pieces': 'unités',
  'unit.perDay': 'par jour',

  // Dosage calculator
  'dose.title': 'Calculateur de posologie',
  'dose.subtitle': 'Volume à prélever, à partir du poids, de la dose et de la concentration.',
  'dose.drug': 'Nom du médicament',
  'dose.drugPlaceholder': 'Rechercher ou saisir un médicament…',
  'dose.perKg': 'Dose par kg',
  'dose.doseUnit': 'Unité de dose',
  'dose.concentration': 'Concentration',
  'dose.concUnit': 'Unité de conc.',
  'dose.route': 'Voie',
  'dose.rounding': 'Arrondi',
  'dose.frequency': 'Fréquence',
  'dose.freqPlaceholder': 'ex. toutes les 8 h',
  'dose.duration': 'Durée',
  'dose.durationPlaceholder': 'ex. 7 jours',
  'dose.volumeToDraw': 'Volume à prélever',
  'dose.totalDose': 'Dose totale',
  'dose.therapeuticRange': 'Plage de référence Plumb\'s',
  'dose.belowRange': 'Sous la plage',
  'dose.inRange': 'Dans la plage',
  'dose.aboveRange': 'Au-dessus de la plage',
  'dose.plumbsRef': 'Dose de référence Plumb\'s',
  'dose.plumbsRefNone': 'Aucune dose de référence Plumb\'s pour cette espèce',
  'dose.plumbsRefHint': 'À titre indicatif uniquement — vérifiez avant de doser, sous votre responsabilité professionnelle.',
  'dose.vetOnly':
    'Réservé à un usage vétérinaire agréé. La responsabilité clinique incombe au vétérinaire traitant. Les doses de référence Plumb\'s sont indicatives et doivent être vérifiées de façon indépendante avant administration — utilisation sous votre responsabilité professionnelle.',
  'dose.noRange': 'Aucune plage de référence pour cette combinaison',
  'dose.breakdown': 'Détail du calcul',
  'dose.bodyWeight': 'Poids corporel',
  'dose.doseGiven': 'Dose administrée',
  'dose.rawVolume': 'Volume avant arrondi',
  'dose.roundedVolume': 'Volume arrondi',
  'dose.warnings': 'Avertissements',
  'dose.noWarnings': 'Aucun avertissement',
  'dose.enterToCalc': 'Saisissez le poids, la dose et la concentration pour calculer.',

  // Routes
  'route.IV': 'Intraveineuse (IV)',
  'route.IM': 'Intramusculaire (IM)',
  'route.SC': 'Sous-cutanée (SC)',
  'route.PO': 'Orale (PO)',

  // Toxicity suite
  'tox.title': 'Calculateurs de toxicité',
  'tox.subtitle': 'Estimation du risque selon le poids et la quantité ingérée. Un outil d\'aide, pas un substitut au vétérinaire.',
  'tox.choose': 'Choisir un toxique',
  'tox.amount': 'Quantité ingérée',
  'tox.source': 'Type / source',
  'tox.riskLevel': 'Niveau de risque',
  'tox.dosePerKg': 'Dose estimée',
  'tox.expectedSigns': 'Signes cliniques attendus',
  'tox.action': 'Action recommandée',
  'tox.decon': 'Fenêtre de décontamination',
  'tox.context': 'Contexte clinique',
  'tox.notForSpecies': 'Ce calcul ne s\'applique pas à cette espèce.',
  'tox.idiosyncratic': 'Toxicité idiosyncrasique — aucun seuil sûr',

  // Risk bands
  'risk.minimal': 'Minimal',
  'risk.mild': 'Léger',
  'risk.moderate': 'Modéré',
  'risk.severe': 'Grave',
  'risk.critical': 'Critique',
  'risk.emergency': 'Urgence',

  // Emergency
  'emergency.title': 'Une urgence ?',
  'emergency.text':
    'En cas de suspicion d\'empoisonnement, appelez immédiatement la clinique la plus proche. N\'attendez pas l\'apparition des signes — et appelez à l\'avance pour confirmer les horaires et la disponibilité.',
  'emergency.network': 'Réseau de cliniques TeddyVets',
  'emergency.allClinics': 'Toutes les cliniques TeddyVets',
  'emergency.note': 'Les cliniques fonctionnent aux horaires indiqués. En dehors de ces heures, ou pour un cas mettant en jeu le pronostic vital, appelez à l\'avance pour vérifier la disponibilité.',
  'emergency.callVet': 'Appelez votre vétérinaire',
  'emergency.generic.title': 'Une urgence ?',
  'emergency.generic.text':
    'En cas de suspicion d\'empoisonnement, contactez immédiatement votre clinique vétérinaire ou un service d\'urgence proche. N\'attendez pas l\'apparition des signes — et appelez à l\'avance pour confirmer la disponibilité.',
  'emergency.submit.title': 'Vous gérez une clinique vétérinaire d\'urgence ?',
  'emergency.submit.text':
    'Nous enrichissons notre annuaire de cliniques d\'urgence pour votre région. Pour y figurer, envoyez-nous le nom, la zone, le téléphone et les horaires de votre clinique.',
  'emergency.submit.cta': 'Écrivez-nous',

  // Disclaimer / footer
  'disclaimer.title': 'Avertissement',
  'disclaimer.text':
    'Ce calculateur est un outil d\'aide à la décision clinique et ne remplace pas le jugement vétérinaire professionnel ni un centre antipoison. Vérifiez chaque calcul avec des références pharmacologiques avant tout traitement. Les toxiques idiosyncrasiques (raisins, lis) n\'affichent jamais un résultat « sûr ».',
  'footer.text': 'Assistants pour assistants · Tous droits réservés',
  'footer.madeWith': 'Conçu avec rigueur clinique',
  'footer.partner': 'Partenaire clinique',

  // About / FAQ — server-rendered SEO content
  'about.title': 'À propos de ce calculateur vétérinaire',
  'about.lead':
    "Vet-Holim est un outil gratuit d'aide à la décision clinique destiné aux vétérinaires, infirmiers et techniciens qui soignent chiens et chats. Il réunit quatre choses sur une seule page : un calculateur de dose qui renvoie le volume à prélever, une série de calculateurs de toxicité sourcés, une bibliothèque photo de plantes toxiques et une session patient multi-médicaments exportable en un seul rapport. Tout s'exécute dans votre navigateur : aucun compte, aucun envoi, aucune donnée patient ne quitte l'appareil.",
  'about.dosage.title': 'Calculateur de posologie',
  'about.dosage.body':
    "Saisissez l'espèce, le poids corporel, la dose par kilogramme et la concentration du flacon : le calculateur renvoie le volume exact à prélever, arrondi à la précision de seringue choisie (0,01, 0,05 ou 0,1 ml). Il couvre plus de 130 médicaments avec des fourchettes de référence issues du Plumb's Veterinary Drug Handbook, signale les doses hors fourchette publiée et gère mg/kg, mcg/kg, UI/kg et ml/kg ainsi que les voies IV, IM, SC et PO.",
  'about.toxins.title': 'Calculateurs de toxicité',
  'about.toxins.body':
    "Quatorze outils de toxicité sourcés estiment le risque à partir du poids et de la quantité ingérée : chocolat et autres méthylxanthines, raisins et raisins secs, xylitol, oignon et ail, noix de macadamia, ibuprofène, paracétamol, perméthrine, lis, rodenticides, éthylène glycol, cannabis, alcool et caféine. Chaque résultat donne un niveau de risque, les signes cliniques attendus, la fenêtre de décontamination et une conduite à tenir. Les toxiques idiosyncrasiques n'affichent jamais de verdict sûr.",
  'about.plants.title': 'Bibliothèque de plantes toxiques',
  'about.plants.body':
    "Une bibliothèque illustrée et consultable des plantes d'intérieur et de jardin dangereuses pour les chiens et les chats, filtrable par gravité, du bénin au mortel. Chaque fiche précise le principe toxique, les parties de la plante concernées, les signes cliniques attendus et l'urgence de la consultation.",
  'about.patient.title': 'Session patient',
  'about.patient.body':
    'Un cas avec plusieurs médicaments ? Ouvrez une session patient, ajoutez chaque dose calculée à la liste, puis copiez ou partagez un rapport de médication unique avec les noms, doses, volumes à prélever, voies et fréquences : pratique pour la transmission, la feuille de soins et les consignes au propriétaire.',
  'about.who.title': "À qui s'adresse l'outil",
  'about.who.body':
    "Conçu pour les professionnels vétérinaires diplômés et les étudiants. La responsabilité clinique incombe toujours au vétérinaire traitant : vérifiez chaque valeur dans vos propres références avant administration. Un propriétaire qui suspecte une intoxication doit contacter immédiatement une clinique vétérinaire ou un service d'urgence plutôt que d'agir sur la base d'un calcul.",
  'faq.title': 'Questions fréquentes',
  'faq.q1': 'Le calculateur vétérinaire est-il gratuit ?',
  'faq.a1':
    'Oui. Tous les calculateurs, la bibliothèque de plantes et la session patient sont gratuits, sans compte ni inscription.',
  'faq.q2': 'Quelles espèces sont couvertes ?',
  'faq.a2':
    "Les chiens et les chats. Les fourchettes de doses, les seuils de toxicité et les signes cliniques diffèrent entre les deux espèces : choisissez donc l'espèce en premier — certains calculs de toxicité ne concernent qu'une seule d'entre elles et le précisent.",
  'faq.q3': "D'où viennent les fourchettes de doses ?",
  'faq.a3':
    "Les fourchettes de référence proviennent du Plumb's Veterinary Drug Handbook et les seuils de toxicité de sources publiées en toxicologie vétérinaire, citées dans chaque outil. Elles sont indicatives et doivent être vérifiées de façon indépendante avant tout traitement.",
  'faq.q4': "Puis-je l'utiliser hors ligne ?",
  'faq.a4':
    "Oui. Le site est une application web progressive installable : ajoutez-le une fois à votre écran d'accueil et les calculateurs continuent de fonctionner sans connexion réseau.",
  'faq.q5': 'Les données patient sont-elles stockées quelque part ?',
  'faq.a5':
    "Non. Tous les calculs s'exécutent localement dans votre navigateur et rien n'est envoyé à un serveur. La session patient n'existe que dans l'onglet en cours.",
  'faq.q6': "Que faire en cas de suspicion d'intoxication ?",
  'faq.a6':
    "Contactez immédiatement votre vétérinaire ou la clinique d'urgence la plus proche, avant l'apparition des signes. Servez-vous du calculateur de toxicité pour estimer l'exposition et nourrir cette conversation, jamais pour renoncer à consulter.",
};
