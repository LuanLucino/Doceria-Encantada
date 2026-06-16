import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword }
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

  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", e => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const senha = document.getElementById("senha").value;

      createUserWithEmailAndPassword(auth, email, senha)
        .then(() => {
          window.location.href = "login.html?signup=success";
        })
        .catch(e => alert("Erro no cadastro: " + e.message));
    });
  }

});
