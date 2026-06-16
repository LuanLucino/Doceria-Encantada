import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword }
  from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {

  // Mobile nav toggle
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => nav.classList.toggle("open"));
  }

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
  const auth = getAuth(app);

  // Mensagem pós-cadastro
  const params = new URLSearchParams(window.location.search);
  if (params.get("signup") === "success") {
    alert("Cadastro realizado com sucesso! Faça login agora.");
  }

  // Login com Google
  const btnGoogle = document.getElementById("btnGoogle");
  if (btnGoogle) {
    btnGoogle.addEventListener("click", () => {
      signInWithPopup(auth, new GoogleAuthProvider())
        .then(r => alert("Bem-vindo, " + r.user.displayName + "!"))
        .catch(e => alert("Erro: " + e.message));
    });
  }

  // Login com e-mail
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", e => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const senha = document.getElementById("senha").value;

      signInWithEmailAndPassword(auth, email, senha)
        .then(r => {
          alert("Bem-vindo, " + r.user.email + "!");
          loginForm.reset();
        })
        .catch(e => alert("Erro no login: " + e.message));
    });
  }

});
