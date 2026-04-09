const ROUTES = {
  dashboard: "dashboard",
  blog: "blog",
  gallery: "gallery",
  lab: "lab",
};

let currentRoute = ROUTES.dashboard;

function navigateTo(route) {
  if (!Object.values(ROUTES).includes(route)) return;
  currentRoute = route;
  renderApp();
  window.history.pushState({ route }, "", `#${route}`);
}

window.addEventListener("popstate", (event) => {
  if (event.state && event.state.route) {
    currentRoute = event.state.route;
    renderApp();
  }
});

function getInitialRoute() {
  const hash = window.location.hash.replace("#", "");
  if (Object.values(ROUTES).includes(hash)) return hash;
  return ROUTES.dashboard;
}
