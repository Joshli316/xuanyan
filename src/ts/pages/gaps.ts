import { t, getLang } from '../i18n';

interface Gap {
  id: number;
  category: string;
  title: { en: string; cn: string };
  description: { en: string; cn: string };
  status: 'not_started' | 'in_progress' | 'published';
  ai_feasibility: 'yes' | 'partial' | 'no';
  claimed_by?: string;
}

function getGaps(): Gap[] {
  return [
    { id: 1, category: 'Periods', title: { en: 'Early Republican Era (1912-1937)', cn: '民国初期（1912-1937）' }, description: { en: 'The quarter-century between the fall of the empire and the Second Sino-Japanese War — a period of surging nationalism, the anti-Christian movement, and the first indigenous Chinese theological reflection — remains thinly covered.', cn: '从帝国覆灭到第二次中日战争之间的四分之一世纪——民族主义高涨、反基督教运动和中国本土神学反思的第一次尝试——研究仍然薄弱。' }, status: 'not_started', ai_feasibility: 'partial' },
    { id: 2, category: 'Periods', title: { en: 'Cultural Revolution Decade (1966-1976)', cn: '文化大革命十年（1966-1976）' }, description: { en: 'What historian Daniel Bays called a "black hole." Scholars resort to unconventional materials like 252 audience letters to a Hong Kong radio broadcast to reconstruct any picture at all.', cn: '历史学家裴士丹称之为"黑洞"。学者们不得不使用非常规材料，如252封致香港广播电台的听众来信，来重建任何图景。' }, status: 'in_progress', ai_feasibility: 'partial' },
    { id: 3, category: 'Periods', title: { en: 'Warlord Era (1916-1928)', cn: '军阀时期（1916-1928）' }, description: { en: 'The chaotic warlord period saw significant shifts in missionary strategy but is poorly documented in English-language scholarship.', cn: '混乱的军阀时期见证了传教策略的重大转变，但在英语学术中记录不足。' }, status: 'not_started', ai_feasibility: 'partial' },
    { id: 4, category: 'Regions', title: { en: 'Northwest Corridor (Gansu, Qinghai, Xinjiang)', cn: '西北走廊（甘肃、青海、新疆）' }, description: { en: 'Represents a near-total scholarly vacuum for the pre-1949 period. Christian activity in these Muslim-majority and minority regions is virtually unstudied.', cn: '在1949年前的时期几乎是学术真空。这些穆斯林和少数民族地区的基督教活动几乎未被研究。' }, status: 'not_started', ai_feasibility: 'no' },
    { id: 5, category: 'Regions', title: { en: 'Rural Revival Counties (Henan, Anhui, Zhejiang)', cn: '农村复兴县（河南、安徽、浙江）' }, description: { en: 'The epicenters of the post-1976 church revival lack any serious pre-1949 baseline scholarship.', cn: '1976年后教会复兴的中心地区缺乏1949年前的基线研究。' }, status: 'not_started', ai_feasibility: 'yes' },
    { id: 6, category: 'Perspectives', title: { en: 'Chinese Converts and Local Agency', cn: '中国皈依者和本地能动性' }, description: { en: 'The most structurally underrepresented voice. Most scholarship has been written by Western scholars using Western-language missionary archives.', cn: '结构上最被忽视的声音。大多数学术作品由西方学者使用西方语言的传教士档案撰写。' }, status: 'in_progress', ai_feasibility: 'yes' },
    { id: 7, category: 'Perspectives', title: { en: 'Women Missionaries', cn: '女性传教士' }, description: { en: 'By 1930, approximately 60% of the Protestant missionary workforce was female. Recovery of their stories is still partial.', cn: '到1930年，约60%的新教传教人员是女性。对她们故事的恢复仍然不完整。' }, status: 'in_progress', ai_feasibility: 'yes' },
    { id: 8, category: 'Perspectives', title: { en: 'Local Chinese Women Converts', cn: '中国本土女性皈依者' }, description: { en: 'Even more invisible than women missionaries. Their experiences and agency are virtually undocumented.', cn: '比女性传教士更加不可见。她们的经历和能动性几乎没有记录。' }, status: 'not_started', ai_feasibility: 'partial' },
    { id: 9, category: 'Denominations', title: { en: 'Catholic Missions', cn: '天主教传教' }, description: { en: 'Arguably the largest single gap. Econometric work shows Catholic missions were actually more successful than Protestant missions in attracting converts.', cn: '可以说是最大的单一研究缺口。计量经济学研究表明天主教传教在吸引皈依者方面实际上比新教更成功。' }, status: 'not_started', ai_feasibility: 'yes' },
    { id: 10, category: 'Denominations', title: { en: 'Indigenous Chinese Denominations', cn: '中国本土教派' }, description: { en: 'True Jesus Church, Jesus Family, Little Flock are well-known names but remarkably understudied.', cn: '真耶稣教会、耶稣家庭、小群是众所周知的名字，但研究严重不足。' }, status: 'not_started', ai_feasibility: 'partial' },
    { id: 11, category: 'Denominations', title: { en: 'Pentecostal and Fundamentalist Missions', cn: '五旬节派和基要派传教' }, description: { en: 'Arrived after mainline bodies declined. Lack dedicated scholarly attention despite outsized influence on the house church movement.', cn: '在主流教会衰退后到来。尽管对家庭教会运动有巨大影响，但缺乏专门的学术关注。' }, status: 'not_started', ai_feasibility: 'partial' },
    { id: 12, category: 'Topics', title: { en: 'American Christian Rural Reconstruction (1907-1950)', cn: '美国基督教农村重建运动（1907-1950）' }, description: { en: 'A particularly striking gap. The intersection of missions, agriculture, and modernization in rural China.', cn: '一个特别突出的缺口。传教、农业和中国农村现代化的交叉领域。' }, status: 'not_started', ai_feasibility: 'yes' },
    { id: 13, category: 'Topics', title: { en: 'Mission Hospital Long-Run Effects', cn: '教会医院的长期影响' }, description: { en: 'Rural medical infrastructure created by missionaries and its lasting impact on health outcomes.', cn: '传教士建立的农村医疗基础设施及其对健康结果的持久影响。' }, status: 'not_started', ai_feasibility: 'yes' },
    { id: 14, category: 'Topics', title: { en: 'Anti-Footbinding Campaigns', cn: '反缠足运动' }, description: { en: 'Received some treatment but mainly as anecdote rather than systematic analysis of missionary influence.', cn: '有一些研究但主要是轶事而非对传教士影响的系统分析。' }, status: 'not_started', ai_feasibility: 'yes' },
    { id: 15, category: 'Quantitative', title: { en: 'County-Level Conversion Data', cn: '县级皈依数据' }, description: { en: 'No reliable county-level conversion data exists for the pre-1949 period.', cn: '1949年前的时期不存在可靠的县级皈依数据。' }, status: 'not_started', ai_feasibility: 'yes' },
    { id: 16, category: 'Quantitative', title: { en: 'Missionary Mortality and Attrition', cn: '传教士死亡率和流失率' }, description: { en: 'Career-length distributions, mortality rates, and attrition have never been systematically studied.', cn: '职业生涯长度分布、死亡率和流失率从未被系统研究。' }, status: 'not_started', ai_feasibility: 'yes' },
    { id: 17, category: 'Post-1949', title: { en: 'House Church Movement Scholarship', cn: '家庭教会运动学术研究' }, description: { en: 'Documented largely through journalistic accounts rather than peer-reviewed scholarship.', cn: '主要通过新闻报道而非同行评审的学术研究来记录。' }, status: 'in_progress', ai_feasibility: 'partial' },
    { id: 18, category: 'Post-1949', title: { en: 'Christianity Among Returned Students', cn: '回国学生中的基督教' }, description: { en: 'Suffers from "double scholarly neglect" — understudied abroad and invisible domestically.', cn: '遭受"双重学术忽视"——在海外研究不足，在国内不可见。' }, status: 'not_started', ai_feasibility: 'partial' },
    { id: 19, category: 'Post-1949', title: { en: 'Ethnic Minority Christianity', cn: '少数民族基督教' }, description: { en: 'Addressed mainly by practitioners rather than academic historians.', cn: '主要由实践者而非学术历史学家研究。' }, status: 'not_started', ai_feasibility: 'no' },
    { id: 20, category: 'Contemporary', title: { en: 'Back-to-Jerusalem Movement', cn: '回到耶路撒冷运动' }, description: { en: 'Only one book-length academic treatment exists for this vision of Chinese missionaries evangelizing unreached peoples.', cn: '对这个中国传教士向未得之民传福音的异象只有一本学术著作。' }, status: 'not_started', ai_feasibility: 'partial' },
    { id: 21, category: 'Contemporary', title: { en: 'Digital Christianity on WeChat', cn: '微信上的数字基督教' }, description: { en: 'A major phenomenon with almost no longitudinal academic study.', cn: '一个重要现象，几乎没有纵向学术研究。' }, status: 'not_started', ai_feasibility: 'yes' },
    { id: 22, category: 'Contemporary', title: { en: 'African Missions from China', cn: '中国到非洲的传教' }, description: { en: 'Chinese missionaries operating in Africa are almost entirely unstudied.', cn: '在非洲活动的中国传教士几乎完全未被研究。' }, status: 'not_started', ai_feasibility: 'no' },
    { id: 23, category: 'Archival', title: { en: 'Chinese-Language Mainland Archives', cn: '中文大陆档案' }, description: { en: 'County gazetteer records have rarely been systematically mined by Western scholars.', cn: '县志记录很少被西方学者系统地挖掘。' }, status: 'not_started', ai_feasibility: 'yes' },
    { id: 24, category: 'Archival', title: { en: 'Oral History of Cultural Revolution', cn: '文化大革命口述历史' }, description: { en: 'A closing window — the generation that experienced the Cultural Revolution is dying.', cn: '一个正在关闭的窗口——经历文化大革命的一代人正在逝去。' }, status: 'not_started', ai_feasibility: 'no' },
    { id: 25, category: 'Cross-disciplinary', title: { en: 'Political Effects of Christianity in PRC', cn: '基督教在中华人民共和国的政治影响' }, description: { en: 'Barely modeled quantitatively. The intersection of faith and political behavior in China.', cn: '几乎没有定量建模。中国信仰与政治行为的交叉领域。' }, status: 'not_started', ai_feasibility: 'partial' },
    { id: 26, category: 'Cross-disciplinary', title: { en: 'Sociology of Pre-1949 Convert Community', cn: '1949年前皈依者社区的社会学' }, description: { en: 'A sociological analysis of the pre-1949 convert community does not exist.', cn: '1949年前皈依者社区的社会学分析不存在。' }, status: 'not_started', ai_feasibility: 'yes' },
    { id: 27, category: 'Quantitative', title: { en: 'National Conversion Rate Study', cn: '全国皈依率研究' }, description: { en: 'No rigorous national study of conversion rates among Chinese international students exists.', cn: '不存在关于中国留学生皈依率的严格全国性研究。' }, status: 'not_started', ai_feasibility: 'partial' },
    { id: 28, category: 'Post-1949', title: { en: 'Discipleship Depth as Retention Predictor', cn: '门训深度作为信仰保留预测因子' }, description: { en: 'The hypothesis that discipleship depth predicts faith retention has never been tested empirically.', cn: '门训深度预测信仰保留的假设从未被实证检验。' }, status: 'not_started', ai_feasibility: 'yes' },
    { id: 29, category: 'Topics', title: { en: 'Catholic Diocesan Archives', cn: '天主教教区档案' }, description: { en: 'Poorly catalogued and underutilized. A vast repository of untapped primary sources.', cn: '编目不完善且利用不足。一个巨大的未开发原始资料库。' }, status: 'not_started', ai_feasibility: 'partial' },
    { id: 30, category: 'Contemporary', title: { en: 'Christianity and Xinjiang Policy', cn: '基督教与新疆政策' }, description: { en: 'Currently inaccessible to researchers due to political sensitivity.', cn: '由于政治敏感性，研究人员目前无法接触。' }, status: 'not_started', ai_feasibility: 'no' },
  ];
}

