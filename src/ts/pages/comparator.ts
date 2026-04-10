import { t, getLang } from '../i18n';

interface SourcePair {
  id: string;
  event_name: { en: string; cn: string };
  year: number;
  en_source: { text: string; attribution: string; context: string };
  cn_source: { text: string; attribution: string; context: string };
  editorial_note: { en: string; cn: string };
}

function getSourcePairs(): SourcePair[] {
  return [
    {
      id: 'boxer',
      event_name: { en: 'Boxer Rebellion (1900)', cn: '义和团运动（1900）' },
      year: 1900,
      en_source: {
        text: 'The Boxers, encouraged by the Empress Dowager, launched a savage campaign against foreign missionaries and Chinese Christians. 136 Protestant missionaries, 53 children, and thousands of Chinese Christians were murdered. The China Inland Mission alone lost 58 adults and 21 children. Yet CIM refused all indemnity payments — a decision that earned deep Chinese respect and distinguished Protestant missions from the gunboat diplomacy of Western governments.',
        attribution: 'Missionary accounts and CIM records, 1900-1901',
        context: 'Written from the perspective of the missionary community as victims of religiously-motivated violence, emphasizing missionary sacrifice and moral superiority in refusing indemnity.',
      },
      cn_source: {
        text: '义和团运动是中国人民反对帝国主义侵略和封建压迫的正义斗争。西方列强以传教为名，实行文化侵略，干涉中国内政。义和团虽然采取了一些过激行为，但其反帝爱国的本质是不容否认的。八国联军的入侵和《辛丑条约》的签订，是近代中国百年屈辱的深重一页。',
        attribution: '中国近代史教科书（人民教育出版社）',
        context: '从中国官方历史叙事的角度书写，将义和团运动定性为反帝国主义的爱国运动，淡化对基督徒的暴力，突出西方侵略的背景。',
      },
      editorial_note: {
        en: 'These accounts reveal fundamentally different framings of the same events. The missionary perspective emphasizes religious persecution and moral witness. The Chinese state perspective emphasizes anti-imperialist resistance and national humiliation. Neither is entirely wrong — missionaries were both targets of violence AND vectors of imperial influence. The truth requires holding both perspectives simultaneously.',
        cn: '这两种叙述揭示了对同一事件根本不同的理解框架。传教士的视角强调宗教迫害和道德见证。中国官方视角强调反帝抵抗和民族屈辱。两者都不完全错误——传教士既是暴力的目标，也是帝国影响力的载体。真相需要同时持有两种视角。',
      },
    },
    {
      id: 'may_fourth',
      event_name: { en: 'May Fourth Movement (1919)', cn: '五四运动（1919）' },
      year: 1919,
      en_source: {
        text: 'The May Fourth Movement posed an existential challenge to the missionary enterprise. Chinese intellectuals, newly fired with nationalism and scientific rationalism, explicitly identified Christianity as a tool of Western imperialism. The Anti-Christian Movement of the 1920s that followed targeted missionary schools, hospitals, and churches. Many missionaries viewed this as irrational hostility; few understood the legitimate grievances behind it.',
        attribution: 'Daniel Bays, A New History of Christianity in China (2012)',
        context: 'Written by an American historian sympathetic to Chinese perspectives, contextualizing anti-Christian sentiment as a rational response to missionary complicity with imperialism.',
      },
      cn_source: {
        text: '五四运动是中国新民主主义革命的开端。知识分子高举"德先生"（民主）和"赛先生"（科学）的旗帜，反对封建传统和外来文化侵略。非基运动（1922-1927）是五四精神在宗教领域的延伸，揭露了基督教教育对中国青年的思想殖民。',
        attribution: '近代中国基督教史研究（中国社会科学院）',
        context: '从中国学术机构的角度书写，将反基督教运动视为五四启蒙精神的必然延伸。',
      },
      editorial_note: {
        en: 'Both sources agree on the facts: Chinese intellectuals turned against Christianity after 1919. The difference is in causation. The Western source treats anti-Christian sentiment as partly legitimate and partly irrational. The Chinese source treats it as entirely legitimate — a necessary intellectual liberation. The reality is that missionaries had built schools and hospitals that genuinely helped Chinese people, AND they had operated within an imperial system that humiliated China.',
        cn: '两个来源在事实上一致：1919年后中国知识分子转向反对基督教。差异在于因果解释。西方来源将反基督教情绪视为部分合理、部分非理性。中国来源将其视为完全合理——必要的思想解放。现实是传教士建立了真正帮助中国人民的学校和医院，同时他们也在一个羞辱中国的帝国体系内运作。',
      },
    },
    {
      id: 'expulsion_1949',
      event_name: { en: '1949 Missionary Expulsion', cn: '1949年传教士驱逐' },
      year: 1949,
      en_source: {
        text: 'The Communist victory in 1949 brought the end of the missionary era. By 1952, virtually all 5,000 foreign missionaries had been expelled. Properties were confiscated. Chinese Christians were forced to choose between the state-controlled Three-Self Patriotic Movement and underground worship. Many missionaries left with broken hearts, believing they were leaving behind a dying church.',
        attribution: 'Kenneth Latourette, A History of Christian Missions in China',
        context: 'Written from the missionary perspective, framing the expulsion as a tragic loss and the end of an era of Christian service.',
      },
      cn_source: {
        text: '新中国成立后，外国传教士作为帝国主义文化侵略的工具被请出中国。中国基督徒在三自爱国运动的带领下实现了"自治、自养、自传"，摆脱了外国势力的控制。这标志着中国教会真正成为中国人民自己的教会。',
        attribution: '中国基督教三自爱国运动委员会历史资料',
        context: '从三自爱国运动的官方立场书写，将驱逐定性为中国教会的解放和自主。',
      },
      editorial_note: {
        en: 'The missionary perspective sees 1949 as loss; the Chinese state perspective sees it as liberation. Both contain truth. Missionaries were expelled as part of a broader anti-Western campaign — but the Chinese church DID become indigenous in ways it never had under missionary control. The irony is profound: what missionaries had long advocated (an independent Chinese church) was achieved by the very force that expelled them.',
        cn: '传教士的视角将1949年视为失去；中国官方视角将其视为解放。两者都包含真理。传教士作为更广泛的反西方运动的一部分被驱逐——但中国教会确实以在传教士控制下从未实现的方式变得本土化。讽刺意味深长：传教士长期倡导的（独立的中国教会）是由驱逐他们的力量所实现的。',
      },
    },
    {
      id: 'cultural_revolution',
      event_name: { en: 'Cultural Revolution (1966-1976)', cn: '文化大革命（1966-1976）' },
      year: 1966,
      en_source: {
        text: 'The Cultural Revolution brought total destruction to visible Christianity. Every church, mosque, and temple was closed. Bibles were burned. Clergy were imprisoned, beaten, and killed. Wang Mingdao endured 23 years of imprisonment. Watchman Nee died in prison in 1972. Yet underground, in rural homes and whispered prayers, Christianity not only survived but grew. The enforced simplicity paradoxically stripped away foreign cultural accretions and produced a truly Chinese Christianity.',
        attribution: 'Lian Xi, Redeemed by Fire: The Rise of Popular Christianity in Modern China (2010)',
        context: 'Written by a Chinese-American historian, balancing the destruction with the paradox of underground growth.',
      },
      cn_source: {
        text: '文化大革命期间，所有宗教活动被禁止，这是"极左"路线的严重错误。1978年后，党中央纠正了这一错误，重新落实宗教信仰自由政策。基督教在改革开放后得到恢复和发展，证明了党的宗教政策的正确性。',
        attribution: '中国宗教事务局政策文件',
        context: '从中国政府的角度书写，承认文化大革命是"错误"，但将宗教恢复归功于党的政策纠正。',
      },
      editorial_note: {
        en: 'The Western academic source focuses on the paradox of persecution-driven growth — a theme central to Chinese Christian self-understanding. The Chinese government source acknowledges the Cultural Revolution as an error but frames the restoration as a Party achievement. Missing from the government account is the decade of suffering and the underground church\'s role in preserving Christianity without state permission.',
        cn: '西方学术来源聚焦于逼迫驱动增长的悖论——这是中国基督徒自我理解的核心主题。中国政府来源承认文化大革命是一个错误，但将宗教恢复归功于党的成就。政府叙述中缺失的是十年苦难以及地下教会在没有国家许可的情况下保存基督教的角色。',
      },
    },
    {
      id: 'three_self',
      event_name: { en: 'Three-Self Formation (1954)', cn: '三自爱国运动成立（1954）' },
      year: 1954,
      en_source: {
        text: 'The Three-Self Patriotic Movement was established in 1954 as the sole legal Protestant body in China. While framed as "self-governance, self-support, self-propagation" — principles missionaries had long advocated — it operated under direct Communist Party supervision. Leaders like K.H. Ting worked within the system; leaders like Wang Mingdao and Watchman Nee refused and were imprisoned. The TSPM remains deeply controversial: liberator or collaborator?',
        attribution: 'Philip Wickeri, Reconstructing Christianity in China (2011)',
        context: 'Written by an American scholar sympathetic to the TSPM, attempting a balanced view of a polarizing institution.',
      },
      cn_source: {
        text: '三自爱国运动是中国基督徒爱国爱教的伟大实践。在中国共产党的领导下，中国教会实现了自治、自养、自传，彻底摆脱了帝国主义的控制。三自运动维护了国家主权和民族尊严，同时保障了信徒的宗教信仰自由。',
        attribution: '中国基督教三自爱国运动60周年纪念文集',
        context: '从三自爱国运动自身的纪念文集书写，完全正面地呈现其历史角色。',
      },
      editorial_note: {
        en: 'The TSPM is perhaps the most polarizing institution in Chinese Christian history. The Western academic view acknowledges both its pragmatic value (keeping churches open) and its political compromise (state control over theology and leadership). The TSPM\'s own account presents a seamlessly positive narrative. The house church perspective — absent from both sources here — would reject the TSPM entirely as a betrayal of Christian independence. All three views capture part of the truth.',
        cn: '三自爱国运动也许是中国基督教历史上最具争议的机构。西方学术观点承认其务实价值（保持教会开放）和政治妥协（国家对神学和领导层的控制）。三自自身的叙述呈现了完全正面的叙事。家庭教会的视角——这两个来源中都缺失——会完全拒绝三自，视其为对基督教独立性的背叛。三种观点都捕捉到了部分真相。',
      },
    },
  ];
}

