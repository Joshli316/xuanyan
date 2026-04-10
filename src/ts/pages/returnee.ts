import { t, getLang } from '../i18n';

interface ReturneeData {
  city: string;
  faithYears: number;
  baptized: boolean;
  discipleship: boolean;
  concerns: string[];
}

const CITIES = [
  'Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen', 'Chengdu',
  'Wuhan', 'Hangzhou', 'Nanjing', "Xi'an", 'Other'
];

const CITIES_CN: Record<string, string> = {
  'Beijing': '北京', 'Shanghai': '上海', 'Guangzhou': '广州', 'Shenzhen': '深圳',
  'Chengdu': '成都', 'Wuhan': '武汉', 'Hangzhou': '杭州', 'Nanjing': '南京',
  "Xi'an": '西安', 'Other': '其他'
};

const CONCERNS = ['church', 'family', 'workplace', 'loneliness', 'government', 'faith'];

let currentStep = 1;
let formData: ReturneeData = { city: '', faithYears: 3, baptized: false, discipleship: false, concerns: [] };

export function renderReturnee(): void {
  currentStep = 1;
  formData = { city: '', faithYears: 3, baptized: false, discipleship: false, concerns: [] };
  const app = document.getElementById('app')!;
  app.innerHTML = `
    <div class="tool-page container">
      <div class="tool-header">
        <h1>${t('returnee.title')}</h1>
        <p>${t('returnee.subtitle')}</p>
      </div>
      <div class="step-indicator" id="step-indicator">
        <div class="step-dot active"></div>
        <div class="step-dot"></div>
        <div class="step-dot"></div>
        <div class="step-dot"></div>
      </div>
      <div class="step-content" id="step-content"></div>
    </div>
  `;
  renderStep();
}

function renderStep(): void {
  // Update step indicators
  document.querySelectorAll('.step-dot').forEach((dot, i) => {
    dot.classList.remove('active', 'completed');
    if (i + 1 === currentStep) dot.classList.add('active');
    if (i + 1 < currentStep) dot.classList.add('completed');
  });

  const content = document.getElementById('step-content')!;
  switch (currentStep) {
    case 1: renderCityStep(content); break;
    case 2: renderFaithStep(content); break;
    case 3: renderConcernsStep(content); break;
    case 4: renderReturnKit(content); break;
  }
}

// --- Step 1: City Selection ---
function renderCityStep(content: HTMLElement): void {
  const lang = getLang();
  content.innerHTML = `
    <h2>${t('returnee.step1')}</h2>
    <div class="form-group">
      <select class="form-select" id="city-select">
        <option value="">${lang === 'en' ? '— Select city —' : '— 选择城市 —'}</option>
        ${CITIES.map(c => `<option value="${c}" ${formData.city === c ? 'selected' : ''}>${lang === 'cn' ? CITIES_CN[c] : c}</option>`).join('')}
      </select>
    </div>
    <button class="btn btn-primary" id="next-btn" ${!formData.city ? 'disabled style="opacity:0.5"' : ''}>${lang === 'en' ? 'Next' : '下一步'}</button>
  `;
  document.getElementById('city-select')?.addEventListener('change', (e) => {
    formData.city = (e.target as HTMLSelectElement).value;
    const btn = document.getElementById('next-btn') as HTMLButtonElement;
    btn.disabled = !formData.city;
    btn.style.opacity = formData.city ? '1' : '0.5';
  });
  document.getElementById('next-btn')?.addEventListener('click', () => {
    if (formData.city) { currentStep = 2; renderStep(); }
  });
}

