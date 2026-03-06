document.addEventListener("DOMContentLoaded", () => {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const lista = document.getElementById("lista-carrinho");
  const total = document.getElementById("total");

  function renderCarrinho() {
    lista.innerHTML = "";
    let soma = 0;

    if (carrinho.length === 0) {
      lista.innerHTML = "<p>Seu carrinho está vazio 😢</p>";
      total.textContent = "";
      return;
    }

    carrinho.forEach((item, index) => {
      soma += item.preco * item.quantidade;
      lista.innerHTML += `
        <div class="carrinho-item">
          <span>${item.nome}</span>
          <span>Qtd: ${item.quantidade}</span>
          <span>R$ ${(item.preco * item.quantidade).toFixed(2)}</span>
          <button onclick="alterarQuantidade(${index}, -1)">-</button>
          <button onclick="alterarQuantidade(${index}, 1)">+</button>
          <button onclick="removerItem(${index})">Remover</button>
        </div>
      `;
    });

    total.textContent = "Total: R$ " + soma.toFixed(2);
  }

  // Funções globais para botões
  window.alterarQuantidade = (index, delta) => {
    if (carrinho[index]) {
      carrinho[index].quantidade += delta;
      if (carrinho[index].quantidade <= 0) {
        carrinho.splice(index, 1);
      }
      localStorage.setItem("carrinho", JSON.stringify(carrinho));
      renderCarrinho();
    }
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
    let mensagem = "Olá, gostaria de encomendar:\n";
    carrinho.forEach(item => {
      soma += item.preco * item.quantidade;
      mensagem += `${item.quantidade}x ${item.nome} - R$ ${(item.preco * item.quantidade).toFixed(2)}\n`;
    });
    mensagem += `Total: R$ ${soma.toFixed(2)}`;

    window.open(`https://wa.me/5534996998882?text=${encodeURIComponent(mensagem)}`, "_blank");
  });

  renderCarrinho();
});

// Função para adicionar item ao carrinho com feedback visual
function adicionarCarrinho(botao, nome, preco) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  // Verifica se item já existe
  const existente = carrinho.find(item => item.nome === nome);
  if (existente) {
    existente.quantidade += 1;
  } else {
    carrinho.push({ nome, preco, quantidade: 1 });
  }

  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  // Feedback visual no botão
  botao.textContent = "✔ Adicionado!";
  botao.disabled = true;

  setTimeout(() => {
    botao.textContent = "Adicionar ao Carrinho";
    botao.disabled = false;
  }, 2000);
}
