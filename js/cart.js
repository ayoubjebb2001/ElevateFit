// Function to update cart amount
function updateCartAmount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.querySelector(".menu-bar li:first-child a").innerText = `$${totalAmount.toFixed(2)}`;
}

// Function to display cart items 
function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    // Reference the table body 
    const cartTable = document.querySelector(".cart-page table");


    // Clear previous cart items
    cartTable.innerHTML = `
            <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Subtotal</th>
            </tr>
        `;

    // Loop through cart items
    cart.forEach(product => {
        const productTotal = product.price * product.quantity;
        // Create row for each product
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
                <td><input type="number" value="${product.quantity}" min="1" class="quantity-input" data-id="${product.id}"></td>
                <td>$${productTotal.toFixed(2)}</td>
            `;

        // Append row to the table
        cartTable.appendChild(row);
    });

}
function displayTotal() {
    const subtotalElem = document.getElementById("subtotal");
    const taxElem = document.getElementById("tax");
    const totalElem = document.getElementById("total");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    let subtotal = 0;

    // Loop through cart items and calculate subtotal
    cart.forEach(product => {
        const productTotal = product.price * product.quantity;
        subtotal += productTotal;
    });
    
    // Calculate and display total
    const tax = subtotal * 0.1;  // Assuming a tax rate of 10%
    const total = subtotal + tax;

    subtotalElem.innerText = `$${subtotal.toFixed(2)}`;
    taxElem.innerText = `$${tax.toFixed(2)}`;
    totalElem.innerText = `$${total.toFixed(2)}`;

}

document.addEventListener("DOMContentLoaded", function () {
    updateCartAmount();
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    displayCartItems();
    displayTotal();

    // Event listener to remove items from the cart
    document.querySelectorAll(".remove-item").forEach(removeButton => {
        removeButton.addEventListener("click", function (event) {
            event.preventDefault();
            const productId = parseInt(event.target.getAttribute("data-id"));
            cart = cart.filter(item => item.id !== productId);
            localStorage.setItem("cart", JSON.stringify(cart));
            location.reload();  // Reload the page to refresh the cart
        });
    });

    // Event listener to update quantity and subtotal
    document.querySelectorAll(".quantity-input").forEach(input => {
        input.addEventListener("change", function (event) {
            const newQuantity = parseInt(event.target.value);
            const productId = parseInt(event.target.getAttribute("data-id"));

            // Update quantity in cart
            const product = cart.find(item => item.id === productId);

            if (product) {
                product.quantity = newQuantity;
                // Remove if quantity = 0 ;
                cart = cart.filter(item => item.quantity !== 0);
                localStorage.setItem("cart", JSON.stringify(cart));
                location.reload();
            }
        });
        input.addEventListener("keypress",(event)=>{
            event.preventDefault();
        })
    });
});
