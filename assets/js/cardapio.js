document.addEventListener("DOMContentLoaded", () => {

  // Mobile nav toggle
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => nav.classList.toggle("open"));
  }

  // Quantity controls
  document.querySelectorAll(".item").forEach(item => {
    const btnMais  = item.querySelector(".btn-mais");
    const btnMenos = item.querySelector(".btn-menos");
    const valor    = item.querySelector(".valor");

    btnMais.addEventListener("click", () => {
      valor.textContent = parseInt(valor.textContent) + 1;
    });

    btnMenos.addEventListener("click", () => {
      const v = parseInt(valor.textContent);
      if (v > 1) valor.textContent = v - 1;
    });
  });

  // Category filter
  const abas   = document.querySelectorAll(".aba");
  const itens  = document.querySelectorAll(".item");

  function filtrar(categoria) {
    itens.forEach(item => {
      item.style.display =
        (categoria === "todos" || item.dataset.categoria === categoria)
          ? "block" : "none";
    });
  }

  abas.forEach(aba => {
    aba.addEventListener("click", () => {
      abas.forEach(a => a.classList.remove("ativa"));
      aba.classList.add("ativa");
      filtrar(aba.dataset.categoria);
    });
  });

  // Mobile filter toggle
  const btnFiltro  = document.getElementById("btn-filtro");
  const menuFiltro = document.querySelector(".menu-filtro");

  if (btnFiltro && menuFiltro) {
    btnFiltro.addEventListener("click", () => {
      menuFiltro.style.display =
        menuFiltro.style.display === "flex" ? "none" : "flex";
    });

    menuFiltro.querySelectorAll(".aba").forEach(aba => {
      aba.addEventListener("click", () => {
        menuFiltro.querySelectorAll(".aba").forEach(a => a.classList.remove("ativa"));
        aba.classList.add("ativa");
        filtrar(aba.dataset.categoria);
        menuFiltro.style.display = "none";
      });
    });
  }

});

// Global — called by inline onclick in HTML
function adicionarCarrinho(botao, nome, preco) {
  const itemDiv   = botao.closest(".item");
  const quantidade = parseInt(itemDiv.querySelector(".valor").textContent);

  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const existente = carrinho.find(i => i.nome === nome);

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
