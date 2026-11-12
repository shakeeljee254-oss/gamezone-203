/* ==========================================================================
   GameZone203 — Main Logic (Fixed & Safe Version)
   ========================================================================== */

(() => {
  'use strict';

  const categories = [
    { name: 'All', icon: 'layout-grid' }, { name: 'Battle Royale', icon: 'flame' },
    { name: 'FPS', icon: 'crosshair' }, { name: 'Racing', icon: 'gauge' },
    { name: 'Strategy', icon: 'brain' }, { name: 'Board & Casual', icon: 'dice-5' },
    { name: 'Sandbox', icon: 'boxes' }, { name: 'Sports', icon: 'trophy' },
    { name: 'Action', icon: 'swords' }
  ];

  const gradients = [
    'linear-gradient(135deg, #00f5d4 0%, #3b82f6 50%, #1e1b4b 100%)',
    'linear-gradient(135deg, #8b5cf6 0%, #d946ef 55%, #1e1b4b 100%)',
    'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 60%, #0f172a 100%)',
    'linear-gradient(135deg, #ec4899 0%, #8b5cf6 55%, #171738 100%)',
    'linear-gradient(135deg, #10b981 0%, #06b6d4 55%, #0f172a 100%)',
    'linear-gradient(135deg, #f59e0b 0%, #d946ef 60%, #1e1b4b 100%)'
  ];

  const rawGames = [
    { title: 'BGMI: Cyber Erangel', category: 'Battle Royale', rating: 4.9, players: '312.4K', playersNum: 312400, badge: 'ESPORTS', trending: true, isNew: false, icon: 'flame', server: 'ASIA-01' },
    { title: 'Free Fire Max: Neon', category: 'Battle Royale', rating: 4.8, players: '289.1K', playersNum: 289100, badge: 'HOT', trending: true, isNew: false, icon: 'zap', server: '11 ms' },
    { title: 'Apex Legends Cloud', category: 'Battle Royale', rating: 4.9, players: '198.5K', playersNum: 198500, badge: '240HZ', trending: false, isNew: false, icon: 'shield', server: 'EU-02' },
    { title: 'Fortnite Zero Build', category: 'Battle Royale', rating: 4.8, players: '274.0K', playersNum: 274000, badge: 'POPULAR', trending: false, isNew: false, icon: 'sparkles', server: '12 ms' },
    { title: 'Warzone Mobile X', category: 'Battle Royale', rating: 4.7, players: '164.2K', playersNum: 164200, badge: 'SEASON 9', trending: false, isNew: true, icon: 'target', server: 'ASIA-01' },
    { title: 'PUBG: New State 203', category: 'Battle Royale', rating: 4.7, players: '141.9K', playersNum: 141900, badge: 'PRO', trending: false, isNew: false, icon: 'crosshair', server: '14 ms' },
    { title: 'Naraka: Bladepoint', category: 'Battle Royale', rating: 4.6, players: '88.3K', playersNum: 88300, badge: 'MELEE', trending: false, isNew: false, icon: 'swords', server: 'ASIA-02' },
    { title: 'Fall Guys: Cyber Dome', category: 'Battle Royale', rating: 4.7, players: '119.6K', playersNum: 119600, badge: 'PARTY', trending: false, isNew: false, icon: 'crown', server: '13 ms' },
    { title: 'Valorant: Neon Protocol', category: 'FPS', rating: 4.9, players: '348.7K', playersNum: 348700, badge: 'TOURNAMENT', trending: true, isNew: false, icon: 'crosshair', server: '12 ms' },
    { title: 'Counter-Strike 2 Cloud', category: 'FPS', rating: 4.9, players: '329.4K', playersNum: 329400, badge: 'MAJOR', trending: false, isNew: false, icon: 'target', server: 'EU-01' },
    { title: 'Call of Duty: Cyber Ops', category: 'FPS', rating: 4.8, players: '215.0K', playersNum: 215000, badge: 'NEW', trending: false, isNew: true, icon: 'flame', server: 'ASIA-01' },
    { title: 'Overwatch 2: Helix', category: 'FPS', rating: 4.7, players: '152.3K', playersNum: 152300, badge: '5V5', trending: false, isNew: false, icon: 'shield', server: '15 ms' },
    { title: 'Rainbow Six Siege X', category: 'FPS', rating: 4.8, players: '134.8K', playersNum: 134800, badge: 'TACTICAL', trending: false, isNew: false, icon: 'radar', server: 'EU-02' },
    { title: 'Halo Infinite Arena', category: 'FPS', rating: 4.6, players: '92.1K', playersNum: 92100, badge: '240HZ', trending: false, isNew: false, icon: 'cpu', server: 'US-01' },
    { title: 'The Finals: Hyper Arena', category: 'FPS', rating: 4.8, players: '127.5K', playersNum: 127500, badge: 'DESTRUCT', trending: false, isNew: false, icon: 'zap', server: '13 ms' },
    { title: 'XDefiant Neon League', category: 'FPS', rating: 4.6, players: '84.9K', playersNum: 84900, badge: 'ARCADE', trending: false, isNew: false, icon: 'crosshair', server: 'ASIA-01' },
    { title: 'Asphalt Legends Unite', category: 'Racing', rating: 4.8, players: '176.4K', playersNum: 176400, badge: 'NITRO', trending: false, isNew: true, icon: 'gauge', server: '11 ms' },
    { title: 'Forza Horizon: Tokyo', category: 'Racing', rating: 4.9, players: '204.2K', playersNum: 204200, badge: '4K HDR', trending: false, isNew: false, icon: 'car', server: 'ASIA-01' },
    { title: 'F1 2026 Esports Pro', category: 'Racing', rating: 4.8, players: '118.7K', playersNum: 118700, badge: 'SIM', trending: false, isNew: false, icon: 'trophy', server: 'EU-01' },
    { title: 'Need for Speed: Underground X', category: 'Racing', rating: 4.7, players: '149.0K', playersNum: 149000, badge: 'DRIFT', trending: false, isNew: false, icon: 'flame', server: '12 ms' },
    { title: 'Trackmania Cyber Circuit', category: 'Racing', rating: 4.7, players: '76.5K', playersNum: 76500, badge: 'TIME TRIAL', trending: false, isNew: false, icon: 'timer', server: 'EU-02' },
    { title: 'Rocket Racing Hyper', category: 'Racing', rating: 4.6, players: '95.2K', playersNum: 95200, badge: 'TURBO', trending: false, isNew: false, icon: 'rocket', server: '14 ms' },
    { title: 'Dota 2: International Hub', category: 'Strategy', rating: 4.9, players: '245.1K', playersNum: 245100, badge: 'MOBA', trending: false, isNew: false, icon: 'brain', server: 'ASIA-01' },
    { title: 'League of Legends: Rift', category: 'Strategy', rating: 4.9, players: '310.8K', playersNum: 310800, badge: 'RANKED', trending: false, isNew: false, icon: 'swords', server: '11 ms' },
    { title: 'Clash Royale: Cyber Arena', category: 'Strategy', rating: 4.8, players: '188.3K', playersNum: 188300, badge: '1V1', trending: false, isNew: false, icon: 'crown', server: 'ASIA-02' },
    { title: 'Teamfight Tactics: Remix', category: 'Strategy', rating: 4.8, players: '154.0K', playersNum: 154000, badge: 'AUTO CHESS', trending: false, isNew: false, icon: 'sparkles', server: '12 ms' },
    { title: 'StarCraft II: Nova Ops', category: 'Strategy', rating: 4.8, players: '68.4K', playersNum: 68400, badge: 'RTS', trending: false, isNew: false, icon: 'cpu', server: 'EU-01' },
    { title: 'Age of Empires IV Cloud', category: 'Strategy', rating: 4.7, players: '79.2K', playersNum: 79200, badge: 'EMPIRES', trending: false, isNew: false, icon: 'shield', server: '15 ms' },
    { title: 'Chess.com Grandmaster 3D', category: 'Board & Casual', rating: 4.9, players: '221.6K', playersNum: 221600, badge: 'BLITZ', trending: false, isNew: false, icon: 'crown', server: '10 ms' },
    { title: 'Ludo King: Neon Club', category: 'Board & Casual', rating: 4.7, players: '264.9K', playersNum: 264900, badge: '4 PLAYER', trending: false, isNew: false, icon: 'dice-5', server: 'ASIA-01' },
    { title: '8 Ball Pool: Cyber Table', category: 'Board & Casual', rating: 4.8, players: '193.2K', playersNum: 193200, badge: 'TOURNEY', trending: false, isNew: false, icon: 'circle-dot', server: '11 ms' },
    { title: 'Carrom Disc Pool Pro', category: 'Board & Casual', rating: 4.6, players: '132.5K', playersNum: 132500, badge: 'CLASSIC', trending: false, isNew: false, icon: 'disc', server: 'ASIA-01' },
    { title: 'Among Us: Cyber Station', category: 'Board & Casual', rating: 4.7, players: '148.0K', playersNum: 148000, badge: 'SOCIAL', trending: false, isNew: false, icon: 'users', server: '13 ms' },
    { title: 'Uno! Esports Championship', category: 'Board & Casual', rating: 4.6, players: '109.4K', playersNum: 109400, badge: 'CARD', trending: false, isNew: false, icon: 'layers', server: '12 ms' },
    { title: 'Minecraft: RTX Skyblock', category: 'Sandbox', rating: 4.9, players: '338.2K', playersNum: 338200, badge: 'RTX ON', trending: true, isNew: false, icon: 'boxes', server: '11 ms' },
    { title: 'GTA V: Vice RP 203', category: 'Sandbox', rating: 4.9, players: '296.5K', playersNum: 296500, badge: 'ROLEPLAY', trending: false, isNew: false, icon: 'car', server: 'ASIA-01' },
    { title: 'Roblox: Cyber Tycoon', category: 'Sandbox', rating: 4.7, players: '258.0K', playersNum: 258000, badge: 'CREATOR', trending: false, isNew: false, icon: 'blocks', server: '12 ms' },
    { title: 'Terraria: Calamity Cloud', category: 'Sandbox', rating: 4.8, players: '94.6K', playersNum: 94600, badge: 'CO-OP', trending: false, isNew: false, icon: 'pickaxe', server: 'EU-02' },
    { title: 'Palworld: Neon Frontier', category: 'Sandbox', rating: 4.8, players: '172.3K', playersNum: 172300, badge: 'NEW', trending: false, isNew: true, icon: 'sparkles', server: 'ASIA-01' },
    { title: 'No Man’s Sky: Orbital', category: 'Sandbox', rating: 4.7, players: '81.5K', playersNum: 81500, badge: 'GALAXY', trending: false, isNew: false, icon: 'orbit', server: '14 ms' },
    { title: 'EA FC 26: Ultimate Cloud', category: 'Sports', rating: 4.8, players: '268.4K', playersNum: 268400, badge: 'FUT', trending: false, isNew: false, icon: 'trophy', server: 'EU-01' },
    { title: 'Rocket League: Neo Tokyo', category: 'Sports', rating: 4.9, players: '212.7K', playersNum: 212700, badge: 'RLCS', trending: false, isNew: false, icon: 'rocket', server: '12 ms' },
    { title: 'NBA 2K26: Cyber Park', category: 'Sports', rating: 4.6, players: '139.8K', playersNum: 139800, badge: '3V3', trending: false, isNew: false, icon: 'dribbble', server: 'US-01' },
    { title: 'eFootball 2026 Pro', category: 'Sports', rating: 4.7, players: '165.0K', playersNum: 165000, badge: 'LEAGUE', trending: false, isNew: false, icon: 'award', server: 'ASIA-01' },
    { title: 'Cricket 26: Super Over', category: 'Sports', rating: 4.8, players: '184.2K', playersNum: 184200, badge: 'T20 CUP', trending: false, isNew: false, icon: 'flame', server: '11 ms' },
    { title: 'TopSpin 2K26 Grand Slam', category: 'Sports', rating: 4.6, players: '62.9K', playersNum: 62900, badge: 'PRO', trending: false, isNew: false, icon: 'medal', server: 'EU-02' },
    { title: 'Cyberpunk 2077: Phantom', category: 'Action', rating: 4.9, players: '191.4K', playersNum: 191400, badge: 'RAYTRACE', trending: false, isNew: false, icon: 'cpu', server: '12 ms' },
    { title: 'Genshin Impact: Natlan', category: 'Action', rating: 4.8, players: '254.6K', playersNum: 254600, badge: 'OPEN WORLD', trending: false, isNew: false, icon: 'sparkles', server: 'ASIA-01' },
    { title: 'Wuthering Waves Cloud', category: 'Action', rating: 4.8, players: '162.1K', playersNum: 162100, badge: 'ACTION RPG', trending: false, isNew: false, icon: 'zap', server: '11 ms' },
    { title: 'Elden Ring: Shadow Arena', category: 'Action', rating: 4.9, players: '178.9K', playersNum: 178900, badge: 'BOSS RUSH', trending: false, isNew: false, icon: 'swords', server: 'EU-01' },
    { title: 'Tekken 8: King of Iron', category: 'Action', rating: 4.8, players: '129.3K', playersNum: 129300, badge: 'FIGHTER', trending: false, isNew: false, icon: 'flame', server: '13 ms' },
    { title: 'Street Fighter 6: Metro', category: 'Action', rating: 4.8, players: '116.7K', playersNum: 116700, badge: 'ARCADE', trending: false, isNew: false, icon: 'shield', server: 'ASIA-02' },
    { title: 'Solo Leveling: Arise 203', category: 'Action', rating: 4.7, players: '147.8K', playersNum: 147800, badge: 'HUNTER', trending: false, isNew: false, icon: 'crown', server: '12 ms' },
    { title: 'Black Myth: Wukong Cloud', category: 'Action', rating: 4.9, players: '205.4K', playersNum: 205400, badge: 'ULTRA 4K', trending: false, isNew: false, icon: 'swords', server: 'ASIA-01' }
  ];

  const gamesData = rawGames.map((game, index) => ({
    id: index + 1, ...game, grad: gradients[index % gradients.length]
  }));

  const leaderboardRows = [
    { rank: 4, tag: 'NX', name: 'NightShadow_99', game: 'Counter-Strike 2', matches: 412, winRate: '69.8%', earnings: '$11,450', isMe: false },
    { rank: 5, tag: 'CY', name: 'CyberValkyrie', game: 'Apex Legends Cloud', matches: 389, winRate: '69.1%', earnings: '$9,820', isMe: false },
    { rank: 6, tag: 'NX', name: 'NovaX_203', game: 'Valorant: Neon Protocol', matches: 364, winRate: '68.4%', earnings: '$8,640', isMe: true },
    { rank: 7, tag: 'DR', name: 'DracoBlitz', game: 'BGMI: Cyber Erangel', matches: 351, winRate: '66.9%', earnings: '$7,300', isMe: false },
    { rank: 8, tag: 'SL', name: 'SolarisPulse', game: 'Rocket League', matches: 338, winRate: '65.7%', earnings: '$6,190', isMe: false }
  ];

  let activeCategory = 'All', searchQuery = '', sortBy = 'popular';
  let coinBalance = 24850, activeModalGame = null;

  function refreshIcons() {
    setTimeout(() => { if (window.lucide) window.lucide.createIcons(); }, 10);
  }

  function showToast(msg) {
    const banner = document.getElementById('toast-banner');
    if (!banner) return;
    document.getElementById('toast-message').textContent = msg;
    banner.classList.add('show');
    setTimeout(() => banner.classList.remove('show'), 3400);
  }

  function updateCoinDisplays() {
    const f = coinBalance.toLocaleString('en-US');
    if (document.getElementById('header-coin-balance')) document.getElementById('header-coin-balance').textContent = f;
    if (document.getElementById('modal-coin-balance')) document.getElementById('modal-coin-balance').textContent = f;
  }

  function createGameCardHTML(game) {
    return `
      <article class="game-card glass-card" data-game-id="${game.id}">
        <div class="game-cover" style="background: ${game.grad};">
          <div class="game-cover-pattern"></div>
          <span class="game-badge">${game.badge}</span>
          <span class="server-tag">${game.server}</span>
          <div class="game-cover-icon"><i data-lucide="${game.icon}"></i></div>
        </div>
        <div class="game-body">
          <div class="game-meta-top">
            <span class="game-cat-label">${game.category}</span>
            <span class="game-rating"><i data-lucide="star"></i>${game.rating.toFixed(1)}</span>
          </div>
          <h3 class="game-title">${game.title}</h3>
          <div class="game-footer">
            <span class="live-players"><i data-lucide="users"></i>${game.players}</span>
            <button class="btn-neon-play btn-card-play" data-open-game="${game.id}"><i data-lucide="play"></i><span>Play</span></button>
          </div>
        </div>
      </article>
    `;
  }

  function renderCategories() {
    const c = document.getElementById('category-pills');
    if (!c) return;
    c.innerHTML = categories.map((cat) => {
      const count = cat.name === 'All' ? gamesData.length : gamesData.filter((g) => g.category === cat.name).length;
      return `<button class="cat-pill ${activeCategory === cat.name ? 'active' : ''}" data-category="${cat.name}"><i data-lucide="${cat.icon}"></i><span>${cat.name}</span><span class="cat-count">(${count})</span></button>`;
    }).join('');
    refreshIcons();
  }

  function renderHighlightedSections() {
    if (document.getElementById('trending-grid')) document.getElementById('trending-grid').innerHTML = gamesData.filter((g) => g.trending).slice(0, 4).map(createGameCardHTML).join('');
    if (document.getElementById('new-releases-grid')) document.getElementById('new-releases-grid').innerHTML = gamesData.filter((g) => g.isNew).slice(0, 4).map(createGameCardHTML).join('');
    refreshIcons();
  }

  function renderAllGames() {
    const grid = document.getElementById('all-games-grid');
    if (!grid) return;
    const q = searchQuery.trim().toLowerCase();
    
    let filtered = gamesData.filter((g) => {
      return (activeCategory === 'All' || g.category === activeCategory) && 
             (!q || g.title.toLowerCase().includes(q));
    });

    if (sortBy === 'rating') filtered.sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'az') filtered.sort((a, b) => a.title.localeCompare(b.title));
    else filtered.sort((a, b) => b.playersNum - a.playersNum);

    if (document.getElementById('games-count-badge')) document.getElementById('games-count-badge').textContent = String(filtered.length);

    if (filtered.length === 0) {
      grid.innerHTML = ''; grid.classList.add('hidden');
      if (document.getElementById('empty-games-state')) document.getElementById('empty-games-state').classList.remove('hidden');
    } else {
      grid.classList.remove('hidden');
      if (document.getElementById('empty-games-state')) document.getElementById('empty-games-state').classList.add('hidden');
      grid.innerHTML = filtered.map(createGameCardHTML).join('');
    }
    refreshIcons();
  }

  function renderLeaderboardTable() {
    const tbody = document.getElementById('leaderboard-tbody');
    if (!tbody) return;
    tbody.innerHTML = leaderboardRows.map((row) => `
      <tr class="${row.isMe ? 'is-me' : ''}">
        <td class="rank-num">#0${row.rank}</td>
        <td><div class="player-cell"><span class="mini-tag">${row.tag}</span><span>${row.name}</span>${row.isMe ? '<span class="you-pill">YOU</span>' : ''}</div></td>
        <td>${row.game}</td><td>${row.matches}</td><td class="text-cyan"><strong>${row.winRate}</strong></td><td><strong>${row.earnings}</strong></td>
      </tr>
    `).join('');
  }

  function closeModals() {
    document.querySelectorAll('.modal-overlay').forEach((m) => m.classList.add('hidden'));
    document.body.classList.remove('no-scroll');
  }

  function openGameModal(id) {
    const game = gamesData.find((g) => g.id === Number(id));
    if (!game) return;
    activeModalGame = game;
    if (document.getElementById('gm-title')) document.getElementById('gm-title').textContent = game.title;
    if (document.getElementById('gm-category')) document.getElementById('gm-category').textContent = game.category;
    if (document.getElementById('gm-server')) document.getElementById('gm-server').textContent = game.server;
    if (document.getElementById('gm-players')) document.getElementById('gm-players').textContent = game.players;
    if (document.getElementById('gm-rating')) document.getElementById('gm-rating').textContent = `${game.rating.toFixed(1)} ★`;
    if (document.getElementById('gm-icon-wrap')) document.getElementById('gm-icon-wrap').innerHTML = `<i data-lucide="${game.icon}"></i>`;
    if (document.getElementById('game-modal')) { document.getElementById('game-modal').classList.remove('hidden'); document.body.classList.add('no-scroll'); }
    refreshIcons();
  }

  document.addEventListener('DOMContentLoaded', () => {
    updateCoinDisplays();
    renderCategories();
    renderHighlightedSections();
    renderAllGames();
    renderLeaderboardTable();

    document.getElementById('global-search')?.addEventListener('input', (e) => {
      const val = e.target.value;
      document.getElementById('clear-search-btn')?.classList.toggle('hidden', val.length === 0);
      setTimeout(() => { searchQuery = val; renderAllGames(); }, 200);
    });

    document.getElementById('sort-select')?.addEventListener('change', (e) => { sortBy = e.target.value; renderAllGames(); });
    document.getElementById('open-sidebar-btn')?.addEventListener('click', () => {
      document.getElementById('sidebar')?.classList.add('open');
      document.getElementById('sidebar-backdrop')?.classList.add('active');
    });
    document.getElementById('close-sidebar-btn')?.addEventListener('click', () => {
      document.getElementById('sidebar')?.classList.remove('open');
      document.getElementById('sidebar-backdrop')?.classList.remove('active');
    });
    document.getElementById('header-wallet-btn')?.addEventListener('click', () => {
      document.getElementById('wallet-modal')?.classList.remove('hidden');
      document.body.classList.add('no-scroll');
    });
    document.getElementById('notif-toggle-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      document.getElementById('notif-dropdown')?.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
      const catBtn = e.target.closest('[data-category]');
      if (catBtn) { activeCategory = catBtn.dataset.category; renderCategories(); renderAllGames(); return; }
      
      const playBtn = e.target.closest('[data-open-game]');
      if (playBtn) { openGameModal(playBtn.dataset.openGame); return; }
      
      const coinBtn = e.target.closest('[data-add-coins]');
      if (coinBtn) { coinBalance += Number(coinBtn.dataset.addCoins); updateCoinDisplays(); showToast('Coins Added!'); return; }

      if (e.target.closest('[data-close-modal]') || e.target.classList.contains('modal-overlay')) { closeModals(); return; }
      
      if (!e.target.closest('.notif-wrapper')) document.getElementById('notif-dropdown')?.classList.add('hidden');
    });
  });
})();
