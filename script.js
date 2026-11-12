(() => {
  "use strict";
  const games = window.GZ_CONFIG?.games || [];
  const popularGrid = document.getElementById("popular-grid");
  const kidsGrid = document.getElementById("kids-grid");
  const allGrid = document.getElementById("all-grid");
  const search = document.getElementById("game-search");
  const empty = document.getElementById("empty-message");
  let activeFilter = "All";

  function card(game) {
    const article = document.createElement("article");
    article.className = "game-card";
    const art = document.createElement("div");
    art.className = "game-art";
    art.style.setProperty("--art-bg", game.bg || "#edf1ff");
    const emoji = document.createElement("span");
    emoji.className = "game-emoji";
    emoji.textContent = game.emoji || "🎮";
    const tag = document.createElement("span");
    tag.className = "game-tag";
    tag.textContent = game.tag || game.category;
    art.append(tag, emoji);

    const info = document.createElement("div");
    info.className = "game-info";
    const title = document.createElement("h3");
    title.textContent = game.name;
    const desc = document.createElement("p");
    desc.textContent = game.description || "Choose this game and have fun.";
    const link = document.createElement("a");
    link.className = "play-link";
    link.href = game.url;
    link.target = game.url.startsWith("http") ? "_blank" : "_self";
    link.rel = game.url.startsWith("http") ? "noopener noreferrer" : "";
    link.textContent = "Play Now  →";
    info.append(title, desc, link);
    article.append(art, info);
    return article;
  }

  function render(target, list) {
    if (!target) return;
    target.replaceChildren(...list.map(card));
  }

  function updateAllGames() {
    const term = (search?.value || "").trim().toLowerCase();
    const filtered = games.filter(game => {
      const matchesText = `${game.name} ${game.category} ${game.description}`.toLowerCase().includes(term);
      const matchesCategory = activeFilter === "All" || game.category === activeFilter || (activeFilter === "Kids" && game.kids);
      return matchesText && matchesCategory;
    });
    render(allGrid, filtered);
    if (empty) empty.hidden = filtered.length > 0;
  }

  render(popularGrid, games.filter(game => game.popular));
  render(kidsGrid, games.filter(game => game.kids));
  updateAllGames();

  search?.addEventListener("input", updateAllGames);
  document.getElementById("filter-row")?.addEventListener("click", event => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;
    activeFilter = button.dataset.filter;
    document.querySelectorAll(".filter-chip").forEach(chip => chip.classList.toggle("active", chip === button));
    updateAllGames();
  });

  const menuButton = document.getElementById("menu-toggle");
  const nav = document.getElementById("main-nav");
  menuButton?.addEventListener("click", () => {
    const opened = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(opened));
    menuButton.setAttribute("aria-label", opened ? "Close menu" : "Open menu");
    menuButton.textContent = opened ? "✕" : "☰";
  });
  nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
    if (menuButton) { menuButton.textContent = "☰"; menuButton.setAttribute("aria-label", "Open menu"); }
  }));
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();