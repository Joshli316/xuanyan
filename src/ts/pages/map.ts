import { t, getLang } from '../i18n';
import { setCleanup } from '../main';

interface MapPoint {
  name: string;
  type: string;
  denomination: string;
  lat: number;
  lng: number;
  founded: number;
  closed?: number;
}

const ERA_LABELS: { year: number; en: string; cn: string }[] = [
  { year: 635, en: '635: Nestorian Christianity arrives', cn: '635：景教传入中国' },
  { year: 1294, en: '1294: Franciscan missions begin', cn: '1294：方济各会传教开始' },
  { year: 1583, en: '1583: Matteo Ricci enters China', cn: '1583：利玛窦进入中国' },
  { year: 1807, en: '1807: First Protestant missionary', cn: '1807：首位新教传教士' },
  { year: 1865, en: '1865: China Inland Mission founded', cn: '1865：中国内地会成立' },
  { year: 1900, en: '1900: Boxer Rebellion', cn: '1900：义和团运动' },
  { year: 1949, en: '1949: All missionaries expelled', cn: '1949：所有外国传教士被驱逐' },
  { year: 1978, en: '1978: Churches reopen', cn: '1978：教会重新开放' },
];

const TYPE_COLORS: Record<string, string> = {
  church: '#D4A44C',
  school: '#60A5FA',
  hospital: '#4ADE80',
  other: '#9B9180',
};

let mapInstance: any = null;
let markers: any[] = [];
let animationInterval: ReturnType<typeof setInterval> | null = null;

function loadMapData(): MapPoint[] {
  return getDefaultMapData();
}

