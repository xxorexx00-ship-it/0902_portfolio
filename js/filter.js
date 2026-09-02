/**
 * filter.js
 * カテゴリOR検索対応版。
 * categories配列のどれか1つがマッチすれば表示。
 */

(function () {
  'use strict';

  function buildFilters() {
    const filterContainer = document.getElementById('filter');
    if (!filterContainer || typeof WORKS === 'undefined') return;

    // 全カテゴリをフラットに収集（重複なし）
    const categories = [...new Set(WORKS.flatMap(w => w.categories))];

    categories.forEach(cat => {
      const label = CATEGORY_LABELS[cat] || cat;
      const btn = document.createElement('button');
      btn.className = 'filter__btn';
      btn.dataset.filter = cat;
      btn.textContent = label;
      btn.setAttribute('aria-pressed', 'false');
      filterContainer.appendChild(btn);
    });
  }

  function buildCards() {
    const grid = document.getElementById('worksGrid');
    if (!grid || typeof WORKS === 'undefined') return;

    WORKS.forEach(work => {
      const li = document.createElement('li');
      li.className = 'work-card reveal';
      // 複数カテゴリをスペース区切りで格納（フィルター用）
      li.dataset.categories = work.categories.join(' ');

      const thumbContent = work.thumbnail
        ? `<img src="${work.thumbnail}" alt="${work.title}のサムネイル" width="640" height="360" loading="lazy" />`
        : `<div class="work-card__thumb-placeholder" aria-hidden="true">No Image</div>`;

      // Preview / Detail / Gallery ボタン
      const hasPreview  = work.previewUrl && work.previewUrl !== '#';
      const isAnchor    = hasPreview && work.previewUrl.startsWith('#');
      const isExternal  = hasPreview && /^https?:\/\//.test(work.previewUrl);
      const isWebDesign = work.categories.includes('web-design');

      let previewBtn;
      if (!hasPreview) {
        previewBtn = `<span class="btn btn--sm btn--disabled" aria-disabled="true">Coming Soon</span>`;
      } else if (isAnchor) {
        previewBtn = `<a href="${work.previewUrl}" class="btn btn--primary btn--sm" aria-label="${work.title}のギャラリーへ">Gallery</a>`;
      } else if (isExternal && isWebDesign) {
        // Web Design作品は PC/SP切り替え可能なプレビューページへ（1回のジャンプで完結）
        previewBtn = `<a href="preview/index.html?id=${work.id}" class="btn btn--primary btn--sm" aria-label="${work.title}のプレビューを見る">Preview</a>`;
      } else if (isExternal) {
        previewBtn = `<a href="${work.previewUrl}" class="btn btn--primary btn--sm" target="_blank" rel="noopener noreferrer" aria-label="${work.title}のプレビュー（新しいタブ）">Preview</a>`;
      } else {
        previewBtn = `<a href="${work.previewUrl}" class="btn btn--primary btn--sm" aria-label="${work.title}の詳細">Detail</a>`;
      }

      li.innerHTML = `
        <div class="work-card__thumb">${thumbContent}</div>
        <div class="work-card__body">
          <p class="work-card__category">${work.categoryLabel}</p>
          <h3 class="work-card__title">${work.title}</h3>
          <ul class="work-card__tags" aria-label="使用技術">
            ${work.tags.map(t => `<li class="work-card__tag">${t}</li>`).join('')}
          </ul>
          <p class="work-card__desc">${work.description}</p>
          <div class="work-card__actions">
            ${previewBtn}
          </div>
        </div>
      `;

      grid.appendChild(li);
    });
  }

  function bindFilterEvents() {
    const filterContainer = document.getElementById('filter');
    const grid = document.getElementById('worksGrid');
    if (!filterContainer || !grid) return;

    filterContainer.addEventListener('click', e => {
      const btn = e.target.closest('.filter__btn');
      if (!btn) return;

      const selected = btn.dataset.filter;

      filterContainer.querySelectorAll('.filter__btn').forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-pressed', 'true');

      grid.querySelectorAll('.work-card').forEach(card => {
        const cats  = card.dataset.categories.split(' ');
        // OR検索：どれか1つ含めばOK
        const match = selected === 'all' || cats.includes(selected);
        card.classList.toggle('is-hidden', !match);
      });
    });
  }

  function init() {
    buildCards();
    buildFilters();
    bindFilterEvents();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
