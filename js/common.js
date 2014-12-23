$(document).ready(function(){
    $('.slider4').bxSlider({
        slideWidth: 212,
        minSlides: 2,
        maxSlides: 4,
        moveSlides: 1,
        slideMargin: 10
    });

    $('.list-regulations-work li:nth-child(4n + 1)').addClass('hide-arrow');
});