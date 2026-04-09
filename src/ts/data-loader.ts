// Static imports for all JSON data files — Vite requires static import paths for bundling
import report01 from '../data/reports/01.json';
import report02 from '../data/reports/02.json';
import report03 from '../data/reports/03.json';
import report04 from '../data/reports/04.json';
import report05 from '../data/reports/05.json';
import report06 from '../data/reports/06.json';
import report07 from '../data/reports/07.json';
import report08 from '../data/reports/08.json';
import report09 from '../data/reports/09.json';
import report10 from '../data/reports/10.json';
import report11 from '../data/reports/11.json';
import report12 from '../data/reports/12.json';
import timelineData from '../data/timeline.json';
import archiveIndex from '../data/archive-index.json';
import mapDataJson from '../data/map-data.json';

// Persona excerpt files
import personaRicci from '../data/personas/ricci.json';
import personaTaylor from '../data/personas/taylor.json';
import personaWangMingdao from '../data/personas/wang_mingdao.json';
import personaLottieMoon from '../data/personas/lottie_moon.json';
import personaJohnSung from '../data/personas/john_sung.json';
import personaWatchmanNee from '../data/personas/watchman_nee.json';
import personaMorrison from '../data/personas/morrison.json';
import personaXuGuangqi from '../data/personas/xu_guangqi.json';
import personaWangYi from '../data/personas/wang_yi.json';
import personaYungWing from '../data/personas/yung_wing.json';
import personaKhTing from '../data/personas/kh_ting.json';
import personaTrueJesus from '../data/personas/true_jesus_founder.json';

export interface Report {
  id: string;
  title: { en: string; cn: string };
  summary: { en: string; cn: string };
  content: { en: string; cn: string };
  sources: string[];
  tags: string[];
}

export const reports: Report[] = [
  report01, report02, report03, report04, report05, report06,
  report07, report08, report09, report10, report11, report12,
] as Report[];

export const timeline = timelineData;
export const archive = archiveIndex;
export const mapData = mapDataJson;

export interface PersonaExcerpt {
  text: string;
  source_title: string;
  source_year: number;
  source_page: string;
}

export interface PersonaData {
  id: string;
  name: { en: string; cn: string };
  dates: string;
  excerpts: PersonaExcerpt[];
}

export const personaCorpora: Record<string, PersonaData> = {
  ricci: personaRicci as PersonaData,
  taylor: personaTaylor as PersonaData,
  wang_mingdao: personaWangMingdao as PersonaData,
  lottie_moon: personaLottieMoon as PersonaData,
  john_sung: personaJohnSung as PersonaData,
  watchman_nee: personaWatchmanNee as PersonaData,
  morrison: personaMorrison as PersonaData,
  xu_guangqi: personaXuGuangqi as PersonaData,
  wang_yi: personaWangYi as PersonaData,
  yung_wing: personaYungWing as PersonaData,
  kh_ting: personaKhTing as PersonaData,
  true_jesus_founder: personaTrueJesus as PersonaData,
};