// --- Step 2: Faith Profile ---
function renderFaithStep(content: HTMLElement): void {
  const lang = getLang();
  content.innerHTML = `
    <h2>${t('returnee.step2')}</h2>
    <div class="slider-group">
      <div class="slider-label">
        <span>${t('returnee.years')}</span>
        <span class="slider-value" id="years-val">${formData.faithYears} ${lang === 'en' ? 'years' : '年'}</span>
      </div>
      <input type="range" class="calc-slider" id="years-slider" min="0" max="20" value="${formData.faithYears}">
    </div>
    <div class="form-group">
      <label class="form-label">${t('returnee.baptized')}</label>
      <div style="display: flex; gap: 12px;">
        <button class="btn ${formData.baptized ? 'btn-primary' : 'btn-ghost'}" data-val="true">${t('returnee.yes')}</button>
        <button class="btn ${!formData.baptized ? 'btn-primary' : 'btn-ghost'}" data-val="false">${t('returnee.no')}</button>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">${t('returnee.discipleship')}</label>
      <div style="display: flex; gap: 12px;">
        <button class="btn ${formData.discipleship ? 'btn-primary' : 'btn-ghost'}" data-disc="true">${t('returnee.yes')}</button>
        <button class="btn ${!formData.discipleship ? 'btn-primary' : 'btn-ghost'}" data-disc="false">${t('returnee.no')}</button>
      </div>
    </div>
    <div style="display: flex; gap: 12px; margin-top: 24px;">
      <button class="btn btn-ghost" id="back-btn">${t('common.back')}</button>
      <button class="btn btn-primary" id="next-btn">${lang === 'en' ? 'Next' : '下一步'}</button>
    </div>
  `;
  document.getElementById('years-slider')?.addEventListener('input', (e) => {
    formData.faithYears = parseInt((e.target as HTMLInputElement).value);
    document.getElementById('years-val')!.textContent = `${formData.faithYears} ${lang === 'en' ? 'years' : '年'}`;
  });
  document.querySelectorAll('[data-val]').forEach(btn => {
    btn.addEventListener('click', () => { formData.baptized = (btn as HTMLElement).dataset.val === 'true'; renderStep(); });
  });
  document.querySelectorAll('[data-disc]').forEach(btn => {
    btn.addEventListener('click', () => { formData.discipleship = (btn as HTMLElement).dataset.disc === 'true'; renderStep(); });
  });
  document.getElementById('back-btn')?.addEventListener('click', () => { currentStep = 1; renderStep(); });
  document.getElementById('next-btn')?.addEventListener('click', () => { currentStep = 3; renderStep(); });
}

// --- Step 3: Concerns ---
function renderConcernsStep(content: HTMLElement): void {
  content.innerHTML = `
    <h2>${t('returnee.step3')}</h2>
    <div class="checkbox-group">
      ${CONCERNS.map(c => `
        <label class="checkbox-item ${formData.concerns.includes(c) ? 'selected' : ''}">
          <input type="checkbox" value="${c}" ${formData.concerns.includes(c) ? 'checked' : ''}>
          ${t(`returnee.concern.${c}`)}
        </label>
      `).join('')}
    </div>
    <div style="display: flex; gap: 12px; margin-top: 24px;">
      <button class="btn btn-ghost" id="back-btn">${t('common.back')}</button>
      <button class="btn btn-primary" id="generate-btn">${t('returnee.generate')}</button>
    </div>
  `;
  document.querySelectorAll('.checkbox-item input').forEach(cb => {
    cb.addEventListener('change', (e) => {
      const val = (e.target as HTMLInputElement).value;
      const checked = (e.target as HTMLInputElement).checked;
      if (checked) formData.concerns.push(val);
      else formData.concerns = formData.concerns.filter(c => c !== val);
      (cb as HTMLElement).closest('.checkbox-item')?.classList.toggle('selected', checked);
    });
  });
  document.getElementById('back-btn')?.addEventListener('click', () => { currentStep = 2; renderStep(); });
  document.getElementById('generate-btn')?.addEventListener('click', () => { currentStep = 4; renderStep(); });
}

// --- Step 4: Return Kit ---
function renderReturnKit(content: HTMLElement): void {
  const lang = getLang();

  content.innerHTML = `
    <div id="return-kit">
      <h2>${lang === 'en' ? `Your Return Kit — ${formData.city}` : `你的回国指南 — ${CITIES_CN[formData.city] || formData.city}`}</h2>

      <div class="card" style="margin-bottom: 24px;">
        <h3 style="color: var(--accent-gold);">${lang === 'en' ? '90-Day Spiritual Survival Plan' : '90天属灵生存计划'}</h3>
        ${generatePlan(formData, lang)}
      </div>

      <div class="card" style="margin-bottom: 24px;">
        <h3 style="color: var(--accent-gold);">${lang === 'en' ? 'City-Specific Guidance' : '城市指导'}</h3>
        ${generateCityGuide(formData, lang)}
      </div>

      ${formData.concerns.includes('family') ? `
      <div class="card" style="margin-bottom: 24px;">
        <h3 style="color: var(--accent-gold);">${lang === 'en' ? 'Family Conversation Scripts' : '家庭对话指南'}</h3>
        ${generateFamilyScripts(lang)}
      </div>
      ` : ''}

      <div class="card" style="margin-bottom: 24px;">
        <h3 style="color: var(--accent-gold);">${lang === 'en' ? 'Resources' : '资源'}</h3>
        ${generateResources(formData, lang)}
      </div>

      <div class="card" style="margin-bottom: 24px; border-color: var(--accent-gold);">
        <h3 style="color: var(--accent-gold);">${t('returnee.connect')}</h3>
        <p style="color: var(--text-secondary); font-size: 0.875rem; margin-bottom: 16px;">${t('returnee.connect.desc')}</p>
        <div class="form-group">
          <input class="form-input" type="text" placeholder="${lang === 'en' ? 'Your name' : '你的名字'}">
        </div>
        <div class="form-group">
          <input class="form-input" type="email" placeholder="${lang === 'en' ? 'Your email or WeChat' : '你的邮箱或微信'}">
        </div>
        <button class="btn btn-primary" id="connect-btn">${lang === 'en' ? 'Request Connection' : '请求联系'}</button>
      </div>

      <div style="display: flex; gap: 12px;">
        <button class="btn btn-primary" onclick="window.print()">${t('returnee.download')}</button>
        <button class="btn btn-ghost" id="save-offline-btn">${lang === 'en' ? 'Save Offline' : '离线保存'}</button>
        <button class="btn btn-ghost" id="restart-btn">${lang === 'en' ? 'Start Over' : '重新开始'}</button>
      </div>
    </div>
  `;

  wireReturnKitButtons(lang);
}

