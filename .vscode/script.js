// ===============================
// FUNÇÕES DO CARRINHO
// ===============================

let carrinho = [];

// Elementos do HTML
const cartModal = document.getElementById("cartModal");
const cartItems = document.getElementById("cartItems");
const emptyCart = document.getElementById("emptyCart");
const cartFooter = document.getElementById("cartFooter");
const cartTotal = document.getElementById("cartTotal");
const cartCounter = document.querySelector(".cart-button b");


// ===============================
// ADICIONAR PRODUTO AO CARRINHO
// ===============================

function adicionarAoCarrinho(nome, preco, imagem) {

    const produtoExistente = carrinho.find(
        produto => produto.nome === nome
    );

    if (produtoExistente) {

        produtoExistente.quantidade++;

    } else {

        carrinho.push({
            nome: nome,
            preco: preco,
            imagem: imagem,
            quantidade: 1
        });

    }

    atualizarCarrinho();

    alert(nome + " foi adicionado ao carrinho!");
}


// ===============================
// ATUALIZAR CARRINHO
// ===============================

function atualizarCarrinho() {

    cartItems.innerHTML = "";

    let total = 0;
    let quantidadeTotal = 0;

    if (carrinho.length === 0) {

        emptyCart.style.display = "block";
        cartFooter.style.display = "none";

    } else {

        emptyCart.style.display = "none";
        cartFooter.style.display = "block";

        carrinho.forEach((produto, index) => {

            total += produto.preco * produto.quantidade;
            quantidadeTotal += produto.quantidade;

            const item = document.createElement("div");

            item.classList.add("cart-item");

            item.innerHTML = `
                <img 
                    src="${produto.imagem}" 
                    alt="${produto.nome}"
                    width="70"
                >

                <div class="cart-item-info">

                    <h4>${produto.nome}</h4>

                    <span>
                        R$ ${produto.preco
                            .toFixed(2)
                            .replace(".", ",")}
                    </span>

                    <div class="cart-quantity">

                        <button 
                            onclick="diminuirQuantidade(${index})">
                            −
                        </button>

                        <strong>
                            ${produto.quantidade}
                        </strong>

                        <button 
                            onclick="aumentarQuantidade(${index})">
                            +
                        </button>

                    </div>

                </div>

                <button 
                    class="remove-item"
                    onclick="removerDoCarrinho(${index})">

                    <i class="fa-solid fa-trash"></i>

                </button>
            `;

            cartItems.appendChild(item);

        });

    }

    cartTotal.textContent =
        "R$ " +
        total.toFixed(2).replace(".", ",");

    cartCounter.textContent = quantidadeTotal;
}


// ===============================
// AUMENTAR QUANTIDADE
// ===============================

function aumentarQuantidade(index) {

    carrinho[index].quantidade++;

    atualizarCarrinho();
}


// ===============================
// DIMINUIR QUANTIDADE
// ===============================

function diminuirQuantidade(index) {

    carrinho[index].quantidade--;

    if (carrinho[index].quantidade <= 0) {

        carrinho.splice(index, 1);

    }

    atualizarCarrinho();
}


// ===============================
// REMOVER PRODUTO
// ===============================

function removerDoCarrinho(index) {

    carrinho.splice(index, 1);

    atualizarCarrinho();
}


// ===============================
// ABRIR CARRINHO
// ===============================

document
    .getElementById("openCart")
    .addEventListener("click", function () {

        cartModal.classList.add("active");

        atualizarCarrinho();

    });


// ===============================
// FECHAR CARRINHO
// ===============================

document
    .getElementById("closeCart")
    .addEventListener("click", function () {

        cartModal.classList.remove("active");

    });


// ===============================
// FECHAR CLICANDO FORA
// ===============================

cartModal.addEventListener("click", function(event) {

    if (event.target === cartModal) {

        cartModal.classList.remove("active");

    }

});


// ===============================
// FINALIZAR PEDIDO PELO WHATSAPP
// ===============================

document
    .getElementById("checkoutWhatsapp")
    .addEventListener("click", function () {

        if (carrinho.length === 0) {

            alert("Seu carrinho está vazio!");

            return;
        }

        let mensagem =
            "Olá! Gostaria de fazer um pedido:%0A%0A";

        let total = 0;

        carrinho.forEach(produto => {

            const subtotal =
                produto.preco * produto.quantidade;

            total += subtotal;

            mensagem +=
                `${produto.nome} - ` +
                `${produto.quantidade}x - ` +
                `R$ ${subtotal
                    .toFixed(2)
                    .replace(".", ",")}%0A`;

        });

        mensagem +=
            `%0ATotal: R$ ` +
            total.toFixed(2).replace(".", ",");

        // COLOQUE AQUI O NÚMERO DO WHATSAPP
        const numeroWhatsApp = "5516999999999";

        const link =
            `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;

        window.open(link, "_blank");

    });


// Inicializar carrinho
atualizarCarrinho();

adicionarAoCarrinho(
    "Whey Protein",
    99.90,
    "img/wheyproteincard.png"
);