function renderNavbar() {
  const root = document.getElementById("navbar-root");
  if (!root) return;

  root.innerHTML = `
    <nav class="navbar">
      <div class="navbar-left">
        <div class="navbar-logo"></div>
        <div class="navbar-title">
          <div class="navbar-title-main">MEGA PORTAL</div>
          <div class="navbar-title-sub">Dashboard · Blog · Gallery · Lab</div>
        </div>
      </div>
      <div class="navbar-links">
        ${renderNavLink("dashboard", "Dashboard")}
        ${renderNavLink("blog", "Blog")}
        ${renderNavLink("gallery", "Galerie")}
        ${renderNavLink("lab", "Lab")}
      </div>
      <div class="navbar-right">
        <div class="nav-pill">Mode: Vanilla JS</div>
        <button class="nav-cta" id="nav-open-about">
          À propos
          <span>⟶</span>
        </button>
      </div>
    </nav>
  `;

  document
    .getElementById("nav-open-about")
    ?.addEventListener("click", () => openModalAbout());

  root.querySelectorAll("[data-route]").forEach((el) => {
    el.addEventListener("click", () => {
      const route = el.getAttribute("data-route");
      navigateTo(route);
    });
  });
}

function renderNavLink(route, label) {
  const isActive = currentRoute === route;
  return `
    <button class="nav-link ${isActive ? "active" : ""}" data-route="${route}">
      ${label}
    </button>
  `;
}
