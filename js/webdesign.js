/**
 * webdesign.js
 * works-data.js から categories に 'web-design' を含む作品を抽出し、
 * カード一覧を生成する。
 *
 * カードには「ノートPC型＋スマホ型の合成サムネイル（静止画）」を表示し、
 * クリックすると共通テンプレート（works/web-design/TOP/index.html?id=xxx）へ遷移する。
 * 一覧段階では静止画のみのため、実サイトは読み込まれない
 * （複数作品を並べても重くならず、ポップアップ等も発生しない）。
 * 実サイトのライブプレビュー（PC/SP全画面表示）はTOPページ側で行う。
 */

(function () {
  'use strict';

  function buildWebDesignGrid() {
    const grid = document.getElementById('webdesignGrid');
    if (!grid || typeof WORKS === 'undefined') return;

const items = WORKS.filter(w =>
      w.categories.includes('web-design') &&
      w.previewUrl
    );

    items.forEach(work => {
      const li = document.createElement('li');
      li.className = 'wd-card reveal';

      const subtitle = [work.categoryLabel, work.tags.join(' / ')].filter(Boolean).join(' ・ ');

li.innerHTML = `
        <a href="TOP/index.html?id=${work.id}" class="wd-card__link" aria-label="${work.title}の詳細を見る">
          <div class="wd-card__visual">
            <img src="../../${work.thumbnail}" alt="" loading="lazy" class="wd-card__img" />
          </div>
          <div class="wd-card__body">
            <h3 class="wd-card__title">${work.title}</h3>
            <p class="wd-card__subtitle">${subtitle}</p>
          </div>
        </a>
      `;

      grid.appendChild(li);
    });
  }

  document.addEventListener('DOMContentLoaded', buildWebDesignGrid);
})();
