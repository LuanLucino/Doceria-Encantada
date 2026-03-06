import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } 
  from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const firebaseConfig = {
    apiKey: "AlTzaSyAvffw23q6XvrWUlChp76rrTytjgMXpL3VE",
    authDomain: "doceria-encantada.firebaseapp.com",
    projectId: "doceria-encantada",
    storageBucket: "doceria-encantada.appspot.com",
    messagingSenderId: "588485252022",
    appId: "1:588485252022:web:304910a55cb2b71ed9f0bb",
    measurementId: "G-K15XINXBE9"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  // Mensagem de sucesso após cadastro
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("signup") === "success") {
    alert("Cadastro realizado com sucesso! Faça login agora.");
  }

  // Login com Google
  const providerGoogle = new GoogleAuthProvider();
  const btnGoogle = document.getElementById("btnGoogle");
  if (btnGoogle) {
    btnGoogle.addEventListener("click", () => {
      signInWithPopup(auth, providerGoogle)
        .then(result => {
          alert("Logado como: " + result.user.displayName);
        })
        .catch(error => {
          alert("Erro no login Google: " + error.message);
        });
    });
  }

  // Login com Email/Senha via formulário
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const senha = document.getElementById("senha").value;

      signInWithEmailAndPassword(auth, email, senha)
        .then(result => {
          alert("Logado como: " + result.user.email);
          loginForm.reset();
        })
        .catch(error => {
          alert("Erro no login Email: " + error.message);
        });
    });
  }
});
