import type { TKey } from './he';

/** Japanese dictionary. UI chrome only; clinical data falls back to English. */
export const ja: Record<TKey, string> = {
  // Brand
  'brand.name': '獣医用計算ツール',
  'brand.tagline': '臨床獣医計算ツール · 犬と猫',

  // Header / controls
  'ctl.language': '言語',
  'ctl.language.select': '言語を選択',
  'ctl.theme.toDark': 'ダーク',
  'ctl.theme.toLight': 'ライト',
  'ctl.theme.toggle': 'カラーテーマを切り替え',

  // Hero
  'hero.title': '獣医用計算ツール',
  'hero.subtitle':
    '犬と猫のための薬用量・中毒量計算：130 を超える参考用量レンジ、出典付きの中毒計算ツール 14 種、写真付き有毒植物ライブラリ。無料で、オフラインでも使えます。',
  'hero.cta': '計算を始める',
  'hero.scroll': 'スクロール',

  // Tool switcher
  'tab.dosage': '投与量',
  'tab.toxins': '毒物',
  'tab.patient': '患者',
  'tab.plants': '植物',
  'tabs.aria': '計算ツールを選択',

  // Patient session
  'patient.title': '患者セッション',
  'patient.subtitle': '1頭の患者について複数の薬剤を計算し、1つのレポートに出力します。',
  'patient.new': '新規患者',
  'patient.name': '患者名',
  'patient.namePlaceholder': '例：レックス',
  'patient.start': 'セッション開始',
  'patient.active': '現在の患者',
  'patient.end': 'セッション終了',
  'patient.meds': '薬剤',
  'patient.medsCount': '件の薬剤を追加',
  'patient.addMed': '患者リストに追加',
  'patient.addMedCta': '薬剤を追加',
  'patient.added': 'リストに追加しました',
  'patient.noMeds': 'まだ薬剤がありません — 投与量を計算して追加してください。',
  'patient.report': '薬剤レポート',
  'patient.shareReport': 'レポートを共有',
  'patient.copyReport': 'レポートをコピー',
  'patient.clearAll': 'すべて消去',
  'patient.remove': '削除',
  'patient.draw': '吸引',

  // Plant library
  'plants.title': '有毒植物ライブラリ',
  'plants.subtitle': '犬や猫に危険な植物を写真付きで識別します。',
  'plants.search': '植物を検索…',
  'plants.filter.all': 'すべて',
  'plants.filter.deadly': '致死 ☠',
  'plants.filter.severe': '重度',
  'plants.filter.cats': '猫のみ',
  'plants.level.mild': '軽度',
  'plants.level.moderate': '中等度',
  'plants.level.severe': '重度',
  'plants.level.deadly': '致死',
  'plants.toxin': '毒素',
  'plants.symptoms': '症状',
  'plants.action': '対処法',
  'plants.affected': 'リスク対象',
  'plants.noResults': '一致する植物がありません。',
  'plants.catsOnly': '猫',
  'plants.both': '犬と猫',
  'plants.photoCredit': '写真提供：ウィキメディア・コモンズ',
  'treat.title': '今すぐ治療 — 獣医用投与量',
  'treat.emesis': '催吐',
  'treat.charcoal': '活性炭',
  'treat.monitoring': 'モニタリング',
  'treat.status.indicated': '推奨',
  'treat.status.caution': '注意',
  'treat.status.no': '非推奨',
  'treat.disclaimer': '投与量は獣医療従事者向けです。投与前に引用元をご確認ください。',

  // Common
  'common.calculate': '計算',
  'common.reset': 'リセット',
  'common.copy': 'コピー',
  'common.copied': 'コピーしました！',
  'common.share': '共有',
  'common.close': '閉じる',
  'common.sources': '医学的出典',
  'common.optional': '任意',
  'common.select': '選択',
  'common.search': '検索',
  'common.required': '必須',
  'common.back': '戻る',
  'common.details': '詳細',
  'common.example': '例',
  'common.unit': '単位',

  // Species
  'species.label': '動物種',
  'species.dog': '犬',
  'species.cat': '猫',

  // Units / fields
  'field.weight': '体重',
  'unit.kg': 'kg',
  'unit.g': 'g',
  'unit.oz': 'オンス',
  'unit.mg': 'mg',
  'unit.ml': 'mL',
  'unit.mgkg': 'mg/kg',
  'unit.gkg': 'g/kg',
  'unit.tablets': '錠',
  'unit.pieces': '個',
  'unit.perDay': '1日あたり',

  // Dosage calculator
  'dose.title': '薬剤投与量計算ツール',
  'dose.subtitle': '体重・投与量・濃度から吸引量を算出します。',
  'dose.drug': '薬剤名',
  'dose.drugPlaceholder': '薬剤名を検索または入力…',
  'dose.perKg': 'kgあたりの投与量',
  'dose.doseUnit': '投与量の単位',
  'dose.concentration': '濃度',
  'dose.concUnit': '濃度の単位',
  'dose.route': '投与経路',
  'dose.rounding': '丸め',
  'dose.frequency': '頻度',
  'dose.freqPlaceholder': '例：8時間ごと',
  'dose.duration': '期間',
  'dose.durationPlaceholder': '例：7日間',
  'dose.volumeToDraw': '吸引量',
  'dose.totalDose': '総投与量',
  'dose.therapeuticRange': 'Plumb\'s 参照範囲',
  'dose.belowRange': '範囲未満',
  'dose.inRange': '範囲内',
  'dose.aboveRange': '範囲超過',
  'dose.plumbsRef': 'Plumb\'s 参照投与量',
  'dose.plumbsRefNone': 'この動物種の Plumb\'s 参照投与量はありません',
  'dose.plumbsRefHint': '参照用のみ — 投与前にご自身の専門的責任で確認してください。',
  'dose.vetOnly':
    '認可された獣医療目的のみに使用してください。臨床上の責任は担当獣医師にあります。Plumb\'s の参照投与量は目安であり、投与前に独立して確認する必要があります — 使用はご自身の専門的責任において行ってください。',
  'dose.noRange': 'この組み合わせの参照範囲はありません',
  'dose.breakdown': '計算の内訳',
  'dose.bodyWeight': '体重',
  'dose.doseGiven': '投与した量',
  'dose.rawVolume': '丸め前の容量',
  'dose.roundedVolume': '丸め後の容量',
  'dose.warnings': '警告',
  'dose.noWarnings': '警告なし',
  'dose.enterToCalc': '体重・投与量・濃度を入力して計算します。',

  // Routes
  'route.IV': '静脈内 (IV)',
  'route.IM': '筋肉内 (IM)',
  'route.SC': '皮下 (SC)',
  'route.PO': '経口 (PO)',

  // Toxicity suite
  'tox.title': '毒性計算ツール',
  'tox.subtitle': '体重と摂取量からリスクを推定します。補助ツールであり、獣医師の代わりにはなりません。',
  'tox.choose': '毒物を選択',
  'tox.amount': '摂取量',
  'tox.source': '種類 / 由来',
  'tox.riskLevel': 'リスクレベル',
  'tox.dosePerKg': '推定摂取量',
  'tox.expectedSigns': '予想される臨床症状',
  'tox.action': '推奨される対応',
  'tox.decon': '除染の時間枠',
  'tox.context': '臨床的背景',
  'tox.notForSpecies': 'この計算はこの動物種には適用されません。',
  'tox.idiosyncratic': '特異体質性の毒性 — 安全な閾値なし',

  // Risk bands
  'risk.minimal': '最小',
  'risk.mild': '軽度',
  'risk.moderate': '中等度',
  'risk.severe': '重度',
  'risk.critical': '危機的',
  'risk.emergency': '緊急',

  // Emergency
  'emergency.title': '緊急ですか？',
  'emergency.text':
    '中毒が疑われる場合は、すぐに最寄りのクリニックに電話してください。症状が出るのを待たず、診療時間と受け入れ可否を事前に確認してください。',
  'emergency.network': 'TeddyVets クリニックネットワーク',
  'emergency.allClinics': 'すべての TeddyVets クリニック',
  'emergency.note': 'クリニックは表示された時間内に診療しています。時間外や生命に関わる場合は、受け入れ可否を事前に電話で確認してください。',
  'emergency.callVet': 'かかりつけの獣医師に電話する',
  'emergency.generic.title': '緊急ですか？',
  'emergency.generic.text':
    '中毒が疑われる場合は、すぐに最寄りの動物病院または救急サービスに連絡してください。症状が出るのを待たず、受け入れ可否を事前に確認してください。',
  'emergency.submit.title': '救急動物病院を運営していますか？',
  'emergency.submit.text':
    'お住まいの地域の救急クリニック一覧を拡充しています。掲載をご希望の場合は、病院名・地域・電話・診療時間をメールでお送りください。',
  'emergency.submit.cta': 'メールで連絡',

  // Disclaimer / footer
  'disclaimer.title': '免責事項',
  'disclaimer.text':
    'この計算ツールは臨床判断を支援するためのものであり、専門的な獣医学的判断や中毒管理に代わるものではありません。治療前に各計算を薬剤参考資料と照合して確認してください。特異体質性の毒物（ブドウ、ユリ）は決して「安全」という結果を表示しません。',
  'footer.text': 'アシスタントのためのアシスタント · 無断転載禁止',
  'footer.madeWith': '臨床的な配慮を込めて制作',
  'footer.partner': '臨床パートナー',

  // About / FAQ — server-rendered SEO content
  'about.title': 'この獣医用計算ツールについて',
  'about.lead':
    'Vet-Holim は、犬と猫を診療する獣医師・動物看護師・技術者のための無料の臨床意思決定支援ツールです。1 ページに 4 つの機能をまとめています——吸引量を返す用量計算ツール、出典付きの中毒計算ツール群、写真付きの有毒植物ライブラリ、そして複数の薬剤をまとめて 1 通のレポートとして出力できる患者セッション。すべてブラウザ内で動作し、アカウント不要・アップロードなし・患者データが端末から出ることはありません。',
  'about.dosage.title': '薬用量計算ツール',
  'about.dosage.body':
    "動物種、体重、体重あたりの用量、製剤濃度を入力すると、吸引すべき正確な容量を返します。丸め精度はシリンジに合わせて 0.01・0.05・0.1 mL から選べます。Plumb's Veterinary Drug Handbook の参考レンジ付きで 130 種類以上の薬剤に対応し、公表レンジを外れた用量には警告を表示します。mg/kg、mcg/kg、IU/kg、mL/kg に対応し、静脈内・筋肉内・皮下・経口の各投与経路を扱えます。",
  'about.toxins.title': '中毒計算ツール',
  'about.toxins.body':
    '出典付きの中毒ツール 14 種が、体重と摂取量からリスクを推定します——チョコレートなどのメチルキサンチン類、ブドウとレーズン、キシリトール、タマネギとニンニク、マカダミアナッツ、イブプロフェン、アセトアミノフェン、ペルメトリン、ユリ、殺鼠剤、エチレングリコール、大麻、アルコール、カフェイン。各結果にはリスク区分、予想される臨床徴候、除染可能な時間枠、推奨される対応が示されます。特異体質性の毒物では「安全」という判定は決して表示されません。',
  'about.plants.title': '有毒植物ライブラリ',
  'about.plants.body':
    '犬と猫に危険な観葉植物・庭木を写真付きで収載した検索可能なライブラリで、軽度から致死的まで重症度で絞り込めます。各項目には毒性成分、関係する植物の部位、予想される臨床徴候、受診の緊急度を記載しています。',
  'about.patient.title': '患者セッション',
  'about.patient.body':
    '複数の薬剤を使う症例では、患者セッションを開始し、計算した用量を順にリストへ追加してください。薬剤名・用量・吸引量・投与経路・投与頻度をまとめた 1 通の投薬レポートをコピーまたは共有できます。申し送り、治療記録、飼い主への説明に便利です。',
  'about.who.title': '対象となる方',
  'about.who.body':
    '有資格の獣医療従事者と学生のために作られています。臨床上の責任は常に担当獣医師にあります。投与前に、必ずご自身の薬剤リファレンスで数値を確認してください。中毒が疑われる場合、飼い主の方は計算結果に基づいて対処せず、直ちに動物病院または救急サービスに連絡してください。',
  'faq.title': 'よくある質問',
  'faq.q1': 'この獣医用計算ツールは無料ですか。',
  'faq.a1': 'はい。すべての計算ツール、植物ライブラリ、患者セッションを無料でご利用いただけます。アカウント登録も不要です。',
  'faq.q2': '対象となる動物は何ですか。',
  'faq.a2':
    '犬と猫です。用量レンジ、中毒閾値、臨床徴候は 2 種で異なるため、まず動物種を選んでください。中毒計算のなかにはどちらか一方にのみ適用されるものがあり、その場合は明示されます。',
  'faq.q3': '用量レンジの出典はどこですか。',
  'faq.a3':
    "参考用量レンジは Plumb's Veterinary Drug Handbook に基づき、中毒閾値は各ツール内に引用した公表済みの獣医毒性学資料に基づいています。いずれも参考であり、治療前に必ず独自に確認してください。",
  'faq.q4': 'オフラインでも使えますか。',
  'faq.a4': 'はい。本サイトはインストール可能なプログレッシブウェブアプリです。一度ホーム画面に追加すれば、ネットワーク接続がなくても計算ツールは動作し続けます。',
  'faq.q5': '患者データはどこかに保存されますか。',
  'faq.a5': 'いいえ。すべての計算はブラウザ内でローカルに実行され、サーバーへのアップロードはありません。患者セッションは現在のタブ内にのみ存在します。',
  'faq.q6': '中毒が疑われるときはどうすればよいですか。',
  'faq.a6':
    '徴候が現れる前に、直ちにかかりつけの獣医師または最寄りの救急動物病院に連絡してください。中毒計算ツールは曝露量を見積もり、その相談を裏づけるためのものであり、受診を見送る判断に使うものではありません。',
};
