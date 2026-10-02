// Hero showcase: repeat each row's images until they cover the screen, then loop by one set's width.
const SHOWCASE_SPEEDS = [45, 38, 32]; // px per second, per row

function buildShowcase() {
  document.querySelectorAll('.showcase-track').forEach((track, i) => {
    track.querySelectorAll('[data-clone]').forEach(el => el.remove());
    const originals = Array.from(track.children);
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const setWidth = track.scrollWidth + gap;
    if (!setWidth) return;
    const copies = Math.ceil(window.innerWidth / setWidth) + 1;
    for (let c = 0; c < copies; c++) {
      originals.forEach(img => {
        const clone = img.cloneNode();
        clone.dataset.clone = '';
        track.appendChild(clone);
      });
    }
    track.style.setProperty('--shift', `-${setWidth}px`);
    track.style.animationDuration = `${setWidth / SHOWCASE_SPEEDS[i % SHOWCASE_SPEEDS.length]}s`;
  });
}

let showcaseResize;
window.addEventListener('load', buildShowcase);
window.addEventListener('resize', () => {
  clearTimeout(showcaseResize);
  showcaseResize = setTimeout(buildShowcase, 250);
});

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
