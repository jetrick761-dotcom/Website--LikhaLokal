const products = [
  { id: 'hiraya', name: 'Hiraya', collection: 'Liraya Collection', price: 899, color: '#d8c4e8', shape: 'tote', tag: 'LIRAYA COLLECTION', description: 'A clean ivory carryall with lilac accents.', image: 'hiraya-crop.png' },
  { id: 'likha', name: 'Likha', collection: 'Liraya Collection', price: 1099, color: '#f1d9dc', shape: 'satchel', tag: 'LIRAYA COLLECTION', description: 'A polished two-tone style from the signature collection.', image: 'likha-crop.png' },
  { id: 'hiyas', name: 'Hiyas', collection: 'Liraya Collection', price: 699, color: '#e9dff0', shape: 'handle', tag: 'LIRAYA COLLECTION', description: 'A structured bag finished with a floral scarf detail.', image: 'hiyas.png' },
  { id: 'lunelle', name: 'Lunelle', collection: 'Mariluna Collection', price: 1499, color: '#c8d2e8', shape: 'crescent', tag: 'MARILUNA COLLECTION', description: 'A playful silhouette in the Mariluna collection.', image: 'lunelle-crop.png' },
  { id: 'mayumi', name: 'Mayumi', collection: 'Mariluna Collection', price: 1499, color: '#e5d7bd', shape: 'satchel', tag: 'MARILUNA COLLECTION', description: 'A softly shaped style with a sweet, easy feel.', image: 'mayumi-crop.png' },
  { id: 'amara', name: 'Amara', collection: 'Hiraya’t Habi Collection', price: 1099, color: '#d6e0cf', shape: 'crescent', tag: 'HIRAYA’T HABI', description: 'A relaxed shoulder bag with contrast panels and tassel detail.', image: 'amara.png' },
  { id: 'mayari', name: 'Mayari', collection: 'Hiraya’t Habi Collection', price: 999, color: '#eccfb4', shape: 'tote', tag: 'HIRAYA’T HABI', description: 'A roomy tote with a patterned scarf accent.', image: 'mayari.png' },
  { id: 'sariyah', name: 'Sariyah', collection: 'Hiraya’t Habi Collection', price: 1199, color: '#e7dce9', shape: 'handle', tag: 'HIRAYA’T HABI', description: 'A structured top-handle bag with a lilac finish.', image: 'sariyah.png' },
  { id: 'aurelia', name: 'Aurelia', collection: 'Sorelle Collection', price: 1199, color: '#d9d4e5', shape: 'mini', tag: 'SORELLE COLLECTION', description: 'A compact crossbody in deep plum and forest green.', image: 'aurelia.png' },
  { id: 'mirelle', name: 'Mirelle', collection: 'Sorelle Collection', price: 1399, color: '#e8d7e8', shape: 'satchel', tag: 'SORELLE COLLECTION', description: 'A chain-strap shoulder bag in plum and forest green.', image: 'mirelle-single.png' },
  { id: 'celestia', name: 'Celestia', collection: 'Sorelle Collection', price: 1199, color: '#d6dfd2', shape: 'handle', tag: 'SORELLE COLLECTION', description: 'A structured plum, ivory, and green bag from Sorelle.', image: 'celestia-crop.png' },
];

const collections = {
  liraya: { title: 'Liraya Collection', description: 'Soft lilac tones, statement prints, and polished everyday shapes.', products: ['hiyas', 'likha', 'hiraya'] },
  mariluna: { title: 'Mariluna Collection', description: 'A thoughtful mix of structured shapes and easy, feminine details.', products: ['mayumi', 'lunelle'] },
  'hiraya-habi': { title: 'Hiraya’t Habi Collection', description: 'Color, texture, and distinctive details come together in this collection.', products: ['sariyah', 'mayari', 'amara'] },
  sorelle: { title: 'Sorelle Collection', description: 'Deep plum, forest green, patterned fabric, and standout carry options.', products: ['aurelia', 'mirelle', 'celestia'] },
};

const app = document.querySelector('#app');
const storageKeys = { cart: 'likha-static-cart', orders: 'likha-static-orders', lastOrder: 'likha-static-last-order' };
const readStorage = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
};
const saveStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const peso = (amount) => `₱${Number(amount).toLocaleString('en-PH', { maximumFractionDigits: 0 })}`;
const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const getCart = () => readStorage(storageKeys.cart, {});
const getOrders = () => readStorage(storageKeys.orders, []);
const cartCount = (cart) => Object.values(cart).reduce((total, qty) => total + Number(qty || 0), 0);
const currentUrl = new URL(window.location.href);
const page = currentUrl.searchParams.get('page') || 'home';
const collectionKey = currentUrl.searchParams.get('name') || '';

