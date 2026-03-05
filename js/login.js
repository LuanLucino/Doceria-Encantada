document.addEventListener("DOMContentLoaded", () => {
  // Configuração do Firebase (substitua pelos seus dados)
  const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_PROJETO.firebaseapp.com",
    projectId: "SEU_PROJETO",
    storageBucket: "SEU_PROJETO.appspot.com",
    messagingSenderId: "SEU_ID",
    appId: "SEU_APP_ID"
  };

  // Inicializa Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();

  // Login com Google
  const providerGoogle = new firebase.auth.GoogleAuthProvider();
  const btnGoogle = document.getElementById("btnGoogle");
  if (btnGoogle) {
    btnGoogle.addEventListener("click", () => {
      auth.signInWithPopup(providerGoogle).then(result => {
        alert("Logado como: " + result.user.displayName);
      }).catch(error => {
        console.error(error);
      });
    });
  }

  // Login com Email/Senha
  const btnEmail = document.getElementById("btnEmail");
  if (btnEmail) {
    btnEmail.addEventListener("click", () => {
      const email = prompt("Digite seu email:");
      const senha = prompt("Digite sua senha:");
      auth.signInWithEmailAndPassword(email, senha)
        .then(result => alert("Logado como: " + result.user.email))
        .catch(error => console.error(error));
    });
  }
});