function wireReturnKitButtons(lang: string): void {
  document.getElementById('save-offline-btn')?.addEventListener('click', () => {
    const kitHtml = document.getElementById('return-kit')?.innerHTML || '';
    localStorage.setItem('xuanyan-return-kit', kitHtml);
    localStorage.setItem('xuanyan-return-kit-city', formData.city);
    const btn = document.getElementById('save-offline-btn')!;
    btn.textContent = lang === 'en' ? 'Saved!' : '已保存！';
    btn.style.borderColor = 'var(--success)';
    btn.style.color = 'var(--success)';
    setTimeout(() => { btn.textContent = lang === 'en' ? 'Save Offline' : '离线保存'; btn.style.borderColor = ''; btn.style.color = ''; }, 2000);
  });

  document.getElementById('connect-btn')?.addEventListener('click', () => {
    const btn = document.getElementById('connect-btn')!;
    btn.textContent = lang === 'en' ? 'Request Sent!' : '请求已发送！';
    btn.style.background = 'var(--success)';
    btn.style.borderColor = 'var(--success)';
    (btn as HTMLButtonElement).disabled = true;
  });

  document.getElementById('restart-btn')?.addEventListener('click', () => {
    currentStep = 1;
    formData = { city: '', faithYears: 3, baptized: false, discipleship: false, concerns: [] };
    renderStep();
  });
}

// --- Kit Content Generators ---

function planCard(title: string, body: string): string {
  return `<div style="padding: 16px; background: var(--bg-tertiary); border-radius: 2px;">
    <h4 style="font-family: var(--font-mono); color: var(--accent-gold);">${title}</h4>
    <p style="font-size: 0.875rem; color: var(--text-secondary);">${body}</p>
  </div>`;
}

function generatePlan(data: ReturneeData, lang: string): string {
  const isNewBeliever = data.faithYears < 2;
  if (lang === 'en') {
    return `<div style="display: grid; gap: 16px;">
      ${planCard('Daily', isNewBeliever
        ? 'Read one chapter of the Gospel of John. Use a Chinese-English parallel Bible app (YouVersion works offline).'
        : 'Continue your Bible reading plan. Journal one observation per day. Pray for one specific person in your home city.')}
      ${planCard('Weekly', 'Connect with at least one other Christian — even via VPN call if no local church is accessible. Write a brief reflection: what challenged your faith this week?')}
      ${planCard('Monthly', 'Check in with your overseas mentor or church contact. Evaluate: Am I growing, maintaining, or drifting? Adjust your plan honestly.')}
    </div>`;
  }
  return `<div style="display: grid; gap: 16px;">
    ${planCard('每日', isNewBeliever
      ? '阅读约翰福音一章。使用中英对照圣经应用（YouVersion 可离线使用）。'
      : '继续你的读经计划。每天写一条观察笔记。为你所在城市的一个人祷告。')}
    ${planCard('每周', '至少与一位基督徒联系——即使需要通过VPN通话。写一个简短的反思：这周什么挑战了你的信仰？')}
    ${planCard('每月', '与你的海外导师或教会联系人联络。评估：我在成长、维持还是偏离？诚实地调整你的计划。')}
  </div>`;
}

