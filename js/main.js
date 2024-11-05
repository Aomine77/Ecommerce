// Main functionality
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    updateAuthUI();
});

function initializeApp() {
    setupEventListeners();
    loadProducts();
}

function updateAuthUI() {
    const authButtons = document.getElementById('authButtons');
    const userMenu = document.getElementById('userMenu');
    
    if (auth.isAuthenticated()) {
        authButtons.classList.add('hidden');
        userMenu.classList.remove('hidden');
    } else {
        authButtons.classList.remove('hidden');
        userMenu.classList.add('hidden');
    }
}

function setupEventListeners() {
    // Cart toggle
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.addEventListener('click', toggleCart);
    }

    // Close cart button
    const closeCartBtn = document.getElementById('closeCart');
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', toggleCart);
    }
    
    // Add to Cart buttons - using event delegation
    const productsGrid = document.getElementById('productsGrid');
    if (productsGrid) {
        productsGrid.addEventListener('click', (e) => {
            const addToCartBtn = e.target.closest('.add-to-cart');
            if (addToCartBtn) {
                e.preventDefault();
                const productCard = addToCartBtn.closest('.product-card');
                const productId = parseInt(productCard.dataset.id);
                const product = products.find(p => p.id === productId);
                if (product) {
                    window.cart.addItem(product);
                }
            }
        });
    }

    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-button');
    filterButtons.forEach(button => {
        button.addEventListener('click', handleFilter);
    });

    // User menu toggle
    const userBtn = document.getElementById('userBtn');
    if (userBtn) {
        userBtn.addEventListener('click', () => {
            document.querySelector('.dropdown-menu').classList.toggle('show');
        });
    }

    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            auth.logout();
            updateAuthUI();
        });
    }
}

function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    if (cartSidebar) {
        cartSidebar.classList.toggle('active');
    }
}

function handleFilter(e) {
    // Remove active class from all buttons
    document.querySelectorAll('.filter-button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to clicked button
    e.target.classList.add('active');
    
    // Filter products logic here
    const filter = e.target.textContent.toLowerCase();
    filterProducts(filter);
} 