function header(active = '') {
  const count = cartCount(getCart());
  const activeLink = (name) => active === name ? 'active' : '';
  return `<div class="announcement">A little joy in every carry <span>✦</span> Meet the Likha Lokal collections</div>
    <header class="site-header"><a class="brand" href="index.html"><img class="brand-logo" src="assets/logo.png" alt="Likha Lokal emblem"><span>Likha Lokal<small>BAG COLLECTION</small></span></a>
      <nav><a class="${activeLink('home')}" href="index.html">Home</a><a class="${activeLink('about')}" href="?page=about">About us</a><a class="${activeLink('shop')}" href="?page=shop#collection">Products</a><a class="${activeLink('benefits')}" href="?page=benefits">Features</a><a class="${activeLink('how')}" href="?page=how">How to order</a><a class="${activeLink('contact')}" href="?page=contact">Contact</a></nav>
      <div class="header-actions"><a class="admin-link" href="?page=admin">Admin</a><a class="cart-link" href="?page=cart">Bag <span class="cart-count">${count}</span></a><button class="menu-toggle" aria-label="Open menu" data-menu-toggle>☰</button></div>
    </header>`;
}

function footer() {
  return `<footer class="footer"><div><a class="brand footer-brand" href="index.html"><img class="brand-logo" src="assets/logo.png" alt=""><span>Likha Lokal<small>BAG COLLECTION</small></span></a><p>Made for your everyday little adventures.</p></div><div class="footer-links"><a href="?page=about">About us</a><a href="?page=shop#collection">Shop bags</a><a href="?page=benefits">Features &amp; benefits</a><a href="?page=how">Ordering guide</a><a href="?page=contact">Contact</a><a href="?page=admin">Admin portal</a></div><small>© 2026 Likha Lokal · Made with care in the Philippines</small></footer>`;
}

function productCard(product, index) {
  return `<article class="product-card"><div class="product-art ${product.shape}" style="--bag:${product.color}"><span class="product-tag">${escapeHtml(product.tag)}</span><img class="bag-photo" src="assets/${escapeHtml(product.image)}" alt="${escapeHtml(product.name)} bag"><span class="quick-view">A little favorite ↗</span></div><div class="product-info"><div><h3>${escapeHtml(product.name)}</h3><p>${escapeHtml(product.collection)}</p></div><b>${peso(product.price)}</b></div><p class="product-desc">${escapeHtml(product.description)}</p><button class="add-button" type="button" data-add="${escapeHtml(product.id)}">Add to bag <span>+</span></button></article>`;
}

function collectionDirectory() {
  return `<section class="collection-directory"><div class="directory-heading"><div class="eyebrow">SHOP BY COLLECTION</div><h2>Four collections, <em>four points of view.</em></h2></div><div class="directory-grid"><a href="?page=collection&name=liraya"><span>LIRAYA</span><b>Hiyas · Likha · Hiraya</b><i>Explore collection →</i></a><a href="?page=collection&name=mariluna"><span>MARILUNA</span><b>Mayumi · Lunelle</b><i>Explore collection →</i></a><a href="?page=collection&name=hiraya-habi"><span>HIRAYA’T HABI</span><b>Sariyah · Mayari · Amara</b><i>Explore collection →</i></a><a href="?page=collection&name=sorelle"><span>SORELLE</span><b>Aurelia · Mirelle · Celestia</b><i>Explore collection →</i></a></div></section>`;
}

