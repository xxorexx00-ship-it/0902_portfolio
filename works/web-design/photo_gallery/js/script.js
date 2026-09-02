$(function(){
    //バーガーボタンと、ナビメニューの連動設定 
    $('.burger').on('click',function(){
        $('.burger').toggleClass('active');
        $('nav').toggleClass('drawer');
    });

    if($('[data-lightbox]').length){
        lightbox.option({
        'resizeDuration': 250,
        'wrapAround': true
        })
    }

    // light box setting
    
});