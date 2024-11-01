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

// Products container 
const productsContainer = document.createElement("div");
productsContainer.classList.add("row");

// Set up filters
document.getElementById("categoryFilter").addEventListener("change", filterProducts);
document.getElementById("priceRange").addEventListener("input", updatePriceRange);

// Update price range display and filter products
function updatePriceRange() {
    const priceRangeValue = document.getElementById("priceRange").value;
    document.getElementById("priceRangeValue").innerText = `$${priceRangeValue}`;
    filterProducts();
}

// Function to filter Products
function filterProducts() {
    const selectedCategory = document.getElementById("categoryFilter").value;
    const maxPrice = document.getElementById("priceRange").value;
    productsContainer.innerHTML = ""; // Clear previous products

    products.data.forEach((product) => {
        if ((selectedCategory === "All" || product.category === selectedCategory) && product.price <= maxPrice) {
            const productCard = createProductCard(product);
            productsContainer.appendChild(productCard);
        }
    });
}

// Function to create a product card
function createProductCard(product) {
    const productCard = document.createElement("div");
    productCard.classList.add("col-4");

    // Click to view product details
    productCard.addEventListener("click", () => viewProductDetails(product));

    // Product elements
    const img = document.createElement("img");
    img.setAttribute("src", "images/" + product.image + ".jpg");
    const name = document.createElement("h4");
    name.innerHTML = product.name;
    const rating = createRating();
    const price = document.createElement("p");
    price.innerText = `$${product.price}.00`;

    // "Add to Cart" button
    const addToCartBtn = document.createElement("button");
    addToCartBtn.classList.add("add-to-cart-btn");
    addToCartBtn.innerText = "Add to Cart";
    addToCartBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent triggering the product detail redirect
        addToCart(product);
    });

    productCard.append(img, name, rating, price, addToCartBtn);
    return productCard;
}

// Function to create a star rating (example, static stars)
function createRating() {
    const rating = document.createElement("div");
    rating.classList.add("rating");
    rating.innerHTML = "<i class='fa fa-star'></i><i class='fa fa-star'></i><i class='fa fa-star'></i><i class='fa fa-star-o'></i>";
    return rating;
}

// Redirect to product details page and save selected product to localStorage
function viewProductDetails(product) {
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    window.location.href = "product-detail.html";
}

// Add product to cart in localStorage
function addToCart(product) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartAmount();
}

// Update cart amount in navigation
function updateCartAmount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.querySelector(".menu-bar li:first-child a").innerText = `$${totalAmount.toFixed(2)}`;
}

// Clear cart function
function clearCart() {
    localStorage.removeItem("cart");
    updateCartAmount();
}

// Add "Clear Cart" button to navigation
function addClearCartButton() {
    const clearCartBtn = document.createElement("button");
    clearCartBtn.innerText = "Clear Cart";
    clearCartBtn.classList.add("clear-cart-btn");
    clearCartBtn.addEventListener("click", clearCart);

    const menuBar = document.querySelector(".menu-bar");
    const cartIcon = document.querySelector(".menu-bar li:last-child");
    menuBar.insertBefore(clearCartBtn, cartIcon);
}

// Initial load functions
addClearCartButton();
updateCartAmount();

// Insert products container below filter row
document.querySelector(".row.row-2").insertAdjacentElement("afterend", productsContainer);
filterProducts();