function homePage() {
  return `<main><section class="hero"><div class="hero-copy"><div class="eyebrow">CARRY A LITTLE JOY</div><h1>A bag for every<br><em>kind of day.</em></h1><p>Thoughtful shapes, warm details, and everyday pieces made to go wherever life takes you.</p><div class="hero-buttons"><a class="button primary" href="?page=shop#collection">Find your bag <span>↗</span></a><a class="text-link" href="?page=how">See how ordering works <span>→</span></a></div><div class="hero-proof"><div class="avatar-stack"><i>✿</i><i>☼</i><i>♡</i></div><span>Meet the <b>Likha Lokal</b> collections</span></div></div><div class="hero-art"><div class="sunburst"></div><div class="hero-image"><img class="hero-campaign" src="assets/campaign-hero.jpeg" alt="Likha Lokal bags displayed in a warm cream showroom"><div class="float-note">your new<br><b>everyday</b> bag</div></div><div class="hero-stamp"><img src="assets/logo.png" alt="Likha Lokal emblem"></div><div class="hero-caption">THE LIKHA LOKAL COLLECTIONS</div></div></section>
    <section class="trust-strip"><div>✦ <span>Thoughtfully designed</span></div><div>♡ <span>Easy, secure checkout</span></div><div>☼ <span>Delivered to your door</span></div><div>✿ <span>Made for everyday</span></div></section>
    <section class="collection section" id="collection"><div class="section-heading"><div><div class="eyebrow">THE LITTLE THINGS, MADE LOVELY</div><h2>Find your <em>everyday favorite.</em></h2></div><a class="text-link" href="?page=shop#collection">Shop all bags <span>→</span></a></div><div class="product-grid">${products.slice(0, 4).map(productCard).join('')}</div></section>
    <section class="story-band"><div class="story-art"><img class="story-campaign" src="assets/campaign-story.png" alt="Likha Lokal bags from the collection"><div class="story-spark">✦</div></div><div class="story-copy"><div class="eyebrow">A LITTLE STORY ABOUT LIKHA LOKAL</div><h2>Made for the<br><em>beautiful in-between.</em></h2><p>For coffee runs that turn into long lunches. For the market flowers, the last-minute plans, and all the things you carry along the way. Find a piece that feels like you.</p><a class="button light" href="?page=about">Read our story <span>↗</span></a></div></section>
    <section class="section benefit-preview"><div class="section-heading"><div><div class="eyebrow">THE DETAILS YOU’LL LOVE</div><h2>Style that works for <em>your day.</em></h2></div><a class="text-link" href="?page=benefits">Features &amp; benefits <span>→</span></a></div><div class="benefit-cards"><article><span>✧</span><h3>Find your kind of style</h3><p>Four collections bring together soft lilacs, deep plum, patterned accents, and clean color blocking.</p></article><article><span>↗</span><h3>Carry it your way</h3><p>Choose from top-handle, shoulder, crossbody, and roomy tote silhouettes.</p></article><article><span>♡</span><h3>Details that stand out</h3><p>Scarf accents, contrast panels, and patterned finishes give each style its own character.</p></article></div></section>
    <section class="section how-preview"><div class="section-heading"><div><div class="eyebrow">SIMPLE FROM START TO DOORSTEP</div><h2>Shopping made <em>easy.</em></h2></div><a class="text-link" href="?page=how">Full ordering guide <span>→</span></a></div><div class="steps"><div><span class="step-no">01</span><span class="step-icon">⌕</span><h3>Choose your bag</h3><p>Browse the collection and add your favorites to your bag.</p></div><div><span class="step-no">02</span><span class="step-icon">♡</span><h3>Share your details</h3><p>Tell us where to send it and pick COD or e-wallet.</p></div><div><span class="step-no">03</span><span class="step-icon">✦</span><h3>We deliver with care</h3><p>We’ll prepare your order and keep you updated along the way.</p></div></div></section></main>`;
}

function shopPage() {
  return `<main><section class="page-hero"><div class="eyebrow">LIKHA LOKAL · FOUR COLLECTIONS</div><h1>Find your <em>forever favorite.</em></h1><p>Explore the Liraya, Mariluna, Hiraya’t Habi, and Sorelle collections.</p><div class="shop-filters"><a class="selected" href="?page=shop#collection">All bags <b>${products.length}</b></a><a href="?page=collection&name=liraya">Liraya</a><a href="?page=collection&name=mariluna">Mariluna</a><a href="?page=collection&name=hiraya-habi">Hiraya’t Habi</a><a href="?page=collection&name=sorelle">Sorelle</a></div></section>${collectionDirectory()}<section class="section shop-section" id="collection"><div class="shop-top"><span>Showing all <b>${products.length} bags</b></span><span>Four collections, made to carry ✿</span></div><div class="product-grid shop-grid">${products.map(productCard).join('')}</div></section></main>`;
}