const CATEGORIES = ['Periods', 'Regions', 'Perspectives', 'Denominations', 'Topics', 'Quantitative', 'Post-1949', 'Contemporary', 'Archival', 'Cross-disciplinary'];
const STATUS_LABELS: Record<string, { en: string; cn: string }> = {
  not_started: { en: 'Not Started', cn: '未开始' },
  in_progress: { en: 'In Progress', cn: '进行中' },
  published: { en: 'Published', cn: '已发表' },
};
const AI_LABELS: Record<string, { en: string; cn: string }> = {
  yes: { en: 'AI Feasible', cn: 'AI可行' },
  partial: { en: 'Partially Feasible', cn: '部分可行' },
  no: { en: 'Not AI Feasible', cn: 'AI不可行' },
};

let selectedGap: Gap | null = null;

export function renderGaps(): void {
  const app = document.getElementById('app')!;
  const lang = getLang();
  const gaps = getGaps();

  app.innerHTML = `
    <div class="tool-page container">
      <div class="tool-header">
        <h1>${t('gaps.title')}</h1>
        <p>${t('gaps.subtitle')}</p>
      </div>
      <div style="display: flex; gap: 12px; margin-bottom: 24px; flex-wrap: wrap;" id="gap-filters">
        <select class="form-select" style="width: auto; min-width: 150px;" id="cat-filter">
          <option value="all">${t('gaps.filter.category')}: All</option>
          ${CATEGORIES.map(c => `<option value="${c}">${c}</option>`).join('')}
        </select>
        <select class="form-select" style="width: auto; min-width: 150px;" id="status-filter">
          <option value="all">${t('gaps.filter.status')}: All</option>
          <option value="not_started">${STATUS_LABELS.not_started[lang as 'en' | 'cn']}</option>
          <option value="in_progress">${STATUS_LABELS.in_progress[lang as 'en' | 'cn']}</option>
        </select>
        <select class="form-select" style="width: auto; min-width: 150px;" id="ai-filter">
          <option value="all">${t('gaps.filter.ai')}: All</option>
          <option value="yes">${AI_LABELS.yes[lang as 'en' | 'cn']}</option>
          <option value="partial">${AI_LABELS.partial[lang as 'en' | 'cn']}</option>
          <option value="no">${AI_LABELS.no[lang as 'en' | 'cn']}</option>
        </select>
      </div>
      <div class="gap-grid" id="gap-grid"></div>
      <div id="gap-detail" style="margin-top: 32px;"></div>
    </div>
  `;

  renderGapGrid(gaps);

  document.querySelectorAll('#gap-filters select').forEach(sel => {
    sel.addEventListener('change', () => {
      const catFilter = (document.getElementById('cat-filter') as HTMLSelectElement).value;
      const statusFilter = (document.getElementById('status-filter') as HTMLSelectElement).value;
      const aiFilter = (document.getElementById('ai-filter') as HTMLSelectElement).value;

      let filtered = gaps;
      if (catFilter !== 'all') filtered = filtered.filter(g => g.category === catFilter);
      if (statusFilter !== 'all') filtered = filtered.filter(g => g.status === statusFilter);
      if (aiFilter !== 'all') filtered = filtered.filter(g => g.ai_feasibility === aiFilter);
      renderGapGrid(filtered);
    });
  });
}

