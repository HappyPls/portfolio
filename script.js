const tiles = Array.from(document.querySelectorAll('.tile'));
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbCaption = document.getElementById('lb-caption');
const lbClose = document.getElementById('lb-close');
const lbPrev = document.getElementById('lb-prev');
const lbNext = document.getElementById('lb-next');

let current = 0;

function openLightbox(index) {
  current = index;
  const tile = tiles[current];
  const img = tile.querySelector('.tile-img');
  lbImg.src = img.src;
  lbImg.alt = img.alt;
  const projectTitle = tile.closest('.project')?.querySelector('.project-header h3')?.textContent;
  const caption = tile.querySelector('.tile-caption').textContent;
  lbCaption.textContent = projectTitle ? `${projectTitle} — ${caption}` : caption;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
}

function showRelative(offset) {
  current = (current + offset + tiles.length) % tiles.length;
  openLightbox(current);
}

tiles.forEach((tile, i) => {
  tile.addEventListener('click', () => openLightbox(i));
});

lbClose.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', () => showRelative(-1));
lbNext.addEventListener('click', () => showRelative(1));

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') showRelative(-1);
  if (e.key === 'ArrowRight') showRelative(1);
});
