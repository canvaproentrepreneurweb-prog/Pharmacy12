const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelectorAll('.main-nav a');

const productGrid = document.querySelector('.product-grid');
if (productGrid && window.BIOPEP_PRODUCTS) {
  productGrid.innerHTML = Object.values(window.BIOPEP_PRODUCTS).map((product) => `
    <article class="product-card" data-category="${product.category}">
      <a class="product-image" href="products/${product.slug}">
        <span class="tag">${product.label}</span>
        <img src="${product.image}" alt="${product.name}" loading="lazy">
      </a>
      <div class="product-info">
        <p class="product-type">${product.label}</p>
        <h3><a href="products/${product.slug}">${product.name}</a></h3>
        <p>${product.format}</p>
        <a class="product-action product-price-link" href="products/${product.slug}">${product.price ? `<strong>$${product.price}</strong><small>USD</small>` : `<strong>Contact for price</strong>`}<span>→</span></a>
      </div>
    </article>`).join('');
}

// Use one reusable product template. This works both from disk and on Vercel.
document.querySelectorAll('a[href^="products/"]').forEach((link) => {
  const slug = link.getAttribute('href').replace('products/', '');
  link.setAttribute('href', `product.html?slug=${encodeURIComponent(slug)}`);
});

menuButton?.addEventListener('click', () => {
  const open = document.body.classList.toggle('menu-open');
  menuButton.setAttribute('aria-expanded', String(open));
});

navLinks.forEach((link) => link.addEventListener('click', () => {
  document.body.classList.remove('menu-open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('.filter').forEach((button) => {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    document.querySelectorAll('.filter').forEach((item) => item.classList.toggle('active', item === button));
    document.querySelectorAll('.product-card').forEach((card) => {
      card.classList.toggle('hidden', selected !== 'all' && card.dataset.category !== selected);
    });
  });
});

document.querySelectorAll('.telegram-link').forEach((link) => {
  const product = link.dataset.product;
  const message = product
    ? `Hello Biopep Technologies, I would like more information about ${product}.`
    : link.dataset.message;

  if (message) {
    link.href = `https://t.me/+12134373999?text=${encodeURIComponent(message)}`;
  }
});

document.getElementById('year').textContent = new Date().getFullYear();
