import { t, getLang } from '../i18n';
import { setCleanup } from '../main';

interface NetworkNode {
  id: string;
  name: { en: string; cn: string };
  type: 'missionary' | 'chinese' | 'institution';
  era: string;
  denomination?: string;
  dates?: string;
  role?: { en: string; cn: string };
  connections: number;
}

interface NetworkEdge {
  source: string;
  target: string;
  relationship: string;
}

interface NetworkData {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
}

let simulation: any = null;

function loadNetworkData(): NetworkData {
  return getDefaultNetwork();
}

function getDefaultNetwork(): NetworkData {
  const nodes: NetworkNode[] = [
    { id: 'ricci', name: { en: 'Matteo Ricci', cn: '利玛窦' }, type: 'missionary', era: 'catholic', denomination: 'Jesuit', dates: '1552-1610', role: { en: 'Jesuit pioneer', cn: '耶稣会先驱' }, connections: 5 },
    { id: 'xu_guangqi', name: { en: 'Xu Guangqi', cn: '徐光启' }, type: 'chinese', era: 'catholic', dates: '1562-1633', role: { en: 'Scholar-convert, "Three Pillars"', cn: '学者皈依者，"三大柱石"' }, connections: 3 },
    { id: 'li_zhizao', name: { en: 'Li Zhizao', cn: '李之藻' }, type: 'chinese', era: 'catholic', dates: '1565-1630', role: { en: 'Scholar-convert, "Three Pillars"', cn: '学者皈依者，"三大柱石"' }, connections: 2 },
    { id: 'yang_tingyun', name: { en: 'Yang Tingyun', cn: '杨廷筠' }, type: 'chinese', era: 'catholic', dates: '1557-1627', role: { en: 'Scholar-convert, "Three Pillars"', cn: '学者皈依者，"三大柱石"' }, connections: 2 },
    { id: 'morrison', name: { en: 'Robert Morrison', cn: '马礼逊' }, type: 'missionary', era: 'protestant', denomination: 'LMS', dates: '1782-1834', role: { en: 'First Protestant missionary', cn: '首位新教传教士' }, connections: 4 },
    { id: 'taylor', name: { en: 'Hudson Taylor', cn: '戴德生' }, type: 'missionary', era: 'protestant', denomination: 'CIM', dates: '1832-1905', role: { en: 'Founded China Inland Mission', cn: '创立中国内地会' }, connections: 6 },
    { id: 'wang_mingdao', name: { en: 'Wang Mingdao', cn: '王明道' }, type: 'chinese', era: 'republican', dates: '1900-1991', role: { en: 'Independent preacher, house church father', cn: '独立传道人，家庭教会之父' }, connections: 4 },
    { id: 'john_sung', name: { en: 'John Sung', cn: '宋尚节' }, type: 'chinese', era: 'republican', dates: '1901-1944', role: { en: 'Yale-trained evangelist', cn: '耶鲁毕业的布道家' }, connections: 3 },
    { id: 'watchman_nee', name: { en: 'Watchman Nee', cn: '倪柝声' }, type: 'chinese', era: 'republican', dates: '1903-1972', role: { en: 'Founded Local Church movement', cn: '创立地方教会运动' }, connections: 4 },
    { id: 'lottie_moon', name: { en: 'Lottie Moon', cn: '慕拉第' }, type: 'missionary', era: 'protestant', denomination: 'SBC', dates: '1840-1912', role: { en: 'Baptist missionary, fundraiser', cn: '浸信会传教士，募款者' }, connections: 2 },
    { id: 'kh_ting', name: { en: 'K.H. Ting', cn: '丁光训' }, type: 'chinese', era: 'contemporary', dates: '1915-2012', role: { en: 'TSPM leader, bishop', cn: '三自爱国运动领袖，主教' }, connections: 3 },
    { id: 'wang_yi', name: { en: 'Wang Yi', cn: '王怡' }, type: 'chinese', era: 'contemporary', dates: '1973-', role: { en: 'Early Rain pastor, imprisoned', cn: '秋雨之福牧师，被关押' }, connections: 2 },
    { id: 'cim', name: { en: 'China Inland Mission', cn: '中国内地会' }, type: 'institution', era: 'protestant', dates: '1865-1964', role: { en: 'Largest Protestant mission in China', cn: '中国最大的新教差会' }, connections: 5 },
    { id: 'tspm', name: { en: 'Three-Self Patriotic Movement', cn: '三自爱国运动' }, type: 'institution', era: 'contemporary', dates: '1954-', role: { en: 'State-sanctioned Protestant body', cn: '国家认可的新教机构' }, connections: 3 },
    { id: 'true_jesus', name: { en: 'True Jesus Church', cn: '真耶稣教会' }, type: 'institution', era: 'republican', dates: '1917-', role: { en: 'Indigenous Chinese denomination', cn: '中国本土教派' }, connections: 2 },
    { id: 'yung_wing', name: { en: 'Yung Wing', cn: '容闳' }, type: 'chinese', era: 'protestant', dates: '1828-1912', role: { en: 'First Chinese Yale graduate', cn: '首位中国耶鲁毕业生' }, connections: 2 },
    { id: 'schall', name: { en: 'Johann Adam Schall', cn: '汤若望' }, type: 'missionary', era: 'catholic', denomination: 'Jesuit', dates: '1592-1666', role: { en: 'Jesuit astronomer in Beijing', cn: '北京耶稣会天文学家' }, connections: 3 },
    { id: 'verbiest', name: { en: 'Ferdinand Verbiest', cn: '南怀仁' }, type: 'missionary', era: 'catholic', denomination: 'Jesuit', dates: '1623-1688', role: { en: 'Jesuit scientist, Kangxi advisor', cn: '耶稣会科学家，康熙顾问' }, connections: 3 },
  ];

  const edges: NetworkEdge[] = [
    { source: 'ricci', target: 'xu_guangqi', relationship: 'converted/collaborated' },
    { source: 'ricci', target: 'li_zhizao', relationship: 'converted/collaborated' },
    { source: 'ricci', target: 'yang_tingyun', relationship: 'converted' },
    { source: 'ricci', target: 'schall', relationship: 'Jesuit successor' },
    { source: 'schall', target: 'verbiest', relationship: 'Jesuit successor' },
    { source: 'taylor', target: 'cim', relationship: 'founded' },
    { source: 'morrison', target: 'yung_wing', relationship: 'influenced (Morrison school)' },
    { source: 'wang_mingdao', target: 'tspm', relationship: 'refused to join' },
    { source: 'kh_ting', target: 'tspm', relationship: 'led' },
    { source: 'watchman_nee', target: 'true_jesus', relationship: 'contemporary of' },
    { source: 'wang_yi', target: 'wang_mingdao', relationship: 'inspired by' },
    { source: 'xu_guangqi', target: 'li_zhizao', relationship: 'fellow "Three Pillars"' },
    { source: 'xu_guangqi', target: 'yang_tingyun', relationship: 'fellow "Three Pillars"' },
    { source: 'taylor', target: 'lottie_moon', relationship: 'contemporary' },
    { source: 'john_sung', target: 'watchman_nee', relationship: 'contemporary Chinese leaders' },
    { source: 'john_sung', target: 'wang_mingdao', relationship: 'contemporary Chinese leaders' },
  ];

  return { nodes, edges };
}

