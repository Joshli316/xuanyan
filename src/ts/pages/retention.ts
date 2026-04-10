import { t, getLang } from '../i18n';

interface FactorValues {
  discipleship: number;
  preparation: number;
  relational: number;
  duration: number;
  connections: number;
}

const WEIGHTS = {
  discipleship: 0.30,
  preparation: 0.20,
  relational: 0.20,
  duration: 0.15,
  connections: 0.15,
};

let values: FactorValues = { discipleship: 3, preparation: 2, relational: 3, duration: 3, connections: 2 };
let whatIfMode = false;

export function renderRetention(): void {
  const app = document.getElementById('app')!;
  const lang = getLang();

  values = { discipleship: 3, preparation: 2, relational: 3, duration: 3, connections: 2 };

  app.innerHTML = `
    <div class="tool-page container" style="max-width: 900px; margin: 0 auto;">
      <div class="tool-header">
        <h1>${t('retention.title')}</h1>
        <p>${t('retention.subtitle')}</p>
      </div>
      <div style="display: grid; grid-template-columns: 1fr; gap: 48px;">
        <div class="calc-form" id="calc-form">
          ${renderSliders(lang)}
          <div style="display: flex; gap: 12px; margin-top: 24px;">
            <button class="btn btn-primary" id="calc-btn">${t('retention.calculate')}</button>
            <button class="btn btn-ghost" id="whatif-btn">${t('retention.whatif')}</button>
          </div>
        </div>
        <div id="result-area"></div>
      </div>
    </div>
  `;

  attachSliderListeners();
  document.getElementById('calc-btn')?.addEventListener('click', showResult);
  document.getElementById('whatif-btn')?.addEventListener('click', toggleWhatIf);

  // Calculate immediately
  showResult();
}

function renderSliders(lang: string): string {
  const factors = [
    { key: 'discipleship', label: t('retention.discipleship') },
    { key: 'preparation', label: t('retention.preparation') },
    { key: 'relational', label: t('retention.relational') },
    { key: 'duration', label: t('retention.duration') },
    { key: 'connections', label: t('retention.connections') },
  ];

  return factors.map(f => `
    <div class="slider-group">
      <div class="slider-label">
        <span>${f.label}</span>
        <span class="slider-value" id="${f.key}-val">${values[f.key as keyof FactorValues]}/10</span>
      </div>
      <input type="range" class="calc-slider" id="${f.key}-slider" min="0" max="10" value="${values[f.key as keyof FactorValues]}" step="1" aria-label="${f.label}">
      <div style="display: flex; justify-content: space-between; font-size: 0.6875rem; color: var(--text-tertiary); font-family: var(--font-mono);">
        <span>0</span>
        <span>5</span>
        <span>10</span>
      </div>
    </div>
  `).join('');
}

function attachSliderListeners(): void {
  const keys: (keyof FactorValues)[] = ['discipleship', 'preparation', 'relational', 'duration', 'connections'];
  for (const key of keys) {
    const slider = document.getElementById(`${key}-slider`) as HTMLInputElement;
    if (slider) {
      slider.addEventListener('input', () => {
        values[key] = parseInt(slider.value);
        const valDisplay = document.getElementById(`${key}-val`);
        if (valDisplay) valDisplay.textContent = `${values[key]}/10`;
        if (whatIfMode) showResult();
      });
    }
  }
}

function calculateRetention(): number {
  let score = 0;
  for (const [key, weight] of Object.entries(WEIGHTS)) {
    score += values[key as keyof FactorValues] * weight;
  }
  // Convert 0-10 score to percentage (with floor of 5% and ceiling of 95%)
  const percentage = Math.max(5, Math.min(95, score * 10));
  return Math.round(percentage);
}

function getRiskLevel(percentage: number): { level: string; label: { en: string; cn: string } } {
  if (percentage >= 65) return { level: 'low', label: { en: 'Low Risk', cn: '低风险' } };
  if (percentage >= 35) return { level: 'medium', label: { en: 'Medium Risk', cn: '中等风险' } };
  return { level: 'high', label: { en: 'High Risk', cn: '高风险' } };
}