function collectionPage() {
  const collection = collections[collectionKey];
  if (!collection) return notFoundPage();
  const items = collection.products.map((id) => products.find((product) => product.id === id)).filter(Boolean);
  return `<main><section class="page-hero collection-hero"><div class="eyebrow">LIKHA LOKAL · COLLECTION</div><h1>${escapeHtml(collection.title)}</h1><p>${escapeHtml(collection.description)}</p><div class="collection-tabs"><a href="?page=collection&name=liraya" class="${collectionKey === 'liraya' ? 'selected' : ''}">Liraya</a><a href="?page=collection&name=mariluna" class="${collectionKey === 'mariluna' ? 'selected' : ''}">Mariluna</a><a href="?page=collection&name=hiraya-habi" class="${collectionKey === 'hiraya-habi' ? 'selected' : ''}">Hiraya’t Habi</a><a href="?page=collection&name=sorelle" class="${collectionKey === 'sorelle' ? 'selected' : ''}">Sorelle</a></div></section><section class="section shop-section collection-products" id="collection"><div class="shop-top"><span>${items.length} styles in this collection</span><a class="text-link" href="?page=shop#collection">← View all bags</a></div><div class="product-grid shop-grid">${items.map(productCard).join('')}</div></section></main>`;
}

function aboutPage() {
  return `<main><section class="editorial-hero">
  <div><div class="eyebrow">OUR BRAND · LIKHA LOKAL</div><h1>Rooted here.<br>
  <em>Made to go with you.</em></h1>
  <p>Likha Lokal is a Filipino student concept for a handmade bag collection—designed for people who want a practical everyday bag with a style of its own.</p>
  <a class="button primary" href="?page=shop#collection">Meet the collections <span>↗</span></a></div><div class="editorial-image">
  <img src="assets/campaign-story.png" alt="Likha Lokal bag collection display"></div></section>
  <section class="section about-story"><div class="eyebrow">A LITTLE BACKGROUND</div>
  <h2>Artistry in Every Thread, <em>Purpose in Every Piece.</em></h2><div class="about-columns">
  <p>At Likha Lokal, we believe that every bag tells a story. Our brand celebrates Filipino creativity and craftsmanship by offering a collection of handmade bags that combine style, practicality, and affordability.</p>
  <p>Our collection is designed for individuals who appreciate unique designs, functional styles, and locally made products. Whether you're going to school, work, traveling, or spending time with friends, Likha Lokal has a bag that complements your style and fits your everyday needs.</p>
  <p>Inspired by the beauty of local artistry, Likha Lokal works with Filipino artisans and makers who bring creativity and dedication into every piece. We aim to provide bags that are not only fashionable accessories but also practical companions for everyday activities.</p></div>
  <a class="text-link" href="?page=contact">Find our contact channels <span>→</span></a></section></main>`;
}

function benefitsPage() {
  return `<main><section class="page-hero"><div class="eyebrow">PRODUCT FEATURES &amp; BENEFITS</div><h1>Small details.<br><em>More ways to be you.</em></h1><p>Each collection has its own look, with bag shapes and finishing details to suit different plans and personal styles.</p></section><section class="section benefits-page"><div class="benefit-feature"><div><div class="eyebrow">01 · FOUR DISTINCT COLLECTIONS</div><h2>A style for <em>every mood.</em></h2><p>Liraya, Mariluna, Hiraya’t Habi, and Sorelle each bring a different mix of color, shape, and patterned accents—so shoppers can find a piece that feels like their own.</p></div><img src="assets/campaign-hero.jpeg" alt="The four Likha Lokal bag collections"></div><div class="benefit-detail-grid"><article><span>↗</span><h3>Carry it your way</h3><p>Choose a top-handle, shoulder, crossbody, or tote silhouette to suit how you like to carry your essentials.</p></article><article><span>✧</span><h3>Finishing touches with character</h3><p>Color-block panels, printed fabrics, chain straps, and scarf accents help each design stand out.</p></article><article><span>♡</span><h3>Made for daily plans</h3><p>Structured shapes and practical carry options work for errands, meetups, and everyday outings.</p></article></div><div class="flow-cta"><div><h2>Found your favorite?</h2><p>Browse all 11 bags and choose the one that feels right.</p></div><a class="button primary" href="?page=shop#collection">Shop the bags <span>↗</span></a></div></section></main>`;
}

