function renderBlog() {
  const categories = Array.from(new Set(POSTS.map((p) => p.category)));
  const tags = Array.from(new Set(POSTS.flatMap((p) => p.tags)));

  return `
    <section class="card">
      <div class="blog-layout">
        <div>
          <div class="card-header">
            <div>
              <div class="card-title">Blog</div>
              <div class="card-subtitle">Architecture, design, lab, et plus.</div>
            </div>
            <div class="card-badge">Articles: ${POSTS.length}</div>
          </div>

          <div class="blog-filters">
            <button class="filter-pill active" data-filter-category="all">
              Tous
            </button>
            ${categories
              .map(
                (cat) => `
              <button class="filter-pill" data-filter-category="${cat}">
                ${cat}
              </button>
            `
              )
              .join("")}
          </div>

          <div class="blog-list" id="blog-list-root">
            ${renderBlogList(POSTS)}
          </div>
        </div>

        <aside>
          <div class="blog-sidebar-section">
            <div class="blog-sidebar-title">Tags</div>
            <div class="blog-tag-cloud">
              ${tags
                .map(
                  (tag) => `
                <span class="blog-tag">#${tag}</span>
              `
                )
                .join("")}
            </div>
          </div>

          <div class="blog-sidebar-section">
            <div class="blog-sidebar-title">Info</div>
            <p style="font-size:0.8rem; color:var(--muted);">
              Le blog est alimenté par des données mockées. Tu peux remplacer
              <code>POSTS</code> par une vraie API, un CMS headless, ou des fichiers statiques.
            </p>
          </div>
        </aside>
      </div>
    </section>
  `;
}

function renderBlogList(posts) {
  if (!posts.length) {
    return `<div style="font-size:0.8rem; color:var(--muted);">Aucun article pour ce filtre.</div>`;
  }

  return posts
    .map(
      (post) => `
    <div class="blog-card" data-post-id="${post.id}">
      <div class="blog-card-title">${post.title}</div>
      <div class="blog-card-meta">
        <span>${post.category}</span>
        <span>${post.readTime} min</span>
        <span>${post.date}</span>
      </div>
      <div class="blog-card-excerpt">${post.excerpt}</div>
    </div>
  `
    )
    .join("");
}

function attachBlogEvents() {
  const filterButtons = document.querySelectorAll("[data-filter-category]");
  const listRoot = document.getElementById("blog-list-root");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.getAttribute("data-filter-category");
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filtered =
        category === "all"
          ? POSTS
          : POSTS.filter((p) => p.category === category);

      if (listRoot) {
        listRoot.innerHTML = renderBlogList(filtered);
        attachBlogCardEvents();
      }
    });
  });

  attachBlogCardEvents();
}

function attachBlogCardEvents() {
  document.querySelectorAll(".blog-card[data-post-id]").forEach((el) => {
    el.addEventListener("click", () => {
      const id = el.getAttribute("data-post-id");
      const post = POSTS.find((p) => String(p.id) === String(id));
      if (!post) return;
      openModal(
        `
        <h3>${post.title}</h3>
        <p><em>${post.category} · ${post.readTime} min · ${post.date}</em></p>
        <p>${post.excerpt}</p>
        <p style="margin-top:8px;">
          Ici tu peux afficher le contenu complet, des images, du code, etc.
        </p>
      `,
        "Article"
      );
    });
  });
}
