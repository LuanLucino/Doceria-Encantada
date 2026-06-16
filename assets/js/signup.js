import { auth } from "./auth.js";
import { createUserWithEmailAndPassword, updateProfile }
  from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {

  const signupForm = document.getElementById("signupForm");
  if (!signupForm) return;

  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const nome  = document.getElementById("nome")?.value?.trim() || "";
    const btn   = signupForm.querySelector("button[type='submit']");

    btn.disabled    = true;
    btn.textContent = "Criando conta...";

    try {
      const result = await createUserWithEmailAndPassword(auth, email, senha);

      // Salva nome de exibição se preenchido
      if (nome) {
        await updateProfile(result.user, { displayName: nome });
      }

      window.location.href = "login.html?signup=success";
    } catch (err) {
      showMsg(traduzirErro(err.code), "error");
      btn.disabled    = false;
      btn.textContent = "Criar conta";
    }
  });

});

function showMsg(text, type) {
  let el = document.getElementById("signup-msg");
  if (!el) {
    el = document.createElement("p");
    el.id = "signup-msg";
    el.style.cssText = "text-align:center; font-size:.88em; margin-top:12px;";
    document.querySelector(".login-container")?.appendChild(el);
  }
  el.style.color = type === "success" ? "var(--gold)" : "var(--pink-dark)";
  el.textContent = text;
}

function traduzirErro(code) {
  const erros = {
    "auth/email-already-in-use": "Este e-mail já está cadastrado.",
    "auth/invalid-email":        "E-mail inválido.",
    "auth/weak-password":        "Senha fraca. Use pelo menos 6 caracteres.",
  };
  return erros[code] || "Erro ao criar conta. Tente novamente.";
}
