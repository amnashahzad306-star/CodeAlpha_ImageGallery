const photos = [
  { category: 'nature', seed: 'aurora-ridge', height: 620, caption: 'Aurora light over alpine ridge' },
  { category: 'architecture', seed: 'glass-spiral', height: 700, caption: 'Spiral staircase, glass atrium' },
  { category: 'travel', seed: 'market-lane', height: 600, caption: 'Lantern-lit market lane' },
  { category: 'portrait', seed: 'studio-light', height: 680, caption: 'Studio light, soft shadow' },
  { category: 'nature', seed: 'fern-hollow', height: 760, caption: 'Fern hollow after rainfall' },
  { category: 'architecture', seed: 'concrete-bloc', height: 560, caption: 'Brutalist facade at midday' },
  { category: 'travel', seed: 'coastal-step', height: 720, caption: 'Steps down to the coast' },
  { category: 'portrait', seed: 'street-glance', height: 600, caption: 'A glance, mid-stride' },
  { category: 'nature', seed: 'dune-line', height: 540, caption: 'Wind lines across the dunes' },
  { category: 'architecture', seed: 'arches-row', height: 640, caption: 'Repeating arches, old quarter' },
  { category: 'travel', seed: 'desert-road', height: 540, caption: 'Open road through the desert' },
  { category: 'portrait', seed: 'window-seat', height: 740, caption: 'Window-seat portrait, late light' }
];

const THUMB_WIDTH = 500;
const LIGHTBOX_WIDTH = 1400;
const LIGHTBOX_HEIGHT = 900;

function thumbSrc(photo) {
  return `https://picsum.photos/seed/${photo.seed}/${THUMB_WIDTH}/${photo.height}`;
}

function fullSrc(photo) {
  return `https://picsum.photos/seed/${photo.seed}/${LIGHTBOX_WIDTH}/${LIGHTBOX_HEIGHT}`;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const galleryEl = document.getElementById('gallery');
const filtersEl = document.getElementById('filters');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaptionText = document.getElementById('lightboxCaptionText');
const lightboxCounter = document.getElementById('lightboxCounter');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const lightboxClose = document.getElementById('lightboxClose');

let currentFilter = 'all';
let visibleIndexes = photos.map((_, i) => i);
let activeIndex = 0;

function renderGallery() {
  photos.forEach((photo, index) => {
    const figure = document.createElement('figure');
    figure.className = 'gallery-item';
    figure.dataset.category = photo.category;
    figure.dataset.index = String(index);
    figure.tabIndex = 0;
    figure.setAttribute('role', 'button');
    figure.setAttribute('aria-label', `Open ${photo.caption}`);

    figure.innerHTML = `
      <img src="${thumbSrc(photo)}" alt="${photo.caption}" width="${THUMB_WIDTH}" height="${photo.height}" loading="lazy">
      <span class="zoom-icon" aria-hidden="true">&#10530;</span>
      <figcaption>
        <span class="cap-category">${capitalize(photo.category)}</span>
        <span class="cap-title">${photo.caption}</span>
      </figcaption>
    `;

    figure.addEventListener('click', () => openLightbox(index));
    figure.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(index);
      }
    });

    galleryEl.appendChild(figure);
  });
}

function applyFilter(filter) {
  currentFilter = filter;

  filtersEl.querySelectorAll('.filter').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });

  visibleIndexes = [];
  galleryEl.querySelectorAll('.gallery-item').forEach(item => {
    const index = Number(item.dataset.index);
    const matches = filter === 'all' || photos[index].category === filter;

    if (matches) {
      visibleIndexes.push(index);
      item.style.display = '';
      requestAnimationFrame(() => item.classList.remove('filter-hide'));
    } else {
      item.classList.add('filter-hide');
      setTimeout(() => {
        if (item.classList.contains('filter-hide')) item.style.display = 'none';
      }, 280);
    }
  });
}

filtersEl.addEventListener('click', e => {
  const btn = e.target.closest('.filter');
  if (btn) applyFilter(btn.dataset.filter);
});

function openLightbox(index) {
  activeIndex = index;
  renderLightboxImage();
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function renderLightboxImage() {
  const photo = photos[activeIndex];
  lightboxImage.classList.remove('is-visible');

  const preload = new Image();
  preload.onload = () => {
    lightboxImage.src = preload.src;
    requestAnimationFrame(() => lightboxImage.classList.add('is-visible'));
  };
  preload.src = fullSrc(photo);

  lightboxImage.alt = photo.caption;
  lightboxCaptionText.textContent = photo.caption;

  const position = visibleIndexes.indexOf(activeIndex) + 1;
  lightboxCounter.textContent = `${position} / ${visibleIndexes.length}`;
}

function showRelative(direction) {
  const pos = visibleIndexes.indexOf(activeIndex);
  const nextPos = (pos + direction + visibleIndexes.length) % visibleIndexes.length;
  activeIndex = visibleIndexes[nextPos];
  renderLightboxImage();
}

lightboxPrev.addEventListener('click', () => showRelative(-1));
lightboxNext.addEventListener('click', () => showRelative(1));
lightboxClose.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

window.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('is-open')) return;
  if (e.key === 'Escape') closeLightbox();
  else if (e.key === 'ArrowLeft') showRelative(-1);
  else if (e.key === 'ArrowRight') showRelative(1);
});

renderGallery();
applyFilter('all');
