'use strict';

const TIER_NAMES = {
  'tier-1': 'Data & Market Intelligence',
  'tier-2': 'Backtesting & Strategy',
  'tier-3': 'Execution & Infrastructure',
  'tier-4': 'Risk & Portfolio Management',
  'tier-5': 'Agentic AI',
};

const STATUS_LABEL = {
  'complete': '✅ Complete',
  'in-progress': '🚧 In Progress',
  'planned': '📋 Planned',
};

let PROJECTS = [];
let currentTierFilter = 'all';
let currentStatusFilter = 'all';
let currentQuery = '';

// ── Data load ──────────────────────────────────────────────────────────────

async function loadProjects() {
  const res = await fetch('projects.json', { cache: 'no-store' });
  PROJECTS = await res.json();
  renderTierProgress();
  renderAboutStats();
  renderProjects();
}

// ── Hero tier progress ───────────────────────────────────────────────────

function renderTierProgress() {
  const el = document.getElementById('tier-progress');
  const tiers = ['tier-1', 'tier-2', 'tier-3', 'tier-4', 'tier-5'];

  el.innerHTML = tiers.map((tier, i) => {
    const inTier = PROJECTS.filter(p => p.tier === tier);
    const done = inTier.filter(p => p.status === 'complete').length;
    const inProgress = inTier.filter(p => p.status === 'in-progress').length;
    const pct = Math.round(((done + inProgress * 0.5) / inTier.length) * 100);
    const shortLabel = TIER_NAMES[tier].split(' ')[0];
    return `
      <div class="tier-stat" data-tier="${i + 1}">
        <span class="tier-count">${done}/${inTier.length}</span>
        <span class="tier-label">${shortLabel}</span>
        <div class="tier-bar"><div class="tier-fill" style="width:${pct}%"></div></div>
      </div>`;
  }).join('');
}

function renderAboutStats() {
  const el = document.getElementById('about-stats');
  const done = PROJECTS.filter(p => p.status === 'complete').length;
  const inProgress = PROJECTS.filter(p => p.status === 'in-progress').length;
  el.innerHTML = `
    <div class="about-stat">
      <span class="about-stat-num">${done}</span>
      <span class="about-stat-label">Shipped</span>
    </div>
    <div class="about-stat">
      <span class="about-stat-num">${inProgress}</span>
      <span class="about-stat-label">In Progress</span>
    </div>
    <div class="about-stat">
      <span class="about-stat-num">${PROJECTS.length}</span>
      <span class="about-stat-label">Roadmap</span>
    </div>`;
}

// ── Rendering ────────────────────────────────────────────────────────────────

