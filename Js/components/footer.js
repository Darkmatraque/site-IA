function renderFooter() {
  const root = document.getElementById("footer-root");
  if (!root) return;

  const year = new Date().getFullYear();

  root.innerHTML = `
    <div class="footer">
      <div>© ${year} Mega Portal – Expérience front ultra-modulaire.</div>
      <div>Construit en HTML/CSS/JS pur, routing côté client, composants dynamiques, data mockée.</div>
    </div>
  `;
}
