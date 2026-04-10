type Lang = 'en' | 'cn';

interface Translations {
  [key: string]: { en: string; cn: string };
}

const strings: Translations = {
  // Nav
  'nav.research': { en: 'Research', cn: '研究' },
  'nav.tools': { en: 'Tools', cn: '工具' },
  'nav.about': { en: 'About', cn: '关于' },
  'nav.search': { en: 'Search', cn: '搜索' },

  // Hero
  'hero.title': { en: 'Where Missions History Meets AI Innovation', cn: '当宣教历史遇见人工智能' },
  'hero.subtitle': {
    en: 'The only bilingual research archive connecting 1,400 years of China missions history to today\'s international student ministry. 12 reports. 6 interactive tools. One searchable platform.',
    cn: '唯一将1400年中国宣教历史与当今留学生事工连接起来的双语研究档案。12篇报告，6个交互工具，一个可搜索的平台。'
  },
  'hero.cta.research': { en: 'Read the Reports', cn: '阅读报告' },
  'hero.cta.tools': { en: 'Use Tools', cn: '使用工具' },

  // Stat band
  'stats.years': { en: 'Years of History', cn: '年的历史' },
  'stats.reports': { en: 'Research Reports', cn: '研究报告' },
  'stats.stations': { en: 'Mission Stations Mapped', cn: '已绘制宣教站' },
  'stats.personas': { en: 'Historical Personas', cn: '历史人物' },

  // Section labels (editorial markers)
  'section.label.offer': { en: 'OFFER', cn: '提供' },
  'section.label.audience': { en: 'AUDIENCE', cn: '受众' },
  'section.label.lab': { en: 'LAB', cn: '实验室' },

  // What We Offer
  'offer.title': { en: 'What We Offer', cn: '我们提供什么' },
  'offer.subtitle': {
    en: 'Research depth meets practical ministry — in both languages.',
    cn: '研究深度与实践事工相结合——双语呈现。'
  },
  'offer.observatory': { en: 'Research Observatory', cn: '研究观测站' },
  'offer.observatory.1': { en: '12 in-depth research reports on China missions history', cn: '12篇深度中国宣教历史研究报告' },
  'offer.observatory.2': { en: 'Interactive timeline spanning 635 AD to today', cn: '从公元635年至今的互动时间线' },
  'offer.observatory.3': { en: 'AI-powered search across the entire archive', cn: 'AI驱动的全档案搜索' },
  'offer.tools': { en: 'Ministry Tools', cn: '事工工具' },
  'offer.tools.1': { en: 'Ask the Archive — AI research assistant with source citations', cn: '问档案——带来源引用的AI研究助手' },
  'offer.tools.2': { en: 'Returnee Preparation Tool — personalized return kits', cn: '回国准备工具——个性化回国指南' },
  'offer.tools.3': { en: 'Volunteer Training Modules — cultural intelligence courses', cn: '志愿者培训模块——跨文化智慧课程' },

  // Audience
  'audience.title': { en: 'Who This Is For', cn: '适合人群' },
  'audience.missionaries': { en: 'Missionaries', cn: '宣教士' },
  'audience.missionaries.desc': { en: 'Learn what worked and what failed across 1,400 years — before you repeat it', cn: '了解1400年来哪些方法有效、哪些失败——避免重蹈覆辙' },
  'audience.scholars': { en: 'Scholars', cn: '学者' },
  'audience.scholars.desc': { en: 'Search primary sources in both languages without switching databases', cn: '在一个平台上用双语检索原始资料' },
  'audience.chinese': { en: 'Chinese Christians', cn: '华人基督徒' },
  'audience.chinese.desc': { en: 'Heritage exploration and returnee resources', cn: '信仰传承探索与回国资源' },
  'audience.seekers': { en: 'Non-Christians', cn: '非基督徒' },
  'audience.seekers.desc': { en: 'Cultural and historical education', cn: '文化与历史教育' },
  'audience.volunteers': { en: 'Volunteers', cn: '志愿者' },
  'audience.volunteers.desc': { en: 'Training modules for campus ministry', cn: '校园事工培训模块' },
  'audience.churches': { en: 'Churches', cn: '教会' },
  'audience.churches.desc': { en: 'Partnership playbooks and returnee connections', cn: '合作手册与回国者联络' },
  'audience.funders': { en: 'Funders', cn: '资助者' },
  'audience.funders.desc': { en: 'See what AI-powered ministry tools look like — built, not pitched', cn: '看看AI赋能的事工工具长什么样——已建成，不是PPT' },

  // Footer
  'footer.mission': {
    en: 'Built by Frontier Commons Innovation Lab. We believe AI can serve the Great Commission — not replace human connection, but extend it.',
    cn: '由 Frontier Commons 创新实验室打造。我们相信AI可以服务于大使命——不是取代人际连接，而是延伸它。'
  },
  'footer.tagline': { en: 'Powered by AI. Grounded in 1,400 years of history.', cn: 'AI驱动，扎根于1400年的历史。' },
  'footer.fc': { en: 'Frontier Commons', cn: 'Frontier Commons' },
  'footer.privacy': { en: 'Privacy', cn: '隐私政策' },
  'footer.github': { en: 'GitHub', cn: 'GitHub' },

  // Research page
  'research.title': { en: 'Research Reports', cn: '研究报告' },
  'research.subtitle': {
    en: '12 in-depth reports on China missions — from the Nestorian era to AI-enabled scholarship.',
    cn: '12篇深度中国宣教研究报告——从景教时代到AI赋能的学术研究。'
  },
  'research.filter.all': { en: 'All', cn: '全部' },
  'research.filter.history': { en: 'History', cn: '历史' },
  'research.filter.gaps': { en: 'Gaps', cn: '研究缺口' },
  'research.filter.ai': { en: 'AI', cn: 'AI' },
  'research.filter.ministry': { en: 'Ministry', cn: '事工' },
  'research.filter.contemporary': { en: 'Contemporary', cn: '当代' },

  // Timeline
  'timeline.title': { en: '1,400 Years of China Missions', cn: '1400年中国宣教历史' },
  'timeline.subtitle': {
    en: 'From Alopen\'s arrival in 635 AD to the contemporary church — scroll through the key moments.',
    cn: '从公元635年阿罗本的到来到当代教会——滚动浏览关键时刻。'
  },
  'timeline.autoplay': { en: 'Auto-Play', cn: '自动播放' },
  'timeline.pause': { en: 'Pause', cn: '暂停' },

  // Ask the Archive
  'ask.title': { en: 'Ask the Archive', cn: '问档案' },
  'ask.subtitle': {
    en: 'Ask anything about China missions history. Every answer is grounded in our 12 research reports with source citations.',
    cn: '关于中国宣教历史的任何问题。每个答案都以我们的12篇研究报告为依据，并提供来源引用。'
  },
  'ask.placeholder': { en: 'Ask anything about China missions history...', cn: '关于中国宣教历史的任何问题...' },
  'ask.send': { en: 'Send', cn: '发送' },
  'ask.thinking': { en: 'Searching the archive...', cn: '搜索档案中...' },

  // Search
  'search.placeholder': { en: 'Search reports, tools, timeline...', cn: '搜索报告、工具、时间线...' },
  'search.hint': { en: 'Press Cmd+K to search', cn: '按 Cmd+K 搜索' },
  'search.no_results': { en: 'No results found', cn: '未找到结果' },

  // Timeline eras
  'era.nestorian': { en: 'Tang Dynasty', cn: '唐朝' },
  'era.catholic': { en: 'Jesuits', cn: '耶稣会' },
  'era.protestant': { en: 'Protestant Era', cn: '新教时代' },
  'era.republican': { en: 'Republican', cn: '民国' },
  'era.communist': { en: 'Communist', cn: '共产主义时期' },
  'era.contemporary': { en: 'Contemporary', cn: '当代' },

  // Report TOC
  'toc.title': { en: 'Contents', cn: '目录' },
  'toc.sources': { en: 'Sources', cn: '参考来源' },
  'toc.back': { en: '← Back to Reports', cn: '← 返回报告列表' },

  // Tools
  'tools.title': { en: 'Ministry Tools', cn: '事工工具' },
  'tools.subtitle': {
    en: 'Practical tools built on research — for missionaries, volunteers, and returning students.',
    cn: '基于研究的实用工具——为宣教士、志愿者和回国学生而建。'
  },

  // Returnee tool
  'returnee.title': { en: 'Returnee Preparation Tool', cn: '回国准备工具' },
  'returnee.subtitle': {
    en: 'Get a personalized Return Kit based on your destination, faith profile, and concerns.',
    cn: '根据你的目的地、信仰状况和顾虑获取个性化回国指南。'
  },
  'returnee.step1': { en: 'Where are you returning to?', cn: '你要回到哪个城市？' },
  'returnee.step2': { en: 'Your Faith Profile', cn: '你的信仰状况' },
  'returnee.step3': { en: 'What concerns you most?', cn: '你最担心什么？' },
  'returnee.generate': { en: 'Generate My Return Kit', cn: '生成我的回国指南' },
  'returnee.download': { en: 'Download PDF', cn: '下载PDF' },
  'returnee.years': { en: 'How long have you been a Christian?', cn: '你信主多久了？' },
  'returnee.baptized': { en: 'Have you been baptized?', cn: '你受洗了吗？' },
  'returnee.discipleship': { en: 'Have you completed a discipleship program?', cn: '你完成了门训课程吗？' },
  'returnee.yes': { en: 'Yes', cn: '是' },
  'returnee.no': { en: 'No', cn: '否' },
  'returnee.concern.church': { en: 'Finding a church', cn: '找到教会' },
  'returnee.concern.family': { en: 'Family pressure', cn: '家庭压力' },
  'returnee.concern.workplace': { en: 'Workplace identity', cn: '职场身份' },
  'returnee.concern.loneliness': { en: 'Loneliness', cn: '孤独感' },
  'returnee.concern.government': { en: 'Government restrictions', cn: '政府限制' },
  'returnee.concern.faith': { en: 'Losing faith', cn: '失去信仰' },
  'returnee.connect': { en: 'Connect Me', cn: '帮我联系' },
  'returnee.connect.desc': {
    en: 'Request a warm introduction to a church contact in your destination city.',
    cn: '请求我们为你介绍目的地城市的教会联系人。'
  },

  // Training
  'training.title': { en: 'Volunteer Training', cn: '志愿者培训' },
  'training.subtitle': {
    en: '6 modules to prepare you for effective cross-cultural ministry with Chinese international students.',
    cn: '6个模块帮助你为中国留学生的跨文化事工做好准备。'
  },
  'training.progress': { en: 'modules completed', cn: '个模块已完成' },
  'training.start': { en: 'Start Module', cn: '开始模块' },
  'training.continue': { en: 'Continue', cn: '继续' },
  'training.completed': { en: 'Completed', cn: '已完成' },
  'training.quiz': { en: 'Knowledge Check', cn: '知识检测' },
  'training.reflection': { en: 'Reflection', cn: '反思' },
  'training.next': { en: 'Next Section', cn: '下一节' },

  // Personas
  'personas.title': { en: 'Historical Conversations', cn: '与历史对话' },
  'personas.subtitle': {
    en: 'Chat with 12 key figures from China missions history. Each responds in character, grounded in their actual writings.',
    cn: '与中国宣教历史上的12位关键人物对话。每位人物都基于其实际著作进行角色扮演回答。'
  },

  // Retention Calculator
  'retention.title': { en: 'Faith Retention Calculator', cn: '信仰保留率计算器' },
  'retention.subtitle': {
    en: 'Estimate the likelihood that a returning student will maintain active faith — and see what factors you can influence.',
    cn: '估算回国学生保持活跃信仰的可能性——看看你能影响哪些因素。'
  },
  'retention.calculate': { en: 'Calculate', cn: '计算' },
  'retention.whatif': { en: 'What If Mode', cn: '假设模式' },
  'retention.result': { en: 'Estimated Retention', cn: '估算保留率' },
  'retention.discipleship': { en: 'Discipleship Depth', cn: '门训深度' },
  'retention.preparation': { en: 'Pre-Return Preparation', cn: '回国前准备' },
  'retention.relational': { en: 'Relational Factors', cn: '关系因素' },
  'retention.duration': { en: 'Duration of Faith', cn: '信仰时长' },
  'retention.connections': { en: 'China-Side Connections', cn: '中国端联系' },

  // Gaps
  'gaps.title': { en: 'Research Gap Tracker', cn: '研究缺口追踪' },
  'gaps.subtitle': {
    en: 'Track the biggest unanswered questions in China missions scholarship. Claim a gap to contribute.',
    cn: '追踪中国宣教学术中最大的未解答问题。认领一个缺口来贡献。'
  },
  'gaps.filter.category': { en: 'Category', cn: '类别' },
  'gaps.filter.status': { en: 'Status', cn: '状态' },
  'gaps.filter.ai': { en: 'AI Feasibility', cn: 'AI可行性' },
  'gaps.claim': { en: "I'm working on this", cn: '我在研究这个' },

  // Comparator
  'comparator.title': { en: 'Bilingual Comparator', cn: '双语比较器' },
  'comparator.subtitle': {
    en: 'Compare how the same historical events are described in English and Chinese sources.',
    cn: '比较同一历史事件在中英文来源中的不同描述。'
  },
  'comparator.select': { en: 'Select an event', cn: '选择一个事件' },
  'comparator.translate': { en: 'Translate', cn: '翻译' },
  'comparator.why': { en: 'Why These Differ', cn: '为什么不同' },

  // About
  'about.title': { en: 'About XuanYan', cn: '关于宣研' },
  'about.p1': {
    en: 'XuanYan (宣研) is a project of Frontier Commons Innovation Lab — a faith-based nonprofit applying AI to international student ministry.',
    cn: '宣研是 Frontier Commons 创新实验室的项目——一个将AI应用于留学生事工的信仰非营利组织。'
  },
  'about.p2': {
    en: 'The platform connects 1,400 years of missions history to practical ministry tools. Every feature is bilingual, AI-powered, and grounded in peer-reviewed research.',
    cn: '该平台将1400年的宣教历史与实用事工工具连接起来。每个功能都是双语的、AI驱动的，并以同行评审的研究为基础。'
  },
  'about.p3': {
    en: 'We believe missions innovation happens when you build tools, not just publish articles. XuanYan is proof that AI can serve the Great Commission.',
    cn: '我们相信宣教创新发生在你建造工具而不仅仅是发表文章的时候。宣研证明了AI可以服务于大使命。'
  },

  // Common
  'common.loading': { en: 'Loading...', cn: '加载中...' },
  'common.error': { en: 'Something went wrong. Please try again.', cn: '出了点问题，请重试。' },
  'common.back': { en: 'Back', cn: '返回' },
};

let currentLang: Lang = (localStorage.getItem('xuanyan-lang') as Lang) || 'en';

export function t(key: string): string {
  const entry = strings[key];
  if (!entry) {
    console.warn(`Missing i18n key: ${key}`);
    return key;
  }
  return entry[currentLang];
}

export function getLang(): Lang {
  return currentLang;
}

export function setLang(lang: Lang): void {
  currentLang = lang;
  localStorage.setItem('xuanyan-lang', lang);
  document.documentElement.lang = lang === 'cn' ? 'zh-CN' : 'en';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n')!;
    el.textContent = t(key);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder')!;
    (el as HTMLInputElement).placeholder = t(key);
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html')!;
    el.innerHTML = t(key);
  });
  window.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

export function toggleLang(): void {
  setLang(currentLang === 'en' ? 'cn' : 'en');
}

export { type Lang, type Translations };
