document.addEventListener("DOMContentLoaded", function() {
    let cartCount = 0;

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function() {
            cartCount++;
            document.getElementById("cart-count").innerText = cartCount;
            alert("Added to cart!");
        });
    });

    document.getElementById("contact-form").addEventListener("submit", function(event) {
        event.preventDefault();
        alert("Thank you! We'll get back to you soon.");
        this.reset();
    });
});
