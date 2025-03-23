document.addEventListener('DOMContentLoaded', function() {
    // Product data - would normally come from a database
    // This is placeholder data, replace with your actual products and HEIC image filenames
    // IMPORTANT: Replace 'images/product1.jpg' with your actual HEIC image names
    // For example: 'nail-design-1.heic', 'sparkle-set-2.heic', etc.
    const products = [
        {
            id: 1,
            name: 'Glitter Fantasy',
            category: 'medium',
            price: 19.99,
            image: 'nail-design-1.heic', // Replace with your actual HEIC filename
            description: 'Medium length press-on nails with a stunning glitter finish. Perfect for special occasions or adding some sparkle to your everyday look.',
            stock: 15
        },
        {
            id: 2,
            name: 'Classic French',
            category: 'short',
            price: 15.99,
            image: 'nail-design-2.heic', // Replace with your actual HEIC filename
            description: 'Short length classic French manicure press-on nails. Timeless elegance for any occasion.',
            stock: 20
        },
        {
            id: 3,
            name: 'Bold Red',
            category: 'long',
            price: 22.99,
            image: 'nail-design-3.heic', // Replace with your actual HEIC filename
            description: 'Long, glamorous press-on nails in a bold red color. Make a statement with these eye-catching nails.',
            stock: 10
        },
        {
            id: 4,
            name: 'Pastel Dreams',
            category: 'medium',
            price: 18.99,
            image: 'nail-design-4.heic', // Replace with your actual HEIC filename
            description: 'Medium length press-on nails in soft pastel colors. Perfect for spring and summer.',
            stock: 12
        },
        {
            id: 5,
            name: 'Midnight Blue',
            category: 'long',
            price: 22.99,
            image: 'nail-design-5.heic', // Replace with your actual HEIC filename
            description: 'Long, sophisticated press-on nails in a deep midnight blue. Elegant and mysterious.',
            stock: 8
        },
        {
            id: 6,
            name: 'Natural Nude',
            category: 'short',
            price: 15.99,
            image: 'nail-design-6.heic', // Replace with your actual HEIC filename
            description: 'Short, natural-looking press-on nails in nude tones. Perfect for a professional setting.',
            stock: 25
        }
        // Add more products as needed, make sure to update with your HEIC image filenames
    ];

    // DOM Elements - storing references to elements we'll need to interact with
    const productsContainer = document.getElementById('products-container');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cartIcon = document.querySelector('.cart-icon');
    const cartModal = document.getElementById('cart-modal');
    const productModal = document.getElementById('product-modal');
    const closeButtons = document.querySelectorAll('.close');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');
    const cartCount = document.getElementById('cart-count');
    const checkoutBtn = document.getElementById('checkout-btn');
    const contactForm = document.getElementById('contact-form');
    const newsletterForm = document.getElementById('newsletter-form');

    // Shopping cart array to store selected products
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Initialize the page
    init();

    /**
     * Initialize the application
     */
    function init() {
        // Load products on page load
        loadProducts('all');
        
        // Update cart UI
        updateCartUI();
        
        // Set up event listeners
        setupEventListeners();
    }

    /**
     * Set up all event listeners for the application
     */
    function setupEventListeners() {
        // Filter buttons event listener
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                // Get filter value
                const filter = button.getAttribute('data-filter');
                // Load products based on filter
                loadProducts(filter);
            });
        });

        // Cart icon click event
        if (cartIcon) {
            cartIcon.addEventListener('click', () => {
                cartModal.style.display = 'block';
            });
        }

        // Close button click events
        closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                cartModal.style.display = 'none';
                productModal.style.display = 'none';
            });
        });

        // Close modal when clicking outside of it
        window.addEventListener('click', (e) => {
            if (e.target === cartModal) {
                cartModal.style.display = 'none';
            }
            if (e.target === productModal) {
                productModal.style.display = 'none';
            }
        });

        // Checkout button click event
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                // Implement checkout functionality (redirect to checkout page or show checkout form)
                alert('Checkout functionality will be implemented here.');
            });
        }

        // Contact form submit event
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                // Implement form submission (AJAX call to server or email service)
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            });
        }

        // Newsletter form submit event
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                // Implement newsletter subscription
                alert('Thank you for subscribing to our newsletter!');
                newsletterForm.reset();
            });
        }
    }

    /**
     * Load products based on category filter
     * @param {string} filter - Category to filter by ('all', 'short', 'medium', 'long')
     */
    function loadProducts(filter) {
        // Clear products container
        productsContainer.innerHTML = '';

        // Filter products based on category
        const filteredProducts = filter === 'all' 
            ? products 
            : products.filter(product => product.category === filter);

        // If no products match the filter
        if (filteredProducts.length === 0) {
            productsContainer.innerHTML = '<p class="no-products">No products found in this category.</p>';
            return;
        }

        // Loop through products and create product cards
        filteredProducts.forEach(product => {
            // Create product card element
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            // Set product card HTML
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="#" alt="${product.name}" data-src="${product.image}" class="product-img">
                    <div class="quick-view">Quick View</div>
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-category">${capitalizeFirstLetter(product.category)} Length</p>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            `;
            
            // Add product card to container
            productsContainer.appendChild(productCard);
            
            // Get the image element that was just added
            const imgElement = productCard.querySelector('.product-img');
            
            // Convert HEIC to JPEG and set the image source
            convertHeicToJpeg(product.image, imgElement);
            
            // Add click event for quick view
            const quickView = productCard.querySelector('.quick-view');
            quickView.addEventListener('click', () => {
                showProductDetails(product);
            });
            
            // Add click event for add to cart button
            const addToCartBtn = productCard.querySelector('.add-to-cart');
            addToCartBtn.addEventListener('click', () => {
                addToCart(product);
            });
        });
    }

    /**
     * Convert HEIC image to JPEG format using heic2any library
     * @param {string} heicSrc - Source path of HEIC image
     * @param {HTMLImageElement} imgElement - Image element to update
     */
    function convertHeicToJpeg(heicSrc, imgElement) {
        // Display a loading placeholder initially
        imgElement.src = 'images/placeholder.jpg'; // Replace with your placeholder image
        
        // HEIC images should be placed in an 'images' folder at the root of your project
        // Make sure all HEIC images are in this folder
        const fullPath = 'images/' + heicSrc;
        
        // Fetch the HEIC file
        fetch(fullPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch image: ${heicSrc}`);
                }
                return response.arrayBuffer();
            })
            .then(arrayBuffer => {
                // Convert HEIC to JPEG using heic2any library
                // Options: quality=0.8 provides good balance between quality and file size
                return heic2any({
                    blob: new Blob([arrayBuffer]),
                    toType: 'image/jpeg',
                    quality: 0.8
                });
            })
            .then(jpegBlob => {
                // Create a URL for the JPEG blob and set it as the image source
                const jpegUrl = URL.createObjectURL(jpegBlob);
                imgElement.src = jpegUrl;
                
                // Store the converted image in sessionStorage for faster loading next time
                // Note: This is optional and can be removed if you're concerned about memory usage
                try {
                    const reader = new FileReader();
                    reader.onloadend = function() {
                        sessionStorage.setItem(heicSrc, reader.result);
                    };
                    reader.readAsDataURL(jpegBlob);
                } catch (e) {
                    console.warn('Failed to cache image in sessionStorage:', e);
                }
            })
            .catch(error => {
                console.error('Error converting HEIC to JPEG:', error);
                // If conversion fails, show an error image or the original if supported
                imgElement.src = 'images/error.jpg'; // Replace with your error image
            });
    }

    /**
     * Show detailed product information in a modal
     * @param {Object} product - Product object to display
     */
    function showProductDetails(product) {
        const productDetails = document.getElementById('product-details');
        
        // Create the HTML for product details
        productDetails.innerHTML = `
            <div class="product-details-container">
                <div class="product-details-image">
                    <img src="#" alt="${product.name}" id="modal-product-img">
                </div>
                <div class="product-details-info">
                    <h3>${product.name}</h3>
                    <p class="product-details-price">$${product.price.toFixed(2)}</p>
                    <div class="product-details-description">
                        <p>${product.description}</p>
                    </div>
                    <div class="product-details-meta">
                        <p class="meta-item"><span>Category:</span> ${capitalizeFirstLetter(product.category)} Length</p>
                        <p class="meta-item"><span>Availability:</span> ${product.stock > 0 ? `In Stock (${product.stock} left)` : 'Out of Stock'}</p>
                    </div>
                    <div class="product-quantity">
                        <label for="quantity">Quantity:</label>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn" id="decrease-quantity">-</button>
                            <input type="number" id="quantity" class="item-quantity" value="1" min="1" max="${product.stock}">
                            <button class="quantity-btn" id="increase-quantity">+</button>
                        </div>
                    </div>
                    <button class="add-to-cart add-to-cart-details" data-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        `;
        
        // Show the modal
        productModal.style.display = 'block';
        
        // Get the image element and convert the HEIC image
        const modalImg = document.getElementById('modal-product-img');
        convertHeicToJpeg(product.image, modalImg);
        
        // Add event listeners for quantity buttons
        const decreaseBtn = document.getElementById('decrease-quantity');
        const increaseBtn = document.getElementById('increase-quantity');
        const quantityInput = document.getElementById('quantity');
        
        decreaseBtn.addEventListener('click', () => {
            let quantity = parseInt(quantityInput.value);
            if (quantity > 1) {
                quantityInput.value = quantity - 1;
            }
        });
        
        increaseBtn.addEventListener('click', () => {
            let quantity = parseInt(quantityInput.value);
            if (quantity < product.stock) {
                quantityInput.value = quantity + 1;
            }
        });
        
        // Add event listener for add to cart button in modal
        const addToCartBtn = productDetails.querySelector('.add-to-cart-details');
        addToCartBtn.addEventListener('click', () => {
            const quantity = parseInt(quantityInput.value);
            addToCart(product, quantity);
            productModal.style.display = 'none';
        });
    }

    /**
     * Add a product to the shopping cart
     * @param {Object} product - Product to add to cart
     * @param {number} quantity - Quantity to add (default: 1)
     */
    function addToCart(product, quantity = 1) {
        // Check if product is already in cart
        const existingProductIndex = cart.findIndex(item => item.id === product.id);
        
        if (existingProductIndex !== -1) {
            // If product exists, increase quantity
            cart[existingProductIndex].quantity += quantity;
        } else {
            // Otherwise, add new product to cart
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }
        
        // Update cart UI
        updateCartUI();
        
        // Save cart to localStorage
        saveCart();
        
        // Show success message
        showMessage(`${product.name} added to cart!`, 'success');
    }

    /**
     * Update the cart UI (count, items and total)
     */
    function updateCartUI() {
        // Update cart count
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        // If cart is empty
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
            cartTotalPrice.textContent = '$0.00';
            return;
        }
        
        // Clear cart items container
        cartItemsContainer.innerHTML = '';
        
        // Calculate total price
        let total = 0;
        
        // Add each item to cart modal
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            
            // Create cart item HTML
            cartItem.innerHTML = `
                <img src="#" alt="${item.name}" class="cart-item-image" data-src="${item.image}">
                <div class="cart-item-details">
                    <p class="cart-item-title">${item.name}</p>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                    <span class="item-quantity">${item.quantity}</span>
                    <button class="quantity-btn increase" data-id="${item.id}">+</button>
                </div>
                <button class="remove-item" data-id="${item.id}">×</button>
            `;
            
            // Add cart item to container
            cartItemsContainer.appendChild(cartItem);
            
            // Get the image element and convert the HEIC image
            const imgElement = cartItem.querySelector('.cart-item-image');
            convertHeicToJpeg(item.image, imgElement);
            
            // Add event listeners for quantity buttons
            const decreaseBtn = cartItem.querySelector('.decrease');
            const increaseBtn = cartItem.querySelector('.increase');
            const removeBtn = cartItem.querySelector('.remove-item');
            
            decreaseBtn.addEventListener('click', () => {
                updateItemQuantity(item.id, item.quantity - 1);
            });
            
            increaseBtn.addEventListener('click', () => {
                updateItemQuantity(item.id, item.quantity + 1);
            });
            
            removeBtn.addEventListener('click', () => {
                removeFromCart(item.id);
            });
            
            // Add item total to cart total
            total += item.price * item.quantity;
        });
        
        // Update total price
        cartTotalPrice.textContent = `$${total.toFixed(2)}`;
    }

    /**
     * Update the quantity of an item in the cart
     * @param {number} id - ID of the product to update
     * @param {number} quantity - New quantity
     */
    function updateItemQuantity(id, quantity) {
        // Find the item in the cart
        const itemIndex = cart.findIndex(item => item.id === id);
        
        if (itemIndex !== -1) {
            if (quantity <= 0) {
                // If quantity is 0 or less, remove item from cart
                removeFromCart(id);
            } else {
                // Otherwise, update quantity
                cart[itemIndex].quantity = quantity;
                // Update cart UI
                updateCartUI();
                // Save cart to localStorage
                saveCart();
            }
        }
    }

    /**
     * Remove an item from the cart
     * @param {number} id - ID of the product to remove
     */
    function removeFromCart(id) {
        // Filter out the item to be removed
        cart = cart.filter(item => item.id !== id);
        // Update cart UI
        updateCartUI();
        // Save cart to localStorage
        saveCart();
    }

    /**
     * Save cart to localStorage
     */
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    /**
     * Show a message to the user
     * @param {string} text - Message text
     * @param {string} type - Message type ('success', 'error', 'info')
     */
    function showMessage(text, type = 'info') {
        // Create message element
        const message = document.createElement('div');
        message.className = `message ${type}`;
        message.textContent = text;
        
        // Add message to the page
        document.body.appendChild(message);
        
        // Show the message
        setTimeout(() => {
            message.classList.add('show');
        }, 10);
        
        // Remove the message after 3 seconds
        setTimeout(() => {
            message.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(message);
            }, 300);
        }, 3000);
    }

    /**
     * Capitalize the first letter of a string
     * @param {string} string - String to capitalize
     * @return {string} Capitalized string
     */
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});

/* CSS for notification messages */
const styleElement = document.createElement('style');
styleElement.textContent = `
    .message {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 10px 20px;
        border-radius: 5px;
        color: white;
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.3s, transform 0.3s;
        z-index: 1000;
    }
    
    .message.show {
        opacity: 1;
        transform: translateY(0);
    }
    
    .message.success {
        background-color: #4CAF50;
    }
    
    .message.error {
        background-color: #F44336;
    }
    
    .message.info {
        background-color: #2196F3;
    }
`;
document.head.appendChild(styleElement);
