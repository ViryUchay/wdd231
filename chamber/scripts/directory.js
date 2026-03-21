// ── directory.js ──────────────────────────────────────────────
// Timbuktu Chamber of Commerce — Business Directory
// Author: Vivian Eze | WDD231
// ──────────────────────────────────────────────────────────────

const MEMBERS_URL = 'data/members.json';

const container   = document.getElementById('members-container');
const countEl     = document.getElementById('member-count');
const btnGrid     = document.getElementById('btn-grid');
const btnList     = document.getElementById('btn-list');

// ── LEVEL LABELS ─────────────────────────────────────────────
const LEVEL_LABELS = { 1: 'Member', 2: 'Silver', 3: 'Gold' };
const LEVEL_ICONS  = { 1: '🌿', 2: '🥈', 3: '🥇' };

// ── EMOJI FALLBACKS (when image is missing) ───────────────────
const CATEGORY_EMOJI = {
  'Trade & Commerce':    '🏪',
  'Technology':          '💻',
  'Finance':             '💳',
  'Logistics':           '🚢',
  'Creative & Marketing':'🎨',
  'Healthcare':          '🏥',
  'Real Estate':         '🏢',
  'Education':           '🎓',
};

// ── FETCH MEMBERS ─────────────────────────────────────────────
async function fetchMembers() {
  showLoading();
  try {
    const res  = await fetch(MEMBERS_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    renderMembers(data.members);
    if (countEl) countEl.textContent = data.members.length;
  } catch (err) {
    container.innerHTML = `
      <p class="loading" style="color:#c0392b;">
        ⚠️ Could not load member data. (${err.message})<br>
        <small>Make sure members.json is served over a local server.</small>
      </p>`;
  }
}

// ── LOADING PLACEHOLDER ───────────────────────────────────────
function showLoading() {
  container.innerHTML = `
    <div class="loading" style="grid-column:1/-1">
      <div class="spinner"></div>
      <p>Loading members…</p>
    </div>`;
}

// ── RENDER GRID CARDS ─────────────────────────────────────────
function renderMembers(members) {
  container.innerHTML = '';

  if (!members || members.length === 0) {
    container.innerHTML = '<p class="loading">No members found.</p>';
    return;
  }

  members.forEach((m, i) => {
    const card = buildCard(m, i);
    container.appendChild(card);
  });
}

// ── BUILD A SINGLE CARD ───────────────────────────────────────
function buildCard(m, index) {
  const card = document.createElement('article');
  card.className = 'member-card';
  card.style.animationDelay = `${index * 0.05}s`;

  const levelLabel = LEVEL_LABELS[m.membershipLevel] || 'Member';
  const levelIcon  = LEVEL_ICONS[m.membershipLevel]  || '🌿';
  const emoji      = CATEGORY_EMOJI[m.category]      || '🏬';
  const hostDisplay = m.website.replace(/^https?:\/\//, '');

  card.innerHTML = `
    <div class="card-img-wrap" aria-label="${m.name} logo">
      ${emoji}
    </div>
    <div class="card-body">
      <span class="card-level level-${m.membershipLevel}">
        ${levelIcon} ${levelLabel}
      </span>
      <h2 class="card-name">${m.name}</h2>
      <p class="card-tagline">${m.tagline}</p>
      <div class="card-details">
        <span><strong>📍</strong> ${m.address}</span>
        <span><strong>📞</strong> ${m.phone}</span>
        <span><strong>🏷️</strong> ${m.category}</span>
        <span><strong>👥</strong> ${m.employees} employees</span>
        <span><strong>📅</strong> Est. ${m.founded}</span>
      </div>
      <a class="card-link-inline" href="${m.website}" target="_blank" rel="noopener" aria-label="Visit ${m.name} website" style="display:none">${hostDisplay} →</a>
    </div>
    <div class="card-footer">
      <a class="card-link" href="${m.website}" target="_blank" rel="noopener" aria-label="Visit ${m.name}">
        Visit Website
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
          <path d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
        </svg>
      </a>
    </div>`;

  return card;
}

// ── TOGGLE GRID / LIST VIEW ───────────────────────────────────
function setView(mode) {
  if (mode === 'list') {
    container.classList.add('list-view');
    btnList.classList.add('active');
    btnGrid.classList.remove('active');
    // show inline links, hide card-footer links
    container.querySelectorAll('.card-link-inline').forEach(el => el.style.display = 'inline');
    container.querySelectorAll('.card-link').forEach(el => el.style.display = 'none');
  } else {
    container.classList.remove('list-view');
    btnGrid.classList.add('active');
    btnList.classList.remove('active');
    container.querySelectorAll('.card-link-inline').forEach(el => el.style.display = 'none');
    container.querySelectorAll('.card-link').forEach(el => el.style.display = 'inline-flex');
  }
  localStorage.setItem('chamber-dir-view', mode);
}

// ── EVENT LISTENERS ───────────────────────────────────────────
btnGrid.addEventListener('click', () => setView('grid'));
btnList.addEventListener('click', () => setView('list'));

// ── FOOTER DYNAMIC DATES ──────────────────────────────────────
const yearEl     = document.getElementById('copyright-year');
const lastModEl  = document.getElementById('last-modified');

if (yearEl)    yearEl.textContent    = new Date().getFullYear();
if (lastModEl) lastModEl.textContent = document.lastModified;

// ── INIT ──────────────────────────────────────────────────────
const savedView = localStorage.getItem('chamber-dir-view') || 'grid';
setView(savedView);
fetchMembers();