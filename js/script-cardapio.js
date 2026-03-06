document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     CONTROLE DE QUANTIDADE
  ========================= */
  const itens = document.querySelectorAll(".item");

  itens.forEach(item => {
    const btnMais = item.querySelector(".btn-mais");
    const btnMenos = item.querySelector(".btn-menos");
    const valorSpan = item.querySelector(".valor");

    btnMais.addEventListener("click", () => {
      let valor = parseInt(valorSpan.textContent);
      valorSpan.textContent = valor + 1;
    });

    btnMenos.addEventListener("click", () => {
      let valor = parseInt(valorSpan.textContent);
      if (valor > 1) {
        valorSpan.textContent = valor - 1;
      }
    });
  });


  /* =========================
     FILTRO DE CATEGORIA
  ========================= */
  const botoesFiltro = document.querySelectorAll("[data-categoria]");
  const itensCardapio = document.querySelectorAll(".item");

  function filtrarCategoria(categoria) {
    itensCardapio.forEach(item => {
      if (categoria === "todos") {
        item.style.display = "block";
      } else if (item.dataset.categoria === categoria) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }


  /* ===== Abas Desktop ===== */
  const abas = document.querySelectorAll(".aba");

  abas.forEach(aba => {
    aba.addEventListener("click", () => {
      const categoria = aba.dataset.categoria;

      abas.forEach(a => a.classList.remove("ativa"));
      aba.classList.add("ativa");

      filtrarCategoria(categoria);
    });
  });


  /* ===== Menu Mobile ===== */
  const btnFiltro = document.getElementById("btn-filtro");
  const menuFiltro = document.querySelector(".menu-filtro");

  btnFiltro.addEventListener("click", () => {
    if (menuFiltro.style.display === "flex") {
      menuFiltro.style.display = "none";
    } else {
      menuFiltro.style.display = "flex";
    }
  });

  const botoesMobile = document.querySelectorAll("#menu-filtro button");

  botoesMobile.forEach(botao => {
    botao.addEventListener("click", () => {
      const categoria = botao.dataset.categoria;
      filtrarCategoria(categoria);
      menuFiltro.style.display = "none";
    });
  });

});


/* =========================
   CARRINHO
========================= */
function adicionarCarrinho(botao, nome, preco) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  const itemDiv = botao.closest(".item");
  const quantidade = parseInt(itemDiv.querySelector(".valor").textContent);

  const existente = carrinho.find(item => item.nome === nome);

  if (existente) {
    existente.quantidade += quantidade;
  } else {
    carrinho.push({ nome, preco, quantidade });
  }

  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  botao.textContent = "✔ Adicionado!";
  botao.disabled = true;

  setTimeout(() => {
    botao.textContent = "Adicionar ao Carrinho";
    botao.disabled = false;
  }, 2000);
}
