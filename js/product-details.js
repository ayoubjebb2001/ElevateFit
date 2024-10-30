// JS for Single product detail


        var ProductImg = document.getElementById("product-img");//larger image
        var SmallImg = document.getElementsByClassName("small-img");//it returns list of 4 images having index 0,1,2,3 as we have 4 images with class name "small0-img" 

        SmallImg[0].onclick = function()//when user click on first image or images at 0 index, it will display as ProdcutImg.src replace with clicked or SmallImg[0], so we get smallimg[0] in bigger form, similarly when click on smallimg[1], it will display in bigger picture and so on 
        {
            ProductImg.src = SmallImg[0].src;   
        }

        SmallImg[1].onclick = function()
        {
            ProductImg.src = SmallImg[1].src;   
        }

        SmallImg[2].onclick = function()
        {
            ProductImg.src = SmallImg[2].src;   
        }

        SmallImg[3].onclick = function()
        {
            ProductImg.src = SmallImg[3].src;   
        }

        // retrieve the product data and display it on the page

        document.addEventListener("DOMContentLoaded", function() {
            let selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
            
            if (selectedProduct) {
                document.getElementById("product-img").src = `images/${selectedProduct.image}.jpg`;
                document.querySelector(".col-2 h1").innerText = selectedProduct.name;
                document.querySelector(".col-2 h4").innerText = `$${selectedProduct.price}.00`;
                document.querySelector(".col-2 p").innerText = selectedProduct.description;
            } else {
                console.error("No product data found.");
            }
        });
        

        // event listener to the "Add to Cart" button When clicked, this will add the product to the cart in localStorage.
        document.getElementById("addToCartBtn").addEventListener("click", function(event) {
            event.preventDefault(); // Prevent default anchor behavior
            
            // Retrieve selected product data
            let selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
        
            // Retrieve cart from localStorage or create an empty array
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
        
            // Check if the product is already in the cart
            let productIndex = cart.findIndex(item => item.id === selectedProduct.id);
        
            if (productIndex === -1) {
                // If product is not in the cart, add it with quantity
                selectedProduct.quantity = 1;
                cart.push(selectedProduct);
            } else {
                // If product already exists, increase the quantity
                cart[productIndex].quantity += 1;
            }
        
            // Save the updated cart to localStorage
            localStorage.setItem("cart", JSON.stringify(cart));
        
            // Update the cart amount in the nav
            updateCartAmount();
        });
        
        // Function to update cart amount
        function updateCartAmount() {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            let totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
            document.querySelector(".menu-bar li:first-child a").innerText = `$${totalAmount.toFixed(2)}`;
        }
        
        // Update cart amount on page load
        updateCartAmount();
        