// Importando funções do Firebase (modular v9)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } 
  from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
  // Configuração do Firebase
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

  // Botão de cadastro
  const btnSignup = document.getElementById("btnSignup");
  if (btnSignup) {
    btnSignup.addEventListener("click", () => {
      const email = prompt("Digite seu email para cadastro:");
      const senha = prompt("Digite sua senha (mínimo 6 caracteres):");
      createUserWithEmailAndPassword(auth, email, senha)
        .then(result => {
          alert("Usuário criado com sucesso: " + result.user.email);
        })
        .catch(error => {
          console.error("Erro no cadastro:", error);
          alert("Erro no cadastro: " + error.message);
        });
    });
  }
});
