import type { TKey } from './he';

/** Turkish dictionary. UI chrome only; clinical data falls back to English. */
export const tr: Record<TKey, string> = {
  // Brand
  'brand.name': 'Veteriner Hesaplayıcı',
  'brand.tagline': 'Klinik veteriner hesaplayıcı · Köpekler ve kediler',

  // Header / controls
  'ctl.language': 'Dil',
  'ctl.language.select': 'Dil seç',
  'ctl.theme.toDark': 'Koyu',
  'ctl.theme.toLight': 'Açık',
  'ctl.theme.toggle': 'Renk temasını değiştir',

  // Hero
  'hero.title': 'Veteriner Hesaplayıcı',
  'hero.subtitle': 'İlaç dozu ve toksisite hesapları — hassas, hızlı, avucunuzun içinde.',
  'hero.cta': 'Hesaplamaya başla',
  'hero.scroll': 'Kaydır',

  // Tool switcher
  'tab.dosage': 'Doz',
  'tab.toxins': 'Toksinler',
  'tab.patient': 'Hasta',
  'tab.plants': 'Bitkiler',
  'tabs.aria': 'Hesaplayıcı seç',

  // Patient session
  'patient.title': 'Hasta oturumu',
  'patient.subtitle': 'Bir hasta için birkaç ilacı hesaplayın, ardından tek bir rapor olarak dışa aktarın.',
  'patient.new': 'Yeni hasta',
  'patient.name': 'Hasta adı',
  'patient.namePlaceholder': 'örn. Rex',
  'patient.start': 'Oturumu başlat',
  'patient.active': 'Aktif hasta',
  'patient.end': 'Oturumu bitir',
  'patient.meds': 'İlaçlar',
  'patient.medsCount': 'ilaç eklendi',
  'patient.addMed': 'Hasta listesine ekle',
  'patient.addMedCta': 'İlaç ekle',
  'patient.added': 'Listeye eklendi',
  'patient.noMeds': 'Henüz ilaç eklenmedi — bir doz hesaplayın ve ekleyin.',
  'patient.report': 'İlaç raporu',
  'patient.shareReport': 'Raporu paylaş',
  'patient.copyReport': 'Raporu kopyala',
  'patient.clearAll': 'Tümünü temizle',
  'patient.remove': 'Kaldır',
  'patient.draw': 'Çekiş',

  // Plant library
  'plants.title': 'Toksik bitki kütüphanesi',
  'plants.subtitle': 'Köpekler ve kediler için tehlikeli bitkileri fotoğraflarıyla tanıyın.',
  'plants.search': 'Bitki ara…',
  'plants.filter.all': 'Tümü',
  'plants.filter.deadly': 'Ölümcül ☠',
  'plants.filter.severe': 'Ağır',
  'plants.filter.cats': 'Yalnızca kediler',
  'plants.level.mild': 'Hafif',
  'plants.level.moderate': 'Orta',
  'plants.level.severe': 'Ağır',
  'plants.level.deadly': 'Ölümcül',
  'plants.toxin': 'Toksin',
  'plants.symptoms': 'Belirtiler',
  'plants.action': 'Ne yapmalı',
  'plants.affected': 'Risk altında',
  'plants.noResults': 'Eşleşen bitki yok.',
  'plants.catsOnly': 'Kediler',
  'plants.both': 'Köpekler ve kediler',
  'plants.photoCredit': 'Fotoğraf kaynağı: Wikimedia Commons',

  // Common
  'common.calculate': 'Hesapla',
  'common.reset': 'Sıfırla',
  'common.copy': 'Kopyala',
  'common.copied': 'Kopyalandı!',
  'common.share': 'Paylaş',
  'common.close': 'Kapat',
  'common.sources': 'Tıbbi kaynaklar',
  'common.optional': 'isteğe bağlı',
  'common.select': 'Seç',
  'common.search': 'Ara',
  'common.required': 'zorunlu',
  'common.back': 'Geri',
  'common.details': 'Ayrıntılar',
  'common.example': 'örn.',
  'common.unit': 'Birim',

  // Species
  'species.label': 'Tür',
  'species.dog': 'Köpek',
  'species.cat': 'Kedi',

  // Units / fields
  'field.weight': 'Vücut ağırlığı',
  'unit.kg': 'kg',
  'unit.g': 'g',
  'unit.oz': 'oz',
  'unit.mg': 'mg',
  'unit.ml': 'mL',
  'unit.mgkg': 'mg/kg',
  'unit.gkg': 'g/kg',
  'unit.tablets': 'tablet',
  'unit.pieces': 'adet',
  'unit.perDay': 'günde',

  // Dosage calculator
  'dose.title': 'İlaç doz hesaplayıcı',
  'dose.subtitle': 'Ağırlık, doz ve konsantrasyona göre çekilecek hacim.',
  'dose.drug': 'İlaç adı',
  'dose.drugPlaceholder': 'İlaç ara veya yaz…',
  'dose.perKg': 'kg başına doz',
  'dose.doseUnit': 'Doz birimi',
  'dose.concentration': 'Konsantrasyon',
  'dose.concUnit': 'Kons. birimi',
  'dose.route': 'Uygulama yolu',
  'dose.rounding': 'Yuvarlama',
  'dose.frequency': 'Sıklık',
  'dose.freqPlaceholder': 'örn. her 8 saatte',
  'dose.duration': 'Süre',
  'dose.durationPlaceholder': 'örn. 7 gün',
  'dose.volumeToDraw': 'Çekilecek hacim',
  'dose.totalDose': 'Toplam doz',
  'dose.therapeuticRange': 'Plumb\'s referans aralığı',
  'dose.belowRange': 'Aralığın altında',
  'dose.inRange': 'Aralıkta',
  'dose.aboveRange': 'Aralığın üzerinde',
  'dose.plumbsRef': 'Plumb\'s referans dozu',
  'dose.plumbsRefNone': 'Bu tür için Plumb\'s referans dozu yok',
  'dose.plumbsRefHint': 'Yalnızca referans — doz vermeden önce mesleki sorumluluğunuzla doğrulayın.',
  'dose.vetOnly':
    'Yalnızca ruhsatlı veteriner kullanımı içindir. Klinik sorumluluk tedavi eden veterinere aittir. Plumb\'s referans dozları bir kılavuzdur ve uygulamadan önce bağımsız olarak doğrulanmalıdır — kullanım mesleki sorumluluğunuzdadır.',
  'dose.noRange': 'Bu kombinasyon için referans aralığı yok',
  'dose.breakdown': 'Hesaplama dökümü',
  'dose.bodyWeight': 'Vücut ağırlığı',
  'dose.doseGiven': 'Verilen doz',
  'dose.rawVolume': 'Yuvarlama öncesi hacim',
  'dose.roundedVolume': 'Yuvarlanmış hacim',
  'dose.warnings': 'Uyarılar',
  'dose.noWarnings': 'Uyarı yok',
  'dose.enterToCalc': 'Hesaplamak için ağırlık, doz ve konsantrasyon girin.',

  // Routes
  'route.IV': 'Damar içi (IV)',
  'route.IM': 'Kas içi (IM)',
  'route.SC': 'Deri altı (SC)',
  'route.PO': 'Ağızdan (PO)',

  // Toxicity suite
  'tox.title': 'Toksisite hesaplayıcıları',
  'tox.subtitle': 'Ağırlık ve yenen miktara göre risk tahmini. Bir destek aracıdır — veterinerin yerini tutmaz.',
  'tox.choose': 'Bir toksin seçin',
  'tox.amount': 'Yenen miktar',
  'tox.source': 'Tür / kaynak',
  'tox.riskLevel': 'Risk düzeyi',
  'tox.dosePerKg': 'Tahmini doz',
  'tox.expectedSigns': 'Beklenen klinik belirtiler',
  'tox.action': 'Önerilen eylem',
  'tox.decon': 'Dekontaminasyon penceresi',
  'tox.context': 'Klinik bağlam',
  'tox.notForSpecies': 'Bu hesaplama bu tür için geçerli değildir.',
  'tox.idiosyncratic': 'İdiyosenkratik toksisite — güvenli eşik yok',

  // Risk bands
  'risk.minimal': 'En az',
  'risk.mild': 'Hafif',
  'risk.moderate': 'Orta',
  'risk.severe': 'Ağır',
  'risk.critical': 'Kritik',
  'risk.emergency': 'Acil',

  // Emergency
  'emergency.title': 'Acil durum mu?',
  'emergency.text':
    'Zehirlenmeden şüpheleniyorsanız, hemen en yakın kliniği arayın. Belirtilerin çıkmasını beklemeyin — ve saatleri ile uygunluğu önceden teyit etmek için arayın.',
  'emergency.network': 'TeddyVets klinik ağı',
  'emergency.allClinics': 'Tüm TeddyVets klinikleri',
  'emergency.note': 'Klinikler gösterilen saatlerde hizmet verir. Bu saatlerin dışında veya yaşamı tehdit eden durumlarda, uygunluğu kontrol etmek için önceden arayın.',
  'emergency.callVet': 'Veterinerinizi arayın',
  'emergency.generic.title': 'Acil durum mu?',
  'emergency.generic.text':
    'Zehirlenmeden şüpheleniyorsanız, hemen en yakın veteriner kliniği veya acil servisle iletişime geçin. Belirtilerin çıkmasını beklemeyin — ve uygunluğu önceden teyit etmek için arayın.',
  'emergency.submit.title': 'Acil veteriner kliniği mi işletiyorsunuz?',
  'emergency.submit.text':
    'Bölgeniz için acil klinik dizinimizi genişletiyoruz. Kliniğinizin listelenmesi için adını, bölgesini, telefonunu ve çalışma saatlerini bize e-posta ile gönderin.',
  'emergency.submit.cta': 'Bize e-posta gönderin',

  // Disclaimer / footer
  'disclaimer.title': 'Sorumluluk reddi',
  'disclaimer.text':
    'Bu hesaplayıcı klinik karar destek aracıdır ve profesyonel veteriner muhakemesinin veya zehir kontrol merkezinin yerini tutmaz. Tedaviden önce her hesabı ilaç kaynaklarıyla doğrulayın. İdiyosenkratik toksinler (üzüm, zambaklar) asla "güvenli" bir sonuç göstermez.',
  'footer.text': 'Asistanlar için asistanlar · Tüm hakları saklıdır',
  'footer.madeWith': 'Klinik özenle yapıldı',
  'footer.partner': 'Klinik ortak',
};
