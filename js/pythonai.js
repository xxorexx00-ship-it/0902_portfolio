/**
 * pythonai.js
 * works-data.js から categories に 'python' または 'ai-tool' を含む作品を抽出し、
 * カード一覧を生成する（Web Designは対象外）。
 */

(function () {
  'use strict';

  function buildPythonAiGrid() {
    const grid = document.getElementById('worksGrid');
    if (!grid || typeof WORKS === 'undefined') return;

    const items = WORKS.filter(w =>
      w.categories.includes('python') || w.categories.includes('ai-tool')
    );

    items.forEach(work => {
      const li = document.createElement('li');
      li.className = 'work-card reveal';

      const thumbContent = work.thumbnail
        ? `<img src="../../${work.thumbnail}" alt="${work.title}のサムネイル" width="640" height="360" loading="lazy" />`
        : `<div class="work-card__thumb-placeholder" aria-hidden="true">No Image</div>`;

      const hasPreview = work.previewUrl && work.previewUrl !== '#';
      const isExternal  = hasPreview && /^https?:\/\//.test(work.previewUrl);

      let previewBtn;
      if (!hasPreview) {
        previewBtn = `<span class="btn btn--sm btn--disabled" aria-disabled="true">Coming Soon</span>`;
      } else if (isExternal) {
        previewBtn = `<a href="${work.previewUrl}" class="btn btn--primary btn--sm" target="_blank" rel="noopener noreferrer" aria-label="${work.title}のプレビュー（新しいタブ）">Preview</a>`;
      } else {
        // ルート基準の相対パス（例: loop-learning/index.html）を works/python-ai/ から見た相対パスに補正
        previewBtn = `<a href="../../${work.previewUrl}" class="btn btn--primary btn--sm" target="_blank" rel="noopener noreferrer" aria-label="...">Detail</a>`;
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

  document.addEventListener('DOMContentLoaded', buildPythonAiGrid);
})();
