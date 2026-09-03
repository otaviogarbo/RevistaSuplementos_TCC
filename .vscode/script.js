/* =========================================
   CONFIGURAÇÃO
========================================= */

// COLOQUE AQUI O NÚMERO DO WHATSAPP DA LOJA
//
// Formato:
// Brasil = 55
// DDD = 16
// Número = 999999999
//
// Exemplo:
// 5516999999999

const WHATSAPP_NUMBER = "5516999999999";


/* =========================================
   PRODUTOS
========================================= */

const products = [

    {
        id: 1,
        name: "Whey Protein Concentrado",
        category: "proteina",
        categoryName: "Proteína",
        price: 129.90,
        description:
            "Suplemento alimentar à base de proteína do soro do leite.",
        icon: "fa-solid fa-bottle-droplet"
    },

    {
        id: 2,
        name: "Whey Protein Isolado",
        category: "proteina",
        categoryName: "Proteína",
        price: 179.90,
        description:
            "Proteína do soro do leite em uma versão isolada.",
        icon: "fa-solid fa-bottle-droplet"
    },

    {
        id: 3,
        name: "Creatina Monohidratada",
        category: "creatina",
        categoryName: "Creatina",
        price: 89.90,
        description:
            "Creatina monohidratada para complementar a alimentação.",
        icon: "fa-solid fa-bolt"
    },

    {
        id: 4,
        name: "Creatina em Cápsulas",
        category: "creatina",
        categoryName: "Creatina",
        price: 99.90,
        description:
            "Creatina apresentada em cápsulas para facilitar o consumo.",
        icon: "fa-solid fa-capsules"
    },

    {
        id: 5,
        name: "Multivitamínico",
        category: "vitamina",
        categoryName: "Vitaminas",
        price: 69.90,
        description:
            "Produto com combinação de vitaminas e minerais.",
        icon: "fa-solid fa-capsules"
    },

    {
        id: 6,
        name: "Vitamina C",
        category: "vitamina",
        categoryName: "Vitaminas",
        price: 39.90,
        description:
            "Suplemento alimentar de vitamina C.",
        icon: "fa-solid fa-apple-whole"
    },

    {
        id: 7,
        name: "Pré-Treino",
        category: "energia",
        categoryName: "Energia",
        price: 109.90,
        description:
            "Suplemento desenvolvido para ser utilizado antes da atividade física.",
        icon: "fa-solid fa-bolt"
    },

    {
        id: 8,
        name: "Barra de Proteína",
        category: "proteina",
        categoryName: "Proteína",
        price: 12.90,
        description:
            "Barra com proteína para complementar a alimentação.",
        icon: "fa-solid fa-cookie-bite"
    },

    {
        id: 9,
        name: "BCAA",
        category: "energia",
        categoryName: "Energia",
        price: 79.90,
        description:
            "Suplemento alimentar composto por aminoácidos de cadeia ramificada.",
        icon: "fa-solid fa-flask"
    },

    {
        id: 10,
        name: "Glutamina",
        category: "energia",
        categoryName: "Energia",
        price: 84.90,
        description:
            "Suplemento alimentar à base de glutamina.",
        icon: "fa-solid fa-flask"
    },

    {
        id: 11,
        name: "Ômega 3",
        category: "vitamina",
        categoryName: "Vitaminas",
        price: 59.90,
        description:
            "Suplemento alimentar à base de óleo de peixe.",
        icon: "fa-solid fa-capsules"
    },

    {
        id: 12,
        name: "Hipercalórico",
        category: "proteina",
        categoryName: "Proteína",
        price: 119.90,
        description:
            "Suplemento alimentar com combinação de carboidratos e proteínas.",
        icon: "fa-solid fa-bottle-droplet"
    }

];


/* =========================================
   CARRINHO
========================================= */

let cart = JSON.parse(
    localStorage.getItem("suplementaCart")
) || [];


/* =========================================
   ELEMENTOS
========================================= */

const productsGrid =
    document.getElementById("productsGrid");

const searchInput =
    document.getElementById("searchInput");

const noProducts =
    document.getElementById("noProducts");

const cartCount =
    document.getElementById("cartCount");

const cartModal =
    document.getElementById("cartModal");

const cartItems =
    document.getElementById("cartItems");

const emptyCart =
    document.getElementById("emptyCart");

const cartFooter =
    document.getElementById("cartFooter");

const cartTotal =
    document.getElementById("cartTotal");

const productModal =
    document.getElementById("productModal");

const productModalContent =
    document.getElementById("productModalContent");

const toast =
    document.getElementById("toast");


/* =========================================
   FORMATAÇÃO DE PREÇO
========================================= */

function formatPrice(value) {

    return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}


/* =========================================
   SALVAR CARRINHO
========================================= */

function saveCart() {

    localStorage.setItem(
        "suplementaCart",
        JSON.stringify(cart)
    );

}


