// ── directory.js ──────────────────────────────────────────────
// Timbuktu Chamber of Commerce — Business Directory
// Author: Vivian Eze | WDD231
// ──────────────────────────────────────────────────────────────

const MEMBERS_URL = 'data/members.json';

const container = document.getElementById('members-container');
const countEl = document.getElementById('member-count');
const btnGrid = document.getElementById('btn-grid');
const btnList = document.getElementById('btn-list');

// Category emoji fallbacks (used instead of real images for demo)
const EMOJI = {
    'Trade & Commerce': '🏪',
    'Technology': '💻',
    'Finance': '💳',
    'Logistics': '🚢',
    'Creative & Marketing': '🎨',
    'Healthcare': '🏥',
    'Real Estate': '🏢',
    'Education': '🎓',
};

// ── FETCH ─────────────────────────────────────────────────────
async function fetchMembers() {
    showLoading();
    try {
        const res = await fetch(MEMBERS_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        renderMembers(data.members);
        if (countEl) countEl.textContent = data.members.length;
    } catch (err) {
        container.innerHTML = `<p class="loading" style="color:#c0392b;">
      ⚠️ Could not load member data (${err.message}).<br>
      <small>Serve over a local server — fetch() requires HTTP.</small></p>`;
    }
}

function showLoading() {
    container.innerHTML = `
    <div class="loading">
      <div class="spinner"></div>
      <p>Loading members…</p>
    </div>`;
}

// ── RENDER ────────────────────────────────────────────────────
function renderMembers(members) {
    container.innerHTML = '';
    if (!members || !members.length) {
        container.innerHTML = '<p class="loading">No members found.</p>';
        return;
    }
    members.forEach((m, i) => container.appendChild(buildCard(m, i)));
}

// ── BUILD CARD ────────────────────────────────────────────────
// Grid view:  logo (emoji/img) on top, then name / address / phone / url
// List view:  same elements, CSS reshapes them into a horizontal row
function buildCard(m, index) {
    const card = document.createElement('article');
    card.className = 'member-card';
    card.style.animationDelay = `${index * 0.04}s`;

    const emoji = EMOJI[m.category] || '🏬';
    const hostDisplay = m.website.replace(/^https?:\/\//, '');

    card.innerHTML = `
    <div class="card-logo" aria-label="${m.name} logo">
      ${emoji}
    </div>
    <div class="card-info">
      <h2 class="card-name">${m.name}</h2>
      <p class="card-address">${m.address}</p>
      <p class="card-phone">${m.phone}</p>
      <a class="card-url" href="${m.website}" target="_blank" rel="noopener">
        ${m.website}
      </a>
    </div>`;

    return card;
}

// ── VIEW TOGGLE ───────────────────────────────────────────────
function setView(mode) {
    const isList = mode === 'list';
    container.classList.toggle('list-view', isList);
    btnList.classList.toggle('active', isList);
    btnGrid.classList.toggle('active', !isList);
    btnGrid.setAttribute('aria-pressed', String(!isList));
    btnList.setAttribute('aria-pressed', String(isList));
    localStorage.setItem('chamber-dir-view', mode);
}

btnGrid.addEventListener('click', () => setView('grid'));
btnList.addEventListener('click', () => setView('list'));

// ── FOOTER DATES (JS) ─────────────────────────────────────────
const yearEl = document.getElementById('copyright-year');
const lastModEl = document.getElementById('last-modified');
if (yearEl) yearEl.textContent = new Date().getFullYear();
if (lastModEl) lastModEl.textContent = document.lastModified;

// ── HAMBURGER ─────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
if (hamburger) {
    hamburger.addEventListener('click', () => {
        const open = mobileNav.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', String(open));
    });
}

// ── INIT ──────────────────────────────────────────────────────
const savedView = localStorage.getItem('chamber-dir-view') || 'grid';
setView(savedView);
fetchMembers();
// ── BUILD CARD ────────────────────────────────────────────────
function buildCard(m, index) {
    const card = document.createElement('article');
    card.className = 'member-card';
    card.style.animationDelay = `${index * 0.04}s`;

    const emoji = EMOJI[m.category] || '🏬';
    // Clean up the URL for display if you prefer, 
    // but the screenshot shows the full https:// link.
    
    card.innerHTML = `
    <div class="card-logo" aria-label="${m.name} logo">
      ${emoji}
    </div>
    <div class="card-body"> <h3 class="card-name">${m.name}</h3>
      <p class="card-detail">${m.address}</p> <p class="card-detail">${m.phone}</p>   <a class="card-url" href="${m.website}" target="_blank" rel="noopener">
        ${m.website}
      </a>
    </div>`;

    return card;
}