document.addEventListener("DOMContentLoaded", () => {

  // Mobile nav toggle
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => nav.classList.toggle("open"));
  }

  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const lista  = document.getElementById("lista-carrinho");
  const total  = document.getElementById("total");

  function renderCarrinho() {
    lista.innerHTML = "";
    let soma = 0;

    if (carrinho.length === 0) {
      lista.innerHTML = '<p class="vazio">Seu carrinho está vazio.</p>';
      total.textContent = "R$ 0,00";
      return;
    }

    carrinho.forEach((item, index) => {
      soma += item.preco * item.quantidade;
      lista.innerHTML += `
        <div class="item-carrinho">
          <div class="info-produto">
            <h4>${item.nome}</h4>
            <span class="subtotal">R$ ${item.preco.toFixed(2)} cada</span>
          </div>
          <div class="acoes">
            <div class="quantidade">
              <button onclick="alterarQuantidade(${index}, -1)">−</button>
              <span class="valor">${item.quantidade}</span>
              <button onclick="alterarQuantidade(${index}, 1)">+</button>
            </div>
            <span class="preco-item">R$ ${(item.preco * item.quantidade).toFixed(2)}</span>
            <button class="btn-remover" onclick="removerItem(${index})" title="Remover">×</button>
          </div>
        </div>
      `;
    });

    total.textContent = "R$ " + soma.toFixed(2);
  }

  window.alterarQuantidade = (index, delta) => {
    if (!carrinho[index]) return;
    carrinho[index].quantidade += delta;
    if (carrinho[index].quantidade <= 0) carrinho.splice(index, 1);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    renderCarrinho();
  };

  window.removerItem = (index) => {
    carrinho.splice(index, 1);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    renderCarrinho();
  };

  document.getElementById("finalizar").addEventListener("click", () => {
    if (carrinho.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }

    let soma = 0;
    let msg  = "Olá! Gostaria de encomendar:\n\n";
    carrinho.forEach(item => {
      soma += item.preco * item.quantidade;
      msg  += `• ${item.quantidade}x ${item.nome} — R$ ${(item.preco * item.quantidade).toFixed(2)}\n`;
    });
    msg += `\nTotal: R$ ${soma.toFixed(2)}`;

    window.open(`https://wa.me/5534996998882?text=${encodeURIComponent(msg)}`, "_blank");
  });

  renderCarrinho();
});