function getDefaultMapData(): MapPoint[] {
  // Representative sample of CHCD data points
  return [
    { name: 'Morrison Chapel', type: 'church', denomination: 'LMS', lat: 22.20, lng: 113.55, founded: 1807 },
    { name: 'Canton Hospital', type: 'hospital', denomination: 'ABCFM', lat: 23.13, lng: 113.26, founded: 1835 },
    { name: 'Shanghai Mission Press', type: 'other', denomination: 'Presbyterian', lat: 31.23, lng: 121.47, founded: 1843 },
    { name: 'Ningbo CIM Station', type: 'church', denomination: 'CIM', lat: 29.87, lng: 121.55, founded: 1866 },
    { name: 'St. John\'s University', type: 'school', denomination: 'Episcopal', lat: 31.24, lng: 121.43, founded: 1879 },
    { name: 'Peking University Medical', type: 'hospital', denomination: 'ABCFM', lat: 39.91, lng: 116.39, founded: 1861 },
    { name: 'Yenching University', type: 'school', denomination: 'Methodist', lat: 39.99, lng: 116.31, founded: 1919 },
    { name: 'Chengdu CIM Station', type: 'church', denomination: 'CIM', lat: 30.57, lng: 104.07, founded: 1877 },
    { name: 'Fuzhou Mission', type: 'church', denomination: 'CMS', lat: 26.07, lng: 119.30, founded: 1850 },
    { name: 'Xiamen Church', type: 'church', denomination: 'Reformed', lat: 24.48, lng: 118.09, founded: 1842 },
    { name: 'Wuhan Mission Hospital', type: 'hospital', denomination: 'LMS', lat: 30.59, lng: 114.31, founded: 1861 },
    { name: 'Nanjing Theological Seminary', type: 'school', denomination: 'Multiple', lat: 32.06, lng: 118.80, founded: 1911 },
    { name: 'Hangzhou Church', type: 'church', denomination: 'CIM', lat: 30.27, lng: 120.15, founded: 1866 },
    { name: 'Xi\'an Mission', type: 'church', denomination: 'Baptist', lat: 34.26, lng: 108.94, founded: 1893 },
    { name: 'Tianjin Church', type: 'church', denomination: 'Methodist', lat: 39.12, lng: 117.20, founded: 1860 },
    { name: 'Kunming CIM Station', type: 'church', denomination: 'CIM', lat: 25.04, lng: 102.68, founded: 1881 },
    { name: 'Shantou Mission', type: 'church', denomination: 'Presbyterian', lat: 23.35, lng: 116.68, founded: 1856 },
    { name: 'Changsha Yale-in-China', type: 'hospital', denomination: 'Yale', lat: 28.23, lng: 112.94, founded: 1906 },
    { name: 'Wenzhou Church', type: 'church', denomination: 'CIM', lat: 28.00, lng: 120.65, founded: 1877 },
    { name: 'Taigu Hospital', type: 'hospital', denomination: 'Oberlin', lat: 37.42, lng: 112.55, founded: 1889 },
    { name: 'Kaifeng Mission', type: 'church', denomination: 'CIM', lat: 34.80, lng: 114.31, founded: 1884 },
    { name: 'Chongqing Church', type: 'church', denomination: 'Methodist', lat: 29.56, lng: 106.55, founded: 1882 },
    { name: 'Ginling College', type: 'school', denomination: 'Methodist', lat: 32.05, lng: 118.77, founded: 1913 },
    { name: 'West China Union University', type: 'school', denomination: 'Multiple', lat: 30.63, lng: 104.09, founded: 1910 },
    { name: 'Jinan Mission', type: 'church', denomination: 'Presbyterian', lat: 36.67, lng: 116.99, founded: 1873 },
    { name: 'Wuhu Hospital', type: 'hospital', denomination: 'Methodist', lat: 31.34, lng: 118.38, founded: 1883 },
    { name: 'True Jesus Church HQ', type: 'church', denomination: 'Indigenous', lat: 39.91, lng: 116.39, founded: 1917 },
    { name: 'Jesus Family Mazhuang', type: 'church', denomination: 'Indigenous', lat: 36.18, lng: 116.59, founded: 1921 },
    { name: 'Little Flock Shanghai', type: 'church', denomination: 'Indigenous', lat: 31.23, lng: 121.47, founded: 1927 },
    { name: 'Shouwang Church Beijing', type: 'church', denomination: 'House Church', lat: 39.96, lng: 116.33, founded: 1993 },
    { name: 'Early Rain Covenant Church', type: 'church', denomination: 'House Church', lat: 30.57, lng: 104.07, founded: 2005 },
    { name: 'Zion Church Beijing', type: 'church', denomination: 'House Church', lat: 39.92, lng: 116.46, founded: 2007 },
    // Pre-Protestant era points
    { name: 'Nestorian Monastery Chang\'an', type: 'church', denomination: 'Nestorian', lat: 34.26, lng: 108.94, founded: 635 },
    { name: 'Xi\'an Stele Site', type: 'other', denomination: 'Nestorian', lat: 34.25, lng: 108.93, founded: 781 },
    { name: 'Franciscan Khanbaliq Mission', type: 'church', denomination: 'Franciscan', lat: 39.91, lng: 116.39, founded: 1294 },
    { name: 'Ricci\'s Residence Zhaoqing', type: 'church', denomination: 'Jesuit', lat: 23.05, lng: 112.44, founded: 1583 },
    { name: 'Ricci\'s Beijing Mission', type: 'church', denomination: 'Jesuit', lat: 39.91, lng: 116.40, founded: 1601 },
    { name: 'Schall\'s Observatory', type: 'other', denomination: 'Jesuit', lat: 39.90, lng: 116.41, founded: 1644 },
    { name: 'Macau Seminary', type: 'school', denomination: 'Jesuit', lat: 22.19, lng: 113.55, founded: 1594 },
    { name: 'Nantang Church Beijing', type: 'church', denomination: 'Jesuit', lat: 39.90, lng: 116.37, founded: 1605 },
  ];
}

export function renderMap(): void {
  const app = document.getElementById('app')!;
  const lang = getLang();

  app.innerHTML = `
    <div class="map-container">
      <div class="map-controls">
        <div class="map-slider-container">
          <button class="autoplay-btn" id="map-play">▶</button>
          <input type="range" class="map-slider" id="map-slider" min="635" max="2026" value="2026" step="1">
          <span class="map-year-display" id="map-year">2026</span>
        </div>
        <div class="map-speed">
          <button data-speed="1" class="active">1x</button>
          <button data-speed="2">2x</button>
          <button data-speed="4">4x</button>
        </div>
        <div class="layer-toggles">
          <label class="layer-toggle"><input type="checkbox" data-type="church" checked> ${lang === 'en' ? 'Churches' : '教会'}</label>
          <label class="layer-toggle"><input type="checkbox" data-type="school" checked> ${lang === 'en' ? 'Schools' : '学校'}</label>
          <label class="layer-toggle"><input type="checkbox" data-type="hospital" checked> ${lang === 'en' ? 'Hospitals' : '医院'}</label>
        </div>
      </div>
      <div id="map" style="position: relative;">
        <div class="era-label" id="era-label"></div>
      </div>
    </div>
  `;

  // Load Leaflet dynamically
  loadLeaflet().then(() => {
    const data = loadMapData();
    initMap(data);
  });

  setCleanup(() => {
    if (animationInterval) clearInterval(animationInterval);
    mapInstance = null;
    markers = [];
  });
}

