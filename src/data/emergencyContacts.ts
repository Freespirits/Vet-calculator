/**
 * TeddyVets clinic network — the veterinary clinics this app refers to.
 *
 * TeddyVets (טדי) is the clinical partner / buyer of this web-app, so the
 * app directs exclusively to their branches. These are full-service clinics
 * with set opening hours (NOT round-the-clock ER hospitals) — always call
 * ahead to confirm availability before arriving.
 *
 * Names, addresses, phones and hours sourced from the official directory:
 * https://teddyvets.co.il/our-clinics/ (read 2026). Hours change — verify.
 */
import { L, type LocalizedText } from '../types/toxins';

export interface EmergencyContact {
  name: LocalizedText;
  /** City / area shown under the name. */
  region: LocalizedText;
  /** Street address for context. */
  address: LocalizedText;
  /** Opening hours, short form. */
  hours: LocalizedText;
  /** Display form, e.g. "08-6744200". */
  phone: string;
  /** E.164 for the tel: link, e.g. "+97286744200". */
  tel: string;
}

/** Public directory of all branches, linked from the emergency banner. */
export const TEDDYVETS_CLINICS_URL = 'https://teddyvets.co.il/our-clinics/';

/**
 * Where clinics outside the TeddyVets (Israel) network can ask to be listed.
 * Shown in the emergency banner for every non-Hebrew language, since we don't
 * yet carry a local emergency directory for those regions.
 */
export const SUBMIT_CLINIC_EMAIL = 'admin@hack-tech.org';

export const ISRAEL_VET_ER: EmergencyContact[] = [
  {
    name: L('טדי מודיעין', 'TeddyVets Modi’in'),
    region: L('מודיעין · מרכז', 'Modi’in · Center'),
    address: L('רא״ל יגאל ידין 51', '51 Yigal Yadin'),
    hours: L("א׳-ה׳ 09:00-21:00 · ו׳ 09:00-15:00 · ש׳ 18:00-21:00", 'Sun–Thu 09:00–21:00 · Fri 09:00–15:00 · Sat 18:00–21:00'),
    phone: '08-6744200',
    tel: '+97286744200',
  },
  {
    name: L('טדי חולון', 'TeddyVets Holon'),
    region: L('חולון · מרכז', 'Holon · Center'),
    address: L('בילינסון 1', '1 Beilinson'),
    hours: L("א׳-ה׳ 09:00-19:00 · ו׳ 09:00-13:00", 'Sun–Thu 09:00–19:00 · Fri 09:00–13:00'),
    phone: '03-6511770',
    tel: '+97236511770',
  },
  {
    name: L('טדי נתניה', 'TeddyVets Netanya'),
    region: L('נתניה · השרון', 'Netanya · Sharon'),
    address: L('א.ד. גורדון 2', '2 A.D. Gordon'),
    hours: L("א׳-ה׳ 09:00-20:00 · ו׳ 08:30-14:00", 'Sun–Thu 09:00–20:00 · Fri 08:30–14:00'),
    phone: '09-7720370',
    tel: '+97297720370',
  },
  {
    name: L('טדי נווה צדק', 'TeddyVets Neve Tzedek'),
    region: L('תל אביב · מרכז', 'Tel Aviv · Center'),
    address: L('יעב״ץ 32', '32 Ya’avetz'),
    hours: L("א׳-ה׳ 09:00-20:00 · ו׳ 09:00-13:00", 'Sun–Thu 09:00–20:00 · Fri 09:00–13:00'),
    phone: '03-5160257',
    tel: '+97235160257',
  },
  {
    name: L('טדי כפר רות', 'TeddyVets Kfar Ruth'),
    region: L('כפר רות · מרכז', 'Kfar Ruth · Center'),
    address: L('כפר רות', 'Kfar Ruth'),
    hours: L("א׳,ג׳,ה׳ 08:30-20:00 · ב׳,ד׳ 08:30-15:00 · ו׳ 08:30-13:00", 'Sun/Tue/Thu 08:30–20:00 · Mon/Wed 08:30–15:00 · Fri 08:30–13:00'),
    phone: '08-9763366',
    tel: '+97289763366',
  },
  {
    name: L('טדי אור יהודה', 'TeddyVets Or Yehuda'),
    region: L('אור יהודה · מרכז', 'Or Yehuda · Center'),
    address: L('היוצרים 4', '4 HaYotzrim'),
    hours: L("א׳-ה׳ 09:00-19:00 · ו׳ 09:00-13:00", 'Sun–Thu 09:00–19:00 · Fri 09:00–13:00'),
    phone: '050-9040801',
    tel: '+972509040801',
  },
];