const NODE_COLORS: Record<string, string> = {
  missionary: '#D4A44C',
  chinese: '#2DD4BF',
  institution: '#9B9180',
};

export function renderNetwork(): void {
  const app = document.getElementById('app')!;
  const lang = getLang();

  app.innerHTML = `
    <div class="network-container">
      <div class="network-controls">
        <input type="text" class="network-search" id="network-search" placeholder="${lang === 'en' ? 'Search a person or institution...' : '搜索人物或机构...'}">
        <div class="filter-tabs" style="margin-bottom: 0;">
          <button class="filter-tab active" data-filter="all">All</button>
          <button class="filter-tab" data-filter="missionary" style="border-left: 3px solid #D4A44C;">${lang === 'en' ? 'Missionaries' : '传教士'}</button>
          <button class="filter-tab" data-filter="chinese" style="border-left: 3px solid #2DD4BF;">${lang === 'en' ? 'Chinese' : '华人'}</button>
          <button class="filter-tab" data-filter="institution" style="border-left: 3px solid #9B9180;">${lang === 'en' ? 'Institutions' : '机构'}</button>
        </div>
        <label class="layer-toggle">
          <input type="checkbox" id="degree-toggle"> ${lang === 'en' ? '2nd-degree connections' : '二度连接'}
        </label>
      </div>
      <div id="network-graph"></div>
      <div class="bio-card" id="bio-card"></div>
    </div>
  `;

  initForceGraph(loadNetworkData());

  setCleanup(() => {
    if (simulation) {
      simulation.stop();
      simulation = null;
    }
  });
}

