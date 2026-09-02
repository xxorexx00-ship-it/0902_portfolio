/**
 * workdetail.js
 * 各作品詳細ページ（works/web-design/<id>/index.html）の共通ロジック。
 * ページ側で `const WORK_ID = '...';` を宣言してから読み込むこと。
 *
 * ノートPC型・スマホ型フレームでライブiframeプレビューを表示。
 * 1作品のみの表示なので負荷は軽く、ここでは問題にならない。
 */

(function () {
  'use strict';

  const PC_W = 1440, PC_H = 900;
  const SP_W = 390,  SP_H = 812;

  function initWorkDetail() {
    if (typeof WORKS === 'undefined' || typeof WORK_ID === 'undefined') return;
    const work = WORKS.find(w => w.id === WORK_ID);
    if (!work) return;

    document.title = `${work.title} | Hiroshi's Story`;

    const titleEl    = document.getElementById('wdTitle');
    const subtitleEl = document.getElementById('wdSubtitle');
    const tagsEl      = document.getElementById('wdTags');
    const openNewTab  = document.getElementById('wdOpenNewTab');

    if (titleEl)    titleEl.textContent = work.title;
    if (subtitleEl) subtitleEl.textContent = work.categoryLabel;
    if (tagsEl)      tagsEl.innerHTML = work.tags.map(t => `<li class="work-card__tag">${t}</li>`).join('');
    if (openNewTab)  openNewTab.href = work.previewUrl;

    const laptopFrame = document.getElementById('wdLaptopFrame');
    const phoneFrame   = document.getElementById('wdPhoneFrame');
    if (laptopFrame) laptopFrame.src = work.previewUrl;
    if (phoneFrame)   phoneFrame.src  = work.previewUrl;

    const laptopWrap    = document.getElementById('wdLaptopWrap');
    const phoneWrap       = document.getElementById('wdPhoneWrap');
    const laptopScreen    = document.querySelector('#wdLaptopShell .laptop-frame__screen');
    const phoneScreen      = document.querySelector('#wdPhoneShell .phone-frame__screen');

    function fitScale(wrap, vw, vh, container) {
      if (!wrap || !container) return;
      const scale = Math.min(container.clientWidth / vw, container.clientHeight / vh);
      wrap.style.transform = `scale(${scale})`;
    }

    function updateScales() {
      fitScale(laptopWrap, PC_W, PC_H, laptopScreen);
      fitScale(phoneWrap, SP_W, SP_H, phoneScreen);
    }

    window.addEventListener('resize', updateScales);
    requestAnimationFrame(updateScales);
    setTimeout(updateScales, 300);

    /* ─── 全画面モーダル ─── */
    const modal      = document.getElementById('deviceModal');
    const modalBody  = document.getElementById('deviceModalBody');
    const modalMode  = document.getElementById('deviceModalMode');
    const modalClose = document.getElementById('deviceModalClose');
    const modalFrame = document.getElementById('previewFrameModal');
    const laptopShell = document.getElementById('wdLaptopShell');
    const phoneShell   = document.getElementById('wdPhoneShell');

    let currentMode = 'pc';

    function openModal(mode) {
      currentMode = mode;
      modal.classList.add('is-open');
      modal.removeAttribute('aria-hidden');
      document.body.style.overflow = 'hidden';
      modalMode.textContent = mode === 'pc' ? 'PC' : 'SP';
      modalFrame.src = work.previewUrl;
      requestAnimationFrame(() => fitModal(mode));
    }

    function closeModal() {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      modalFrame.src = 'about:blank';
    }

    function fitModal(mode) {
      const virtualW = mode === 'pc' ? PC_W : SP_W;
      const virtualH = mode === 'pc' ? PC_H : SP_H;
      const cw = modalBody.clientWidth;
      const ch = modalBody.clientHeight;
      const scale = mode === 'pc'
        ? Math.min(cw / virtualW, ch / virtualH)
        : Math.min(cw / virtualW, ch / virtualH, 1);

      modalFrame.style.width  = `${virtualW}px`;
      modalFrame.style.height = `${virtualH}px`;
      modalFrame.style.transform = `scale(${scale})`;
      modalFrame.style.transformOrigin = 'center center';
      modalFrame.classList.toggle('is-sp', mode === 'sp');
    }

    if (laptopShell) laptopShell.addEventListener('click', () => openModal('pc'));
    if (phoneShell)  phoneShell.addEventListener('click', () => openModal('sp'));
    if (modalClose)  modalClose.addEventListener('click', closeModal);
    if (modal) {
      modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    }
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && modal && modal.classList.contains('is-open')) closeModal();
    });
    window.addEventListener('resize', () => {
      if (modal && modal.classList.contains('is-open')) fitModal(currentMode);
    });
  }

  document.addEventListener('DOMContentLoaded', initWorkDetail);
})();
