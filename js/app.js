// Products 
let products = {
    data: [
        {
            id: 1,
            name: "Red Printed T-Shirt",
            category: "Shirts",
            price: 20,
            description: "Men Maroon Printed Round Neck Optical T-shirt",
            image: "product-1",
            extension: "jpg"
        },
        {
            id: 2,
            name: "Black Sports Shoes",
            category: "Shoes",
            price: 40,
            description: "HRX by Hrithik Roshan Running Shoes For Men",
            image: "product-2",
            extension: "webp"
        },
        {
            id: 3,
            name: "Grey Trouser",
            category: "Trousers",
            price: 25,
            description: "United Colors of Benetton Men's Sweatpants ",
            image: "product-3",
            extension: "jpg"
        },
        {
            id: 4,
            name: "Navy Blue Polo Shirt",
            category: "Shirts",
            price: 25,
            description: "Men Solid Polo Neck Cotton Blend Blue T-Shirt",
            image: "product-4",
            extension: "webp"
        },
        {
            id: 5,
            name: "Grey Sports Shoes",
            category: "Shoes",
            price: 40,
            description: "HRX by Hrithik Roshan Sneakers For Men",
            image: "product-5",
            extension: "webp"
        },
        {
            id: 6,
            name: "Black Sports T-shirt",
            category: "Shirts",
            price: 40,
            description: "PUMA Above The Bar Camo Tee Men Printed Round Neck Cotton Blend T-Shirt",
            image: "product-6",
            extension: "webp"
        },
        {
            id: 7,
            name: "Sports Socks",
            category: "Socks",
            price: 10,
            description: "HRX Men Ankle Length Socks",
            image: "product-7",
            extension: "webp"
        },
        {
            id: 8,
            name: "Black Wrist Watch",
            category: "Watches",
            price: 80,
            description: "Fossil The Minimalist FS5455 - RIP",
            image: "product-8",
            extension: "jpg"
        },
        {
            id: 9,
            name: "Grey Wrist Watch",
            category: "Watches",
            price: 80,
            description: "The Lifestyle Co Men Charcoal Grey & Gunmetal-Toned Analogue Watch MFB-PN-LW6147-3",
            image: "product-9",
            extension: "webp"
        },
        {
            id: 10,
            name: "Black Casual Shoes",
            category: "Shoes",
            price: 40,
            description: "HRX by Hrithik Roshan Walking Shoes For Men",
            image: "product-10",
            extension: "webp"
        },
        {
            id: 11,
            name: "Grey Casual Sneaker",
            category: "Shoes",
            price: 40,
            description: "Skechers Men's, Bounder - Inshore Sneaker ",
            image: "product-11",
            extension: "jpg"
        },
        {
            id: 12,
            name: "Black Jogging Pants",
            category: "Trousers",
            price: 25,
            description: "NIKE Men Solid Black Track Pants",
            image: "product-12",
            extension: "webp"
        },

    ]
};


// General Utility Functions
function updateCartAmount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const cartAmountElem = document.querySelector(".menu-bar li:first-child a");
    if (cartAmountElem) cartAmountElem.innerText = `$${totalAmount.toFixed(2)}`;
}

function clearCart() {
    localStorage.removeItem("cart");
    updateCartAmount();
    location.reload();
}

