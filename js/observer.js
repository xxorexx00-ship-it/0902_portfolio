/**
 * observer.js
 * IntersectionObserver でスクロール時のフェードイン制御
 * .reveal クラスを持つ要素をトリガーする
 */

(function () {
  'use strict';

  function initObserver() {
    // prefers-reduced-motion が有効な場合は即時表示
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.reveal').forEach((el) => {
        el.classList.add('is-visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // 一度だけ発火
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    // DOMContentLoaded 後に生成される動的カードも含めて監視
    // filter.js の buildCards() より後に呼ばれるよう main.js で制御
    function observeAll() {
      document.querySelectorAll('.reveal').forEach((el) => {
        // 既に可視エリアにある要素は即時表示
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.95) {
          el.classList.add('is-visible');
        } else {
          observer.observe(el);
        }
      });
    }

    // filter.js の buildCards() 完了後に実行されるよう
    // DOMContentLoaded 内で呼び出す（main.js 経由）
    window.__initObserver = observeAll;
  }

  document.addEventListener('DOMContentLoaded', () => {
    initObserver();
    // カード生成後に再スキャン（filter.js が先に実行されている前提）
    requestAnimationFrame(() => {
      if (typeof window.__initObserver === 'function') {
        window.__initObserver();
      }
    });
  });
})();
