/**
 * preview.js
 * URLの ?id= から works-data.js の該当作品を特定して描画。
 *
 * サムネイル（ノートPC型・スマホ型）は常に固定の仮想ビューポート幅で
 * iframeを描画し、CSS transform: scale() で縮小表示する。
 * これにより枠を小さくしてもサイト自身がレスポンシブ化せず、
 * 常に本来のPC/SPレイアウトのまま見える（成果物のコードには一切触れない）。
 *
 * ※ 埋め込み先のサイトに「◯秒後ポップアップ」等のJSがある場合、
 *   サムネイル読み込み中もそのまま動作する点に注意。
 *   気になる場合は該当サイト側に
 *   if (window.top !== window.self) return; を追加すると抑制できる。
 *
 * クリックすると同じ仕組みの全画面モーダルが開き、そのまま操作できる。
 */

(function () {
  'use strict';

  // 仮想ビューポートサイズ
  const PC_W = 1440, PC_H = 900;
  const SP_W = 390,  SP_H = 812;

  function initPreview() {
    if (typeof WORKS === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const work = WORKS.find(w => w.id === id);

    const titleEl    = document.getElementById('previewTitle');
    const descEl     = document.getElementById('previewDesc');
    const categoryEl = document.getElementById('previewCategory');
    const openNewTab = document.getElementById('openNewTab');

    const laptopShell = document.getElementById('deviceLaptop');
    const phoneShell   = document.getElementById('devicePhone');
    const laptopScreen = laptopShell ? laptopShell.querySelector('.laptop-frame__screen') : null;
    const phoneScreen  = phoneShell  ? phoneShell.querySelector('.phone-frame__screen')  : null;
    const laptopWrap    = document.getElementById('laptopScaleWrap');
    const phoneWrap      = document.getElementById('phoneScaleWrap');
    const laptopFrame    = document.getElementById('previewFrameLaptop');
    const phoneFrame      = document.getElementById('previewFrameGeneric');

    const modal      = document.getElementById('deviceModal');
    const modalBody  = document.getElementById('deviceModalBody');
    const modalMode  = document.getElementById('deviceModalMode');
    const modalClose = document.getElementById('deviceModalClose');
    const modalFrame = document.getElementById('previewFrameModal');

    if (!work) {
      if (titleEl) titleEl.textContent = '作品が見つかりませんでした';
      if (descEl)  descEl.textContent  = 'URLをご確認いただくか、Works一覧からお探しください。';
      const row = document.querySelector('.device-row');
      if (row) row.style.display = 'none';
      if (openNewTab) openNewTab.style.display = 'none';
      return;
    }

    titleEl.textContent    = work.title;
    descEl.textContent     = work.description;
    categoryEl.textContent = work.categoryLabel;
    openNewTab.href        = work.previewUrl;
    document.title         = `${work.title} | Hiroshi's Story`;

    if (laptopFrame) laptopFrame.src = work.previewUrl;
    if (phoneFrame)  phoneFrame.src  = work.previewUrl;

    /* ─── サムネイルの縮小スケールを計算 ─── */
    function fitScale(wrap, virtualW, virtualH, container) {
      if (!wrap || !container) return;
      const cw = container.clientWidth;
      const ch = container.clientHeight;
      const scale = Math.min(cw / virtualW, ch / virtualH);
      wrap.style.transform = `scale(${scale})`;
    }

    function updateThumbScales() {
      fitScale(laptopWrap, PC_W, PC_H, laptopScreen);
      fitScale(phoneWrap, SP_W, SP_H, phoneScreen);
    }

    window.addEventListener('resize', updateThumbScales);
    requestAnimationFrame(updateThumbScales);
    setTimeout(updateThumbScales, 300);

    /* ─── 全画面モーダル ─── */
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
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
    });
    window.addEventListener('resize', () => {
      if (modal.classList.contains('is-open')) fitModal(currentMode);
    });
  }

  document.addEventListener('DOMContentLoaded', initPreview);
})();