function addToCart(product) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += product.quantity || 1;
    } else {
        cart.push({ ...product, quantity: product.quantity || 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartAmount();
}

function addClearCartButton() {
    const menuBar = document.querySelector(".menu-bar");
    if (menuBar) {
        const clearCartBtn = document.createElement("button");
        clearCartBtn.innerText = "Clear Cart";
        clearCartBtn.classList.add("clear-cart-btn");
        clearCartBtn.addEventListener("click", clearCart);
        const cartIcon = document.querySelector(".menu-bar li:last-child");
        menuBar.insertBefore(clearCartBtn, cartIcon);
    }
}

// Helper function to create a row of products with a title
function addProductSection(title, products) {
    const container = document.querySelector("body>div.small");
    const sectionTitle = document.createElement("h2");
    sectionTitle.classList.add("title");
    sectionTitle.textContent = title;
    container.append(sectionTitle);

    const row = document.createElement("div");
    row.classList.add("row");

    products.forEach(product => {
        row.append(createProductCard(product));
    });

    container.append(row);
}
// Main Page (index.html) Logic
function loadFeaturedProducts() {
// Home Page Initialization
// Main container for products on the homepage
const container = document.querySelector("body > div.small");



// Featured Products: Display the first 4 products
addProductSection("Featured Products", products.data.slice(0, 4));

// Latest Products: Display the remaining products
addProductSection("Latest Products", products.data.slice(4));
}


// Product Page (products.html) Logic
function setupProductFilters() {
    document.getElementById("categoryFilter").addEventListener("change", filterProducts);
    document.getElementById("priceRange").addEventListener("input", updatePriceRange);
}

function filterProducts() {
    const selectedCategory = document.getElementById("categoryFilter").value;
    const maxPrice = document.getElementById("priceRange").value;
    const productsContainer = document.querySelector(".products .row");
    productsContainer.innerHTML = "";

    products.forEach(product => {
        if ((selectedCategory === "All" || product.category === selectedCategory) && product.price <= maxPrice) {
            productsContainer.append(createProductCard(product));
        }
    });
}

function updatePriceRange() {
    const priceRangeValue = document.getElementById("priceRange").value;
    document.getElementById("priceRangeValue").innerText = `$${priceRangeValue}`;
    filterProducts();
}

// Cart Page (cart.html) Logic
function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartTable = document.querySelector(".cart-page table");
    cartTable.innerHTML = `
        <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Subtotal</th>
        </tr>
    `;

    cart.forEach(product => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <div class="cart-info">
                    <img src="images/${product.image}.jpg" alt="${product.name}">
                    <div>
                        <p>${product.name}</p>
                        <small>Price: $${product.price.toFixed(2)}</small><br>
                        <a href="#" class="remove-item" data-id="${product.id}">Remove</a>
                    </div>
                </div>
            </td>
            <td><input type="number" value="${product.quantity}" min="1" data-id="${product.id}" class="quantity-input"></td>
            <td>$${(product.price * product.quantity).toFixed(2)}</td>
        `;
        cartTable.append(row);
    });

    updateCartTotals();
}

function updateCartTotals() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const subtotal = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    document.getElementById("subtotal").innerText = `$${subtotal.toFixed(2)}`;
    document.getElementById("tax").innerText = `$${tax.toFixed(2)}`;
    document.getElementById("total").innerText = `$${total.toFixed(2)}`;
}

// Product Detail Page (product-detail.html) Logic
function loadProductDetails() {
    const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));

    if (!selectedProduct) {
        console.error("No product data found.");
        return;
    }

    document.getElementById("product-img").src = `images/${selectedProduct.image}.${selectedProduct.extension}`;
    document.querySelector(".col-2 h1").innerText = selectedProduct.name;
    document.querySelector(".col-2 h4").innerText = `$${selectedProduct.price}.00`;
    document.querySelector(".col-2 p").innerText = selectedProduct.description;

    const smallImages = document.getElementsByClassName("small-img");
    for (let i = 0; i < smallImages.length; i++) {
        smallImages[i].src = `images/${selectedProduct.image}-small${i + 1}.${selectedProduct.extension}`;
        smallImages[i].onclick = function () {
            document.getElementById("product-img").src = this.src;
        };
    }

    document.getElementById("addToCartBtn").addEventListener("click", event => {
        event.preventDefault();
        const quantity = parseInt(document.querySelector(".col-2 input[type='number']").value) || 1;
        addToCart({ ...selectedProduct, quantity });
    });

    displayRelatedProducts(selectedProduct);
}

function displayRelatedProducts(selectedProduct) {
    const relatedProductsContainer = document.querySelector(".related-products .row");
    relatedProductsContainer.innerHTML = "";

    const randomProducts = products.filter(p => p.id !== selectedProduct.id).sort(() => 0.5 - Math.random()).slice(0, 4);

    randomProducts.forEach(product => {
        const productCard = createProductCard(product);
        productCard.addEventListener("click", () => {
            localStorage.setItem("selectedProduct", JSON.stringify(product));
            window.location.href = "product-detail.html";
        });
        relatedProductsContainer.appendChild(productCard);
    });
}

// Checkout page Logic 
// Display order summary
function displayOrderSummary() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productsCount = cart.reduce((count, item) => count + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    document.getElementById("productsCount").innerText = `Products: ${productsCount} (Qty)`;
    document.getElementById("orderTotal").innerText = `$${subtotal.toFixed(2)}`;
    document.getElementById("subtotal").innerText = `$${subtotal.toFixed(2)}`;
}

// Form validation and submission
function validateOrderForm() {
    const form = document.getElementById("orderForm");
    if (form.checkValidity()) {
        alert("Order placed successfully!");
        clearCart();
    } else {
        alert("Please fill in all required fields.");
        form.reportValidity();
    }
}

// Helper Function to Create Product Card
function createProductCard(product) {
    const productCard = document.createElement("div");
    productCard.classList.add("col-4");
    productCard.innerHTML = `
        <img src="images/${product.image}.${product.extension}" alt="${product.name}">
        <h4>${product.name}</h4>
        <p>$${product.price}.00</p>
    `;
    return productCard;
}

// Initialization Based on Page
document.addEventListener("DOMContentLoaded", () => {
    addClearCartButton();
    updateCartAmount();

    if (window.location.pathname.includes("index.html")) {
        loadFeaturedProducts();
    } else if (window.location.pathname.includes("products.html")) {
        setupProductFilters();
        filterProducts();
    } else if (window.location.pathname.includes("cart.html")) {
        displayCartItems();
    } else if (window.location.pathname.includes("product-detail.html")) {
        loadProductDetails();
    } else if (window.location.pathname.includes("checkout.html")){
        displayOrderSummary();
    }
});
