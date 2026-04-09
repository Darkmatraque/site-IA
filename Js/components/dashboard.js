function renderDashboard() {
  return `
    <section class="card">
      <div class="dashboard-hero">
        <div class="hero-main">
          <div class="hero-title">
            Un <span class="hero-highlight">hub central</span> pour ton univers front.
          </div>
          <div class="hero-text">
            Dashboard global qui agrège métriques, navigation, et aperçu des sections clés.
            Tu peux le brancher sur une vraie API ou l'utiliser comme base pour un projet massif.
          </div>
          <div class="hero-tags">
            <span class="hero-tag">SPA-like</span>
            <span class="hero-tag">Vanilla JS</span>
            <span class="hero-tag">Dark UI</span>
            <span class="hero-tag">Scalable</span>
          </div>
          <div class="hero-actions">
            <button class="btn-primary" id="dash-open-blog">
              Voir les derniers articles
            </button>
            <button class="btn-ghost" id="dash-open-lab">
              Ouvrir le Lab interactif
            </button>
          </div>
          <div class="hero-metrics">
            <div class="metric">
              <div class="metric-label">Composants</div>
              <div class="metric-value">7+</div>
              <div class="metric-trend">+ en extension</div>
            </div>
            <div class="metric">
              <div class="metric-label">Lignes de code</div>
              <div class="metric-value">1000+</div>
              <div class="metric-trend">Projet massif</div>
            </div>
            <div class="metric">
              <div class="metric-label">Framework</div>
              <div class="metric-value">0</div>
              <div class="metric-trend">Vanilla only</div>
            </div>
          </div>
        </div>
        <div class="hero-visual">
          <div class="hero-orbit"></div>
          <div class="hero-visual-header">
            <div class="hero-visual-title">État du portail</div>
            <div class="hero-visual-pill">Live mock data</div>
          </div>
          <div class="hero-visual-grid">
            <div class="hero-chip">
              <div class="hero-chip-label">Section active</div>
              <div class="hero-chip-value">${currentRoute}</div>
            </div>
            <div class="hero-chip">
              <div class="hero-chip-label">Articles</div>
              <div class="hero-chip-value">${POSTS.length}</div>
            </div>
            <div class="hero-chip">
              <div class="hero-chip-label">Éléments galerie</div>
              <div class="hero-chip-value">${GALLERY_ITEMS.length}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="grid-3">
      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">Blog</div>
            <div class="card-subtitle">Derniers articles</div>
          </div>
          <div class="card-badge">Contenu</div>
        </div>
        <div class="blog-list">
          ${POSTS.slice(0, 3)
            .map(
              (post) => `
            <div class="blog-card" data-post-id="${post.id}">
              <div class="blog-card-title">${post.title}</div>
              <div class="blog-card-meta">
                <span>${post.category}</span>
                <span>${post.readTime} min</span>
              </div>
              <div class="blog-card-excerpt">${post.excerpt}</div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">Galerie</div>
            <div class="card-subtitle">Aperçu visuel</div>
          </div>
          <div class="card-badge">UI</div>
        </div>
        <div class="gallery-grid">
          ${GALLERY_ITEMS.slice(0, 4)
            .map(
              (item) => `
            <div class="gallery-item" data-gallery-id="${item.id}">
              <div class="gallery-orbit"></div>
              <div class="gallery-item-label">
                <div>${item.label}</div>
                <div class="gallery-item-tag">${item.tag}</div>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">Lab</div>
            <div class="card-subtitle">Mini-apps</div>
          </div>
          <div class="card-badge">Expérimental</div>
        </div>
        <div class="lab-tools">
          <div class="lab-tool-card">
            <div class="lab-tool-title">Calculatrice rapide</div>
            <div class="lab-tool-body">
              Teste des opérations simples directement dans le portail.
            </div>
            <div class="lab-tool-inputs">
              <input class="input" id="dash-calc-a" type="number" placeholder="A" />
              <input class="input" id="dash-calc-b" type="number" placeholder="B" />
              <button class="btn-ghost" id="dash-calc-btn">Addition</button>
            </div>
            <div class="lab-tool-output" id="dash-calc-output"></div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function attachDashboardEvents() {
  const blogBtn = document.getElementById("dash-open-blog");
  if (blogBtn) {
    blogBtn.addEventListener("click", () => navigateTo("blog"));
  }

  const labBtn = document.getElementById("dash-open-lab");
  if (labBtn) {
    labBtn.addEventListener("click", () => navigateTo("lab"));
  }

  document.querySelectorAll(".blog-card[data-post-id]").forEach((el) => {
    el.addEventListener("click", () => {
      const id = el.getAttribute("data-post-id");
      const post = POSTS.find((p) => String(p.id) === String(id));
      if (!post) return;
      openModal(
        `
        <h3>${post.title}</h3>
        <p><em>${post.category} · ${post.readTime} min</em></p>
        <p>${post.excerpt}</p>
        <p style="margin-top:8px;">
          (Ici tu pourrais charger le contenu complet depuis une API ou un fichier markdown.)
        </p>
      `,
        "Article"
      );
    });
  });

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
          Ici tu pourrais afficher une vraie image, un canvas WebGL, ou une visualisation animée.
        </p>
      `,
        "Détail de la galerie"
      );
    });
  });

  const calcBtn = document.getElementById("dash-calc-btn");
  if (calcBtn) {
    calcBtn.addEventListener("click", () => {
      const a = parseFloat(document.getElementById("dash-calc-a").value || "0");
      const b = parseFloat(document.getElementById("dash-calc-b").value || "0");
      const out = document.getElementById("dash-calc-output");
      if (out) out.textContent = `Résultat: ${a + b}`;
    });
  }
}
