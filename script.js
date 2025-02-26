/* script.js */

// Function to add an item to the cart using localStorage
function addToCart(id, name, price) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id: id, name: name, price: price, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert(`${name} has been added to your cart.`);
}

// Update the cart count display in the header
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let count = cart.reduce((acc, item) => acc + item.quantity, 0);
  document.getElementById('cart-count').textContent = count;
}

// Display cart items on the cart page
function displayCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartTableBody = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  cartTableBody.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.quantity;
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>${item.quantity}</td>
      <td><button onclick="removeFromCart('${item.id}')">Remove</button></td>
    `;
    cartTableBody.appendChild(row);
  });
  cartTotal.textContent = cart.length > 0 ? `Total: $${total.toFixed(2)}` : "Your cart is empty.";
}

// Remove an item from the cart by id
function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
  updateCartCount();
}

// Update cart count on page load
document.addEventListener('DOMContentLoaded', updateCartCount);

// If on the cart page, display the cart items
if (document.title.includes("Cart")) {
  document.addEventListener('DOMContentLoaded', displayCart);
}
