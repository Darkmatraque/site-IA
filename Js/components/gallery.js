function renderGallery() {
  return `
    <section class="card">
      <div class="card-header">
        <div>
          <div class="card-title">Galerie</div>
          <div class="card-subtitle">
            Aperçu de concepts visuels : UI, gradients, data viz, etc.
          </div>
        </div>
        <div class="card-badge">Éléments: ${GALLERY_ITEMS.length}</div>
      </div>

      <div class="gallery-grid">
        ${GALLERY_ITEMS.map(
          (item) => `
          <div class="gallery-item" data-gallery-id="${item.id}">
            <div class="gallery-orbit"></div>
            <div class="gallery-item-label">
              <div>${item.label}</div>
              <div class="gallery-item-tag">${item.tag}</div>
            </div>
          </div>
        `
        ).join("")}
      </div>
    </section>
  `;
}

function attachGalleryEvents() {
  document.querySelectorAll(".gallery-item[data-gallery-id]").forEach((el) => {
    el.addEventListener("click", () => {
      const id = el.getAttribute("data-gallery-id");
      const item = GALLERY_ITEMS.find((g) => String(g.id) === String(id));
      if (!item) return;
      openModal(
        `
        <h3>${item.label}</h3>
        <p><em>${item.tag}</em></p>
        <p>
          Tu peux brancher cette carte sur une vraie image, un canvas, ou une scène 3D.
        </p>
      `,
        "Détail de la galerie"
      );
    });
  });
}
