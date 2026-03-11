/*
qui mi sono sbizzarrito, se avete sapete/avete voglia di toccare prego
se non sapete cosa fate non toccate nulla 

cmq qui c'è tutto il codice per far funzionare il sito

*/


// Stato     
let currentUser = null;
let activeCategory = 'all';
let cart = [];
let currentlyViewedProduct = null;

// Elementi DOM
const productList = document.getElementById('product-list');
const filterChips = document.querySelectorAll('.filter-chip');
const accountBtn = document.getElementById('account-btn');
const accountModal = document.getElementById('account-modal');
const productModal = document.getElementById('product-modal');
const closeModals = document.querySelectorAll('.close-modal');

const loginBox = document.getElementById('login-box');
const signupBox = document.getElementById('signup-box');
const profileBox = document.getElementById('profile-box');
const toSignup = document.getElementById('to-signup');
const toLogin = document.getElementById('to-login');

const cartBadge = document.querySelector('.badge');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');

// inizializzazione
function init() {
    renderProducts(productsData);
    setupEventListeners();
    setupCart();
}

function renderProducts(items) {
    productList.innerHTML = '';
    items.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-img-wrapper">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="card-meta">
                <p class="category">${product.category}</p>
                <p class="section-tag">${product.section}</p>
            </div>
            <h3>${product.name}</h3>
            <div class="product-footer">
                <p class="price">€${product.price.toFixed(2)}</p>
                <button class="icon-btn add-to-cart-btn"><i data-lucide="plus-circle"></i></button>
            </div>
        `;
        card.onclick = (e) => {
            if (!e.target.closest('.add-to-cart-btn')) {
                openProductDetail(product);
            }
        };
        productList.appendChild(card);
    });
    lucide.createIcons();
}

function setupEventListeners() {
    // filtri categorie
    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            activeCategory = chip.dataset.category;
            applyFilters();
        });
    });

    // account
    accountBtn.onclick = () => {
        accountModal.style.display = 'block';
        updateAccountUI();
    };

    toSignup.onclick = (e) => {
        e.preventDefault();
        loginBox.classList.add('hidden');
        signupBox.classList.remove('hidden');
    };

    toLogin.onclick = (e) => {
        e.preventDefault();
        signupBox.classList.add('hidden');
        loginBox.classList.remove('hidden');
    };

    // login/registrazione
    document.getElementById('btn-login').onclick = () => {
        currentUser = { name: 'Mario Rossi' };
        updateAccountUI();
    };

    document.getElementById('btn-signup').onclick = () => {
        const name = signupBox.querySelector('input[type="text"]').value;
        if (name) {
            currentUser = { name };
            updateAccountUI();
        }
    };

    document.getElementById('logout-btn').onclick = () => {
        currentUser = null;
        updateAccountUI();
    };

    // newsletter
    document.getElementById('newsletter-form').onsubmit = (e) => {
        e.preventDefault();
        alert('Grazie per esserti iscritto alla nostra newsletter!');
        e.target.reset();
    };

    // chiusura modali
    closeModals.forEach(btn => {
        btn.onclick = () => {
            accountModal.style.display = 'none';
            productModal.style.display = 'none';
        };
    });

    window.onclick = (event) => {
        if (event.target == accountModal) accountModal.style.display = 'none';
        if (event.target == productModal) productModal.style.display = 'none';
    };
}

function applyFilters() {
    let filtered = productsData;
    if (activeCategory !== 'all') {
        filtered = filtered.filter(p => p.category === activeCategory);
    }
    renderProducts(filtered);
}

function updateAccountUI() {
    if (currentUser) {
        loginBox.classList.add('hidden');
        signupBox.classList.add('hidden');
        profileBox.classList.remove('hidden');
        document.getElementById('profile-name').innerText = currentUser.name;
    } else {
        profileBox.classList.add('hidden');
        loginBox.classList.remove('hidden');
    }
}

function openProductDetail(product) {
    currentlyViewedProduct = product;
    document.getElementById('modal-img').src = product.image;
    document.getElementById('modal-title').innerText = product.name;
    document.getElementById('modal-price').innerText = `€${product.price.toFixed(2)}`;

    const specsList = document.getElementById('modal-specs');
    specsList.innerHTML = product.specs.map(s => `<li>${s}</li>`).join('');

    const reviewsDiv = document.getElementById('modal-reviews');
    if (product.reviews.length > 0) {
        reviewsDiv.innerHTML = product.reviews.map(r => `
            <div class="review-item">
                <p><strong>${r.user}</strong> - ${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</p>
                <p>${r.comment}</p>
            </div>
        `).join('');
    } else {
        reviewsDiv.innerHTML = '<p class="text-dim">Ancora nessuna recensione.</p>';
    }
    productModal.style.display = 'block';
}

function setupCart() {
    // aggiungi al carrello
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.add-to-cart-btn');
        if (btn) {
            const card = btn.closest('.product-card');
            const name = card.querySelector('h3').innerText;
            const product = productsData.find(p => p.name === name);
            if (product) addToCart(product);
        }
    });

    // aggiungi al carrello da modal
    document.querySelector('.product-info-panel .btn-primary').onclick = () => {
        if (currentlyViewedProduct) {
            addToCart(currentlyViewedProduct);
            productModal.style.display = 'none';
        }
    };
}

function addToCart(product) {
    cart.push(product);
    updateCartUI();

    cartBadge.style.transform = 'scale(1.2)';
    setTimeout(() => cartBadge.style.transform = 'scale(1)', 200);
}

function updateCartUI() {
    cartBadge.innerText = cart.length;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-msg">Il carrello è vuoto</p>';
    } else {
        cartItemsContainer.innerHTML = cart.map((item) => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>€${item.price.toFixed(2)}</p>
                </div>
            </div>
        `).join('');
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotalElement.innerText = `€ ${total.toFixed(2)}`;
}

init();