function getRecommendations(lang: string): string[] {
  const recs: string[] = [];
  if (values.discipleship < 5) {
    recs.push(lang === 'en'
      ? 'Discipleship depth is critically low. Prioritize completing a structured discipleship program before departure.'
      : '门训深度严重不足。优先在离开前完成结构化门训课程。');
  }
  if (values.preparation < 4) {
    recs.push(lang === 'en'
      ? 'Pre-return preparation is insufficient. Use the Returnee Preparation Tool to generate a personalized Return Kit.'
      : '回国前准备不足。使用回国准备工具生成个性化回国指南。');
  }
  if (values.connections < 4) {
    recs.push(lang === 'en'
      ? 'China-side connections are weak. Connect this student to at least 2-3 trusted Christian contacts in their destination city.'
      : '中国端联系薄弱。将该学生与目的地城市至少2-3位可信赖的基督徒联系人对接。');
  }
  if (values.relational < 5) {
    recs.push(lang === 'en'
      ? 'Relational support is below threshold. Establish a regular check-in schedule with an overseas mentor.'
      : '关系支持低于门槛。与海外导师建立定期联系计划。');
  }
  if (values.duration < 3) {
    recs.push(lang === 'en'
      ? 'Short faith duration is a significant risk factor. Consider delaying return if possible, or intensifying discipleship.'
      : '信仰时间短是重要风险因素。如果可能，考虑推迟回国，或加强门训。');
  }
  if (recs.length === 0) {
    recs.push(lang === 'en'
      ? 'This student has strong protective factors. Continue regular connection and encourage peer mentoring of others.'
      : '该学生有较强的保护因素。继续保持联系，鼓励其引导其他同伴。');
  }
  return recs;
}

function showResult(): void {
  const lang = getLang();
  const percentage = calculateRetention();
  const risk = getRiskLevel(percentage);
  const recs = getRecommendations(lang);

  const resultArea = document.getElementById('result-area')!;
  resultArea.innerHTML = `
    <div class="result-card">
      <p style="font-size: 0.8125rem; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px;">${t('retention.result')}</p>

      <!-- SVG Gauge -->
      <div class="gauge-container">
        <svg viewBox="0 0 200 120" style="width: 100%; height: 100%;">
          <!-- Background arc -->
          <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="var(--border)" stroke-width="12" stroke-linecap="round"/>
          <!-- Value arc -->
          <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="${risk.level === 'high' ? 'var(--error)' : risk.level === 'medium' ? 'var(--warning)' : 'var(--success)'}" stroke-width="12" stroke-linecap="round"
            stroke-dasharray="${percentage * 2.51} 251" />
          <text x="100" y="85" text-anchor="middle" font-family="var(--font-mono)" font-size="36" font-weight="700" fill="var(--accent-gold)">${percentage}%</text>
        </svg>
      </div>

      <p class="risk-level ${risk.level}">${risk.label[lang as 'en' | 'cn']}</p>
    </div>

    <div style="margin-top: 24px;">
      <h3 style="font-size: 1rem; margin-bottom: 16px;">${lang === 'en' ? 'Recommendations' : '建议'}</h3>
      ${recs.map(r => `
        <div style="padding: 12px 16px; background: var(--bg-secondary); border: 1px solid var(--border); border-radius: 2px; margin-bottom: 8px;">
          <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.6;">${r}</p>
        </div>
      `).join('')}
    </div>

    ${whatIfMode ? `
      <div style="margin-top: 16px; padding: 16px; background: var(--accent-gold-muted); border: 1px solid var(--border-accent); border-radius: 2px;">
        <p style="font-size: 0.8125rem; color: var(--accent-gold);">
          ${lang === 'en' ? 'What If mode is ON — drag the sliders to see how changes affect the prediction in real-time.' : '假设模式已开启——拖动滑块查看更改如何实时影响预测。'}
        </p>
      </div>
    ` : ''}
  `;
}

function toggleWhatIf(): void {
  whatIfMode = !whatIfMode;
  const btn = document.getElementById('whatif-btn');
  if (btn) {
    btn.classList.toggle('btn-primary', whatIfMode);
    btn.classList.toggle('btn-ghost', !whatIfMode);
  }
  showResult();
}
