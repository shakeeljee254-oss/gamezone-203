
(() => {
  "use strict";

  const config = window.GZ_CONFIG || {};
  const games = config.games || [];

  const popularGrid = document.getElementById("popular-grid");
  const kidsGrid = document.getElementById("kids-grid");
  const allGrid = document.getElementById("all-grid");
  const search = document.getElementById("game-search");
  const empty = document.getElementById("empty-message");
  const filterRow = document.getElementById("filter-row");

  let activeFilter = "All";

  // Create a game card
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
    tag.textContent = game.tag || game.category || "GAME";

    art.append(tag, emoji);

    const info = document.createElement("div");
    info.className = "game-info";

    const title = document.createElement("h3");
    title.textContent = game.name || "Untitled Game";

    const desc = document.createElement("p");
    desc.textContent =
      game.description || "Choose this game and have fun.";

    // Show Play Now only when a URL exists
    if (game.url && game.url.trim() !== "") {
      const link = document.createElement("a");

      link.className = "play-link";
      link.href = game.url;
      link.textContent = "Play Now →";

      if (/^https?:\/\//i.test(game.url)) {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }

      info.append(title, desc, link);
    } else {
      const comingSoon = document.createElement("span");

      comingSoon.className = "play-link coming-soon";
      comingSoon.textContent = "Coming Soon";

      info.append(title, desc, comingSoon);
    }

    article.append(art, info);

    return article;
  }

  // Render game cards
  function render(target, list) {
    if (!target) return;

    target.replaceChildren(...list.map(card));
  }

  // Create category filter buttons
  function createFilters() {
    if (!filterRow) return;

    const categories = config.categories || [
      "All",
      "Popular",
      ...new Set(games.map(game => game.category).filter(Boolean))
    ];

    filterRow.replaceChildren();

    categories.forEach(category => {
      const button = document.createElement("button");

      button.type = "button";
      button.className = "filter-chip";
      button.dataset.filter = category;
      button.textContent = category;

      if (category === "All") {
        button.classList.add("active");
      }

      filterRow.appendChild(button);
    });
  }

  // Search and filter all games
  function updateAllGames() {
    const term = (search?.value || "").trim().toLowerCase();

    const filtered = games.filter(game => {
      const searchableText = [
        game.name,
        game.category,
        game.description,
        game.tag
      ].join(" ").toLowerCase();

      const matchesText = searchableText.includes(term);

      let matchesFilter = true;

      if (activeFilter === "Popular") {
        matchesFilter = game.popular === true;
      } else if (activeFilter === "Kids") {
        matchesFilter = game.kids === true;
      } else if (activeFilter === "Kids & Family") {
        matchesFilter = game.category === "Kids & Family";
      } else if (activeFilter !== "All") {
        matchesFilter = game.category === activeFilter;
      }

      return matchesText && matchesFilter;
    });

    render(allGrid, filtered);

    if (empty) {
      empty.hidden = filtered.length > 0;
    }
  }

  // Initial page rendering
  createFilters();

  render(
    popularGrid,
    games.filter(game => game.popular === true)
  );

  render(
    kidsGrid,
    games.filter(game => game.kids === true)
  );

  updateAllGames();

  // Search input
  search?.addEventListener("input", updateAllGames);

  // Category filter clicks
  filterRow?.addEventListener("click", event => {
    const button = event.target.closest("[data-filter]");

    if (!button) return;

    activeFilter = button.dataset.filter || "All";

    filterRow.querySelectorAll(".filter-chip").forEach(chip => {
      chip.classList.toggle("active", chip === button);
    });

    updateAllGames();
  });

  // Mobile navigation
  const menuButton = document.getElementById("menu-toggle");
  const nav = document.getElementById("main-nav");

  menuButton?.addEventListener("click", () => {
    if (!nav) return;

    const opened = nav.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", String(opened));
    menuButton.setAttribute(
      "aria-label",
      opened ? "Close menu" : "Open menu"
    );

    menuButton.textContent = opened ? "✕" : "☰";
  });

  nav?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");

      menuButton?.setAttribute("aria-expanded", "false");

      if (menuButton) {
        menuButton.textContent = "☰";
        menuButton.setAttribute("aria-label", "Open menu");
      }
    });
  });

  // Current year in footer
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }
})();