function howPage() {
  return `<main><section class="page-hero how-hero"><div class="eyebrow">NO GUESSWORK, JUST GOOD BAGS</div><h1>From your screen<br>to your <em>doorstep.</em></h1><p>Here’s the simple flow, so you know exactly what happens after you find your favorite.</p></section><section class="section how-detail"><div class="flow-step"><span>01</span><div class="flow-icon">⌕</div><div><h2>Choose your bag</h2><p>Browse our collection, pick the pieces you love, and add them to your shopping bag.</p></div></div><div class="flow-step"><span>02</span><div class="flow-icon">♡</div><div><h2>Place your order</h2><p>Enter your full name, contact number, email, and delivery address. Choose cash on delivery or e-wallet.</p></div></div><div class="flow-step"><span>03</span><div class="flow-icon">✿</div><div><h2>We confirm and prepare</h2><p>Your order appears in the order desk on the browser where it was placed. The team can update payment and delivery progress.</p></div></div><div class="flow-step"><span>04</span><div class="flow-icon">⌂</div><div><h2>Follow the journey</h2><p>Order progress moves from processing, to packed, to on the way, and finally delivered.</p></div></div><div class="flow-cta"><div><h2>Ready to meet your new favorite?</h2><p>Find the one that feels like you.</p></div><a class="button primary" href="?page=shop#collection">Shop the bags <span>↗</span></a></div></section></main>`;
}

function contactPage() {
  return `<main><section class="page-hero contact-hero"><div class="eyebrdow">CONTACT LIKHA LOKAL</div>
  <h1>We’d love to <em>hear from you.</em></h1><p>Questions about a bag or an order? Reach the group through our contact channels below.</p></section>
  <section class="section contact-page"><div class="contact-grid"><article><span class="contact-icon">☎</span>
  <div class="eyebrow">CALL OR TEXT</div><h2>Talk to our team</h2>
  <a href="tel:+639123456789">+63 912 345 6789</a></article>
  <article><span class="contact-icon">✉</span><div class="eyebrow">EMAIL</div><h2>Send us a note</h2><a href="mailto:LikhaLocalPH@gmail.com">LikhaLocalPH@gmail.com</a></article></div><div class="social-section"><div><div class="eyebrow">SHOP &amp; FOLLOW</div><h2>Find us on your <em>favorite platform.</em></h2><p>Open a platform and search for “Likha Lokal.” Replace these general links with your shop and profile URLs.</p></div><div class="social-links"><a href="https://www.tiktok.com/" target="_blank" rel="noopener">TikTok Shop <span>↗</span></a><a href="https://www.lazada.com.ph/" target="_blank" rel="noopener">LazMall <span>↗</span></a><a href="https://www.instagram.com/" target="_blank" rel="noopener">Instagram Marketplace <span>↗</span></a></div></div></section></main>`;
}

function cartPage() {
  const cart = getCart();
  const items = Object.entries(cart).map(([id, qty]) => ({ product: products.find((product) => product.id === id), qty: Number(qty) })).filter((item) => item.product && item.qty > 0);
  const total = items.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  const rows = items.map(({ product, qty }) => `<div class="cart-row"><div class="cart-thumb" style="--bag:${product.color}"><img src="assets/${escapeHtml(product.image)}" alt=""></div><div class="cart-product"><h3>${escapeHtml(product.name)}</h3><p>${escapeHtml(product.collection)}</p><label class="qty-control">Qty <input type="number" min="1" max="20" value="${qty}" data-qty="${escapeHtml(product.id)}"></label></div><b>${peso(product.price * qty)}</b><button class="remove" type="button" data-remove="${escapeHtml(product.id)}" aria-label="Remove ${escapeHtml(product.name)}">×</button></div>`).join('');
  return `<main><section class="checkout-page section"><div class="eyebrow">YOUR LITTLE FINDS</div><h1>Your shopping <em>bag.</em></h1>${items.length ? `<div class="checkout-layout"><div class="cart-items"><h2>Your items <span>(${cartCount(cart)})</span></h2>${rows}<a class="text-link continue-link" href="?page=shop#collection">← Keep looking</a></div><div class="checkout-card"><h2>Delivery details</h2><p class="form-intro">Just the essentials so we can get your bag to you.</p><form class="checkout-form" data-checkout><label>Full name<input name="full_name" required autocomplete="name" placeholder="Your name"></label><label>Contact number<input name="phone" required autocomplete="tel" placeholder="09XX XXX XXXX"></label><label>Email address<input type="email" name="email" required autocomplete="email" placeholder="you@example.com"></label><label>Delivery address<textarea name="address" required autocomplete="street-address" placeholder="House no., street, barangay, city, province"></textarea></label><fieldset><legend>How would you like to pay?</legend><label class="payment-choice"><input type="radio" name="payment" value="Cash on delivery" checked><span>Cash on delivery</span><small>Pay when your order arrives</small></label><label class="payment-choice"><input type="radio" name="payment" value="E-wallet"><span>E-wallet</span><small>Payment instructions can be added by your group</small></label></fieldset><div class="order-total"><span>Order total</span><b>${peso(total)}</b></div><button class="button primary full-button">Place my order <span>↗</span></button><small class="secure-note">♡ Demo orders are saved only in this browser.</small></form></div></div>` : `<div class="empty-state"><div class="empty-icon">♡</div><h2>Your bag is waiting for a little joy.</h2><p>Have a look around and find the piece that feels like you.</p><a class="button primary" href="?page=shop#collection">Explore bags <span>↗</span></a></div>`}</section></main>`;
}

