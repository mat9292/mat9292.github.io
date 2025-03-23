/**
 * 7nails - JavaScript principal
 * Ce fichier contient toutes les fonctionnalités interactives du site, 
 * y compris la gestion du panier et la conversion des images HEIC en JPEG
 */

document.addEventListener('DOMContentLoaded', function() {
    // -------------------------------------------------------------
    // VARIABLES GLOBALES
    // -------------------------------------------------------------
    
    // Données des produits
    // IMPORTANT: Remplacez les noms des images par vos 5 fichiers HEIC: "1.HEIC", "2.HEIC", etc.
    // Les images doivent être placées dans le dossier 'images/'
    const products = [
        {
            id: 1,
            name: "Élégance Parisienne",
            price: 29.90,
            description: "Un design classique et raffiné aux tons nude, parsemé de détails dorés subtils. Idéal pour un look professionnel sophistiqué ou une occasion spéciale.",
            image: "1.HEIC"  // ← Fichier HEIC #1: placez ce fichier dans le dossier 'images/'
        },
        {
            id: 2,
            name: "Rose Romantique",
            price: 32.90,
            description: "Des ongles aux teintes rosées avec des motifs floraux délicats, parfaits pour un look romantique et féminin. Un choix idéal pour les événements printaniers.",
            image: "2.HEIC"  // ← Fichier HEIC #2: placez ce fichier dans le dossier 'images/'
        },
        {
            id: 3,
            name: "Nuit Étoilée",
            price: 34.90,
            description: "Un ensemble captivant aux tons bleu nuit profond, illuminé de détails argentés évoquant un ciel étoilé. Parfait pour les soirées élégantes.",
            image: "3.HEIC"  // ← Fichier HEIC #3: placez ce fichier dans le dossier 'images/'
        },
        {
            id: 4,
            name: "Abstrait Moderne",
            price: 35.90,
            description: "Un design avant-gardiste avec des formes géométriques et des couleurs contrastées. Pour celles qui osent se démarquer avec un style unique et artistique.",
            image: "4.HEIC"  // ← Fichier HEIC #4: placez ce fichier dans le dossier 'images/'
        },
        {
            id: 5,
            name: "Glamour Doré",
            price: 39.90,
            description: "Un ensemble luxueux avec une finition métallisée dorée et des accents de brillants. L'incarnation de l'élégance pour les événements les plus prestigieux.",
            image: "5.HEIC"  // ← Fichier HEIC #5: placez ce fichier dans le dossier 'images/'
        }
    ];

    // Référencement des éléments du DOM
    const productsContainer = document.getElementById('products-container');
    const panierQuantite = document.getElementById('panier-quantite');
    const panierModal = document.getElementById('panier-modal');
    const produitModal = document.getElementById('produit-modal');
    const panierItems = document.getElementById('panier-items');
    const panierTotalPrix = document.getElementById('panier-total-prix');
    const commanderBtn = document.getElementById('commander-btn');
    const fermerBtns = document.querySelectorAll('.close');
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const formulaireContact = document.getElementById('contact-form');
    const formulaireNewsletter = document.getElementById('newsletter-form');
    
    // Panier d'achats (stocker dans localStorage)
    let panier = JSON.parse(localStorage.getItem('7nails-panier')) || [];
    
    // -------------------------------------------------------------
    // INITIALISATION
    // -------------------------------------------------------------
    
    // Fonction d'initialisation principale
    function init() {
        // Charger les produits
        afficherProduits();
        
        // Mettre à jour l'affichage du panier
        mettreAJourPanier();
        
        // Ajouter tous les écouteurs d'événements
        setupEventListeners();
        
        // Ajouter la classe "scrolled" au header lors du défilement
        window.addEventListener('scroll', function() {
            const header = document.querySelector('header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // -------------------------------------------------------------
    // ÉCOUTEURS D'ÉVÉNEMENTS
    // -------------------------------------------------------------
    
    /**
     * Configure tous les écouteurs d'événements pour les interactions utilisateur
     */
    function setupEventListeners() {
        // Menu mobile
        if (menuToggle) {
            menuToggle.addEventListener('click', function() {
                nav.classList.toggle('active');
            });
        }
        
        // Clic sur l'icône du panier
        const panierIcon = document.querySelector('.panier');
        if (panierIcon) {
            panierIcon.addEventListener('click', function() {
                panierModal.style.display = 'block';
            });
        }
        
        // Fermeture des modals
        fermerBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                panierModal.style.display = 'none';
                produitModal.style.display = 'none';
            });
        });
        
        // Fermeture des modals en cliquant à l'extérieur
        window.addEventListener('click', function(e) {
            if (e.target === panierModal) {
                panierModal.style.display = 'none';
            }
            if (e.target === produitModal) {
                produitModal.style.display = 'none';
            }
        });
        
        // Bouton "Passer commande"
        if (commanderBtn) {
            commanderBtn.addEventListener('click', function() {
                if (panier.length > 0) {
                    // Simuler une commande réussie
                    afficherNotification('Commande envoyée avec succès !');
                    // Vider le panier
                    panier = [];
                    sauvegarderPanier();
                    mettreAJourPanier();
                    // Fermer le modal
                    panierModal.style.display = 'none';
                } else {
                    afficherNotification('Votre panier est vide.', 'error');
                }
            });
        }
        
        // Formulaire de contact
        if (formulaireContact) {
            formulaireContact.addEventListener('submit', function(e) {
                e.preventDefault();
                // Simuler l'envoi d'un message
                formulaireContact.reset();
                afficherNotification('Votre message a été envoyé avec succès !');
            });
        }
        
        // Formulaire de newsletter
        if (formulaireNewsletter) {
            formulaireNewsletter.addEventListener('submit', function(e) {
                e.preventDefault();
                // Simuler l'inscription à la newsletter
                formulaireNewsletter.reset();
                afficherNotification('Vous êtes maintenant inscrit(e) à notre newsletter !');
            });
        }
        
        // Liens d'ancrage pour une navigation fluide
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Fermer le menu mobile si ouvert
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                }
                
                // Scroll vers l'ancre
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // -------------------------------------------------------------
    // AFFICHAGE DES PRODUITS
    // -------------------------------------------------------------
    
    /**
     * Affiche tous les produits dans la grille de produits
     */
    function afficherProduits() {
        // Vérifier si le conteneur existe
        if (!productsContainer) return;
        
        // Vider le conteneur
        productsContainer.innerHTML = '';
        
        // Parcourir tous les produits
        products.forEach(product => {
            // Créer la carte produit
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            // Définir le HTML pour la carte produit
            productCard.innerHTML = `
                <div class="product-image">
                    <div class="product-image-placeholder" alt="${product.name}">
                        <div class="loading-indicator"></div>
                    </div>
                    <img src="" alt="${product.name}" class="product-img hidden" data-src="${product.image}">
                    <div class="quick-view">Aperçu rapide</div>
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-price">${product.price.toFixed(2)} €</p>
                    <button class="add-to-cart" data-id="${product.id}">Ajouter au panier</button>
                </div>
            `;
            
            // Ajouter la carte au conteneur
            productsContainer.appendChild(productCard);
            
            // Convertir l'image HEIC en JPEG
            const img = productCard.querySelector('.product-img');
            convertirHeicVersJpeg(product.image, img);
            
            // Écouteur pour la vue rapide
            const quickView = productCard.querySelector('.quick-view');
            quickView.addEventListener('click', () => {
                afficherDetailsProduit(product);
            });
            
            // Écouteur pour le bouton "Ajouter au panier"
            const addToCartBtn = productCard.querySelector('.add-to-cart');
            addToCartBtn.addEventListener('click', () => {
                ajouterAuPanier(product);
            });
        });
    }
    
    /**
     * Affiche les détails d'un produit dans un modal
     * @param {Object} product - Le produit à afficher
     */
    function afficherDetailsProduit(product) {
        const produitDetails = document.getElementById('produit-details');
        
        if (!produitDetails) return;
        
        // Construire le HTML pour les détails du produit
        produitDetails.innerHTML = `
            <div class="product-details-container">
                <div class="product-details-image">
                    <div class="product-image-placeholder" alt="${product.name}">
                        <div class="loading-indicator"></div>
                    </div>
                    <img src="" alt="${product.name}" id="modal-product-img" class="hidden">
                </div>
                <div class="product-details-info">
                    <h3>${product.name}</h3>
                    <p class="product-details-price">${product.price.toFixed(2)} €</p>
                    <div class="product-details-description">
                        <p>${product.description}</p>
                    </div>
                    <div class="product-quantity">
                        <label for="quantity">Quantité:</label>
                        <div class="panier-item-quantity">
                            <button class="quantity-btn" id="decrease-quantity">-</button>
                            <span class="item-quantity" id="quantity">1</span>
                            <button class="quantity-btn" id="increase-quantity">+</button>
                        </div>
                    </div>
                    <button class="btn btn-primary add-to-cart-details" data-id="${product.id}">Ajouter au panier</button>
                </div>
            </div>
        `;
        
        // Afficher le modal
        produitModal.style.display = 'block';
        
        // Convertir l'image HEIC en JPEG
        const modalImg = document.getElementById('modal-product-img');
        convertirHeicVersJpeg(product.image, modalImg);
        
        // Écouteurs pour les boutons de quantité
        const decreaseBtn = document.getElementById('decrease-quantity');
        const increaseBtn = document.getElementById('increase-quantity');
        const quantitySpan = document.getElementById('quantity');
        let quantity = 1;
        
        if (decreaseBtn && increaseBtn && quantitySpan) {
            decreaseBtn.addEventListener('click', () => {
                if (quantity > 1) {
                    quantity--;
                    quantitySpan.textContent = quantity;
                }
            });
            
            increaseBtn.addEventListener('click', () => {
                quantity++;
                quantitySpan.textContent = quantity;
            });
            
            // Écouteur pour le bouton "Ajouter au panier" dans le modal
            const addToCartBtn = produitDetails.querySelector('.add-to-cart-details');
            addToCartBtn.addEventListener('click', () => {
                ajouterAuPanier(product, quantity);
                produitModal.style.display = 'none';
            });
        }
    }
    
    // -------------------------------------------------------------
    // CONVERSION DES IMAGES HEIC
    // -------------------------------------------------------------
    
    /**
     * Convertit une image HEIC en JPEG et met à jour l'élément img
     * @param {string} heicSrc - Nom du fichier HEIC
     * @param {HTMLImageElement} imgElement - Élément img à mettre à jour
     */
    function convertirHeicVersJpeg(heicSrc, imgElement) {
        // Vérifier si l'image est déjà convertie et mise en cache
        const cachedImage = sessionStorage.getItem(heicSrc);
        if (cachedImage) {
            imgElement.src = cachedImage;
            imgElement.classList.remove('hidden');
            const placeholder = imgElement.previousElementSibling;
            if (placeholder && placeholder.classList.contains('product-image-placeholder')) {
                placeholder.style.display = 'none';
            }
            return;
        }
        
        // Chemin complet vers l'image HEIC
        // IMPORTANT: Assurez-vous que tous vos fichiers HEIC sont dans le dossier 'images/'
        const fullPath = 'images/' + heicSrc;
        
        // Récupérer le fichier HEIC
        fetch(fullPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Impossible de charger l'image: ${heicSrc}`);
                }
                return response.arrayBuffer();
            })
            .then(arrayBuffer => {
                // Convertir HEIC en JPEG avec la bibliothèque heic2any
                return heic2any({
                    blob: new Blob([arrayBuffer]),
                    toType: 'image/jpeg',
                    quality: 0.85  // Qualité de l'image (0-1)
                });
            })
            .then(jpegBlob => {
                // Créer une URL pour le blob JPEG
                const jpegUrl = URL.createObjectURL(jpegBlob);
                imgElement.src = jpegUrl;
                imgElement.classList.remove('hidden');
                
                // Cacher le placeholder
                const placeholder = imgElement.previousElementSibling;
                if (placeholder && placeholder.classList.contains('product-image-placeholder')) {
                    placeholder.style.display = 'none';
                }
                
                // Mettre en cache l'image convertie dans sessionStorage
                try {
                    const reader = new FileReader();
                    reader.onloadend = function() {
                        sessionStorage.setItem(heicSrc, reader.result);
                    };
                    reader.readAsDataURL(jpegBlob);
                } catch (e) {
                    console.warn('Impossible de mettre en cache l\'image:', e);
                }
            })
            .catch(error => {
                console.error('Erreur lors de la conversion HEIC vers JPEG:', error);
                // En cas d'erreur, afficher un message d'erreur dans l'élément image
                imgElement.classList.remove('hidden');
                imgElement.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22318%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20318%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_158bd1d28ef%20text%20%7B%20fill%3A%23e83e8c%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A16pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_158bd1d28ef%22%3E%3Crect%20width%3D%22318%22%20height%3D%22180%22%20fill%3D%22%23f8f5f7%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22109%22%20y%3D%2297.5%22%3EImage%20indisponible%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';
                
                // Cacher le placeholder
                const placeholder = imgElement.previousElementSibling;
                if (placeholder && placeholder.classList.contains('product-image-placeholder')) {
                    placeholder.style.display = 'none';
                }
            });
    }
    
    // -------------------------------------------------------------
    // GESTION DU PANIER
    // -------------------------------------------------------------
    
    /**
     * Ajoute un produit au panier
     * @param {Object} product - Le produit à ajouter
     * @param {number} quantity - La quantité à ajouter (par défaut: 1)
     */
    function ajouterAuPanier(product, quantity = 1) {
        // Vérifier si le produit est déjà dans le panier
        const existingItemIndex = panier.findIndex(item => item.id === product.id);
        
        if (existingItemIndex !== -1) {
            // Si le produit existe déjà, augmenter la quantité
            panier[existingItemIndex].quantity += quantity;
        } else {
            // Sinon, ajouter un nouvel élément au panier
            panier.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }
        
        // Mettre à jour l'affichage du panier
        mettreAJourPanier();
        
        // Sauvegarder le panier dans localStorage
        sauvegarderPanier();
        
        // Afficher une notification
        afficherNotification(`${product.name} ajouté au panier !`);
    }
    
    /**
     * Met à jour l'affichage du panier
     */
    function mettreAJourPanier() {
        // Mettre à jour le compteur du panier
        if (panierQuantite) {
            const totalItems = panier.reduce((total, item) => total + item.quantity, 0);
            panierQuantite.textContent = totalItems;
        }
        
        // Mettre à jour le contenu du panier
        if (panierItems) {
            // Si le panier est vide
            if (panier.length === 0) {
                panierItems.innerHTML = '<p class="empty-panier">Votre panier est vide</p>';
                if (panierTotalPrix) panierTotalPrix.textContent = '0,00 €';
                return;
            }
            
            // Vider le contenu actuel
            panierItems.innerHTML = '';
            
            // Calculer le total
            let total = 0;
            
            // Ajouter chaque élément au panier
            panier.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'panier-item';
                
                itemElement.innerHTML = `
                    <div class="panier-item-image">
                        <div class="product-image-placeholder small">
                            <div class="loading-indicator small"></div>
                        </div>
                        <img src="" alt="${item.name}" class="hidden cart-img">
                    </div>
                    <div class="panier-item-info">
                        <p class="panier-item-title">${item.name}</p>
                        <p class="panier-item-price">${item.price.toFixed(2)} €</p>
                    </div>
                    <div class="panier-item-quantity">
                        <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                        <span class="item-quantity">${item.quantity}</span>
                        <button class="quantity-btn increase" data-id="${item.id}">+</button>
                    </div>
                    <button class="remove-item" data-id="${item.id}">×</button>
                `;
                
                panierItems.appendChild(itemElement);
                
                // Convertir l'image HEIC
                const img = itemElement.querySelector('.cart-img');
                convertirHeicVersJpeg(item.image, img);
                
                // Ajouter des écouteurs pour les boutons de quantité
                const decreaseBtn = itemElement.querySelector('.decrease');
                const increaseBtn = itemElement.querySelector('.increase');
                const removeBtn = itemElement.querySelector('.remove-item');
                
                decreaseBtn.addEventListener('click', () => {
                    modifierQuantite(item.id, item.quantity - 1);
                });
                
                increaseBtn.addEventListener('click', () => {
                    modifierQuantite(item.id, item.quantity + 1);
                });
                
                removeBtn.addEventListener('click', () => {
                    supprimerDuPanier(item.id);
                });
                
                // Ajouter au total
                total += item.price * item.quantity;
            });
            
            // Mettre à jour le prix total
            if (panierTotalPrix) {
                panierTotalPrix.textContent = `${total.toFixed(2)} €`;
            }
        }
    }
    
    /**
     * Modifie la quantité d'un produit dans le panier
     * @param {number} id - ID du produit
     * @param {number} newQuantity - Nouvelle quantité
     */
    function modifierQuantite(id, newQuantity) {
        // Trouver l'élément dans le panier
        const itemIndex = panier.findIndex(item => item.id === id);
        
        if (itemIndex !== -1) {
            if (newQuantity <= 0) {
                // Si la quantité est de 0 ou moins, supprimer l'élément
                supprimerDuPanier(id);
            } else {
                // Sinon, mettre à jour la quantité
                panier[itemIndex].quantity = newQuantity;
                // Mettre à jour l'affichage
                mettreAJourPanier();
                // Sauvegarder le panier
                sauvegarderPanier();
            }
        }
    }
    
    /**
     * Supprime un produit du panier
     * @param {number} id - ID du produit à supprimer
     */
    function supprimerDuPanier(id) {
        // Filtrer le panier pour supprimer l'élément
        panier = panier.filter(item => item.id !== id);
        // Mettre à jour l'affichage
        mettreAJourPanier();
        // Sauvegarder le panier
        sauvegarderPanier();
    }
    
    /**
     * Sauvegarde le panier dans localStorage
     */
    function sauvegarderPanier() {
        localStorage.setItem('7nails-panier', JSON.stringify(panier));
    }
    
    // -------------------------------------------------------------
    // UTILITAIRES
    // -------------------------------------------------------------
    
    /**
     * Affiche une notification temporaire
     * @param {string} message - Message à afficher
     * @param {string} type - Type de notification ('success' ou 'error')
     */
    function afficherNotification(message, type = 'success') {
        // Créer l'élément de notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Ajouter au DOM
        document.body.appendChild(notification);
        
        // Afficher la notification avec une animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Supprimer après 3 secondes
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 3000);
    }
    
    // Lancer l'initialisation
    init();
});
