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
  'hero.subtitle': '药物剂量与毒性计算——精确、快速，尽在掌中。',
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
};
