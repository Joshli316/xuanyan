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
