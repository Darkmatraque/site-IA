function openModal(contentHtml, title = "Information") {
  const root = document.getElementById("modal-root");
  if (!root) return;

  root.classList.remove("hidden");
  root.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <div class="modal-title">${title}</div>
        <button class="modal-close" id="modal-close-btn">Fermer</button>
      </div>
      <div class="modal-body">
        ${contentHtml}
      </div>
    </div>
  `;

  document
    .getElementById("modal-close-btn")
    ?.addEventListener("click", () => closeModal());

  root.addEventListener(
    "click",
    (e) => {
      if (e.target === root) closeModal();
    },
    { once: true }
  );
}

function closeModal() {
  const root = document.getElementById("modal-root");
  if (!root) return;
  root.classList.add("hidden");
  root.innerHTML = "";
}

function openModalAbout() {
  openModal(
    `
    <p>
      <strong>Mega Portal</strong> est une démo d'architecture front avancée :
    </p>
    <ul>
      <li>Routing côté client (SPA-like) sans framework.</li>
      <li>Composants modulaires (Dashboard, Blog, Galerie, Lab).</li>
      <li>Data mockée pour posts et éléments de galerie.</li>
      <li>Thème dark, responsive, animations, cartes, métriques.</li>
    </ul>
    <p>
      Tu peux étendre chaque composant, brancher une API, ou migrer vers un framework (React, Vue, Svelte).
    </p>
  `,
    "À propos de Mega Portal"
  );
}
