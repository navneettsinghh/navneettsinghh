const fs = require('fs');
const USER = 'navneettsinghh';
const TOKEN = process.env.GITHUB_TOKEN;
const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'navneet-os-engine' };
if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;

async function api(path) {
  const r = await fetch(`https://api.github.com${path}`, { headers });
  if (!r.ok) throw new Error(`${r.status} ${path}`);
  return r.json();
}

const esc = s => String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const profile = await api(`/users/${USER}`);
const repos = (await api(`/users/${USER}/repos?per_page=100&sort=updated`)).filter(r => !r.fork);
const recent = repos.slice(0, 5);
const stars = repos.reduce((n,r) => n + r.stargazers_count, 0);
const forks = repos.reduce((n,r) => n + r.forks_count, 0);
const langs = {};
for (const r of repos) if (r.language) langs[r.language] = (langs[r.language] || 0) + 1;
const top = Object.entries(langs).sort((a,b)=>b[1]-a[1]).slice(0,5);
const now = new Date().toISOString();
const latest = recent[0]?.name || 'No public repository';
const projectRows = recent.map((r,i) => `<g transform="translate(55 ${215+i*43})"><rect width="610" height="34" rx="8" fill="#061018" stroke="#12384c"/><text x="16" y="22" fill="#00e5ff" font-family="monospace" font-size="12">0${i+1}</text><text x="52" y="22" fill="#fff" font-family="monospace" font-size="12">${esc(r.name).slice(0,58)}</text><text x="475" y="22" fill="#6f8a99" font-family="monospace" font-size="10">${esc(r.language || '—')}</text><text x="575" y="22" fill="#8ba9b8" font-family="monospace" font-size="10" text-anchor="end">★ ${r.stargazers_count}</text></g>`).join('');
const langRows = top.map(([name,count],i)=>`<text x="725" y="${215+i*31}" fill="#d5e7ee" font-family="monospace" font-size="12">${esc(name)}</text><rect x="840" y="${203+i*31}" width="${Math.max(24,count*42)}" height="16" rx="5" fill="#00e5ff" opacity="${0.95-i*0.12}"/><text x="${855+Math.max(24,count*42)}" y="${215+i*31}" fill="#fff" font-family="monospace" font-size="11">${count}</text>`).join('');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="500" viewBox="0 0 1200 500" role="img" aria-label="NAVNEET.OS live developer activity dashboard"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#05080d"/><stop offset="1" stop-color="#071a28"/></linearGradient><filter id="glow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><rect width="1200" height="500" rx="26" fill="url(#bg)" stroke="#16455c"/><text x="55" y="48" fill="#00e5ff" font-family="monospace" font-size="19" font-weight="700">NAVNEET.OS // ACTIVITY ENGINE</text><text x="55" y="70" fill="#597887" font-family="monospace" font-size="10">LIVE REPOSITORY RADAR · GENERATED ${esc(now)}</text><g font-family="monospace"><text x="55" y="108" fill="#6f8a99" font-size="11">REPOSITORIES</text><text x="55" y="138" fill="#fff" font-size="27">${profile.public_repos}</text><text x="185" y="108" fill="#6f8a99" font-size="11">STARS</text><text x="185" y="138" fill="#fff" font-size="27">${stars}</text><text x="300" y="108" fill="#6f8a99" font-size="11">FORKS</text><text x="300" y="138" fill="#fff" font-size="27">${forks}</text><text x="425" y="108" fill="#6f8a99" font-size="11">FOLLOWERS</text><text x="425" y="138" fill="#fff" font-size="27">${profile.followers}</text></g><rect x="690" y="92" width="455" height="64" rx="12" fill="#061018" stroke="#17465b"/><circle cx="715" cy="124" r="5" fill="#00ff88" filter="url(#glow)"/><text x="732" y="119" fill="#6f8a99" font-family="monospace" font-size="10">SYSTEM SIGNAL</text><text x="732" y="138" fill="#fff" font-family="monospace" font-size="14">ONLINE · ${esc(latest)}</text><line x1="55" y1="170" x2="1145" y2="170" stroke="#12384c"/><text x="55" y="195" fill="#00e5ff" font-family="monospace" font-size="12">PROJECT RADAR // RECENTLY UPDATED</text>${projectRows}<text x="705" y="195" fill="#00e5ff" font-family="monospace" font-size="12">BUILD DNA // LANGUAGE MIX</text>${langRows}<rect x="705" y="382" width="440" height="66" rx="12" fill="#061018" stroke="#17465b"/><text x="730" y="407" fill="#6f8a99" font-family="monospace" font-size="10">NEXT STATE</text><text x="730" y="430" fill="#00e5ff" font-family="monospace" font-size="14">SHIP → LEARN → EVOLVE()</text><text x="55" y="475" fill="#4e7180" font-family="monospace" font-size="10">// THIS DASHBOARD IS GENERATED FROM PUBLIC GITHUB DATA — NOT HAND-EDITED.</text></svg>`;
fs.mkdirSync('assets', { recursive: true });
fs.writeFileSync('assets/navneet-os-activity.svg', svg);
console.log(`NAVNEET.OS activity generated: ${repos.length} repos, ${stars} stars, latest=${latest}`);
