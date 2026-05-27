/**
 * Major 24/7 emergency veterinary hospitals in Israel.
 *
 * Numbers verified against each clinic's official site (2026). There is NO
 * dedicated pet poison-control hotline in Israel — these round-the-clock
 * hospitals are the right emergency contacts. Hours can change; call ahead.
 *
 * Sources: vethospital.huji.ac.il/emergency · chavatdaat.co.il/branches ·
 * emergency-veterinary.co.il · vetcenter.co.il/emergency
 */
import { L, type LocalizedText } from '../types/toxins';

export interface EmergencyContact {
  name: LocalizedText;
  region: LocalizedText;
  /** Display form, e.g. "03-9688588". */
  phone: string;
  /** E.164 for the tel: link, e.g. "+97239688588". */
  tel: string;
}

export const ISRAEL_VET_ER: EmergencyContact[] = [
  {
    name: L('וט-חולים', 'Vet-Holim'),
    region: L('קו חירום נייד', 'Emergency mobile line'),
    phone: '054-561-3377',
    tel: '+972545613377',
  },
  {
    name: L('בית החולים הווטרינרי האוניברסיטאי', 'University Veterinary Hospital'),
    region: L('בית דגן · מרכז', 'Beit Dagan · Center'),
    phone: '03-9688588',
    tel: '+97239688588',
  },
  {
    name: L('בית החולים חוות דעת', 'Chavat Da’at Hospital'),
    region: L('כפר סבא · השרון', 'Kfar Saba · Sharon'),
    phone: '09-7431117',
    tel: '+97297431117',
  },
  {
    name: L('חוות דעת חיפה', 'Chavat Da’at Haifa'),
    region: L('חיפה · צפון', 'Haifa · North'),
    phone: '04-8342887',
    tel: '+97248342887',
  },
  {
    name: L('חוות דעת רחובות', 'Chavat Da’at Rehovot'),
    region: L('רחובות · מרכז', 'Rehovot · Center'),
    phone: '08-9390738',
    tel: '+97289390738',
  },
  {
    name: L('וט-סנטר ראש העין', 'Vet-Center Rosh HaAyin'),
    region: L('ראש העין · מרכז', 'Rosh HaAyin · Center'),
    phone: '09-9668133',
    tel: '+97299668133',
  },
];
