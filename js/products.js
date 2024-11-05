// Sample product data
const products = [
    {
        id: 1,
        name: "Minimal Black T-Shirt",
        price: 29.99,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
        category: "new"
    },
    {
        id: 2,
        name: "White Sneakers",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500",
        category: "popular"
    },
    {
        id: 3,
        name: "Minimal Watch",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500",
        category: "new"
    },
    {
        id: 4,
        name: "Leather Backpack",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1548546738-8509cb246ed3?w=500",
        category: "popular"
    },
    {
        id: 5,
        name: "Denim Jacket",
        price: 69.99,
        image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500",
        category: "sale"
    },
    {
        id: 6,
        name: "Classic Sunglasses",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500",
        category: "new"
    },
    {
        id: 7,
        name: "Running Shoes",
        price: 119.99,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
        category: "popular"
    },
    {
        id: 8,
        name: "Minimal Wallet",
        price: 39.99,
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500",
        category: "sale"
    }
];

function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = products.map(product => createProductCard(product)).join('');
}

function createProductCard(product) {
    return `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="quick-actions">
                    <button class="button add-to-cart">Add to Cart</button>
                    <button class="button quick-view">Quick View</button>
                </div>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="price">$${product.price}</p>
            </div>
        </div>
    `;
}

function filterProducts(filter) {
    const filteredProducts = filter === 'all' 
        ? products 
        : products.filter(product => product.category === filter);
    
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
} 