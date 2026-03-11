<!DOCTYPE html>
<html lang="it">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mxRider Shop | Minimal Performance Gear</title>
    <link rel="stylesheet" href="styles.css">

    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
</head>

<body>
    <nav class="navbar">
        <div class="container nav-content">
            <div class="logo">mxRIDER<span>SHOP</span></div>
            <div class="nav-links">
                <a href="#shop">Shop</a>
                <a href="#garage">Il Mio Garage</a>
                <a href="#support">Assistenza</a>
            </div>
            <div class="nav-actions">
                <div class="search-bar">
                    <i data-lucide="search"></i>
                    <input type="text" placeholder="Cerca prodotto...">
                </div>
                <button id="account-btn" class="icon-btn"><i data-lucide="user"></i></button>
                <div class="cart-container">
                    <div id="cart-trigger" class="cart-btn icon-btn">
                        <i data-lucide="shopping-bag"></i>
                        <span class="badge">0</span>
                    </div>
                    <div id="cart-dropdown" class="cart-dropdown glass">
                        <h3>Il Tuo Carrello</h3>
                        <div id="cart-items" class="cart-items">
                            <p class="empty-msg">Il carrello è vuoto</p>
                        </div>
                        <div class="cart-footer">
                            <div class="total-row">
                                <span>Totale:</span>
                                <span id="cart-total">€ 0.00</span>
                            </div>
                            <button class="btn-primary checkout-btn">CHECKOUT</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>

    <header class="hero">
        <div class="hero-bg"><img src="assets/hero.png" alt="Hero Bike"></div>
        <div class="container hero-content">
            <h1>DOMINA LA STRADA</h1>
            <p>Componenti e gear d'élite per veri rider.</p>
            <a href="#shop" class="btn-primary">SCOPRI LA COLLEZIONE</a>
        </div>
    </header>

    <section id="shop" class="container shop-section">
        <div class="section-header">
            <h2>I NOSTRI PRODOTTI</h2>
            <div class="filters">
                <button class="filter-chip active" data-category="all">Tutti</button>
                <button class="filter-chip" data-category="helmets">Caschi</button>
                <button class="filter-chip" data-category="gear">Abbigliamento</button>
                <button class="filter-chip" data-category="parts">Ricambi</button>
            </div>
        </div>
        <div class="product-grid" id="product-list">
            <!-- Products injected by JS -->
        </div>
    </section>

    <section class="newsletter-section">
        <div class="container newsletter-content">
            <div class="newsletter-text">
                <h2>Rimani aggiornato</h2>
                <p>Iscriviti per ricevere offerte esclusive e novità dal mondo mxRider.</p>
            </div>
            <form id="newsletter-form" class="newsletter-form">
                <input type="email" placeholder="Il tuo indirizzo email" required>
                <button type="submit" class="btn-primary">ISCRIVITI</button>
            </form>
        </div>
    </section>

    <footer id="support">
        <div class="container footer-grid">
            <div class="footer-info">
                <div class="logo">mxRIDER</div>
                <p>La tua destinazione per il motocross di alta qualità.</p>
            </div>
            <ul class="footer-links">
                <li>
                    <h4>Shop</h4>
                </li>
                <li><a href="#">Nuovi Arrivi</a></li>
                <li><a href="#">Bestseller</a></li>
                <li><a href="#">Offerte</a></li>
            </ul>
            <ul class="footer-links">
                <li>
                    <h4>Assistenza</h4>
                </li>
                <li><a href="#">Contattaci</a></li>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Spedizioni</a></li>
            </ul>
            <div class="footer-social">
                <h4>Social</h4>
                <div class="social-icons">
                    <i data-lucide="instagram"></i>
                    <i data-lucide="facebook"></i>
                    <i data-lucide="twitter"></i>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2024 mxRider Shop. Tutti i diritti riservati.</p>
        </div>
    </footer>

    <!-- Modals -->
    <div id="account-modal" class="modal">
        <div class="modal-content glass">
            <span class="close-modal">&times;</span>
            <div class="auth-box" id="login-box">
                <h2>Bentornato Rider</h2>
                <input type="email" placeholder="Email">
                <input type="password" placeholder="Password">
                <button class="btn-primary" id="btn-login">ACCEDI</button>
                <p>Non hai un account? <a href="#" id="to-signup">Registrati</a></p>
            </div>
            <div class="auth-box hidden" id="signup-box">
                <h2>Unisciti al Team</h2>
                <input type="text" placeholder="Nome">
                <input type="email" placeholder="Email">
                <button class="btn-primary" id="btn-signup">REGISTRATI</button>
                <p>Hai già un account? <a href="#" id="to-login">Accedi</a></p>
            </div>
            <div class="auth-box hidden" id="profile-box">
                <h2>Il Tuo Profilo</h2>
                <div class="profile-details">
                    <p><strong>Nome:</strong> <span id="profile-name"></span></p>
                </div>
                <button class="btn-secondary" id="logout-btn">LOGOUT</button>
            </div>
        </div>
    </div>

    <div id="product-modal" class="modal">
        <div class="modal-content glass product-detail-content">
            <span class="close-modal">&times;</span>
            <div class="product-detail-grid">
                <div class="product-image-large">
                    <img id="modal-img" src="" alt="">
                </div>
                <div class="product-info-panel">
                    <h2 id="modal-title"></h2>
                    <p class="price" id="modal-price"></p>
                    <div class="specs">
                        <h4>Specifiche Tecniche</h4>
                        <ul id="modal-specs"></ul>
                    </div>
                    <div class="reviews">
                        <h4>Recensioni</h4>
                        <div id="modal-reviews"></div>
                    </div>
                    <button class="btn-primary">AGGIUNGI AL CARRELLO</button>
                </div>
            </div>
        </div>
    </div>

    <script src="products.js"></script>
    <script src="script.js"></script>
    <script>
        lucide.createIcons();
    </script>
</body>

</html>