/* =========================================
   MOSTRAR PRODUTOS
========================================= */

function renderProducts(
    category = "todos",
    search = ""
) {

    const searchText =
        search.toLowerCase().trim();


    const filteredProducts =
        products.filter(product => {

            const categoryMatch =
                category === "todos" ||
                product.category === category;

            const searchMatch =
                product.name
                    .toLowerCase()
                    .includes(searchText) ||
                product.description
                    .toLowerCase()
                    .includes(searchText);

            return categoryMatch && searchMatch;

        });


    productsGrid.innerHTML = "";


    if (filteredProducts.length === 0) {

        noProducts.classList.add("show");

        return;

    }


    noProducts.classList.remove("show");


    filteredProducts.forEach(product => {

        const card =
            document.createElement("article");

        card.className = "product-card";


        card.innerHTML = `

            <div class="product-image">

                <span class="product-category">
                    ${product.categoryName}
                </span>

                <i class="${product.icon}"></i>

            </div>

            <div class="product-info">

                <h3>
                    ${product.name}
                </h3>

                <p>
                    ${product.description}
                </p>

                <button
                    class="details-product"
                    onclick="openProduct(${product.id})"
                >
                    Ver detalhes
                </button>

                <div class="product-price">

                    <strong>
                        ${formatPrice(product.price)}
                    </strong>

                    <button
                        class="add-product"
                        onclick="addToCart(${product.id})"
                        title="Adicionar ao carrinho"
                    >
                        <i class="fa-solid fa-plus"></i>
                    </button>

                </div>

            </div>

        `;


        productsGrid.appendChild(card);

    });

}


/* =========================================
   ADICIONAR AO CARRINHO
========================================= */

function addToCart(productId) {

    const product =
        products.find(
            item => item.id === productId
        );


    if (!product) {
        return;
    }


    const existingProduct =
        cart.find(
            item => item.id === productId
        );


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            quantity: 1

        });

    }


    saveCart();

    updateCart();

    showToast(
        `${product.name} foi adicionado ao carrinho!`
    );

}


/* =========================================
   ATUALIZAR CARRINHO
========================================= */

function updateCart() {

    let totalQuantity = 0;

    let totalPrice = 0;


    cart.forEach(item => {

        totalQuantity += item.quantity;

        totalPrice +=
            item.price * item.quantity;

    });


    cartCount.textContent = totalQuantity;

    cartTotal.textContent =
        formatPrice(totalPrice);


    renderCart();

}


/* =========================================
   MOSTRAR CARRINHO
========================================= */