function renderGapGrid(gaps: Gap[]): void {
  const lang = getLang();
  const grid = document.getElementById('gap-grid')!;

  grid.innerHTML = gaps.map(g => `
    <div class="gap-card" data-id="${g.id}">
      <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
        <span class="tag">${g.category}</span>
        <span class="gap-status ${g.status}">${STATUS_LABELS[g.status][lang as 'en' | 'cn']}</span>
      </div>
      <h3 style="font-size: 1rem; margin-bottom: 8px;">${g.title[lang as 'en' | 'cn']}</h3>
      <p style="font-size: 0.8125rem; color: var(--text-secondary); line-height: 1.5;">${g.description[lang as 'en' | 'cn'].slice(0, 120)}...</p>
      <div style="margin-top: 12px;">
        <span class="tag" style="background: ${g.ai_feasibility === 'yes' ? 'rgba(74,222,128,0.1)' : g.ai_feasibility === 'partial' ? 'rgba(251,191,36,0.1)' : 'rgba(248,113,113,0.1)'}; color: ${g.ai_feasibility === 'yes' ? 'var(--success)' : g.ai_feasibility === 'partial' ? 'var(--warning)' : 'var(--error)'};">
          ${AI_LABELS[g.ai_feasibility][lang as 'en' | 'cn']}
        </span>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.gap-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = parseInt((card as HTMLElement).dataset.id || '0');
      const gap = getGaps().find(g => g.id === id);
      if (gap) showGapDetail(gap);
    });
  });
}

function showGapDetail(gap: Gap): void {
  const lang = getLang();
  const detail = document.getElementById('gap-detail')!;

  detail.innerHTML = `
    <div class="card" style="border-color: var(--accent-gold);">
      <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 16px;">
        <h2 style="font-size: 1.25rem;">${gap.title[lang as 'en' | 'cn']}</h2>
        <span class="gap-status ${gap.status}">${STATUS_LABELS[gap.status][lang as 'en' | 'cn']}</span>
      </div>
      <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 16px;">${gap.description[lang as 'en' | 'cn']}</p>
      <div style="display: flex; gap: 8px; margin-bottom: 24px;">
        <span class="tag">${gap.category}</span>
        <span class="tag" style="background: ${gap.ai_feasibility === 'yes' ? 'rgba(74,222,128,0.1)' : gap.ai_feasibility === 'partial' ? 'rgba(251,191,36,0.1)' : 'rgba(248,113,113,0.1)'}; color: ${gap.ai_feasibility === 'yes' ? 'var(--success)' : gap.ai_feasibility === 'partial' ? 'var(--warning)' : 'var(--error)'};">
          ${AI_LABELS[gap.ai_feasibility][lang as 'en' | 'cn']}
        </span>
      </div>
      <div style="padding: 16px; background: var(--bg-tertiary); border-radius: 2px;">
        <h4 style="font-size: 0.875rem; margin-bottom: 12px;">${t('gaps.claim')}</h4>
        <div class="form-group">
          <input class="form-input" placeholder="${lang === 'en' ? 'Your name' : '你的名字'}">
        </div>
        <div class="form-group">
          <input class="form-input" placeholder="${lang === 'en' ? 'Institution' : '机构'}">
        </div>
        <div class="form-group">
          <input class="form-input" type="email" placeholder="${lang === 'en' ? 'Email' : '邮箱'}">
        </div>
        <div class="form-group">
          <textarea class="chat-input" rows="2" placeholder="${lang === 'en' ? 'Brief description of your work' : '简要描述你的工作'}"></textarea>
        </div>
        <button class="btn btn-primary">${lang === 'en' ? 'Submit' : '提交'}</button>
      </div>
    </div>
  `;

  detail.scrollIntoView({ behavior: 'smooth' });
}
