$(document).ready(function(){
    $('.slider4').bxSlider({
        slideWidth: 212,
        minSlides: 2,
        maxSlides: 4,
        moveSlides: 1,
        slideMargin: 10
    });

    $('.list-regulations-work li:nth-child(4n + 1)').addClass('hide-arrow');

    $('.list-choose-parametr label').on('click', function(){
        var $this = $(this);
            inputCurrent = $(this).find('input:checked');
        if(inputCurrent) {
            $this.parent().siblings().removeClass('active');
            $this.parent().addClass('active');
        }
    });

    $(document).on('click', '.modal-btn', function(){
        $('#small-modal').arcticmodal();
    });

    $('.toogle-form').on('click', function(){
        $('.form-map').toggle('slide');
        if($(this).hasClass('active')) {
            $(this).removeClass('active');
        }
        else {
            $(this).addClass('active');
        }
    });

    if($('.bonus-block-js').length != 0) {
        var posBlockWhyWe = $('.bonus-block-js').offset().top;
        $('.bonus-border').on('click', function () {
            $('html, body').animate({
                scrollTop: posBlockWhyWe + 5
            });
        });
    }

    /*placeholder support for ie8*/
    (function ($) {
        $.support.placeholder = ('placeholder' in document.createElement('input'));
    })(jQuery);


    //fix for IE7 and IE8
    $(function () {
        if (!$.support.placeholder) {
            $("[placeholder]").focus(function () {
                if ($(this).val() == $(this).attr("placeholder")) $(this).val("");
            }).blur(function () {
                if ($(this).val() == "") $(this).val($(this).attr("placeholder"));
            }).blur();

            $("[placeholder]").parents("form").submit(function () {
                $(this).find('[placeholder]').each(function() {
                    if ($(this).val() == $(this).attr("placeholder")) {
                        $(this).val("");
                    }
                });
            });
        }
    });

    $('.list-additional-parametrs input').on('keyup', function(){
        this.value = this.value.replace(/[^\d]/g, '');
    });

    $("body").append('<span class="wrap-form-ajax"></span>');
    $('.wrap-form-ajax').load("form.html #form-ajax");


    $('#btn-result').on('click', function(){
        var inputTypeHouse = $('.list-choose-parametr input:checked'),
            inputTypeHouseLength = inputTypeHouse.length,
            inputHeight = $('#height-house').val(),
            inputWidth = $('#width-house').val(),
            inputLength = $('#length-house').val();

        if(inputTypeHouseLength != 0 && inputHeight != '' && inputWidth != '' && inputLength != '') {
            $('#calculator').slideUp(500, function(){
                $('.square-js').text(inputHeight * inputWidth * inputLength + ' м');
                $('.width-js').text(inputWidth + ' м');
                $('.length-js').text(inputLength + ' м');
                $('.height-js').text(inputHeight + ' м');
                $('.type-construction-js').text(inputTypeHouse.parent().siblings('span').text());

                var coef = [1, 1.3, 1.6],
                    numberTypeConstr = inputTypeHouse.parent().parent().parent().index();


                $('#total-result').text((inputHeight * inputWidth * inputLength * coef[numberTypeConstr]).toFixed(0));

                $('#result-calculator').slideDown(500);
            });
        }
    });
});