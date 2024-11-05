class Cart {
    constructor() {
        this.items = [];
        this.total = 0;
        this.init();
    }

    init() {
        // Add event listener for cart sidebar
        const cartSidebar = document.getElementById('cartSidebar');
        if (cartSidebar) {
            cartSidebar.addEventListener('click', (e) => {
                if (e.target.classList.contains('remove-item')) {
                    const productId = parseInt(e.target.dataset.id);
                    this.removeItem(productId);
                }
            });
        }

        // Initialize cart display
        this.updateCartUI();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.updateTotal();
        this.updateCartUI();

        // Show cart sidebar when item is added
        const cartSidebar = document.getElementById('cartSidebar');
        if (cartSidebar) {
            cartSidebar.classList.add('active');
        }
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.updateTotal();
        this.updateCartUI();
    }

    updateTotal() {
        this.total = this.items.reduce((sum, item) => {
            return sum + (item.price * item.quantity);
        }, 0);
    }

    updateCartUI() {
        // Update cart count
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = this.items.reduce((sum, item) => sum + item.quantity, 0);
        }
        
        // Update cart content
        const cartContent = document.getElementById('cartContent');
        if (cartContent) {
            cartContent.innerHTML = this.renderCartItems();
        }
    }

    renderCartItems() {
        if (this.items.length === 0) {
            return '<div class="empty-cart">Your cart is empty</div>';
        }

        return `
            <div class="cart-items">
                ${this.items.map(item => `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}">
                        <div class="cart-item-details">
                            <h4>${item.name}</h4>
                            <p>$${item.price.toFixed(2)} × ${item.quantity}</p>
                        </div>
                        <button class="remove-item" data-id="${item.id}">×</button>
                    </div>
                `).join('')}
            </div>
            <div class="cart-total">
                <h3>Total: $${this.total.toFixed(2)}</h3>
                <button class="button checkout-button">Checkout</button>
            </div>
        `;
    }
}

// Initialize cart after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.cart = new Cart();
}); 