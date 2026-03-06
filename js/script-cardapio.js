document.addEventListener("DOMContentLoaded", () => {
  // Controle dos botões de quantidade
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
});

// Função para adicionar ao carrinho
function adicionarCarrinho(botao, nome, preco) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  // Pega a quantidade escolhida no item
  const itemDiv = botao.closest(".item");
  const quantidade = parseInt(itemDiv.querySelector(".valor").textContent);

  // Verifica se item já existe
  const existente = carrinho.find(item => item.nome === nome);
  if (existente) {
    existente.quantidade += quantidade;
  } else {
    carrinho.push({ nome, preco, quantidade });
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
