document.addEventListener("DOMContentLoaded", () => {
  // Configuração do Firebase (copiada do console do Firebase)
  const firebaseConfig = {
    apiKey: "AlTzaSyAvffw23q6XvrWUlChp76rrTytjgMXpL3VE",
    authDomain: "doceria-encantada.firebaseapp.com",
    projectId: "doceria-encantada",
    storageBucket: "doceria-encantada.appspot.com",
    messagingSenderId: "588485252022",
    appId: "1:588485252022:web:304910a55cb2b71ed9f0bb",
    measurementId: "G-K15XINXBE9" // opcional, usado para Analytics
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
        console.error("Erro no login Google:", error);
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
        .catch(error => console.error("Erro no login Email:", error));
    });
  }
});
