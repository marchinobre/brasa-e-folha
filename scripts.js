const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
// 1. Validação do formulário de cadastro
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formCadastro");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const nome = document.getElementById("produtoNome").value.trim();
      const preco = document.getElementById("produtoPreco").value.trim();

      if (!nome || !preco || isNaN(preco)) {
        alert("Preencha corretamente todos os campos!");
        return;
      }

      alert("Produto cadastrado com sucesso!");
      form.reset();
    });
  }

  // 2. Adicionar ao carrinho
  const botoes = document.querySelectorAll(".add-to-cart-btn");
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  botoes.forEach((botao) => {
    botao.addEventListener("click", () => {
      const nome = botao.getAttribute("data-name");
      const preco = botao.getAttribute("data-price");
      carrinho.push({ nome, preco });
      localStorage.setItem("carrinho", JSON.stringify(carrinho));
      alert(`"${nome}" foi adicionado ao carrinho!`);
    });
  });

  // 3. Simular compra (exibe resumo no console)
  const btnCompra = document.getElementById("simularCompra");
  if (btnCompra) {
    btnCompra.addEventListener("click", () => {
      if (carrinho.length === 0) {
        alert("Carrinho vazio.");
        return;
      }

      let total = 0;
      console.log("🛒 Compra realizada:");
      carrinho.forEach((item) => {
        console.log(`- ${item.nome}: R$ ${item.preco}`);
        total += parseFloat(item.preco.replace(",", "."));
      });
      console.log(` Total: R$ ${total.toFixed(2)}`);
      alert("Compra simulada com sucesso! Veja o resumo no console.");
      localStorage.removeItem("carrinho");
      carrinho = [];
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const btnVerCompras = document.getElementById("verCompras");
  const container = document.getElementById("comprasContainer");

  if (btnVerCompras && container) {
    btnVerCompras.addEventListener("click", () => {
      const compras = JSON.parse(localStorage.getItem("carrinho")) || [];

      if (compras.length === 0) {
        container.innerHTML = "<p class='text-red-600'>Nenhuma compra registrada ainda.</p>";
        return;
      }

      let total = 0;
      let html = "<h3 class='text-xl font-bold mb-2'>Compras Realizadas:</h3><ul class='list-disc ml-5'>";

      compras.forEach((item) => {
        html += `<li>${item.nome} - R$ ${item.preco}</li>`;
        total += parseFloat(item.preco.replace(",", "."));
      });

      html += `</ul><p class="mt-2 font-semibold">Total: R$ ${total.toFixed(2)}</p>`;
      container.innerHTML = html;
    });
  }
});
const btnFinalizar = document.getElementById("finalizarPedido");
const resumo = document.getElementById("resumoPedido");

if (btnFinalizar && resumo) {
  btnFinalizar.addEventListener("click", () => {
    const compras = JSON.parse(localStorage.getItem("carrinho")) || [];

    if (compras.length === 0) {
      resumo.innerHTML = "<p class='text-red-600'>Carrinho vazio. Adicione produtos antes de finalizar o pedido.</p>";
      resumo.classList.remove("hidden");
      return;
    }

    let total = 0;
    let html = "<h3 class='text-xl font-bold mb-2'>Resumo do Pedido:</h3><ul class='list-disc ml-5'>";
    compras.forEach((item) => {
      html += `<li>${item.nome} - R$ ${item.preco}</li>`;
      total += parseFloat(item.preco.replace(",", "."));
    });
    html += `</ul><p class="mt-2 font-semibold">Total: R$ ${total.toFixed(2)}</p>`;
    html += `<p class="mt-4 text-green-700 font-bold">✅ Pedido finalizado com sucesso!</p>`;
    resumo.innerHTML = html;
    resumo.classList.remove("hidden");

    // Limpa o carrinho
    localStorage.removeItem("carrinho");
  });
}