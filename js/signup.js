import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } 
  from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const firebaseConfig = {
  apiKey: "AIzaSyAfw23gK7vWu1hCp76r7ytg1MpXL9ev",
  authDomain: "doceria-encantada.firebaseapp.com",
  projectId: "doceria-encantada",
  storageBucket: "doceria-encantada.appspot.com",
  messagingSenderId: "588458252002",
  appId: "1:588458252002:web:304910a55cb2b71ed9f0bb",
  measurementId: "G-K15ZXNXBE9"
};


  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const senha = document.getElementById("senha").value;

      createUserWithEmailAndPassword(auth, email, senha)
        .then(result => {
          // Redireciona para login.html com mensagem
          window.location.href = "login.html?signup=success";
        })
        .catch(error => {
          alert("Erro no cadastro: " + error.message);
        });
    });
  }
});