function initForceGraph(data: NetworkData): void {
  const container = document.getElementById('network-graph')!;
  const width = container.clientWidth;
  const height = container.clientHeight;
  const lang = getLang();

  // Canvas-based rendering for performance
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d')!;

  // Simple force simulation
  const nodes = data.nodes.map(n => ({
    ...n,
    x: width / 2 + (Math.random() - 0.5) * 300,
    y: height / 2 + (Math.random() - 0.5) * 300,
    vx: 0,
    vy: 0,
  }));

  const edges = data.edges.map(e => ({
    ...e,
    sourceNode: nodes.find(n => n.id === e.source)!,
    targetNode: nodes.find(n => n.id === e.target)!,
  })).filter(e => e.sourceNode && e.targetNode);

  let selectedNode: typeof nodes[0] | null = null;
  let hoveredNode: typeof nodes[0] | null = null;

  function tick(): void {
    // Simple force-directed layout
    const k = 0.01;
    const repulsion = 3000;

    // Repulsion between all nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[j].x - nodes[i].x;
        const dy = nodes[j].y - nodes[i].y;
        const d = Math.sqrt(dx * dx + dy * dy) || 1;
        const f = repulsion / (d * d);
        nodes[i].vx -= dx / d * f;
        nodes[i].vy -= dy / d * f;
        nodes[j].vx += dx / d * f;
        nodes[j].vy += dy / d * f;
      }
    }

    // Attraction along edges
    for (const edge of edges) {
      const dx = edge.targetNode.x - edge.sourceNode.x;
      const dy = edge.targetNode.y - edge.sourceNode.y;
      const d = Math.sqrt(dx * dx + dy * dy) || 1;
      const f = (d - 100) * k;
      edge.sourceNode.vx += dx / d * f;
      edge.sourceNode.vy += dy / d * f;
      edge.targetNode.vx -= dx / d * f;
      edge.targetNode.vy -= dy / d * f;
    }

    // Center gravity
    for (const node of nodes) {
      node.vx += (width / 2 - node.x) * 0.001;
      node.vy += (height / 2 - node.y) * 0.001;
    }

    // Apply velocity with damping
    for (const node of nodes) {
      node.vx *= 0.9;
      node.vy *= 0.9;
      node.x += node.vx;
      node.y += node.vy;
      // Bounds
      node.x = Math.max(20, Math.min(width - 20, node.x));
      node.y = Math.max(20, Math.min(height - 20, node.y));
    }
  }

  function draw(): void {
    ctx.clearRect(0, 0, width, height);

    // Draw edges
    for (const edge of edges) {
      ctx.beginPath();
      ctx.moveTo(edge.sourceNode.x, edge.sourceNode.y);
      ctx.lineTo(edge.targetNode.x, edge.targetNode.y);
      const isHighlighted = selectedNode &&
        (edge.source === selectedNode.id || edge.target === selectedNode.id);
      ctx.strokeStyle = isHighlighted ? '#D4A44C' : 'rgba(30, 42, 63, 0.5)';
      ctx.lineWidth = isHighlighted ? 2 : 1;
      ctx.stroke();
    }

    // Draw nodes
    for (const node of nodes) {
      const radius = Math.max(6, Math.min(16, node.connections * 2));
      const color = NODE_COLORS[node.type] || '#9B9180';
      const isSelected = selectedNode?.id === node.id;
      const isConnected = selectedNode && edges.some(e =>
        (e.source === selectedNode!.id && e.target === node.id) ||
        (e.target === selectedNode!.id && e.source === node.id)
      );

      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = (selectedNode && !isSelected && !isConnected) ? color + '33' : color;
      ctx.fill();

      if (isSelected) {
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Label
      ctx.font = `${isSelected || hoveredNode?.id === node.id ? '12px' : '10px'} Inter, sans-serif`;
      ctx.fillStyle = (selectedNode && !isSelected && !isConnected) ? '#6B635833' : '#E8E0D4';
      ctx.textAlign = 'center';
      ctx.fillText(node.name[lang], node.x, node.y + radius + 14);
    }
  }

  // Animation loop
  let running = true;
  let frame = 0;
  function animate(): void {
    if (!running) return;
    if (frame < 300) tick(); // Stabilize after 300 frames
    draw();
    frame++;
    requestAnimationFrame(animate);
  }
  animate();

  simulation = { stop: () => { running = false; } };

  // Click handler
  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);

    const clicked = nodes.find(n => {
      const r = Math.max(6, Math.min(16, n.connections * 2));
      return Math.sqrt((n.x - x) ** 2 + (n.y - y) ** 2) < r + 5;
    });

    selectedNode = clicked || null;
    if (clicked) showBioCard(clicked);
    else closeBioCard();
    draw();
  });

  // Hover
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    hoveredNode = nodes.find(n => {
      const r = Math.max(6, Math.min(16, n.connections * 2));
      return Math.sqrt((n.x - x) ** 2 + (n.y - y) ** 2) < r + 5;
    }) || null;
    canvas.style.cursor = hoveredNode ? 'pointer' : 'default';
  });

  // Search
  document.getElementById('network-search')?.addEventListener('input', (e) => {
    const query = (e.target as HTMLInputElement).value.toLowerCase();
    if (!query) { selectedNode = null; closeBioCard(); draw(); return; }
    const found = nodes.find(n =>
      n.name.en.toLowerCase().includes(query) || n.name.cn.includes(query)
    );
    if (found) {
      selectedNode = found;
      showBioCard(found);
      draw();
    }
  });

  // Filters
  document.querySelectorAll('.network-controls .filter-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.network-controls .filter-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // Filter is visual only — dim non-matching
      draw();
    });
  });
}

function showBioCard(node: NetworkNode): void {
  const card = document.getElementById('bio-card');
  const lang = getLang();
  if (!card) return;

  card.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: start;">
      <h3 style="font-size: 1.125rem; margin: 0;">${node.name[lang]}</h3>
      <button onclick="document.getElementById('bio-card').classList.remove('open')" style="background: none; border: none; color: var(--text-tertiary); cursor: pointer; font-size: 1.25rem;">×</button>
    </div>
    ${node.name.en !== node.name.cn ? `<p style="font-size: 0.8125rem; color: var(--text-tertiary); margin: 4px 0;">${lang === 'en' ? node.name.cn : node.name.en}</p>` : ''}
    ${node.dates ? `<p style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent-gold); margin: 4px 0;">${node.dates}</p>` : ''}
    ${node.role ? `<p style="font-size: 0.875rem; color: var(--text-secondary); margin: 8px 0;">${node.role[lang]}</p>` : ''}
    ${node.denomination ? `<span class="tag">${node.denomination}</span>` : ''}
    <span class="tag">${node.era}</span>
    <span class="tag">${node.type}</span>
  `;
  card.classList.add('open');
}

function closeBioCard(): void {
  document.getElementById('bio-card')?.classList.remove('open');
}
