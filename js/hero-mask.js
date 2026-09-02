/**
 * hero-mask.js
 * Hero セクション専用：スクロール連動マスク拡大演出
 *
 * 黒幕（.hero__mask-bg）に開けた文字（#maskTextGroup）の穴を
 * スクロールに連動して scale(1) → scale(8) に拡大し、
 * 最後に黒幕自体をフェードアウトさせることで
 * 「文字の穴 → 背景動画全画面」に繋げる。
 *
 * 参照実装のロジック・座標系・イージングを踏襲：
 *   transform: translate(500 500) scale(N) translate(-500 -500)
 *   → SVG座標(500,500)＝マスク文字の中心を固定したまま拡大する。
 *
 * ─── 構造（sticky方式）───
 * #hero（.hero-pin-wrapper）は高さを持つただの箱（CSS側で height を指定）。
 * その中の .hero は position: sticky; top: 0; で画面上部に張り付く。
 * 「今どこまで貼り付いているか」の位置計算・切り替えはブラウザが
 * ネイティブに行うため、GSAP側は pin を使わず、
 * wrapper (#hero) の top〜bottom を scrollTrigger の start/end にして
 * 進捗(0〜1)をタイムラインに反映するだけの役割にしている。
 * → ブラウザの拡大縮小・ウィンドウリサイズが演出の途中で起きても、
 *   固定/解除そのものはブラウザ側の計算なのでズレようがない。
 *
 * prefers-reduced-motion: reduce の場合は
 * sticky固定・拡大アニメーションを一切行わず、
 * 最初から「幕が消えた最終状態」を表示する（視差酔い対策）。
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const heroPinWrapper = document.querySelector('#hero');
    const maskTextGroup = document.querySelector('#maskTextGroup');
    const heroMask = document.querySelector('.hero__mask');
    const heroInner = document.querySelector('#heroInner');

    if (!heroPinWrapper || !maskTextGroup || !heroMask) return;

    /* ─── hero.webp をPC/SP判定で1枚だけSVGに挿入（二重読み込み防止） ─── */
    (function initHeroMaskImage() {
      const svg = heroMask.querySelector('.hero__mask-svg');
      if (!svg) return;

      const SVG_NS = 'http://www.w3.org/2000/svg';
      const XLINK_NS = 'http://www.w3.org/1999/xlink';
      const mq = window.matchMedia('(max-width: 768px)');
      let imgEl = null;

      function render() {
        // SP：cover（帯なし・トリミング許容） / PC：contain（帯あり許容・画質優先）
        const preserveAspectRatio = mq.matches ? 'xMidYMid slice' : 'xMidYMid meet';

        if (!imgEl) {
          imgEl = document.createElementNS(SVG_NS, 'image');
          imgEl.setAttribute('class', 'hero__mask-img');
          imgEl.setAttribute('href', 'images/top/hero.webp');
          imgEl.setAttributeNS(XLINK_NS, 'xlink:href', 'images/top/hero.webp');
          imgEl.setAttribute('x', '0');
          imgEl.setAttribute('y', '0');
          imgEl.setAttribute('width', '1000');
          imgEl.setAttribute('height', '1000');
          imgEl.setAttribute('mask', 'url(#heroMask)');
          svg.appendChild(imgEl);
        }
        imgEl.setAttribute('preserveAspectRatio', preserveAspectRatio);
      }

      render();
      // ブレークポイントをまたぐリサイズ（回転など）に追従
      mq.addEventListener('change', render);
    })();

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // reduced-motion環境：幕を即座に非表示にし、拡大済みの最終状態で固定表示
    if (reducedMotion) {
      heroMask.style.display = 'none';
      return;
    }

    // GSAP / ScrollTrigger が読み込めなかった場合のフォールバック
    // （CDN障害時などでも幕が残って動画を隠したままにならないようにする）
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      heroMask.style.display = 'none';
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    /* ─── 進捗計算まわりのズレ対策（stickyでも念のため保持） ───
       ① スマホでスクロール中にアドレスバーが表示/非表示になるだけで
          発火するresizeイベントを「本当のリサイズ」と誤認しないようにする
       ② Webフォント差し替え・画像読み込み完了後にページ高さが変わりうるため、
          その時点で改めて進捗の基準位置を再計算する
       ※ 固定/解除自体はCSS sticky（ブラウザネイティブ）が担うため、
          ここでのリフレッシュはあくまで「マスク拡大の進み具合」の精度を保つためのもの。
    */
    ScrollTrigger.config({ ignoreMobileResize: true });

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }
    window.addEventListener('load', () => ScrollTrigger.refresh());

    /* ─── 初期状態：マスク文字の中心(500/500)を固定したままscale(1) ─── */
    gsap.set(maskTextGroup, {
      attr: { transform: 'translate(500 500) scale(1) translate(-500 -500)' },
    });

    /* ─── メインタイムライン：#hero（wrapper）が画面を通過する間の進捗を演出に反映 ───
       pin/anticipatePinは使わない（stickyがネイティブに固定を担うため不要）。
       start/endは #hero の高さ（= .hero-pin-wrapper の height。CSS側で調整）そのもの。
    */
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: heroPinWrapper,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        onEnter: () => {
          const video = document.querySelector('.hero__video video');
          if (video) {
            video.muted = true; // 常にミュート固定（ブラウザの自動再生ポリシー対策も兼ねる）
            video.play().catch(() => {}); // 再生失敗時（ポリシー等）は静かに無視
          }
        },
      },
    });

    /* 文字の穴を中心固定のまま拡大 */
    timeline.to(
      maskTextGroup,
      {
        attr: { transform: 'translate(500 500) scale(8) translate(-500 -500)' },
        duration: 1,
        ease: 'none',
      },
      0
    );

    /* 初期状態：スクロール開始前はHeroインナーを隠しておく */
    if (heroInner) {
      gsap.set(heroInner, { opacity: 0, y: 20 });
    }

    /* マスクがある程度開いてきたタイミングでHeroインナーをフェードイン */
    if (heroInner) {
      timeline.to(
        heroInner,
        { opacity: 1, y: 0, duration: 0.25, ease: 'power1.out' },
        0.5 // 開始位置。0〜1の間で好きなタイミングに調整可能
      );
    }

    /* 穴が画面全体に広がった最後の段階で黒幕自体を消し、動画全面に繋げる */
    timeline.to(
      heroMask,
      { opacity: 0, duration: 0.15, ease: 'none' },
      0.84
    );

    /* 全アニメーション完了後、動画をそのまま見せる「余韻」区間 */
    timeline.to({}, { duration: 0.5 }, '>');
  });
})();
