
document.addEventListener("DOMContentLoaded", () => {
  const config = window.GZ_CONFIG || {};
  const games = config.games || [];
  const categories = config.categories || ["All", ...new Set(games.map(g => g.category).filter(Boolean))];

  const popularGrid = document.getElementById("popular-grid");
  const kidsGrid = document.getElementById("kids-grid");
  const allGrid = document.getElementById("all-grid");
  const filterRow = document.getElementById("filter-row");
  const searchInput = document.getElementById("game-search");
  const searchForm = document.getElementById("search-form");
  const emptyMessage = document.getElementById("empty-message");
  const menuToggle = document.getElementById("menu-toggle");
  const sidebar = document.querySelector(".sidebar");

  const year = new Date().getFullYear();
  document.querySelectorAll("#year, #footer-year").forEach(el => {
    el.textContent = year;
  });

  let activeCategory = "All";
  let searchTerm = "";

  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[char]);
  }

  function getName(game) {
    return game.name || game.title || "Untitled Game";
  }

  function getEmoji(game) {
    return game.emoji || game.icon || "🎮";
  }

  function getCategory(game) {
    return game.category || "Arcade";
  }

  function getDescription(game) {
    return game.description || game.tag || "Enjoy this exciting game!";
  }

  function getGameURL(game) {
    return game.url || game.link || "";
  }

  function makeCard(game) {
    const name = escapeHTML(getName(game));
    const category = escapeHTML(getCategory(game));
    const description = escapeHTML(getDescription(game));
    const emoji = escapeHTML(getEmoji(game));
    const url = getGameURL(game);

    const button = url
      ? `<a class="play-link" href="${escapeHTML(url)}">▶ Play Now</a>`
      : `<span class="coming-soon">Coming Soon</span>`;

    return `
      <article class="game-card">
        <div class="game-art" style="--art-bg:${escapeHTML(game.color || "#dce8ff")}">
          <span class="game-tag">${category}</span>
          <span class="game-emoji">${emoji}</span>
        </div>
        <div class="game-info">
          <h3>${name}</h3>
          <p>${description}</p>
          ${button}
        </div>
      </article>
    `;
  }

  function renderGames(grid, list) {
    if (!grid) return;
    grid.innerHTML = list.map(makeCard).join("");
  }

  function renderFilters() {
    if (!filterRow) return;

    const filterCategories = categories.length
      ? categories
      : ["All", "Popular", "Kids & Family"];

    filterRow.innerHTML = filterCategories.map(category => `
      <button
        type="button"
        class="filter-chip ${category === activeCategory ? "active" : ""}"
        data-category="${escapeHTML(category)}">
        ${escapeHTML(category)}
      </button>
    `).join("");
  }

  function matchesSearch(game) {
    if (!searchTerm) return true;

    const text = [
      getName(game),
      getCategory(game),
      getDescription(game),
      game.tag || ""
    ].join(" ").toLowerCase();

    return text.includes(searchTerm);
  }

  function matchesCategory(game) {
    if (activeCategory === "All") return true;
    if (activeCategory === "Popular") return game.popular === true;
    if (activeCategory === "Kids" || activeCategory === "Kids & Family") {
      return game.kids === true || getCategory(game) === activeCategory;
    }
    return getCategory(game) === activeCategory;
  }

  function updateAllGames() {
    const filtered = games.filter(game =>
      matchesCategory(game) && matchesSearch(game)
    );

    renderGames(allGrid, filtered);

    if (emptyMessage) {
      emptyMessage.hidden = filtered.length !== 0;
    }

    renderFilters();
  }

  function renderHomepage() {
    renderGames(
      popularGrid,
      games.filter(game => game.popular === true).slice(0, 8)
    );

    renderGames(
      kidsGrid,
      games.filter(game =>
        game.kids === true || getCategory(game) === "Kids & Family"
      ).slice(0, 8)
    );

    updateAllGames();
  }

  if (filterRow) {
    filterRow.addEventListener("click", event => {
      const button = event.target.closest("[data-category]");
      if (!button) return;

      activeCategory = button.dataset.category;
      updateAllGames();

      document.getElementById("all-games")?.scrollIntoView({
        behavior: "smooth"
      });
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      searchTerm = searchInput.value.trim().toLowerCase();
      updateAllGames();
    });
  }

  if (searchForm) {
    searchForm.addEventListener("submit", event => {
      event.preventDefault();
      searchTerm = searchInput.value.trim().toLowerCase();
      activeCategory = "All";
      updateAllGames();

      document.getElementById("all-games")?.scrollIntoView({
        behavior: "smooth"
      });
    });
  }

  // Category shortcut cards
  document.querySelectorAll(".category-tile").forEach(tile => {
    tile.addEventListener("click", event => {
      const label = tile.textContent.trim().toLowerCase();
      const mapping = {
        "all games": "All",
        "battle royale": "Battle Royale",
        "action": "Action & Adventure",
        "racing": "Racing & Sports",
        "puzzle": "Puzzle & Brain",
        "board games": "Board & Classic",
        "arcade": "Arcade",
        "kids": "Kids & Family"
      };

      const selected = mapping[label];
      if (!selected) return;

      event.preventDefault();
      activeCategory = categories.includes(selected) ? selected : "All";
      searchTerm = "";
      if (searchInput) searchInput.value = "";
      updateAllGames();

      document.getElementById("all-games")?.scrollIntoView({
        behavior: "smooth"
      });
    });
  });

  // Mobile sidebar
  if (menuToggle && sidebar) {
    menuToggle.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });

    sidebar.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        sidebar.classList.remove("open");
      });
    });

    document.addEventListener("click", event => {
      if (
        window.innerWidth <= 760 &&
        sidebar.classList.contains("open") &&
        !sidebar.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        sidebar.classList.remove("open");
      }
    });
  }

  renderHomepage();
});
