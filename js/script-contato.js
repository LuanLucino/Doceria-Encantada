document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-contato");
  const mensagemSucesso = document.getElementById("mensagem-sucesso");

  // Efeito de envio do formulário
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // impede envio real
    mensagemSucesso.style.display = "block";

    // animaçãozinha de fade-in
    mensagemSucesso.style.opacity = 0;
    let opacidade = 0;
    const fade = setInterval(() => {
      if (opacidade < 1) {
        opacidade += 0.05;
        mensagemSucesso.style.opacity = opacidade;
      } else {
        clearInterval(fade);
      }
    }, 30);

    // limpa os campos
    form.reset();
  });

  // Botões de contato
  const btnWhatsapp = document.querySelector(".btn-whatsapp");
  const btnInstagram = document.querySelector(".btn-instagram");

  // Função para efeito pulse
  function pulseEffect(button) {
    button.style.transform = "scale(1.1)";
    button.style.boxShadow = "0 0 15px rgba(255, 153, 204, 0.7)";
    setTimeout(() => {
      button.style.transform = "scale(1)";
      button.style.boxShadow = "none";
    }, 400);
  }

  // Adiciona efeito ao clicar
  btnWhatsapp.addEventListener("click", () => {
    pulseEffect(btnWhatsapp);
  });

  btnInstagram.addEventListener("click", () => {
    pulseEffect(btnInstagram);
  });
});