const CITY_GUIDES: Record<string, { en: string; cn: string }> = {
  'Beijing': {
    en: 'Beijing has both registered Three-Self churches and a vibrant (if pressured) house church network. Haidian district near universities has the densest Christian community. Since 2018, several prominent churches have faced closures. Connect with trusted contacts before arriving.',
    cn: '北京既有登记的三自教会，也有活跃的（虽然受压）家庭教会网络。海淀区大学附近有最密集的基督徒社区。2018年以来，几间知名教会遭到关闭。到达前请联系可信赖的联系人。'
  },
  'Shanghai': {
    en: 'Shanghai has a relatively open Christian environment by Chinese standards. Community Church on Hengshan Road welcomes English speakers. Several house churches operate in Pudong and Jing\'an. The international community provides additional fellowship options.',
    cn: '以中国标准来看，上海的基督教环境相对开放。衡山路的国际礼拜堂欢迎英语使用者。浦东和静安区有几间家庭教会。国际社区提供额外的团契选择。'
  },
  'Chengdu': {
    en: 'Chengdu has been under significant church pressure since the 2018 arrest of Pastor Wang Yi. Early Rain Covenant Church members scattered but maintain underground networks. House churches here have increased caution. Seek warm introductions only — do not search openly.',
    cn: '自2018年王怡牧师被捕以来，成都的教会压力显著增大。秋雨之福教会成员虽然分散但保持着地下网络。这里的家庭教会更加谨慎。只通过熟人介绍——不要公开寻找。'
  },
  'Guangzhou': {
    en: 'Guangzhou has a long missions history and relatively diverse church landscape. Shamian Island and Dongshan areas have historic church buildings. The city\'s proximity to Hong Kong provides some cultural openness.',
    cn: '广州有悠久的宣教历史和相对多元的教会格局。沙面岛和东山区有历史教堂建筑。该城市靠近香港，提供了一定的文化开放度。'
  },
};

function generateCityGuide(data: ReturneeData, lang: string): string {
  const info = CITY_GUIDES[data.city] || {
    en: `Research the Christian landscape in ${data.city} before arriving. Connect with Bridges Chinese Network or ChinaSource for local contacts. Every city is different — what works in Wenzhou will not work in Urumqi.`,
    cn: `在到达前研究${CITIES_CN[data.city] || data.city}的基督教状况。联系桥梁事工或中国源获取当地联系人。每个城市都不同——在温州适用的方法在乌鲁木齐可能不适用。`
  };
  return `<p style="font-size: 0.9375rem; line-height: 1.7; color: var(--text-secondary);">${info[lang as 'en' | 'cn']}</p>`;
}

function scriptCard(prompt: string, response: string): string {
  return `<div style="padding: 16px; background: var(--bg-tertiary); border-radius: 2px;">
    <p style="font-size: 0.875rem; font-weight: 600; margin-bottom: 4px;">${prompt}</p>
    <p style="font-size: 0.875rem; color: var(--text-secondary);">${response}</p>
  </div>`;
}

function generateFamilyScripts(lang: string): string {
  if (lang === 'en') {
    return `<div style="display: grid; gap: 12px;">
      ${scriptCard('If asked: "Have you joined a cult abroad?"', '"I\'ve been learning about a faith community that has been part of Chinese history for over 1,000 years. It\'s helped me find peace and purpose during a difficult time abroad."')}
      ${scriptCard('If pressured: "This is a Western religion"', '"Christianity has been in China since the Tang Dynasty — 635 AD, before it reached most of Europe. Some of the most important Chinese historical figures were Christians, including Sun Yat-sen."')}
    </div>`;
  }
  return `<div style="display: grid; gap: 12px;">
    ${scriptCard('如果被问："你在国外加入邪教了吗？"', '"我了解到一个在中国历史上存在了一千多年的信仰群体。它帮助我在海外困难时期找到了平安和目标。"')}
    ${scriptCard('如果被施压："这是西方宗教"', '"基督教从唐朝（公元635年）就传入中国了——比传到欧洲大部分地区还早。中国历史上一些最重要的人物都是基督徒，包括孙中山。"')}
  </div>`;
}

function generateResources(data: ReturneeData, lang: string): string {
  const items = lang === 'en'
    ? [
        '→ YouVersion Bible App (works offline in China)',
        '→ WeDevote (微读圣经) — popular Chinese devotional app',
        '→ Download sermons/podcasts before losing VPN access',
        '→ Print key Scripture passages — digital may not always be accessible',
      ]
    : [
        '→ YouVersion 圣经应用（在中国可离线使用）',
        '→ 微读圣经 — 中国流行的灵修应用',
        '→ 在失去VPN之前下载讲道/播客',
        '→ 打印关键经文段落——数字设备可能不总是可用',
      ];

  const warning = !data.discipleship
    ? `<li style="padding: 8px 0; color: var(--warning); font-size: 0.875rem;">${lang === 'en'
        ? '⚠ Consider completing a discipleship program before returning — your retention risk is significantly higher without one.'
        : '⚠ 考虑在回国前完成门训课程——没有门训的情况下信仰保留风险显著更高。'}</li>`
    : '';

  return `<ul style="list-style: none; padding: 0;">
    ${items.map(item => `<li style="padding: 8px 0; color: var(--text-secondary); font-size: 0.875rem;">${item}</li>`).join('')}
    ${warning}
  </ul>`;
}
