// JS for Single product detail

var ProductImg = document.getElementById("product-img");//larger image
var SmallImg = document.getElementsByClassName("small-img");//it returns list of 4 images having index 0,1,2,3 as we have 4 images with class name "small0-img" 
SmallImg[0].onclick = function ()//when user click on first image or images at 0 index, it will display as ProdcutImg.src replace with clicked or SmallImg[0], so we get smallimg[0] in bigger form, similarly when click on smallimg[1], it will display in bigger picture and so on 
{
    ProductImg.src = SmallImg[0].src;
}

SmallImg[1].onclick = function () {
    ProductImg.src = SmallImg[1].src;
}

SmallImg[2].onclick = function () {
    ProductImg.src = SmallImg[2].src;
}

SmallImg[3].onclick = function () {
    ProductImg.src = SmallImg[3].src;
}

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


// event listener to the "Add to Cart" button When clicked, this will add the product to the cart in localStorage.
document.getElementById("addToCartBtn").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default anchor behavior

    const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
    const quantityInput = document.querySelector(".col-2 input[type='number']");
    const selectedQuantity = parseInt(quantityInput.value); // Get quantity from input

    if (selectedProduct && selectedQuantity > 0) {
        // Retrieve cart from localStorage or initialize as empty array
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Find if product is already in the cart
        const productIndex = cart.findIndex(item => item.id === selectedProduct.id);

        if (productIndex === -1) {
            // Add new product with specified quantity
            selectedProduct.quantity = selectedQuantity;
            cart.push(selectedProduct);
        } else {
            // If product exists, update quantity
            cart[productIndex].quantity = selectedQuantity;
        }

        // Save updated cart to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));

        // Update cart amount in the nav
        updateCartAmount();
    } else {
        console.error("Invalid product or quantity.");
    }
});


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
// event Listener to prevent user to enter quanity under 1
const input = document.querySelector(".col-2 input[type='number']");
input.addEventListener("keypress", (event) => {
    event.preventDefault();
})

// Function to update cart amount
function updateCartAmount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
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

//  Display related products 
// Function to display 4 random related products
function displayRelatedProducts(selectedProduct) {
    // Filter products to exclude the currently displayed product
    const relatedProducts = products.data.filter(product => product.id !== selectedProduct.id);

    // Shuffle array to get random products
    const shuffledProducts = relatedProducts.sort(() => Math.random() - 0.5);

    // Select the first 4 products
    const randomProducts = shuffledProducts.slice(0, 4);

    // Get the related products container
    const relatedProductsContainer = document.querySelector('.related-products');
    relatedProductsContainer.innerHTML = ""; // Clear the container

    // Generate HTML for each related product
    randomProducts.forEach(product => {
        const productCard = createProductCard(product);
        // Append product card to related products container
        relatedProductsContainer.appendChild(productCard);
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

// Retrieve the selected product and display related products on page load
document.addEventListener("DOMContentLoaded", function () {
    addClearCartButton();
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
    if (selectedProduct) {
        // Display the selected product details (your existing logic)
        document.getElementById("product-img").src = `images/${selectedProduct.image}.jpg`;

        // Set small images (thumbnails) with loop
        const smallImages = document.getElementsByClassName("small-img");
        for (let i = 0; i < smallImages.length; i++) {
            smallImages[i].src = `images/${selectedProduct.image}-${i + 1}.${selectedProduct.extension}`;
        }
        document.querySelector(".col-2 h1").innerText = selectedProduct.name;
        document.querySelector(".col-2 h4").innerText = `$${selectedProduct.price}.00`;
        document.querySelector(".col-2 p").innerText = selectedProduct.description;
        document.getElementById("description").innerText = selectedProduct.name + " " + selectedProduct.description;
        // Find if product is already in the cart
        const productIndex = cart.findIndex(item => item.id === selectedProduct.id);
        if (productIndex !== -1) {
            document.querySelector(".col-2 input[type='number']").setAttribute("value", `${cart[productIndex].quantity}`);
        }
        // Display related products
        displayRelatedProducts(selectedProduct);
        // Update cart amount on page load
        updateCartAmount();
    } else {
        console.error("No product data found.");
    }
});
