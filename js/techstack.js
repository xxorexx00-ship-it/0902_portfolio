/**
 * techstack.js
 * Tech Stack カルーセル：
 * - 自動で緩やかに横スクロール（マーキー風）
 * - ユーザーがドラッグ・スワイプ・矢印操作すると自動スクロールを一時停止
 * - 一定時間操作がなければ自動スクロールを再開
 */

(function () {
  'use strict';

  function initTechCarousel() {
    const carousel = document.getElementById('techCarousel');
    const prevBtn  = document.getElementById('techPrev');
    const nextBtn  = document.getElementById('techNext');
    if (!carousel || !prevBtn || !nextBtn) return;

    const AUTO_SPEED     = 0.4;  // px / frame（緩やかな速度）
    const RESUME_DELAY   = 2600; // ms：操作後この時間で自動再開

    let autoEnabled = true;
    let resumeTimer  = null;
    let rafId        = null;
    // scrollLeft はブラウザ内部で整数px丸めされるため、
    // 0.4px/frame のような端数加算は別変数で精度を保持する
    let currentScroll = carousel.scrollLeft;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ─── 自動スクロールループ ─── */
    function tick() {
      if (autoEnabled && !reducedMotion) {
        const maxScroll = carousel.scrollWidth - carousel.clientWidth - 1;
        if (currentScroll >= maxScroll) {
          currentScroll = 0;
        } else {
          currentScroll += AUTO_SPEED;
        }
        carousel.scrollLeft = currentScroll;
      } else {
        // 一時停止中は実際のスクロール位置に同期（再開時に飛ばないように）
        currentScroll = carousel.scrollLeft;
      }
      updateArrows();
      rafId = requestAnimationFrame(tick);
    }

    /* ─── 手動操作を検知して一時停止 ─── */
    function pauseAuto() {
      autoEnabled = false;
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => { autoEnabled = true; }, RESUME_DELAY);
    }

    ['pointerdown', 'wheel', 'touchstart'].forEach(evt => {
      carousel.addEventListener(evt, pauseAuto, { passive: true });
    });

    /* ─── 矢印ボタン ─── */
    function cardStep() {
      const card = carousel.querySelector('.tech-card');
      if (!card) return 240;
      const style = getComputedStyle(carousel);
      const gap = parseFloat(style.gap) || 16;
      return card.getBoundingClientRect().width + gap;
    }

    function updateArrows() {
      const maxScroll = carousel.scrollWidth - carousel.clientWidth - 2;
      prevBtn.disabled = carousel.scrollLeft <= 0;
      nextBtn.disabled = carousel.scrollLeft >= maxScroll;
    }

    prevBtn.addEventListener('click', () => {
      pauseAuto();
      carousel.scrollBy({ left: -cardStep(), behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
      pauseAuto();
      carousel.scrollBy({ left: cardStep(), behavior: 'smooth' });
    });

    window.addEventListener('resize', updateArrows);

    if (reducedMotion) {
      // モーション低減設定時は自動スクロールしない
      updateArrows();
    } else {
      rafId = requestAnimationFrame(tick);
    }
  }

  document.addEventListener('DOMContentLoaded', initTechCarousel);
})();
