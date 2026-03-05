// Importando funções do Firebase (modular v9)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } 
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

  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault(); // evita recarregar a página
      const email = document.getElementById("email").value;
      const senha = document.getElementById("senha").value;

      createUserWithEmailAndPassword(auth, email, senha)
        .then(result => {
          alert("Usuário criado com sucesso: " + result.user.email);
          // Redireciona para login.html
          window.location.href = "login.html";
        })
        .catch(error => {
          console.error("Erro no cadastro:", error);
          alert("Erro no cadastro: " + error.message);
        });
    });
  }
});
