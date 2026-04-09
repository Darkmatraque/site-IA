function renderApp() {
  const root = document.getElementById("view-root");
  if (!root) return;

  let html = "";

  switch (currentRoute) {
    case "dashboard":
      html = renderDashboard();
      break;
    case "blog":
      html = renderBlog();
      break;
    case "gallery":
      html = renderGallery();
      break;
    case "lab":
      html = renderLab();
      break;
    default:
      html = `<section class="card"><p>Route inconnue.</p></section>`;
  }

  root.innerHTML = html;

  // Attacher les events spécifiques
  if (currentRoute === "dashboard") attachDashboardEvents();
  if (currentRoute === "blog") attachBlogEvents();
  if (currentRoute === "gallery") attachGalleryEvents();
  if (currentRoute === "lab") attachLabEvents();

  // Re-rendre la navbar pour mettre à jour l'état actif
  renderNavbar();
  renderFooter();
}

document.addEventListener("DOMContentLoaded", () => {
  currentRoute = getInitialRoute();
  renderNavbar();
  renderFooter();
  renderApp();
});
