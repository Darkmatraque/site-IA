function renderLab() {
  return `
    <section class="card">
      <div class="lab-grid">
        <div class="lab-tools">
          <div class="card-header">
            <div>
              <div class="card-title">Lab interactif</div>
              <div class="card-subtitle">
                Mini-outils pour tester des idées directement dans le portail.
              </div>
            </div>
            <div class="card-badge">Sandbox</div>
          </div>

          <div class="lab-tool-card">
            <div class="lab-tool-title">Calculatrice</div>
            <div class="lab-tool-body">
              Additionne deux nombres pour tester la logique de base.
            </div>
            <div class="lab-tool-inputs">
              <input class="input" id="lab-calc-a" type="number" placeholder="A" />
              <input class="input" id="lab-calc-b" type="number" placeholder="B" />
              <button class="btn-ghost" id="lab-calc-btn">Addition</button>
            </div>
            <div class="lab-tool-output" id="lab-calc-output"></div>
          </div>

          <div class="lab-tool-card">
            <div class="lab-tool-title">Todo minimal</div>
            <div class="lab-tool-body">
              Ajoute des tâches pour simuler un mini gestionnaire de tâches.
            </div>
            <div class="lab-tool-inputs">
              <input class="input" id="lab-todo-input" type="text" placeholder="Nouvelle tâche" />
              <button class="btn-ghost" id="lab-todo-add">Ajouter</button>
            </div>
            <div class="lab-tool-output">
              <ul id="lab-todo-list" style="list-style:none; padding-left:0; margin:6px 0 0;"></ul>
            </div>
          </div>
        </div>

        <div class="lab-visual">
          <div class="lab-visual-title">Visualisation simple</div>
          <p style="font-size:0.8rem; color:var(--muted); margin-bottom:8px;">
            Les barres ci-dessous représentent des valeurs générées aléatoirement.
            Tu peux imaginer les brancher sur des métriques réelles.
          </p>
          <div class="lab-visual-grid" id="lab-visual-grid">
            ${Array.from({ length: 8 })
              .map(
                (_, i) => `
              <div class="lab-visual-cell">
                <div class="lab-visual-bar" id="lab-bar-${i}" style="height:${20 + i * 8}%;"></div>
              </div>
            `
              )
              .join("")}
          </div>
          <button class="btn-ghost" id="lab-visual-refresh" style="margin-top:10px;">
            Rafraîchir les valeurs
          </button>
        </div>
      </div>
    </section>
  `;
}

function attachLabEvents() {
  const calcBtn = document.getElementById("lab-calc-btn");
  if (calcBtn) {
    calcBtn.addEventListener("click", () => {
      const a = parseFloat(document.getElementById("lab-calc-a").value || "0");
      const b = parseFloat(document.getElementById("lab-calc-b").value || "0");
      const out = document.getElementById("lab-calc-output");
      if (out) out.textContent = `Résultat: ${a + b}`;
    });
  }

  const todoInput = document.getElementById("lab-todo-input");
  const todoAdd = document.getElementById("lab-todo-add");
  const todoList = document.getElementById("lab-todo-list");

  if (todoAdd && todoInput && todoList) {
    todoAdd.addEventListener("click", () => {
      const value = todoInput.value.trim();
      if (!value) return;
      const li = document.createElement("li");
      li.textContent = value;
      li.style.cursor = "pointer";
      li.style.fontSize = "0.8rem";
      li.style.marginTop = "2px";
      li.addEventListener("click", () => {
        li.style.textDecoration =
          li.style.textDecoration === "line-through" ? "none" : "line-through";
      });
      todoList.appendChild(li);
      todoInput.value = "";
    });
  }

  const refreshBtn = document.getElementById("lab-visual-refresh");
  if (refreshBtn) {
    refreshBtn.addEventListener("click", () => {
      for (let i = 0; i < 8; i++) {
        const bar = document.getElementById(`lab-bar-${i}`);
        if (!bar) continue;
        const value = 10 + Math.round(Math.random() * 80);
        bar.style.height = `${value}%`;
      }
    });
  }
}
