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
  'hero.subtitle':
    "Köpek ve kediler için doz ve toksisite hesapları: 130'dan fazla referans doz aralığı, kaynaklı 14 toksisite hesaplayıcısı ve fotoğraflı zehirli bitki kütüphanesi. Ücretsiz ve çevrimdışı çalışır.",
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
  'treat.title': 'Hemen tedavi — veteriner dozları',
  'treat.emesis': 'Kusturma',
  'treat.charcoal': 'Aktif kömür',
  'treat.monitoring': 'İzlem',
  'treat.status.indicated': 'Önerilir',
  'treat.status.caution': 'Dikkat',
  'treat.status.no': 'Önerilmez',
  'treat.disclaimer': 'Dozlar veteriner hekimler içindir — uygulamadan önce belirtilen kaynaktan doğrulayın.',

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

  // About / FAQ — server-rendered SEO content
  'about.title': 'Bu veteriner hesaplayıcı hakkında',
  'about.lead':
    'Vet-Holim; köpek ve kedi tedavi eden veteriner hekimler, hemşireler ve teknisyenler için ücretsiz bir klinik karar destek aracıdır. Dört şeyi tek sayfada bir araya getirir: çekilecek hacmi veren doz hesaplayıcısı, kaynaklı toksisite hesaplayıcıları seti, fotoğraflı zehirli bitki kütüphanesi ve tek rapor olarak dışa aktarılabilen çok ilaçlı hasta oturumu. Her şey tarayıcınızda çalışır — hesap yok, yükleme yok, hasta verisi cihazdan çıkmaz.',
  'about.dosage.title': 'İlaç doz hesaplayıcısı',
  'about.dosage.body':
    "Tür, vücut ağırlığı, kilogram başına doz ve flakon konsantrasyonunu girin; hesaplayıcı çekilecek tam hacmi, seçtiğiniz enjektör hassasiyetine (0,01, 0,05 veya 0,1 mL) yuvarlayarak verir. Plumb's Veterinary Drug Handbook kaynaklı referans aralıklarıyla 130'dan fazla ilacı kapsar, yayımlanmış aralığın dışındaki dozları işaretler ve IV, IM, SC, PO yollarının yanı sıra mg/kg, mcg/kg, IU/kg ve mL/kg birimlerini destekler.",
  'about.toxins.title': 'Toksisite hesaplayıcıları',
  'about.toxins.body':
    'Kaynaklı on dört toksisite aracı, vücut ağırlığı ve alınan miktardan riski tahmin eder: çikolata ve diğer metilksantinler, üzüm ve kuru üzüm, ksilitol, soğan ve sarımsak, makadamya cevizi, ibuprofen, parasetamol, permetrin, zambaklar, rodentisitler, etilen glikol, kenevir, alkol ve kafein. Her sonuç bir risk düzeyi, beklenen klinik bulgular, dekontaminasyon penceresi ve önerilen eylem verir. İdiyosenkratik toksinler asla güvenli sonuç göstermez.',
  'about.plants.title': 'Zehirli bitki kütüphanesi',
  'about.plants.body':
    'Köpek ve kediler için tehlikeli ev ve bahçe bitkilerinin aranabilir, fotoğraflı kütüphanesi; hafiften ölümcüle kadar şiddete göre filtrelenebilir. Her kayıt toksik etken maddeyi, bitkinin ilgili kısımlarını, beklenen klinik bulguları ve hayvanın ne kadar acil görülmesi gerektiğini belirtir.',
  'about.patient.title': 'Hasta oturumu',
  'about.patient.body':
    'Birden fazla ilaç içeren bir vaka mı? Bir hasta oturumu başlatın, hesaplanan her dozu listeye ekleyin, ardından ilaç adları, dozlar, çekilecek hacimler, uygulama yolları ve sıklıkları içeren tek bir birleşik ilaç raporunu kopyalayın veya paylaşın — nöbet devri, tedavi çizelgesi ve sahip talimatları için pratiktir.',
  'about.who.title': 'Kimler için',
  'about.who.body':
    'Ruhsatlı veteriner sağlık profesyonelleri ve öğrenciler için geliştirilmiştir. Klinik sorumluluk daima tedaviyi yürüten veteriner hekime aittir: uygulamadan önce her değeri kendi ilaç kaynaklarınızdan doğrulayın. Zehirlenmeden şüphelenen hayvan sahipleri, bir hesaba göre hareket etmek yerine derhal bir veteriner kliniğine veya acil servise başvurmalıdır.',
  'faq.title': 'Sık sorulan sorular',
  'faq.q1': 'Veteriner hesaplayıcı ücretsiz mi?',
  'faq.a1':
    'Evet. Tüm hesaplayıcılar, bitki kütüphanesi ve hasta oturumu hesap açmadan ve kayıt olmadan ücretsiz kullanılabilir.',
  'faq.q2': 'Hangi hayvanları kapsıyor?',
  'faq.a2':
    'Köpek ve kedi. Doz aralıkları, toksisite eşikleri ve klinik bulgular iki tür arasında farklıdır; bu yüzden önce türü seçin — bazı toksisite hesapları yalnızca birine uygulanır ve bunu belirtir.',
  'faq.q3': 'Doz aralıkları nereden geliyor?',
  'faq.a3':
    "Referans doz aralıkları Plumb's Veterinary Drug Handbook'tan, toksisite eşikleri ise her aracın içinde kaynak gösterilen yayımlanmış veteriner toksikoloji kaynaklarından alınmıştır. Bunlar yalnızca yol göstericidir ve tedaviden önce bağımsız olarak doğrulanmalıdır.",
  'faq.q4': 'Çevrimdışı kullanabilir miyim?',
  'faq.a4':
    'Evet. Site kurulabilir bir progresif web uygulamasıdır: ana ekranınıza bir kez ekleyin, hesaplayıcılar ağ bağlantısı olmadan da çalışmaya devam eder.',
  'faq.q5': 'Hasta verilerim bir yerde saklanıyor mu?',
  'faq.a5':
    'Hayır. Tüm hesaplamalar tarayıcınızda yerel olarak çalışır ve hiçbir şey sunucuya yüklenmez. Hasta oturumu yalnızca mevcut sekmede bulunur.',
  'faq.q6': 'Zehirlenme şüphesinde ne yapmalıyım?',
  'faq.a6':
    'Bulgular ortaya çıkmadan önce derhal veteriner hekiminize veya en yakın acil kliniğe başvurun. Toksisite hesaplayıcısını maruziyeti tahmin etmek ve bu görüşmeyi beslemek için kullanın — asla tedaviye başvurmama kararı için değil.',
};
