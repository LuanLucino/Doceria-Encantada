import { auth } from "./auth.js";
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword }
  from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {

  // Mensagem pós-cadastro
  const params = new URLSearchParams(window.location.search);
  if (params.get("signup") === "success") {
    showMsg("Cadastro realizado! Faça login agora.", "success");
  }

  // ── Login com e-mail ──────────────────────────────────────────────
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const senha = document.getElementById("senha").value;
      const btn   = loginForm.querySelector("button[type='submit']");

      btn.disabled    = true;
      btn.textContent = "Entrando...";

      try {
        await signInWithEmailAndPassword(auth, email, senha);
        window.location.href = "../index.html";
      } catch (err) {
        showMsg(traduzirErro(err.code), "error");
        btn.disabled    = false;
        btn.textContent = "Entrar";
      }
    });
  }

  // ── Login com Google ──────────────────────────────────────────────
  const btnGoogle = document.getElementById("btnGoogle");
  if (btnGoogle) {
    btnGoogle.addEventListener("click", async () => {
      btnGoogle.disabled    = true;
      btnGoogle.textContent = "Aguarde...";

      try {
        await signInWithPopup(auth, new GoogleAuthProvider());
        window.location.href = "../index.html";
      } catch (err) {
        if (err.code !== "auth/popup-closed-by-user") {
          showMsg(traduzirErro(err.code), "error");
        }
        btnGoogle.disabled    = false;
        btnGoogle.textContent = "Continuar com Google";
      }
    });
  }

});

function showMsg(text, type) {
  let el = document.getElementById("login-msg");
  if (!el) {
    el = document.createElement("p");
    el.id = "login-msg";
    el.style.cssText = "text-align:center; font-size:.88em; margin-top:12px;";
    document.querySelector(".login-container")?.appendChild(el);
  }
  el.style.color = type === "success" ? "var(--gold)" : "var(--pink-dark)";
  el.textContent = text;
}

function traduzirErro(code) {
  const erros = {
    "auth/user-not-found":      "E-mail não encontrado.",
    "auth/wrong-password":      "Senha incorreta.",
    "auth/invalid-email":       "E-mail inválido.",
    "auth/too-many-requests":   "Muitas tentativas. Tente novamente mais tarde.",
    "auth/invalid-credential":  "E-mail ou senha inválidos.",
  };
  return erros[code] || "Erro ao fazer login. Tente novamente.";
}
