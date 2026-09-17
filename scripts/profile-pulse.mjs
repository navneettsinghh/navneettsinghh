const fs = require('fs');
const USER = 'navneettsinghh';
const TOKEN = process.env.GITHUB_TOKEN;
const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'navneet-profile-pulse' };
if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;
async function api(path) {
  const r = await fetch(`https://api.github.com${path}`, { headers });
  if (!r.ok) throw new Error(`${r.status} ${path}`);
  return r.json();
}
const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const profile = await api(`/users/${USER}`);
const repos = await api(`/users/${USER}/repos?per_page=100&sort=updated`);
const publicRepos = repos.filter(r => !r.fork);
const stars = publicRepos.reduce((n,r) => n + r.stargazers_count, 0);
const forks = publicRepos.reduce((n,r) => n + r.forks_count, 0);
const languages = {};
for (const r of publicRepos) if (r.language) languages[r.language] = (languages[r.language] || 0) + 1;
const top = Object.entries(languages).sort((a,b)=>b[1]-a[1]).slice(0,4);
const latest = publicRepos[0]?.name || 'No public repository';
const now = new Date().toISOString().replace('T',' ').replace(/\.\d+Z$/,' UTC');
const max = Math.max(...top.map(x=>x[1]), 1);
const bars = top.map(([name,count],i) => { const y=222+i*31; const w=Math.max(28,Math.round((count/max)*245)); return `<text x="55" y="${y}" fill="#b9cbd4" font-family="monospace" font-size="13">${esc(name)}</text><rect x="170" y="${y-12}" width="${w}" height="16" rx="5" fill="#00e5ff" opacity="${0.95-i*0.12}"/><text x="${185+w}" y="${y}" fill="#ffffff" font-family="monospace" font-size="12">${count}</text>`; }).join('');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="420" viewBox="0 0 1200 420" role="img" aria-label="Live NAVNEET.OS profile pulse"><defs><linearGradient id="g" x1="0" x2="1"><stop stop-color="#05080d"/><stop offset="1" stop-color="#071a28"/></linearGradient><filter id="glow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><rect width="1200" height="420" rx="26" fill="url(#g)" stroke="#16455c"/><text x="55" y="55" fill="#00e5ff" font-family="monospace" font-size="20" font-weight="700">NAVNEET.OS // LIVE PROFILE PULSE</text><text x="55" y="79" fill="#597887" font-family="monospace" font-size="11">SELF-UPDATING TELEMETRY · LAST SYNC: ${esc(now)}</text><g font-family="monospace"><text x="55" y="125" fill="#6f8a99" font-size="12">PUBLIC REPOS</text><text x="55" y="156" fill="#fff" font-size="30">${profile.public_repos}</text><text x="220" y="125" fill="#6f8a99" font-size="12">STARS</text><text x="220" y="156" fill="#fff" font-size="30">${stars}</text><text x="350" y="125" fill="#6f8a99" font-size="12">FORKS</text><text x="350" y="156" fill="#fff" font-size="30">${forks}</text><text x="505" y="125" fill="#6f8a99" font-size="12">FOLLOWERS</text><text x="505" y="156" fill="#fff" font-size="30">${profile.followers}</text></g><rect x="690" y="100" width="455" height="80" rx="14" fill="#061018" stroke="#17465b"/><text x="715" y="127" fill="#6f8a99" font-family="monospace" font-size="11">LATEST UPDATED PROJECT</text><text x="715" y="153" fill="#00e5ff" font-family="monospace" font-size="16">${esc(latest)}</text><text x="715" y="170" fill="#7f9aa6" font-family="monospace" font-size="10">github.com/${USER}/${esc(latest)}</text><line x1="55" y1="185" x2="1145" y2="185" stroke="#12384c"/><text x="55" y="207" fill="#00e5ff" font-family="monospace" font-size="12">BUILD DNA // REPOSITORY LANGUAGE MIX</text>${bars || '<text x="55" y="230" fill="#7f9aa6" font-family="monospace" font-size="12">Waiting for language telemetry...</text>'}<rect x="650" y="205" width="495" height="145" rx="16" fill="#061018" stroke="#17465b"/><text x="675" y="235" fill="#00e5ff" font-family="monospace" font-size="12">SIGNAL</text><text x="675" y="262" fill="#ffffff" font-family="monospace" font-size="18">ONLINE</text><circle cx="657" cy="256" r="5" fill="#00ff88" filter="url(#glow)"/><text x="675" y="292" fill="#6f8a99" font-family="monospace" font-size="11">SYSTEM</text><text x="675" y="311" fill="#d5e7ee" font-family="monospace" font-size="13">AI × FULL-STACK × SECURITY</text><text x="675" y="333" fill="#6f8a99" font-family="monospace" font-size="11">NEXT</text><text x="735" y="333" fill="#00e5ff" font-family="monospace" font-size="13">MAKE_IT_REAL()</text><text x="55" y="385" fill="#4e7180" font-family="monospace" font-size="11">// GENERATED FROM LIVE GITHUB DATA — NOT HAND-EDITED.</text></svg>`;
fs.mkdirSync('assets', { recursive: true });
fs.writeFileSync('assets/profile-pulse.svg', svg);
console.log(`Generated pulse: ${profile.public_repos} repos, ${stars} stars, ${forks} forks, latest=${latest}`);
