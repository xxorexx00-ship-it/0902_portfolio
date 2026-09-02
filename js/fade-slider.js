/**
 * fade-slider.js
 * data-fade-slider 属性を持つ要素の中にある画像
 * （.hero__bg-img または .content-split__media-img）を、
 * 一定間隔でフェードイン/フェードアウト（クロスフェード）で切り替える。
 *
 * 対象：
 *   - トップページ Hero (.hero__bg)
 *   - hobby ページ 各エピソードの写真 (.content-split__media)
 *
 * 画像を増やしたい場合は対象要素の中に
 *   <img src="..." alt="" class="hero__bg-img" />
 * または
 *   <img src="..." alt="" class="content-split__media-img" />
 * をコピーして追加するだけでよい（このJSは枚数を自動検出する）。
 *
 * prefers-reduced-motion が有効な環境では自動切り替えを行わず、
 * 最初の1枚（is-active が付いている画像）を表示したままにする。
 */

(function () {
  'use strict';

  const INTERVAL_MS = 5000; // 切り替え間隔（お好みで調整可）
  const SLIDE_SELECTOR = '.hero__bg-img, .content-split__media-img';

  function initSlider(container) {
    const slides = Array.from(container.querySelectorAll(SLIDE_SELECTOR));
    if (slides.length <= 1) return; // 画像が1枚以下なら何もしない

    let current = slides.findIndex(img => img.classList.contains('is-active'));
    if (current === -1) {
      current = 0;
      slides[0].classList.add('is-active');
    }

    setInterval(() => {
      const next = (current + 1) % slides.length;
      slides[current].classList.remove('is-active');
      slides[next].classList.add('is-active');
      current = next;
    }, INTERVAL_MS);
  }

  function initAllSliders() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    document.querySelectorAll('[data-fade-slider]').forEach(initSlider);

    // data-fade-slider 属性が付いていない .hero__bg にも後方互換で対応
    const heroBg = document.querySelector('.hero__bg:not([data-fade-slider])');
    if (heroBg) initSlider(heroBg);
  }

  document.addEventListener('DOMContentLoaded', initAllSliders);
})();
