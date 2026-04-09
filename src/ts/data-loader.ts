// Report metadata — lightweight, always loaded for listing/search
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

// Lazy loaders for heavy data — only fetched when needed
export async function loadTimeline(): Promise<any[]> {
  const mod = await import('../data/timeline.json');
  return mod.default || mod;
}

export async function loadMapData(): Promise<any[]> {
  const mod = await import('../data/map-data.json');
  return mod.default || mod;
}

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

const personaLoaders: Record<string, () => Promise<PersonaData>> = {
  ricci: () => import('../data/personas/ricci.json').then(m => m.default || m),
  taylor: () => import('../data/personas/taylor.json').then(m => m.default || m),
  wang_mingdao: () => import('../data/personas/wang_mingdao.json').then(m => m.default || m),
  lottie_moon: () => import('../data/personas/lottie_moon.json').then(m => m.default || m),
  john_sung: () => import('../data/personas/john_sung.json').then(m => m.default || m),
  watchman_nee: () => import('../data/personas/watchman_nee.json').then(m => m.default || m),
  morrison: () => import('../data/personas/morrison.json').then(m => m.default || m),
  xu_guangqi: () => import('../data/personas/xu_guangqi.json').then(m => m.default || m),
  wang_yi: () => import('../data/personas/wang_yi.json').then(m => m.default || m),
  yung_wing: () => import('../data/personas/yung_wing.json').then(m => m.default || m),
  kh_ting: () => import('../data/personas/kh_ting.json').then(m => m.default || m),
  true_jesus_founder: () => import('../data/personas/true_jesus_founder.json').then(m => m.default || m),
};

const personaCache: Record<string, PersonaData> = {};

export async function loadPersona(id: string): Promise<PersonaData | null> {
  if (personaCache[id]) return personaCache[id];
  const loader = personaLoaders[id];
  if (!loader) return null;
  const data = await loader();
  personaCache[id] = data;
  return data;
}
