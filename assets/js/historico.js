import { auth } from "./auth.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {

  onAuthStateChanged(auth, (user) => {
    const container = document.getElementById("historico-lista");
    if (!container) return;

    if (!user) {
      // Não logado → redireciona para login
      window.location.href = "login.html";
      return;
    }

    const histKey = `orderHistory_${user.uid}`;
    const history = JSON.parse(localStorage.getItem(histKey)) || [];

    if (history.length === 0) {
      container.innerHTML = `
        <p class="historico-vazio">
          Você ainda não fez nenhum pedido.<br>
          <a href="cardapio.html" style="color:var(--gold); font-weight:700;">
            Ver cardápio
          </a>
        </p>
      `;
      return;
    }

    history.forEach(pedido => {
      const card = document.createElement("div");
      card.className = "pedido-card";
      card.innerHTML = `
        <div class="pedido-header">
          <span class="pedido-data">${pedido.date}</span>
          <span class="pedido-total">R$ ${pedido.total}</span>
        </div>
        <ul class="pedido-itens">
          ${pedido.itens.map(i =>
            `<li>${i.quantidade}x ${i.nome} — R$ ${(i.preco * i.quantidade).toFixed(2)}</li>`
          ).join("")}
        </ul>
      `;
      container.appendChild(card);
    });
  });

});