async function loadLeaflet(): Promise<void> {
  if ((window as any).L) return;

  // Load CSS
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
  document.head.appendChild(link);

  // Load JS
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => resolve();
    document.head.appendChild(script);
  });
}

function initMap(data: MapPoint[]): void {
  const L = (window as any).L;
  if (!L) return;

  mapInstance = L.map('map', {
    center: [35, 105],
    zoom: 4,
    zoomControl: true,
    attributionControl: false,
  });

  // Dark tile layer
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 18,
  }).addTo(mapInstance);

  // Create markers
  const slider = document.getElementById('map-slider') as HTMLInputElement;
  const yearDisplay = document.getElementById('map-year')!;

  function updateMarkers(): void {
    const year = parseInt(slider.value);
    yearDisplay.textContent = String(year);

    // Get active type filters
    const activeTypes = new Set<string>();
    document.querySelectorAll('.layer-toggle input:checked').forEach(cb => {
      activeTypes.add((cb as HTMLInputElement).dataset.type || '');
    });

    // Remove old markers
    markers.forEach(m => m.remove());
    markers = [];

    // Add filtered markers
    for (const point of data) {
      if (point.founded > year) continue;
      if (point.closed && point.closed < year) continue;
      if (!activeTypes.has(point.type) && point.type !== 'other') continue;

      const color = TYPE_COLORS[point.type] || TYPE_COLORS.other;
      const marker = L.circleMarker([point.lat, point.lng], {
        radius: 5,
        fillColor: color,
        color: color,
        fillOpacity: 0.7,
        weight: 1,
        opacity: 0.9,
      }).addTo(mapInstance);

      marker.bindPopup(`
        <div style="font-family: Inter, sans-serif; font-size: 13px; min-width: 150px;">
          <strong>${point.name}</strong><br>
          <span style="opacity: 0.7;">${point.type} · ${point.denomination}</span><br>
          <span style="font-family: monospace;">Founded: ${point.founded}</span>
          ${point.closed ? `<br><span style="font-family: monospace;">Closed: ${point.closed}</span>` : ''}
        </div>
      `);
      markers.push(marker);
    }

    // Update era label
    updateEraLabel(year);
  }

  slider.addEventListener('input', updateMarkers);

  // Layer toggles
  document.querySelectorAll('.layer-toggle input').forEach(cb => {
    cb.addEventListener('change', updateMarkers);
  });

  // Play/pause
  let speed = 1;
  const playBtn = document.getElementById('map-play')!;
  playBtn.addEventListener('click', () => {
    if (animationInterval) {
      clearInterval(animationInterval);
      animationInterval = null;
      playBtn.textContent = '▶';
      playBtn.classList.remove('playing');
    } else {
      slider.value = '635';
      playBtn.textContent = '⏸';
      playBtn.classList.add('playing');
      animationInterval = setInterval(() => {
        const val = parseInt(slider.value);
        if (val >= 2026) {
          clearInterval(animationInterval!);
          animationInterval = null;
          playBtn.textContent = '▶';
          playBtn.classList.remove('playing');
          return;
        }
        slider.value = String(val + speed);
        updateMarkers();
      }, 50);
    }
  });

  // Speed buttons
  document.querySelectorAll('.map-speed button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.map-speed button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      speed = parseInt((btn as HTMLElement).dataset.speed || '1');
    });
  });

  updateMarkers();
}

function updateEraLabel(year: number): void {
  const label = document.getElementById('era-label');
  if (!label) return;
  const lang = getLang();

  const era = ERA_LABELS.find((e, i) => {
    const next = ERA_LABELS[i + 1];
    return year >= e.year && (!next || year < next.year);
  });

  if (era && Math.abs(year - era.year) < 5) {
    label.textContent = lang === 'cn' ? era.cn : era.en;
    label.classList.add('visible');
  } else {
    label.classList.remove('visible');
  }
}
