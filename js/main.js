/**
 * main.js — Ver.2
 * - Nav スクロール背景変化
 * - ハンバーガーメニュー
 * - ボトムナビのアクティブセクション追従
 */

(function () {
  'use strict';

  /* ─── Nav scroll ─── */
  function initNavScroll() {
    const nav = document.getElementById('nav');
    if (!nav) return;
    function update() {
      nav.classList.toggle('is-scrolled', window.scrollY > 40);
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ─── Hamburger ─── */
  function initHamburger() {
    const hamburger = document.getElementById('navHamburger');
    const menu      = document.getElementById('navMenu');
    if (!hamburger || !menu) return;

    const open = () => {
      menu.classList.add('is-open');
      hamburger.setAttribute('aria-expanded', 'true');
      hamburger.setAttribute('aria-label', 'メニューを閉じる');
      document.body.style.overflow = 'hidden';
    };
    const close = () => {
      menu.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'メニューを開く');
      document.body.style.overflow = '';
    };

    hamburger.addEventListener('click', () => menu.classList.contains('is-open') ? close() : open());
    menu.querySelectorAll('.nav__link').forEach(l => l.addEventListener('click', close));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') { close(); hamburger.focus(); } });
    menu.addEventListener('click', e => { if (e.target === menu) close(); });
  }

  /* ─── Bottom Nav active ─── */

  /* ─── Back to Top ─── */
  function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    const SHOW_AFTER = 480; // px

    function update() {
      btn.classList.toggle('is-visible', window.scrollY > SHOW_AFTER);
    }

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  document.addEventListener('DOMContentLoaded', () => {
    initNavScroll();
    initHamburger();
    initBackToTop();
  });
})();
