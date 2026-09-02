/**
 * gallery.js
 * アートギャラリーのグリッド生成・フィルター・モーダル制御
 */

(function () {
  'use strict';

  /* ─── グリッド生成 ─── */
  function buildGallery() {
    const grid = document.getElementById('galleryGrid');
    if (!grid || typeof GALLERY_WORKS === 'undefined') return;

    GALLERY_WORKS.forEach((work, index) => {
      const item = document.createElement('li');
      item.className = 'gallery-item reveal';
      item.dataset.tags = work.tags.join(',');
      item.style.transitionDelay = `${index * 40}ms`;

      item.innerHTML = `
        <button class="gallery-item__btn" aria-label="${work.title}を詳しく見る">
          <div class="gallery-item__thumb">
            <img
              src="../../${work.thumbnail}"
              alt="${work.title}"
              width="1200"
              height="900"
              loading="lazy"
            />
            <div class="gallery-item__overlay" aria-hidden="true">
              <span class="gallery-item__tool">${work.tool}</span>
              <span class="gallery-item__view">View</span>
            </div>
          </div>
        </button>
      `;

      item.querySelector('.gallery-item__btn').addEventListener('click', () => openModal(work));
      grid.appendChild(item);
    });
  }

  /* ─── フィルター ─── */
  function buildGalleryFilters() {
    const bar = document.getElementById('galleryFilter');
    if (!bar) return;

    // タグ一覧を自動収集
    const tags = [...new Set(GALLERY_WORKS.flatMap(w => w.tags))];
    const labels = { photoshop: 'Photoshop', illustrator: 'Illustrator' };

    tags.forEach(tag => {
      const btn = document.createElement('button');
      btn.className = 'filter__btn';
      btn.dataset.galleryFilter = tag;
      btn.textContent = labels[tag] || tag;
      btn.setAttribute('aria-pressed', 'false');
      bar.appendChild(btn);
    });

    bar.addEventListener('click', e => {
      const btn = e.target.closest('.filter__btn');
      if (!btn) return;

      const selected = btn.dataset.galleryFilter || 'all';

      bar.querySelectorAll('.filter__btn').forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-pressed', 'true');

      document.querySelectorAll('.gallery-item').forEach(item => {
        const itemTags = item.dataset.tags.split(',');
        const match = selected === 'all' || itemTags.includes(selected);
        item.classList.toggle('is-hidden', !match);
      });
    });
  }

  /* ─── モーダル ─── */
  let currentIndex = 0;

  function openModal(work) {
    const modal = document.getElementById('galleryModal');
    if (!modal) return;

    currentIndex = GALLERY_WORKS.findIndex(w => w.id === work.id);
    renderModal(work);

    modal.classList.add('is-open');
    modal.removeAttribute('aria-hidden');
    document.body.style.overflow = 'hidden';

    // フォーカスを閉じるボタンへ
    setTimeout(() => modal.querySelector('.gallery-modal__close').focus(), 50);
  }

  function closeModal() {
    const modal = document.getElementById('galleryModal');
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function renderModal(work) {
    const modal = document.getElementById('galleryModal');
    modal.querySelector('.gallery-modal__img').src     = '../../' + work.thumbnail;
    modal.querySelector('.gallery-modal__img').alt     = work.title;
    modal.querySelector('.gallery-modal__title').textContent = work.title;
    modal.querySelector('.gallery-modal__tool').textContent  = work.tool;
    modal.querySelector('.gallery-modal__desc').textContent  = work.description;

    // 前後ナビの表示制御
    modal.querySelector('.gallery-modal__prev').disabled = currentIndex <= 0;
    modal.querySelector('.gallery-modal__next').disabled = currentIndex >= GALLERY_WORKS.length - 1;
  }

  function navigate(dir) {
    const next = currentIndex + dir;
    if (next < 0 || next >= GALLERY_WORKS.length) return;
    currentIndex = next;
    renderModal(GALLERY_WORKS[currentIndex]);
  }

  function initModalEvents() {
    const modal = document.getElementById('galleryModal');
    if (!modal) return;

    modal.querySelector('.gallery-modal__close').addEventListener('click', closeModal);
    modal.querySelector('.gallery-modal__prev').addEventListener('click', () => navigate(-1));
    modal.querySelector('.gallery-modal__next').addEventListener('click', () => navigate(1));

    // 背景クリックで閉じる
    modal.addEventListener('click', e => {
      if (e.target === modal) closeModal();
    });

    // キーボード操作
    document.addEventListener('keydown', e => {
      if (!modal.classList.contains('is-open')) return;
      if (e.key === 'Escape')      closeModal();
      if (e.key === 'ArrowLeft')   navigate(-1);
      if (e.key === 'ArrowRight')  navigate(1);
    });
  }

  /* ─── 初期化 ─── */
  function init() {
    buildGallery();
    buildGalleryFilters();
    initModalEvents();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
