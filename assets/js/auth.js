import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, updateProfile }
  from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAvffw23qX6rWU1cHp76rrTytgjMXpl3VE",
  authDomain: "doceria-encantada.firebaseapp.com",
  projectId: "doceria-encantada",
  storageBucket: "doceria-encantada.firebasestorage.app",
  messagingSenderId: "588458252002",
  appId: "1:588458252002:web:304910a55cb2b71ed9f0bb",
  measurementId: "G-K15XZNXBE9"
};

const app  = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Detecta se estamos dentro de pages/ ou na raiz
function basePath() {
  return window.location.pathname.includes("/pages/") ? "../" : "";
}

function histPath() {
  return window.location.pathname.includes("/pages/")
    ? "historico.html"
    : "pages/historico.html";
}

document.addEventListener("DOMContentLoaded", () => {

  // ── Logo clicável → home ──────────────────────────────────────────
  const logo = document.querySelector("header h1");
  if (logo) {
    logo.classList.add("logo-link");
    logo.addEventListener("click", () => {
      window.location.href = basePath() + "index.html";
    });
  }

  // ── Auth state: atualiza nav ──────────────────────────────────────
  onAuthStateChanged(auth, (user) => {

    // Guarda UID no localStorage para scripts não-module (carrinho.js)
    if (user) {
      localStorage.setItem("currentUserId",   user.uid);
      localStorage.setItem("currentUserName", user.displayName || user.email.split("@")[0]);

      // Se já está logado e está na página de login/signup → redireciona para home
      const path = window.location.pathname;
      if (path.endsWith("login.html") || path.endsWith("signup.html")) {
        window.location.href = basePath() + "index.html";
        return;
      }
    } else {
      localStorage.removeItem("currentUserId");
      localStorage.removeItem("currentUserName");
    }

    const navAuth = document.getElementById("nav-auth");
    if (!navAuth) return;

    if (user) {
      const name    = user.displayName || user.email.split("@")[0];
      const initial = name.charAt(0).toUpperCase();

      navAuth.innerHTML = `
        <div class="user-menu">
          <button class="user-btn" id="user-menu-btn" aria-haspopup="true" aria-expanded="false">
            <span class="user-avatar">${initial}</span>
            <span class="user-name">${name}</span>
            <span class="caret">&#9662;</span>
          </button>
          <div class="user-dropdown" id="user-dropdown" role="menu">
            <button class="dropdown-item" id="btn-perfil">Meu Perfil</button>
            <a   class="dropdown-item" href="${histPath()}">Histórico de Pedidos</a>
            <div class="dropdown-divider"></div>
            <button class="dropdown-item danger" id="btn-logout">Sair</button>
          </div>
        </div>
      `;

      // Toggle dropdown
      const menuBtn  = document.getElementById("user-menu-btn");
      const dropdown = document.getElementById("user-dropdown");

      menuBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = dropdown.classList.toggle("open");
        menuBtn.setAttribute("aria-expanded", isOpen);
      });

      document.addEventListener("click", () => {
        dropdown.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
      });

      // Logout
      document.getElementById("btn-logout").addEventListener("click", () => {
        signOut(auth).then(() => {
          window.location.href = basePath() + "index.html";
        });
      });

      // Perfil modal
      document.getElementById("btn-perfil").addEventListener("click", () => {
        dropdown.classList.remove("open");
        openProfileModal(user);
      });

    } else {
      navAuth.innerHTML = `<a href="${basePath()}pages/login.html">Login</a>`;
    }
  });

});

// ── Modal de Perfil ───────────────────────────────────────────────────
function openProfileModal(user) {
  document.getElementById("profile-modal")?.remove();

  const modal = document.createElement("div");
  modal.id        = "profile-modal";
  modal.className = "modal-overlay";
  modal.innerHTML = `
    <div class="modal-box" role="dialog" aria-modal="true">
      <button class="modal-close" id="modal-close" aria-label="Fechar">&#215;</button>
      <h3>Meu Perfil</h3>
      <div class="modal-divider"></div>
      <p class="modal-email">${user.email}</p>
      <div class="form-group" style="margin-top:18px;">
        <label for="profile-name">Nome de exibição</label>
        <input type="text" id="profile-name"
               value="${user.displayName || ''}"
               placeholder="Como quer ser chamado?">
      </div>
      <button class="btn-primary modal-save-btn" id="save-profile">Salvar alterações</button>
      <p id="profile-msg"></p>
    </div>
  `;
  document.body.appendChild(modal);

  // Animação de entrada
  requestAnimationFrame(() => modal.classList.add("open"));

  // Fechar
  document.getElementById("modal-close").addEventListener("click", () => modal.remove());
  modal.addEventListener("click", (e) => { if (e.target === modal) modal.remove(); });

  // Salvar nome
  document.getElementById("save-profile").addEventListener("click", async () => {
    const name = document.getElementById("profile-name").value.trim();
    const msg  = document.getElementById("profile-msg");

    if (!name) {
      msg.className = "msg-error";
      msg.textContent = "Digite um nome para continuar.";
      return;
    }

    try {
      await updateProfile(user, { displayName: name });
      localStorage.setItem("currentUserName", name);

      // Atualiza nav sem reload
      const el = document.querySelector(".user-name");
      const av = document.querySelector(".user-avatar");
      if (el) el.textContent = name;
      if (av) av.textContent = name.charAt(0).toUpperCase();

      msg.className = "msg-success";
      msg.textContent = "Nome atualizado com sucesso!";
    } catch (e) {
      msg.className = "msg-error";
      msg.textContent = "Erro: " + e.message;
    }
  });
}
