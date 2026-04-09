import { registerRoute, initApp } from './main';
import { renderHome } from './pages/home';
import { renderResearchList, renderResearchDetail } from './pages/research';
import { renderTimeline } from './pages/timeline';
import { renderAskArchive } from './pages/ask-archive';
import { renderToolsHub } from './pages/tools-hub';
import { renderReturnee } from './pages/returnee';
import { renderTraining, renderTrainingModule } from './pages/training';
import { renderPersonasHub, renderPersonaChat } from './pages/personas';
import { renderRetention } from './pages/retention';
import { renderGaps } from './pages/gaps';
import { renderComparator } from './pages/comparator';
import { renderMap } from './pages/map';
import { renderNetwork } from './pages/network';
import { renderAbout } from './pages/about';
import { initSearch } from './search';

// Register all routes
registerRoute('/', renderHome);
registerRoute('/research', renderResearchList);
registerRoute('/research/:id', renderResearchDetail);
registerRoute('/research/timeline', renderTimeline);
registerRoute('/research/map', renderMap);
registerRoute('/research/network', renderNetwork);
registerRoute('/research/gaps', renderGaps);
registerRoute('/research/comparator', renderComparator);
registerRoute('/tools', renderToolsHub);
registerRoute('/tools/ask', renderAskArchive);
registerRoute('/tools/returnee', renderReturnee);
registerRoute('/tools/training', renderTraining);
registerRoute('/tools/training/:id', renderTrainingModule);
registerRoute('/tools/conversations', renderPersonasHub);
registerRoute('/tools/conversations/:id', renderPersonaChat);
registerRoute('/tools/retention', renderRetention);
registerRoute('/about', renderAbout);

// Init search and app
initSearch();
initApp();
