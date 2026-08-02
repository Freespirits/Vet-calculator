import type { TKey } from './he';

/** Simplified Chinese dictionary. UI chrome only; clinical data falls back to English. */
export const zh: Record<TKey, string> = {
  // Brand
  'brand.name': '兽医计算器',
  'brand.tagline': '临床兽医计算器 · 犬与猫',

  // Header / controls
  'ctl.language': '语言',
  'ctl.language.select': '选择语言',
  'ctl.theme.toDark': '深色',
  'ctl.theme.toLight': '浅色',
  'ctl.theme.toggle': '切换配色主题',

  // Hero
  'hero.title': '兽医计算器',
  'hero.subtitle':
    '面向犬猫的用药剂量与毒性计算：130 多种参考剂量范围、14 个附引用的毒性计算器，以及一个带照片的有毒植物图库。完全免费，离线可用。',
  'hero.cta': '开始计算',
  'hero.scroll': '滚动',

  // Tool switcher
  'tab.dosage': '剂量',
  'tab.toxins': '毒物',
  'tab.patient': '患者',
  'tab.plants': '植物',
  'tabs.aria': '选择计算器',

  // Patient session
  'patient.title': '患者会话',
  'patient.subtitle': '为同一名患者计算多种药物，然后导出一份汇总报告。',
  'patient.new': '新建患者',
  'patient.name': '患者姓名',
  'patient.namePlaceholder': '例如：Rex',
  'patient.start': '开始会话',
  'patient.active': '当前患者',
  'patient.end': '结束会话',
  'patient.meds': '药物',
  'patient.medsCount': '已添加药物',
  'patient.addMed': '添加到患者列表',
  'patient.addMedCta': '添加药物',
  'patient.added': '已加入列表',
  'patient.noMeds': '尚未添加药物——先计算剂量再添加。',
  'patient.report': '用药报告',
  'patient.shareReport': '分享报告',
  'patient.copyReport': '复制报告',
  'patient.clearAll': '全部清除',
  'patient.remove': '移除',
  'patient.draw': '抽取',

  // Plant library
  'plants.title': '有毒植物库',
  'plants.subtitle': '识别对犬猫有害的植物，附照片。',
  'plants.search': '搜索植物…',
  'plants.filter.all': '全部',
  'plants.filter.deadly': '致命 ☠',
  'plants.filter.severe': '严重',
  'plants.filter.cats': '仅限猫',
  'plants.level.mild': '轻度',
  'plants.level.moderate': '中度',
  'plants.level.severe': '严重',
  'plants.level.deadly': '致命',
  'plants.toxin': '毒素',
  'plants.symptoms': '症状',
  'plants.action': '应对措施',
  'plants.affected': '风险对象',
  'plants.noResults': '没有匹配的植物。',
  'plants.catsOnly': '猫',
  'plants.both': '犬与猫',
  'plants.photoCredit': '图片来源：维基共享资源',
  'treat.title': '立即治疗 — 兽医剂量',
  'treat.emesis': '催吐',
  'treat.charcoal': '活性炭',
  'treat.monitoring': '监测',
  'treat.status.indicated': '建议',
  'treat.status.caution': '谨慎',
  'treat.status.no': '不建议',
  'treat.disclaimer': '剂量供兽医专业人员使用——给药前请核对引用来源。',

  // Common
  'common.calculate': '计算',
  'common.reset': '重置',
  'common.copy': '复制',
  'common.copied': '已复制！',
  'common.share': '分享',
  'common.close': '关闭',
  'common.sources': '医学来源',
  'common.optional': '可选',
  'common.select': '选择',
  'common.search': '搜索',
  'common.required': '必填',
  'common.back': '返回',
  'common.details': '详情',
  'common.example': '例如',
  'common.unit': '单位',

  // Species
  'species.label': '物种',
  'species.dog': '犬',
  'species.cat': '猫',

  // Units / fields
  'field.weight': '体重',
  'unit.kg': '千克',
  'unit.g': '克',
  'unit.oz': '盎司',
  'unit.mg': '毫克',
  'unit.ml': '毫升',
  'unit.mgkg': '毫克/千克',
  'unit.gkg': '克/千克',
  'unit.tablets': '片',
  'unit.pieces': '个',
  'unit.perDay': '每天',

  // Dosage calculator
  'dose.title': '药物剂量计算器',
  'dose.subtitle': '根据体重、剂量和浓度计算抽取量。',
  'dose.drug': '药物名称',
  'dose.drugPlaceholder': '搜索或输入药物名称…',
  'dose.perKg': '每千克剂量',
  'dose.doseUnit': '剂量单位',
  'dose.concentration': '浓度',
  'dose.concUnit': '浓度单位',
  'dose.route': '给药途径',
  'dose.rounding': '取整',
  'dose.frequency': '频率',
  'dose.freqPlaceholder': '例如：每 8 小时',
  'dose.duration': '疗程',
  'dose.durationPlaceholder': '例如：7 天',
  'dose.volumeToDraw': '抽取量',
  'dose.totalDose': '总剂量',
  'dose.therapeuticRange': 'Plumb\'s 参考范围',
  'dose.belowRange': '低于范围',
  'dose.inRange': '在范围内',
  'dose.aboveRange': '高于范围',
  'dose.plumbsRef': 'Plumb\'s 参考剂量',
  'dose.plumbsRefNone': '该物种无 Plumb\'s 参考剂量',
  'dose.plumbsRefHint': '仅供参考——给药前请自行核实，由您承担专业责任。',
  'dose.vetOnly':
    '仅供持证兽医使用。临床责任由主治兽医承担。Plumb\'s 参考剂量仅作指导，给药前必须独立核实——使用须自负专业责任。',
  'dose.noRange': '该组合没有参考范围',
  'dose.breakdown': '计算明细',
  'dose.bodyWeight': '体重',
  'dose.doseGiven': '给药剂量',
  'dose.rawVolume': '取整前体积',
  'dose.roundedVolume': '取整后体积',
  'dose.warnings': '警告',
  'dose.noWarnings': '无警告',
  'dose.enterToCalc': '输入体重、剂量和浓度以进行计算。',

  // Routes
  'route.IV': '静脉注射 (IV)',
  'route.IM': '肌肉注射 (IM)',
  'route.SC': '皮下注射 (SC)',
  'route.PO': '口服 (PO)',

  // Toxicity suite
  'tox.title': '毒性计算器',
  'tox.subtitle': '根据体重和摄入量估算风险。仅为辅助工具——不能替代兽医。',
  'tox.choose': '选择一种毒物',
  'tox.amount': '摄入量',
  'tox.source': '类型 / 来源',
  'tox.riskLevel': '风险等级',
  'tox.dosePerKg': '估算剂量',
  'tox.expectedSigns': '预期临床体征',
  'tox.action': '建议措施',
  'tox.decon': '去污时间窗',
  'tox.context': '临床背景',
  'tox.notForSpecies': '此计算不适用于该物种。',
  'tox.idiosyncratic': '特异质性毒性——无安全阈值',

  // Risk bands
  'risk.minimal': '极低',
  'risk.mild': '轻度',
  'risk.moderate': '中度',
  'risk.severe': '严重',
  'risk.critical': '危急',
  'risk.emergency': '紧急',

  // Emergency
  'emergency.title': '紧急情况？',
  'emergency.text':
    '如怀疑中毒，请立即致电最近的诊所。不要等到出现症状——并请提前致电确认营业时间与是否就诊。',
  'emergency.network': 'TeddyVets 诊所网络',
  'emergency.allClinics': '所有 TeddyVets 诊所',
  'emergency.note': '诊所在所示时间内营业。在此时间之外，或遇危及生命的情况，请提前致电确认是否可接诊。',
  'emergency.callVet': '致电您的兽医',
  'emergency.generic.title': '紧急情况？',
  'emergency.generic.text':
    '如怀疑中毒，请立即联系最近的兽医诊所或急诊服务。不要等到出现症状——并请提前致电确认是否就诊。',
  'emergency.submit.title': '您经营兽医急诊诊所吗？',
  'emergency.submit.text':
    '我们正在为您所在地区扩充急诊诊所目录。如希望收录您的诊所，请将名称、地区、电话和营业时间发邮件给我们。',
  'emergency.submit.cta': '给我们发邮件',

  // Disclaimer / footer
  'disclaimer.title': '免责声明',
  'disclaimer.text':
    '本计算器是临床决策辅助工具，不能替代专业兽医判断或中毒控制中心。治疗前请对照药物参考资料核实每一项计算。特异质性毒物（葡萄、百合）永远不会显示“安全”结果。',
  'footer.text': '为助理而生的助理 · 版权所有',
  'footer.madeWith': '以临床之心打造',
  'footer.partner': '临床合作伙伴',

  // About / FAQ — server-rendered SEO content
  'about.title': '关于本兽医计算器',
  'about.lead':
    'Vet-Holim 是一款免费的临床决策支持工具，面向为犬猫诊疗的兽医师、护理人员与技术员。它把四件事整合在同一个页面：返回抽取体积的剂量计算器、一组附引用的毒性计算器、带照片的有毒植物图库，以及可导出为单份报告的多药物患病动物会话。全部在浏览器中运行——无需账号、无需上传，患病动物数据不会离开本机。',
  'about.dosage.title': '药物剂量计算器',
  'about.dosage.body':
    "输入动物种类、体重、每公斤剂量与制剂浓度，计算器即返回需抽取的精确体积，并按所选注射器精度（0.01、0.05 或 0.1 毫升）取整。覆盖 130 余种药物，参考范围取自 Plumb's Veterinary Drug Handbook，超出已发表范围的剂量会被标记；支持 mg/kg、mcg/kg、IU/kg 与 mL/kg，以及静脉、肌肉、皮下和口服给药途径。",
  'about.toxins.title': '毒性计算器',
  'about.toxins.body':
    '十四个附引用的毒性工具依据体重与摄入量估算风险：巧克力及其他甲基黄嘌呤、葡萄与葡萄干、木糖醇、洋葱与大蒜、夏威夷果、布洛芬、对乙酰氨基酚、氯菊酯、百合、灭鼠药、乙二醇、大麻、酒精与咖啡因。每个结果都给出风险等级、预期临床症状、去污染时间窗与建议处置。特异质性毒物永远不会给出“安全”结论。',
  'about.plants.title': '有毒植物图库',
  'about.plants.body':
    '一个可搜索、配有照片的图库，收录对犬猫有危险的室内与庭院植物，可按严重程度从轻微到致命筛选。每个条目列出毒性成分、涉及的植物部位、可能出现的临床症状，以及就诊的紧迫程度。',
  'about.patient.title': '患病动物会话',
  'about.patient.body':
    '同一病例需要多种药物？开启一个患病动物会话，把每次计算出的剂量加入列表，然后复制或分享一份汇总用药报告，包含药名、剂量、抽取体积、给药途径与频次——便于交班、治疗单与向主人交代医嘱。',
  'about.who.title': '适用人群',
  'about.who.body':
    '面向持证兽医专业人员与学生。临床责任始终在主治兽医师：给药前请用自己的药物参考资料核对每一个数值。怀疑中毒的宠物主人应立即联系兽医院或急诊服务，而不是依据计算结果自行处理。',
  'faq.title': '常见问题',
  'faq.q1': '这个兽医计算器免费吗？',
  'faq.a1': '免费。所有计算器、植物图库与患病动物会话均可免费使用，无需账号，无需注册。',
  'faq.q2': '支持哪些动物？',
  'faq.a2': '犬与猫。两个物种的剂量范围、毒性阈值与临床表现并不相同，因此请先选择物种——部分毒性计算只适用于其中一种，并会明确提示。',
  'faq.q3': '剂量范围的来源是什么？',
  'faq.a3': "参考剂量范围取自 Plumb's Veterinary Drug Handbook，毒性阈值来自各工具内注明的已发表兽医毒理学资料。这些仅供参考，用药前必须独立核实。",
  'faq.q4': '可以离线使用吗？',
  'faq.a4': '可以。本站是可安装的渐进式网页应用：添加到主屏幕一次后，计算器在没有网络连接时仍可继续使用。',
  'faq.q5': '患病动物数据会被保存吗？',
  'faq.a5': '不会。所有计算都在浏览器本地完成，不会上传到服务器。患病动物会话仅存在于当前标签页。',
  'faq.q6': '怀疑中毒时应该怎么做？',
  'faq.a6': '在症状出现之前就立即联系你的兽医师或最近的急诊医院。毒性计算器用于估算暴露量、为沟通提供依据，绝不能作为放弃就诊的理由。',
};
