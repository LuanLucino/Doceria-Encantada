document.addEventListener("DOMContentLoaded", () => {
  const abas = document.querySelectorAll(".aba");
  const categorias = document.querySelectorAll(".categoria");

  // ===== Abas (versão desktop) =====
  abas.forEach(aba => {
    aba.addEventListener("click", () => {
      abas.forEach(a => a.classList.remove("ativa"));
      aba.classList.add("ativa");

      categorias.forEach(cat => cat.classList.remove("ativa"));
      const categoriaId = aba.getAttribute("data-categoria");
      document.getElementById(categoriaId).classList.add("ativa");
    });
  });

  // ===== Menu hambúrguer (versão mobile) =====
  const btnFiltro = document.getElementById("btn-filtro");
  const menuFiltro = document.getElementById("menu-filtro");

  if (btnFiltro && menuFiltro) {
    btnFiltro.addEventListener("click", () => {
      menuFiltro.style.display = menuFiltro.style.display === "flex" ? "none" : "flex";
    });

    menuFiltro.querySelectorAll("button").forEach(botao => {
      botao.addEventListener("click", () => {
        categorias.forEach(cat => cat.classList.remove("ativa"));
        const categoriaId = botao.getAttribute("data-categoria");
        document.getElementById(categoriaId).classList.add("ativa");
        menuFiltro.style.display = "none";
      });
    });
  }

  // ===== Controle de quantidade nos itens =====
  document.querySelectorAll(".item").forEach(item => {
    const menos = item.querySelector(".btn-menos");
    const mais = item.querySelector(".btn-mais");
    const valor = item.querySelector(".valor");
    const botaoCarrinho = item.querySelector(".btn-carrinho");

    menos.addEventListener("click", () => {
      let qtd = parseInt(valor.textContent);
      if (qtd > 1) { // nunca deixa ir abaixo de 1
        valor.textContent = qtd - 1;
      }
    });

    mais.addEventListener("click", () => {
      let qtd = parseInt(valor.textContent);
      valor.textContent = qtd + 1;
    });

    botaoCarrinho.addEventListener("click", () => {
      const nome = botaoCarrinho.getAttribute("data-nome");
      const preco = parseFloat(botaoCarrinho.getAttribute("data-preco"));
      const quantidade = parseInt(valor.textContent);

      let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
      const itemExistente = carrinho.find(i => i.nome === nome);

      if (itemExistente) {
        itemExistente.quantidade += quantidade;
      } else {
        carrinho.push({ nome, preco, quantidade });
      }

      localStorage.setItem("carrinho", JSON.stringify(carrinho));
      alert(`${quantidade}x ${nome} foi adicionado ao carrinho!`);

      // resetar contador para 1 após adicionar
      valor.textContent = "1";
    });
  });
});
