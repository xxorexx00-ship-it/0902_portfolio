/**
 * works-data.js
 * categories に複数指定可能。フィルターはOR検索（どれか1つ含めば表示）。
 *
 * Web Design作品の localReady について：
 *   false（既定） → previewUrl（外部static.jpサイト）を参照
 *   true          → 同名フォルダ内のローカルファイル（../{id}/index.html）を優先参照
 *   実ファイルを works/web-design/{id}/ に配置したら true にするだけで
 *   一覧・詳細ページ両方が自動的にローカル参照に切り替わる。
 */

const WORKS = [
  {
    id: 'loop-learning',
    title: 'Loop Learning',
    categories: ['python', 'ai-tool'],
    categoryLabel: 'Python / AI Tool',
    tags: ['Python', 'AI', 'Notion'],
    description: 'PythonとAIを活用したITスキル学習ドリル。Notionと連携し、学習履歴の管理と出題のパーソナライズを実現。',
    thumbnail: 'images/works/hero-bg02.webp',
    previewUrl: 'loop-learning/index.html',
  },

  {
    id: 'biz-director',
    title: 'BizDirector AI',
    categories: ['ai-tool', 'python'],
    categoryLabel: 'AI Tool / Python',
    tags: ['Python', 'Streamlit', 'Gemini API'],
    description: '業務改善・人材評価・新人教育の3軸でCSVを分析し、AIがアドバイスを出すWebアプリ。キャラクター選択UIやエラーハンドリングも実装済み。',
    thumbnail: 'images/works/biz-director.svg',
    previewUrl: '#',
  },

  {
    id: 'pig-project',
    title: 'pig-project',
    categories: ['ai-tool', 'python'],
    categoryLabel: 'AI Tool / Python',
    tags: ['Python', 'YOLOv8x-seg', 'Flask'],
    description: '一次面接で伺った企業の課題に対し、動作するプロトタイプを制作・検証。二次面接で「すでに仕組みが存在する」と判明した点も含め、コスト削減と浮いた時間の活用に関する思考プロセスを整理。',
    thumbnail: 'pig_project/img/work02.webp',
    previewUrl: 'pig_project/index.html',
  },

  {
    id: 'loop-learning-showcase',
    title: 'Loop Learning 紹介サイト',
    categories: ['web-design'],
    categoryLabel: 'Web Design',
    tags: ['HTML', 'CSS', 'JavaScript'],
    description: `自作のPython学習アプリ「Loop Learning」の製品化・商用展開を想定して制作した製品紹介LPです。

【UX・導線設計のこだわり】
「初心者でも簡単に作れる」というモデルケースをインフレーム（iframe）形式で直接ページ内に流し込みました。ユーザーが余計なクリックやページ遷移を挟まずに、その場で直感的に機能を体験できるよう離脱防止を徹底した設計にしています。

【パフォーマンスの最適化（リファクタリング）】
授業課題の初期実装（JavaScriptによる背景の光のパーティクル制御）では描画負荷が非常に高かったため、不透明度（opacity）などの制御をCSSアニメーションへリファクタリング。ブラウザの描画処理を軽量化し、視覚効果と滑らかなUI体験を両立させました。

【効率的な開発プロセス】
構成案の設計から生成AIを活用したアセット作成、コード調整・最適化までを約3時間で完遂。開発スピードと実装クオリティの両立を意識して制作しました。`,
    thumbnail: 'images/works/Loop_Learning.webp',
    previewUrl: '../../../works/web-design/LoopLearning-showcase/index.html',
    localReady: false,
  },
  {
    id: 'jojo-fansite',
    title: 'ジョジョ名言集ファンサイト',
    categories: ['web-design'],
    categoryLabel: 'Web Design',
    tags: ['HTML', 'CSS', 'JavaScript'],
    description: `職業訓練で学んだHTML/CSS/JavaScriptの実践として、制作時間約3時間で構築した習作Webサイトです。
『ジョジョの奇妙な冒険』を題材に「覚悟と美学」というテーマを設定し、名言とその背景にある生き様を通して作品の世界観を感じられる構成を目指しました。

【デザイン・アクセント】
原作の力強い色彩や雰囲気を活かしつつ、情報の階層を整理。名言部分には縦線やアクセントカラーを設定し、本文とのメリハリをつけています。

【生成AIのビジュアル活用】
デザイン・画像・文章の補助として生成AIを活用。あえてAI特有の描写を残すことで、原作の世界観と調和したこのサイトならではのビジュアル表現として昇華させました。

【JavaScript演出・レスポンシブ】
スクロールに合わせてコンテンツがすっと自然に視界に入るアニメーションを実装。初期設計段階からPC・スマホ両方での快適な閲覧を前提にレスポンシブ対応しています。`,
    thumbnail: 'images/works/jojo.webp',
    previewUrl: '../../../works/web-design/jojo-fansite/index.html',
    localReady: false,
  },

  {
    id: 'grid-layout',
    title: '架空のインテリアサイトページ',
    categories: ['web-design'],
    categoryLabel: 'Web Design',
    tags: ['HTML', 'CSS', 'JavaScript'],
    description: `CSS Gridの実践学習を目的として、架空のインテリアショップを題材に制作したWebサイトです。
Desk・Chair・Lampといった複数の商品を扱うサイト構成にすることで、実際のコンテンツ配置におけるグリッドレイアウトの有効活用を意識しました。

【CSS Gridとデザイン配置】
グリッドレイアウトを駆使し、複数カテゴリの商品群をバランスよく整理。それまでに学んだパララックス表現（視差効果）も組み合わせ、奥行き感のあるUIに仕上げています。

【UIインタラクション（JS / jQuery）】
ハンバーガーメニューによるナビゲーション展開や、スクロール量に応じた「トップへ戻る」ボタンの動的表示を実装。個別に学んだ動的技術を1つのサイトへ統合しました。

【Lightboxによる商品プレビュー】
商品画像にはLightboxライブラリを導入。クリックで画像をモーダル拡大表示できるようにし、EC・商品紹介サイトとして必要な閲覧利便性を確保しています。`,
    thumbnail: 'images/works/grid_layout.webp',
    previewUrl: '../../../works/web-design/grid-layout/index.html',
    localReady: false,
  },
  {
    id: 'music-lessons',
    title: 'Music Lessons',
    categories: ['web-design'],
    categoryLabel: 'Web Design',
    tags: ['HTML', 'CSS', 'JavaScript'],
    description: `キッズ・ファミリー向けミュージックスクールのLP習作です。単なる大人向けの趣味サイトではなく、「子供の習い事・親子の成長」を軸にしたマーケティング心理・導線設計を意識して制作しました。

【心理面を考慮したマーケティング設計】
「子供の才能開花」や「親が挑戦する姿を見せる教育効果」を訴求し、参加動機を「自分のため」から「子供のため」へシフト。家族で通いやすい「親子ペア割引（保護者半額）」を設定し、心理的な購買ハードルを下げる工夫を凝らしました。

【JavaScript・動的演出の実装】
課題要件である「ページ読み込み5秒後のモーダルポップアップ表示（setTimeout）」を実装。アコーディオン形式のQ&Aや、iOS・スマホ環境にも対応した完全固定のCSSパララックス演出を導入しています。`,
    thumbnail: 'images/works/Music_School.webp',
    previewUrl: '../../../works/web-design/music-lessons/index.html',
    localReady: false,
  },
    {
    id: 'clippath',
    title: 'clippath',
    categories: ['web-design'],
    categoryLabel: 'Web Design',
    tags: ['HTML', 'CSS', 'JavaScript'],
    description: `都市開発デベロッパーを想定した架空企業のコーディング課題です。CSSの「clip-path」プロパティを活用した斜めカットのメインビジュアルや、自作のロゴ・ファビコン設置を取り入れて制作しました。

【技術的なポイントとレスポンシブ設計】
PC版では「clip-path」を用いたスタイリッシュな画像切り抜きと、背景固定（position: fixed）によるパララックス風演出を採用し、先進的なブランドイメージを表現。
モバイル環境では表示崩れや可読性の低下を防ぐため、メディアクエリ側で「clip-path: none」や「position: static」を指定してレイアウトを柔軟に最適化させました。

【その他の実装】
・ファビコン／Webクリップアイコン（自作デザイン）の最適化設定
・jQueryを用いたハンバーガーメニューおよびQ&Aアコーディオンの実装`,
    thumbnail: 'images/works/clip_path.webp',
    previewUrl: '../../../works/web-design/clippath/index.html',
    localReady: false,
  },
  {
    id: 'byakkotai',
    title: '白虎隊サイト',
    categories: ['web-design'],
    categoryLabel: 'Web Design',
    tags: ['HTML', 'CSS', 'JavaScript'],
    description: `JavaScript（HTML5 Canvas）を用いた物理アニメーション課題の応用作品です。自身の出身地である福島県会津若松市の「鶴ヶ城・白虎隊の歴史」を題材に、歴史学習・観光紹介を意識したWebサイトを制作しました。

【JavaScriptによる桜吹雪（Canvas）の実装】
・奥行き感のある表現：遠近感を出すため、3段階のレイヤー（scale/alpha/shadow）で描画処理を分離
・自然な物理演算：ベジェ曲線による花弁描画に加え、x/y軸のゆらぎ（swing/flip）、回転（rotate）、表裏の色の変化をリアルタイム計算
・風（Wind/Gust）の動的演出：スクロールに連動する風効果（scrollWind）や、Math.random()とsetTimeoutを用いた不定期な「突風（Gust）」演出を組み込み、自然な舞い散りを表現

【デザイン・UI】
・歴史の荘厳さを伝えるダークネイビーとゴールドを基調とした配色
・タイムライン形式の歴史解説や、CSSグラスモフィズム（backdrop-filter）を活用したモダンなヘッダー・カードデザイン`,
    thumbnail: 'images/works/byakkotai.webp',
    previewUrl: '../../../works/web-design/byakkotai/index.html',
    localReady: false,
  },

{
  id: 'Photo gallery',
  title: '山々四季',
  categories: ['web-design'],
  categoryLabel: 'Web Design',
  tags: ['HTML', 'CSS', 'SVG Animation', 'jQuery'],
  description: `職業訓練の授業において、SVGを使ったテキストアニメーション表現をメインテーマに制作したランディングページです[cite: 1, 2]。
「山々の四季の豊かな表情を切り取る」というコンセプトのもと、写真が引き立つシンプルかつ上品なギャラリーサイトとして構成しました[cite: 2]。

【SVGテキストアニメーション演出】
ファーストビューでは、SVGロゴの輪郭線が描かれていく手書き風アニメーション（stroke-dasharray / stroke-dashoffset）を実装[cite: 1]。描画に合わせて文字の塗り（fill-opacity）が浮き上がる演出を取り入れ、背景の背景画像（.wrap）と連動したローディング演出として仕上げています[cite: 1]。

【レスポンシブ設計・CSS工夫】
CSS Gridを活用した柔軟なギャラリー配置や、aspect-ratio・object-fitによる画像のアスペクト比保持など、モダンなCSS手法を採用[cite: 1, 2]。スマホ表示時にはハンバーガーメニューとドロワーナビゲーションへ滑らかに切り替わるレスポンシブ対応を行っています[cite: 1, 2]。`,
  thumbnail: 'images/works/mu_photogallrery.webp',
  previewUrl: '../../../works/web-design/photo_gallery/index.html',
  localReady: false,
},

{
  id: 'ra-men',
  title: 'らぁ麺 至高の一杯',
  categories: ['web-design'],
  categoryLabel: 'Web Design',
  tags: ['HTML', 'CSS', 'SVG Animation', 'jQuery'],
  description: `【制作コンセプト・デザイン意図】
世界観とブランドの表現

ラーメンが持つ「職人のこだわり」や「重厚感・和の雰囲気」をWeb上で表現するため、単なる画像並びではなく、視覚的にインパクトのあるレイアウトを目指しました。

伝統とモダンさの融合

明朝体や縦書き（writing-mode: vertical-rl）といった和の要素に、現代的でシャープな幾何学レイアウトを掛け合わせることで、洗練されたWebデザインとしてまとめています。

【実装上の工夫と技術的ポイント】
clip-path（polygon）による独自の視覚リズム

CSSの clip-path: polygon() を活用し、各カード（画像や縦書きテキスト）を斜めにカットした平行四辺形のシルエットに統一しました。長方形のグリッドに囚われないスタイリッシュな視覚効果を生み出しています。

統一されたアスペクト比とレスポンシブな構造

aspect-ratio: 3/7 を指定することで、全要素の縦長比率を厳密に保持。写真とテキストボックスが同じサイズ・同じ切り抜きパターンで並ぶよう計算し、画面全体の整列感と美しさを担保しています。

視線誘導を意識したマイクロインタラクション

初期状態では画像の透明度を抑え（opacity: 0.5）、ホバー時にパッと鮮明になる動きをつけることで、ユーザーが自然と写真に目を向けたくなるような心地よいホバー体験を設計しました。

【意識したユーザー体験（UX）】
情報の一貫性と没入感

写真だけでなくテキストブロックも同じシルエットの中に収めることで、コンテンツ同士のノイズを減らし、ブランドの世界観に没入できる構成に仕上げています。`,
  thumbnail: 'images/works/pig_project_thum.webp',
  previewUrl: '../../../works/web-design/clippath2_ra-men/index.html',
  localReady: false,
},

  {
    id: 'art-gallery',
    title: 'Art Gallery',
    categories: ['design'],
    categoryLabel: 'Graphic Design',
    tags: ['Photoshop', 'Illustrator'],
    description: 'PhotoshopおよびIllustratorで制作したグラフィック作品集。',
    thumbnail: 'images/works/biz-director.svg',
    previewUrl: '#gallery',
  },
];

const CATEGORY_LABELS = {
  'web-app':    'Web App',
  'web-design': 'Web Design',
  'python':     'Python',
  'ai-tool':    'AI Tool',
  'design':     'Design',
};