export function renderComparator(): void {
  const app = document.getElementById('app')!;
  const lang = getLang();
  const pairs = getSourcePairs();

  app.innerHTML = `
    <div class="tool-page container">
      <div class="tool-header">
        <h1>${t('comparator.title')}</h1>
        <p>${t('comparator.subtitle')}</p>
      </div>
      <div class="form-group" style="max-width: 400px;">
        <select class="form-select" id="event-select" aria-label="${t('comparator.select')}"
          <option value="">${t('comparator.select')}</option>
          ${pairs.map(p => `<option value="${p.id}">${p.event_name[lang as 'en' | 'cn']}</option>`).join('')}
        </select>
      </div>
      <div id="comparator-content"></div>
    </div>
  `;

  // Default to first event
  const select = document.getElementById('event-select') as HTMLSelectElement;
  select.addEventListener('change', () => {
    const pair = pairs.find(p => p.id === select.value);
    if (pair) renderPair(pair);
  });

  // Show first pair by default
  if (pairs.length > 0) {
    select.value = pairs[0].id;
    renderPair(pairs[0]);
  }
}

function renderPair(pair: SourcePair): void {
  const lang = getLang();
  const content = document.getElementById('comparator-content')!;

  content.innerHTML = `
    <h2 style="margin-bottom: 24px;">${pair.event_name[lang as 'en' | 'cn']} <span style="font-family: var(--font-mono); color: var(--accent-gold); font-size: 1rem;">${pair.year}</span></h2>

    <div class="comparator-split">
      <div class="comparator-panel">
        <h3>${lang === 'en' ? 'English Source' : '英文来源'}</h3>
        <p class="source-text">${pair.en_source.text}</p>
        <p class="attribution">— ${pair.en_source.attribution}</p>
        <p style="font-size: 0.75rem; color: var(--text-tertiary); margin-top: 12px; font-style: italic;">${pair.en_source.context}</p>
        <button class="btn btn-ghost" style="margin-top: 12px; font-size: 0.8125rem; padding: 10px 16px; min-height: 44px;" data-translate="en">
          ${lang === 'en' ? '翻译为中文' : 'Translate to English'}
        </button>
        <div class="translation" id="en-translation" style="display: none;"></div>
      </div>
      <div class="comparator-panel">
        <h3>${lang === 'en' ? 'Chinese Source' : '中文来源'}</h3>
        <p class="source-text">${pair.cn_source.text}</p>
        <p class="attribution">— ${pair.cn_source.attribution}</p>
        <p style="font-size: 0.75rem; color: var(--text-tertiary); margin-top: 12px; font-style: italic;">${pair.cn_source.context}</p>
        <button class="btn btn-ghost" style="margin-top: 12px; font-size: 0.8125rem; padding: 10px 16px; min-height: 44px;" data-translate="cn">
          ${lang === 'en' ? 'Translate to English' : '翻译为中文'}
        </button>
        <div class="translation" id="cn-translation" style="display: none;"></div>
      </div>
    </div>

    <div style="margin-top: 32px;">
      <details>
        <summary style="cursor: pointer; color: var(--accent-gold); font-weight: 500; padding: 12px 0;">
          ${t('comparator.why')}
        </summary>
        <div style="padding: 16px 0; color: var(--text-secondary); line-height: 1.8;">
          ${pair.editorial_note[lang as 'en' | 'cn']}
        </div>
      </details>
    </div>
  `;

  // Translation buttons
  content.querySelectorAll('[data-translate]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const which = (btn as HTMLElement).dataset.translate;
      const translationDiv = document.getElementById(`${which}-translation`)!;

      if (translationDiv.style.display === 'none') {
        translationDiv.style.display = 'block';
        translationDiv.innerHTML = `<span class="spinner"></span> ${lang === 'en' ? 'Translating...' : '翻译中...'}`;

        const sourceText = which === 'en' ? pair.en_source.text : pair.cn_source.text;
        const targetLang = which === 'en' ? (lang === 'en' ? 'Chinese' : 'English') : (lang === 'en' ? 'English' : 'Chinese');

        try {
          const response = await fetch('/api/ask', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              system: `You are a professional translator. Translate the following text to ${targetLang}. Maintain the scholarly tone and accuracy. Return only the translation.`,
              user: sourceText,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            translationDiv.innerHTML = data.response || data.content?.[0]?.text || 'Translation unavailable';
          } else {
            translationDiv.innerHTML = lang === 'en' ? 'Translation requires AI service. Connect the Claude API proxy to enable this feature.' : '翻译需要AI服务。连接Claude API代理以启用此功能。';
          }
        } catch {
          translationDiv.innerHTML = lang === 'en' ? 'Translation requires AI service. Connect the Claude API proxy to enable this feature.' : '翻译需要AI服务。连接Claude API代理以启用此功能。';
        }
      } else {
        translationDiv.style.display = 'none';
      }
    });
  });
}