function renderCart() {

    cartItems.innerHTML = "";


    if (cart.length === 0) {

        emptyCart.style.display = "block";

        cartFooter.style.display = "none";

        return;

    }


    emptyCart.style.display = "none";

    cartFooter.style.display = "block";


    cart.forEach(item => {

        const product =
            products.find(
                p => p.id === item.id
            );


        const cartItem =
            document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <div class="cart-item-image">

                <i class="${product.icon}"></i>

            </div>


            <div>

                <h4>
                    ${item.name}
                </h4>

                <small>
                    ${formatPrice(item.price)}
                </small>


                <div class="quantity">

                    <button
                        onclick="changeQuantity(${item.id}, -1)"
                    >
                        -
                    </button>

                    <strong>
                        ${item.quantity}
                    </strong>

                    <button
                        onclick="changeQuantity(${item.id}, 1)"
                    >
                        +
                    </button>

                </div>


                <button
                    class="remove-item"
                    onclick="removeFromCart(${item.id})"
                >
                    <i class="fa-solid fa-trash"></i>
                    Remover
                </button>

            </div>


            <strong class="cart-item-total">

                ${formatPrice(
                    item.price * item.quantity
                )}

            </strong>

        `;


        cartItems.appendChild(cartItem);

    });

}


/* =========================================
   ALTERAR QUANTIDADE
========================================= */

function changeQuantity(
    productId,
    amount
) {

    const item =
        cart.find(
            product => product.id === productId
        );


    if (!item) {
        return;
    }


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                product => product.id !== productId
            );

    }


    saveCart();

    updateCart();

}


/* =========================================
   REMOVER PRODUTO
========================================= */

function removeFromCart(productId) {

    cart =
        cart.filter(
            item => item.id !== productId
        );


    saveCart();

    updateCart();

    showToast(
        "Produto removido do carrinho."
    );

}


/* =========================================
   TOTAL DO CARRINHO
========================================= */

function getCartTotal() {

    return cart.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );

}


/* =========================================
   WHATSAPP
========================================= */

function sendWhatsAppOrder() {

    if (cart.length === 0) {

        showToast(
            "Adicione algum produto ao carrinho."
        );

        return;

    }


    let message =
        "Olá! Gostaria de fazer um pedido:%0A%0A";


    cart.forEach(item => {

        const subtotal =
            item.price * item.quantity;


        message +=
            `• ${item.quantity}x ${item.name} - ${formatPrice(subtotal)}%0A`;

    });


    message +=
        `%0A*Total: ${formatPrice(getCartTotal())}*`;


    message +=
        "%0A%0AGostaria de saber sobre a disponibilidade dos produtos.";


    const whatsappURL =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;


    window.open(
        whatsappURL,
        "_blank"
    );

}


/* =========================================
   BOTÃO CONTATO WHATSAPP
========================================= */

function sendWhatsAppContact() {

    const message =
        "Olá! Gostaria de saber mais sobre os produtos da Suplementa+.";


    const whatsappURL =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;


    window.open(
        whatsappURL,
        "_blank"
    );

}


/* =========================================
   MODAL DO PRODUTO
========================================= */

function openProduct(productId) {

    const product =
        products.find(
            item => item.id === productId
        );


    if (!product) {
        return;
    }


    productModalContent.innerHTML = `

        <div class="modal-product-image">

            <i class="${product.icon}"></i>

        </div>


        <div class="modal-product-info">

            <span>
                ${product.categoryName}
            </span>

            <h2>
                ${product.name}
            </h2>

            <p>
                ${product.description}
            </p>

            <strong class="modal-price">
                ${formatPrice(product.price)}
            </strong>

            <button
                class="btn btn-primary"
                onclick="addToCart(${product.id}); closeProductModal();"
            >

                <i class="fa-solid fa-cart-plus"></i>

                Adicionar ao carrinho

            </button>

        </div>

    `;


    productModal.classList.add("active");

    document.body.style.overflow = "hidden";

}


/* =========================================
   FECHAR MODAL PRODUTO
========================================= */

function closeProductModal() {

    productModal.classList.remove("active");

    document.body.style.overflow = "";

}


/* =========================================
   ABRIR CARRINHO
========================================= */

function openCartModal() {

    cartModal.classList.add("active");

    document.body.style.overflow = "hidden";

}


/* =========================================
   FECHAR CARRINHO
========================================= */

function closeCartModal() {

    cartModal.classList.remove("active");

    document.body.style.overflow = "";

}


/* =========================================
   TOAST
========================================= */

let toastTimeout;


function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");


    clearTimeout(toastTimeout);


    toastTimeout =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 2500);

}


/* =========================================
   FILTRO POR CATEGORIA
========================================= */

let currentCategory = "todos";


document
    .querySelectorAll(".category")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".category")
                    .forEach(btn =>
                        btn.classList.remove("active")
                    );


                button.classList.add("active");


                currentCategory =
                    button.dataset.category;


                renderProducts(
                    currentCategory,
                    searchInput.value
                );

            }
        );

    });


/* =========================================
   PESQUISA
========================================= */

searchInput.addEventListener(
    "input",
    () => {

        renderProducts(
            currentCategory,
            searchInput.value
        );

    }
);


/* =========================================
   EVENTOS DOS BOTÕES
========================================= */

document
    .getElementById("openCart")
    .addEventListener(
        "click",
        openCartModal
    );


document
    .getElementById("closeCart")
    .addEventListener(
        "click",
        closeCartModal
    );


document
    .getElementById("closeProduct")
    .addEventListener(
        "click",
        closeProductModal
    );


document
    .getElementById("checkoutWhatsapp")
    .addEventListener(
        "click",
        sendWhatsAppOrder
    );


document
    .getElementById("contactWhatsapp")
    .addEventListener(
        "click",
        sendWhatsAppContact
    );


document
    .getElementById("footerWhatsapp")
    .addEventListener(
        "click",
        event => {

            event.preventDefault();

            sendWhatsAppContact();

        }
    );


/* =========================================
   MENU MOBILE
========================================= */

const menuMobile =
    document.getElementById("menuMobile");

const mobileMenu =
    document.getElementById("mobileMenu");


menuMobile.addEventListener(
    "click",
    () => {

        mobileMenu.classList.toggle("active");

    }
);


/* Fecha o menu ao clicar em algum link */

mobileMenu
    .querySelectorAll("a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                mobileMenu.classList.remove(
                    "active"
                );

            }
        );

    });


/* =========================================
   FECHAR MODAIS CLICANDO FORA
========================================= */

cartModal.addEventListener(
    "click",
    event => {

        if (
            event.target === cartModal
        ) {

            closeCartModal();

        }

    }
);


productModal.addEventListener(
    "click",
    event => {

        if (
            event.target === productModal
        ) {

            closeProductModal();

        }

    }
);


/* =========================================
   TECLA ESC
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeCartModal();

            closeProductModal();

        }

    }
);


/* =========================================
   INICIALIZAÇÃO
========================================= */

renderProducts();

updateCart();