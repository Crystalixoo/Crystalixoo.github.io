/* Strona główna – siatka kafelków bohaterów, wyszukiwarka i filtr klas */
(function () {
  const grid = document.getElementById("champion-grid");
  const searchInput = document.getElementById("search");
  const roleFilters = document.getElementById("role-filters");
  const noResults = document.getElementById("no-results");

  const CLASSES = ["Wszyscy", "Tank", "Wojownik", "Zabójca", "Mag", "Strzelec", "Wsparcie"];
  let activeClass = "Wszyscy";
  let query = "";

  function champClass(c) {
    return CHAMP_CLASS[c.slug] || "—";
  }

  CLASSES.forEach((r) => {
    const btn = document.createElement("button");
    btn.className = "filter-btn" + (r === activeClass ? " active" : "");
    btn.textContent = r;
    btn.addEventListener("click", () => {
      activeClass = r;
      document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      render();
    });
    roleFilters.appendChild(btn);
  });

  function tile(champ) {
    const a = document.createElement("a");
    a.className = "champ-tile";
    a.href = `champion.html?id=${champ.slug}`;

    const icon = document.createElement("div");
    icon.className = "champ-icon";
    const img = document.createElement("img");
    img.src = champ.icon;
    img.alt = champ.name;
    img.loading = "lazy";
    attachIconFallback(img, icon, champ.slug, champ.name.charAt(0));
    icon.appendChild(img);

    const name = document.createElement("span");
    name.className = "champ-name";
    name.textContent = champ.name;

    const role = document.createElement("span");
    role.className = "champ-role";
    const cls = champClass(champ);
    role.textContent = champ.role ? `${cls} · ${champ.role}` : cls;

    a.append(icon, name, role);
    return a;
  }

  function render() {
    grid.innerHTML = "";
    const q = query.trim().toLowerCase();
    const list = CHAMPIONS.filter((c) => {
      const matchClass = activeClass === "Wszyscy" || champClass(c) === activeClass;
      const matchQuery =
        !q ||
        c.name.toLowerCase().includes(q) ||
        (c.role && c.role.toLowerCase().includes(q)) ||
        champClass(c).toLowerCase().includes(q);
      return matchClass && matchQuery;
    });

    list.sort((a, b) => a.name.localeCompare(b.name, "pl"));
    list.forEach((c) => grid.appendChild(tile(c)));
    noResults.hidden = list.length !== 0;

    countEl.textContent = `${list.length} z ${CHAMPIONS.length} bohaterów`;
  }

  const countEl = document.getElementById("champ-count");

  searchInput.addEventListener("input", (e) => {
    query = e.target.value;
    render();
  });

  render();
})();
