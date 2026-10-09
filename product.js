const params = new URLSearchParams(window.location.search);
const pathSlug = window.location.pathname.split('/').filter(Boolean).pop();
const slug = params.get('slug') || pathSlug;
const product = window.BIOPEP_PRODUCTS[slug];

if (!product) {
  document.getElementById('product-detail').innerHTML = `<div class="not-found"><p class="eyebrow"><span></span>Biopep Technologies</p><h1>Product not found</h1><p>This product page is not available.</p><a class="button button-dark" href="/#catalog">Return to catalog</a></div>`;
} else {
  document.title = `${product.name} | Biopep Technologies`;
  document.getElementById('meta-description').content = `${product.name}: ${product.description}`;
  document.getElementById('breadcrumb-name').textContent = product.name;
  document.getElementById('product-category').textContent = product.label;
  document.getElementById('product-name').textContent = product.name;
  document.getElementById('product-format').textContent = product.format;
  document.getElementById('product-price').textContent = product.price ? `$${product.price}` : 'Contact for price';
  document.querySelector('.detail-price span').textContent = product.price ? 'USD' : '';
  document.getElementById('product-description').textContent = product.description;
  document.getElementById('overview-text').textContent = product.overview;
  const image = document.getElementById('product-image');
  image.src = product.image;
  image.alt = `${product.name} product image`;
  const priceText = product.price ? ` ($${product.price} USD)` : '';
  const message = `Hello Biopep Technologies, I would like more information about ${product.name}${priceText}.`;
  document.getElementById('product-telegram').href = `https://t.me/+12134373999?text=${encodeURIComponent(message)}`;
  document.querySelectorAll('.direct-telegram').forEach((link) => {
    link.href = `https://t.me/+12134373999?text=${encodeURIComponent(message)}`;
  });
}

document.getElementById('year').textContent = new Date().getFullYear();
