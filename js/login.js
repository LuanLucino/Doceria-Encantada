// Importando funções do Firebase (modular v9)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } 
  from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
  // Configuração do Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyAvffw23qX6rWU1cHp76rrTytgjMXpl3VE",
    authDomain: "doceria-encantada.firebaseapp.com",
    projectId: "doceria-encantada",
    storageBucket: "doceria-encantada.appspot.com",
    messagingSenderId: "588485252022",
    appId: "1:588485252022:web:304910a55cb2b71ed9f0bb",
    measurementId: "G-K15XINXBE9"
  };

  // Inicializa Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

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
          console.error("Erro no login Google:", error);
          alert("Erro no login Google: " + error.message);
        });
    });
  }

  // Login com Email/Senha
  const btnEmail = document.getElementById("btnEmail");
  if (btnEmail) {
    btnEmail.addEventListener("click", () => {
      const email = prompt("Digite seu email:");
      const senha = prompt("Digite sua senha:");
      signInWithEmailAndPassword(auth, email, senha)
        .then(result => {
          alert("Logado como: " + result.user.email);
        })
        .catch(error => {
          console.error("Erro no login Email:", error);
          alert("Erro no login Email: " + error.message);
        });
    });
  }
});