function thanksPage() {
  const order = readStorage(storageKeys.lastOrder, null);
  return `<main><section class="thanks-page"><div class="thanks-flower">✿</div><div class="eyebrow">ORDER RECEIVED</div><h1>Thank you, <em>lovely!</em></h1><p>Your demo order <b>#${escapeHtml(order?.id || '—')}</b> is saved in this browser. In a live shop, the group would confirm payment and delivery with you.</p><div class="thanks-track"><span class="done">✓</span><i></i><span>✦</span><i></i><span>⌂</span><div><small>Order received</small><small>Preparing</small><small>On the way</small></div></div><a class="button primary" href="?page=shop#collection">Back to the collection <span>↗</span></a></section></main>`;
}

function adminPage() {
  const orders = getOrders();
  const pending = orders.filter((order) => order.paymentStatus === 'Pending').length;
  const inTransit = orders.filter((order) => order.deliveryStatus === 'On the way').length;
  const delivered = orders.filter((order) => order.deliveryStatus === 'Delivered').length;
  const rows = orders.map((order) => {
    const total = order.items.reduce((sum, item) => sum + item.price * item.qty, 0);
    return `<tr><td><b>#${escapeHtml(order.id)}</b><small>${escapeHtml(order.createdAt)}</small></td><td><b>${escapeHtml(order.fullName)}</b><small>${escapeHtml(order.phone)} · ${escapeHtml(order.email)}</small><small>${escapeHtml(order.address)}</small></td><td>${order.items.map((item) => `<div>${escapeHtml(item.name)} <small>×${item.qty}</small></div>`).join('')}<b class="line-total">${peso(total)}</b></td><td><span class="status ${order.paymentStatus.toLowerCase()}">${escapeHtml(order.paymentStatus)}</span><small>${escapeHtml(order.payment)}</small></td><td><span class="status delivery">${escapeHtml(order.deliveryStatus)}</span></td><td><form class="status-form" data-status-form="${escapeHtml(order.id)}"><select name="paymentStatus"><option ${order.paymentStatus === 'Pending' ? 'selected' : ''}>Pending</option><option ${order.paymentStatus === 'Paid' ? 'selected' : ''}>Paid</option></select><select name="deliveryStatus">${['Processing', 'Packed', 'On the way', 'Delivered'].map((status) => `<option ${order.deliveryStatus === status ? 'selected' : ''}>${status}</option>`).join('')}</select><button>Save update</button></form></td></tr>`;
  }).join('');
  return `<main><section class="admin-page section"><div class="admin-heading"><div><div class="eyebrow">LIKHA TEAM · ORDER DESK</div><h1>Orders, <em>at a glance.</em></h1><p>Track demo payment and delivery progress saved in this browser.</p></div><span class="admin-badge">DEMO ADMIN</span></div><div class="admin-stats"><div><span>All orders</span><b>${orders.length}</b><small>Saved in this browser</small></div><div><span>Awaiting payment</span><b>${pending}</b><small>Needs a check-in</small></div><div><span>On the way</span><b>${inTransit}</b><small>Out for delivery</small></div><div><span>Delivered</span><b>${delivered}</b><small>Happy arrivals</small></div></div><div class="admin-table-wrap"><div class="table-title"><h2>Recent orders</h2><span>${orders.length} total</span></div>${orders.length ? `<table class="orders-table"><thead><tr><th>ORDER</th><th>CUSTOMER</th><th>ITEMS</th><th>PAYMENT</th><th>DELIVERY</th><th>UPDATE STATUS</th></tr></thead><tbody>${rows}</tbody></table>` : `<div class="admin-empty"><span>✿</span><h3>No demo orders yet</h3><p>Orders placed in this browser will appear here.</p><a class="text-link" href="?page=shop#collection">Preview the shop →</a></div>`}</div><p class="admin-footnote">Static demo only: each visitor has a separate order list in their own browser. No orders are sent to the group.</p></section></main>`;
}

