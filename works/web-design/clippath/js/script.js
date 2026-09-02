    $(function(){
        // 変数宣言
        const bgr = $('#burger');
        const nav = $('nav');
        const dt = $('#qaaSec dt');


        // バーガーボタン、ナビメニュー
        bgr.on('click',function(){
            $(this).toggleClass('active');
            nav.toggleClass('drawer');
        });

        $('nav a').on('click',function(){
            bgr.toggleClass('active');
            nav.toggleClass('drawer');
        });


        // アコーディオンパネル
        dt.on('click',function(){
            $(this).next().slideToggle(200);
            dt.not($(this)).next().slideUp(200);

            dt.toggleClass('active');
            dt.not($(this)).removeClass('active');

        });

        // トップに戻るボタン関連
        // $('.topback')を変数にしておくと便利・融通が利く const tob = $('.topback')
        const tob = $('.topback');
        $(window).on('scroll',function(){
            let scl = $(window).scrollTop();
            // トップからスクロールの距離を取得する命令 -> scrollTop()
            // その距離を変数sclに代入
            if(scl > 400){
                tob.fadeIn();
            }else{
                tob.fadeOut();
            }
        });
    });
    // jQuery end