function renderProjects() {
  const q = currentQuery.trim().toLowerCase();
  const grid = document.getElementById('projects-grid');
  grid.innerHTML = '';

  let filtered = PROJECTS.filter(p =>
    (currentTierFilter === 'all' || p.tier === currentTierFilter) &&
    (currentStatusFilter === 'all' || p.status === currentStatusFilter)
  );

  if (q) {
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.summary.toLowerCase().includes(q) ||
      p.problem.toLowerCase().includes(q) ||
      p.tech.some(s => s.toLowerCase().includes(q))
    );
  }

  const resultsBar  = document.getElementById('search-results-bar');
  const resultsText = document.getElementById('search-results-text');
  if (q) {
    resultsBar.hidden = false;
    resultsText.textContent = `${filtered.length} project${filtered.length !== 1 ? 's' : ''} matching "${currentQuery}"`;
  } else {
    resultsBar.hidden = true;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="no-results">
        No projects matched <strong>"${currentQuery}"</strong>
        <p>Try a tool name like "postgresql", a tier, or clear the search to browse all 50 projects.</p>
      </div>`;
  }

  filtered.forEach(project => {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.setAttribute('data-tier', project.tier);
    card.setAttribute('data-id', project.id);

    const sourceEl = project.github
      ? `<a href="${project.github}" target="_blank" rel="noopener"
           class="btn btn-outline" style="font-size:11px;padding:4px 10px"
           onclick="event.stopPropagation()">Source</a>`
      : `<span class="no-repo-pill">Not started</span>`;

    card.innerHTML = `
      <div class="project-card-header">
        <span class="project-number">#${project.id}</span>
        <div class="badge-group">
          <span class="tier-badge ${project.tier}">Tier ${project.tier.split('-')[1]}</span>
          <span class="status-badge status-${project.status}"><span class="status-dot"></span>${STATUS_LABEL[project.status]}</span>
        </div>
      </div>
      <div style="display:flex;align-items:flex-start;gap:10px">
        <span class="project-icon">${project.icon}</span>
        <h3>${project.title}</h3>
      </div>
      <p>${project.summary}</p>
      <div class="project-skills">
        ${project.tech.map(s => `<span class="skill-tag">${s}</span>`).join('')}
      </div>
      <div class="project-card-footer">
        <span class="view-link">
          View details
          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
            <path d="M1 8a.5.5 0 01.5-.5h11.793l-3.147-3.146a.5.5 0 01.708-.708l4 4a.5.5 0 010 .708l-4 4a.5.5 0 01-.708-.708L13.293 8.5H1.5A.5.5 0 011 8z"/>
          </svg>
        </span>
        ${sourceEl}
      </div>
    `;

    card.addEventListener('click', () => openModal(project));
    grid.appendChild(card);
  });

  const showHeadings = currentTierFilter === 'all' && currentStatusFilter === 'all' && !q;
  ['tier-1-heading','tier-2-heading','tier-3-heading','tier-4-heading','tier-5-heading']
    .forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = showHeadings ? '' : 'none';
    });
}

// ── Modal ─────────────────────────────────────────────────────────────────────

function openModal(project) {
  const overlay = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');

  const sourceBtn = project.github
    ? `<a href="${project.github}" target="_blank" rel="noopener" class="btn btn-primary">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
        View on GitHub
      </a>`
    : `<span class="no-repo-pill">Not started yet</span>`;

  content.innerHTML = `
    <div class="modal-header">
      <span class="modal-icon">${project.icon}</span>
      <div>
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap">
          <span class="tier-badge ${project.tier}">Tier ${project.tier.split('-')[1]}</span>
          <span class="status-badge status-${project.status}"><span class="status-dot"></span>${STATUS_LABEL[project.status]}</span>
          <span style="font-family:var(--mono);font-size:11px;color:var(--text-dim)">#${project.id}</span>
        </div>
        <h2 class="modal-title">${project.title}</h2>
        <p class="modal-subtitle">${project.summary}</p>
      </div>
    </div>

    <div class="modal-section">
      <h4>Why It Matters</h4>
      <p>${project.problem}</p>
    </div>

    <div class="modal-section">
      <h4>Tech Stack</h4>
      <div class="modal-skills">
        ${project.tech.map(s => `<span class="skill-tag">${s}</span>`).join('')}
      </div>
    </div>

    <div class="modal-actions">
      ${sourceBtn}
    </div>
  `;

  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// ── Filters ──────────────────────────────────────────────────────────────────

document.querySelectorAll('.filter-btn[data-filter]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn[data-filter]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentTierFilter = btn.dataset.filter;
    renderProjects();
  });
});

document.querySelectorAll('.filter-btn[data-status]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn[data-status]').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentStatusFilter = btn.dataset.status;
    renderProjects();
  });
});

// ── Search ────────────────────────────────────────────────────────────────────

const searchInput = document.getElementById('project-search');
const searchClear = document.getElementById('search-clear');

searchInput.addEventListener('input', () => {
  currentQuery = searchInput.value;
  searchClear.hidden = currentQuery.length === 0;
  renderProjects();
});

function clearSearch() {
  searchInput.value = '';
  currentQuery = '';
  searchClear.hidden = true;
  renderProjects();
  searchInput.focus();
}

searchClear.addEventListener('click', clearSearch);
document.getElementById('search-results-clear').addEventListener('click', clearSearch);

// ── Modal ─────────────────────────────────────────────────────────────────────

document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('modal-overlay').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// ── Init ─────────────────────────────────────────────────────────────────────
loadProjects();