function notFoundPage() {
  return `<main><section class="not-found"><div class="thanks-flower">✿</div><h1>That page wandered off.</h1><a class="button primary" href="index.html">Go home</a></section></main>`;
}

const pageRenderers = { home: homePage, shop: shopPage, collection: collectionPage, about: aboutPage, benefits: benefitsPage, contact: contactPage, how: howPage, cart: cartPage, thanks: thanksPage, admin: adminPage };
const activePage = ['collection'].includes(page) ? 'shop' : page;
app.innerHTML = header(activePage) + (pageRenderers[page] || notFoundPage)() + footer();

function showToast(message) {
  let toast = document.querySelector('.site-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'site-toast';
    toast.setAttribute('role', 'status');
    document.body.append(toast);
  }
  toast.textContent = message;
  toast.classList.add('visible');
  window.setTimeout(() => toast.classList.remove('visible'), 1900);
}

function refreshCartCount() {
  const count = cartCount(getCart());
  const badge = document.querySelector('.cart-count');
  if (badge) badge.textContent = count;
}

function addToCart(id) {
  const product = products.find((item) => item.id === id);
  if (!product) return;
  const cart = getCart();
  cart[id] = Math.min(20, Number(cart[id] || 0) + 1);
  saveStorage(storageKeys.cart, cart);
  refreshCartCount();
  showToast(`${product.name} added to your bag`);
}

app.addEventListener('click', (event) => {
  const addButton = event.target.closest('[data-add]');
  if (addButton) addToCart(addButton.dataset.add);

  const removeButton = event.target.closest('[data-remove]');
  if (removeButton) {
    const cart = getCart();
    delete cart[removeButton.dataset.remove];
    saveStorage(storageKeys.cart, cart);
    renderCurrentPage();
  }

  if (event.target.closest('[data-menu-toggle]')) document.body.classList.toggle('menu-open');
});

app.addEventListener('change', (event) => {
  const quantityInput = event.target.closest('[data-qty]');
  if (!quantityInput) return;
  const cart = getCart();
  cart[quantityInput.dataset.qty] = Math.max(1, Math.min(20, Number(quantityInput.value) || 1));
  saveStorage(storageKeys.cart, cart);
  renderCurrentPage();
});

app.addEventListener('submit', (event) => {
  const checkoutForm = event.target.closest('[data-checkout]');
  if (checkoutForm) {
    event.preventDefault();
    const cart = getCart();
    const items = Object.entries(cart).map(([id, qty]) => {
      const product = products.find((item) => item.id === id);
      return product ? { id, name: product.name, price: product.price, qty: Number(qty) } : null;
    }).filter(Boolean);
    if (!items.length) return;
    const form = new FormData(checkoutForm);
    const order = {
      id: String(Date.now()).slice(-7),
      createdAt: new Date().toLocaleString(),
      fullName: form.get('full_name').trim(),
      phone: form.get('phone').trim(),
      email: form.get('email').trim(),
      address: form.get('address').trim(),
      payment: form.get('payment'),
      paymentStatus: 'Pending',
      deliveryStatus: 'Processing',
      items,
    };
    const orders = getOrders();
    orders.unshift(order);
    saveStorage(storageKeys.orders, orders);
    saveStorage(storageKeys.lastOrder, order);
    saveStorage(storageKeys.cart, {});
    window.location.href = '?page=thanks';
  }

  const statusForm = event.target.closest('[data-status-form]');
  if (statusForm) {
    event.preventDefault();
    const orders = getOrders();
    const order = orders.find((item) => item.id === statusForm.dataset.statusForm);
    if (!order) return;
    const form = new FormData(statusForm);
    order.paymentStatus = form.get('paymentStatus');
    order.deliveryStatus = form.get('deliveryStatus');
    saveStorage(storageKeys.orders, orders);
    renderCurrentPage();
    showToast('Order status saved on this browser');
  }
});

function renderCurrentPage() {
  app.innerHTML = header(activePage) + (pageRenderers[page] || notFoundPage)() + footer();
}
