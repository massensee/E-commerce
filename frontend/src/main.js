import "./style.css";

// === CLASSES ===
class Product {
  constructor(id, name, price, image) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
  }
}

class Cart {
  constructor() {
    this.items = [];
  }

  add(product) {
    this.items.push(product);
    this.updateUI();
  }

  remove(productId) {
    this.items = this.items.filter((item) => item.id !== productId);
    this.updateUI();
  }

  getTotal() {
    return this.items.reduce((total, item) => total + item.price, 0);
  }

  updateUI() {
    document.getElementById("cart-count").textContent = this.items.length;

    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";
    this.items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = `${item.name} - ${item.price.toFixed(2)} €`;
      cartItems.appendChild(li);
    });

    document.getElementById("cart-total").textContent =
      this.getTotal().toFixed(2) + " €";
  }
}

// === PRODUITS SIMULÉS ===
const products = [
  new Product(
    1,
    "Chaussures de sport",
    49.99,
    "https://via.placeholder.com/200"
  ),
  new Product(2, "T-shirt coton", 19.99, "https://via.placeholder.com/200"),
  new Product(3, "Casquette stylée", 14.99, "https://via.placeholder.com/200"),
];

// === PANIER GLOBAL ===
const cart = new Cart();

// === AFFICHAGE DES PRODUITS ===
const productList = document.getElementById("product-list");
products.forEach((product) => {
  const article = document.createElement("article");
  article.classList.add("product");
  article.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>${product.price.toFixed(2)} €</p>
    <button data-id="${product.id}">Ajouter au panier</button>
  `;
  productList.appendChild(article);
});

// === GESTION DES CLICS ===
productList.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const productId = parseInt(e.target.dataset.id);
    const product = products.find((p) => p.id === productId);
    cart.add(product);
  }
});

// === AFFICHAGE / FERMETURE DU PANIER ===
const cartModal = document.getElementById("cart-modal");
document.getElementById("cart-link").addEventListener("click", (e) => {
  e.preventDefault();
  cartModal.classList.toggle("hidden");
});

document.getElementById("close-cart").addEventListener("click", () => {
  cartModal.classList.add("hidden");
});

// === CHECKOUT (futur paiement) ===
document.getElementById("checkout").addEventListener("click", () => {
  alert("Le paiement sera ajouté plus tard avec Stripe !");
});
