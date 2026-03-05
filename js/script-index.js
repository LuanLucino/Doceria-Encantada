document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".btn-fofo");

  // Efeito fofo no botão da intro
  if (btn) {
    btn.addEventListener("click", () => {
      btn.classList.add("ativo");
      setTimeout(() => {
        btn.classList.remove("ativo");
      }, 300);
    });
  }

  // Função genérica para aplicar fade-in
  function aplicarFadeIn(elementos) {
    elementos.forEach(item => {
      const posicao = item.getBoundingClientRect().top;
      const alturaTela = window.innerHeight;

      if (posicao < alturaTela - 50) {
        item.style.opacity = 1;
        item.style.transform = "translateY(0)";
      }
    });
  }

  // Inicializa destaques e depoimentos
  const destaques = document.querySelectorAll(".destaque-item");
  const depoimentos = document.querySelectorAll(".depoimento-item");

  [...destaques, ...depoimentos].forEach(item => {
    item.style.opacity = 0;
    item.style.transform = "translateY(30px)";
    item.style.transition = "opacity 0.8s ease, transform 0.8s ease";
  });

  // Eventos de scroll
  window.addEventListener("scroll", () => {
    aplicarFadeIn(destaques);
    aplicarFadeIn(depoimentos);
  });

  // Executa ao carregar
  aplicarFadeIn(destaques);
  aplicarFadeIn(depoimentos);
});
