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

    /*popup form*/
    $(document).on('click', '.modal-btn', function(){
        $('#small-modal').arcticmodal();
    });

    /*slide form*/
    $('.toogle-form').on('click', function(){
        $('.form-map').toggle('slide');
        if($(this).hasClass('active')) {
            $(this).removeClass('active');
        }
        else {
            $(this).addClass('active');
        }
    });

    /*anchor - bonus*/
    $('.btn-bonus-border-js').on('click', function () {
        var posBlockWhyWe = $('.bonus-block-js').offset().top;
        $('html, body').animate({
            scrollTop: posBlockWhyWe + 5
        }, 500);
    });

    $('.btn-bonus-border-landing-js').on('click', function () {
        var posBlockWhyWe = $('.bonus-block-js').offset().top;
        $('html, body').animate({
            scrollTop: posBlockWhyWe - 79
        }, 500);
    });


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

    /*valid calculator number*/
    $('.list-additional-parametrs input').on('keyup', function(){
        this.value = this.value.replace(/[^\d]/g, '');
    });

    /*ajax form*/
    $("body").append('<span class="wrap-form-ajax"></span>');
    $('.wrap-form-ajax').load("form.html #form-ajax");

    /*calculator*/
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
        else {
            $('.list-additional-parametrs input').each(function(){
                var $this = $(this);
                if($this.val() == '') {
                    $this.parent().addClass('disable');

                    $this.on('keydown', function(){
                        if($this.val() != '') {
                            $this.parent().removeClass('disable');
                        }
                        $this.on('blur', function(){
                            if($this.val() != '') {
                                $this.parent().removeClass('disable');
                            }
                            else {
                                $this.parent().addClass('disable');
                            }
                        });
                    });
                }
            });

            if($('.list-choose-parametr input:checked').length == 0) {
                var tooltip = $('.list-choose-parametr').parent();
                tooltip.addClass('tolltip-choose-papametr');

                $('.list-choose-parametr input').on('click', function() {
                    tooltip.removeClass('tolltip-choose-papametr');
                });
            }
        }
    });

    /*animate for anchors from menu*/
    var arrayAnchorBlock = $('.anchor-elem-js'),
        listLinkAnchor = $('.nav-landing a');

    listLinkAnchor.on('click', function(e){
        e.preventDefault();

        var curClickElement = $(this).parent().index();
        $('html, body').animate({
            scrollTop: arrayAnchorBlock.eq(curClickElement).offset().top - 115
        }, 700);
    });

    /*scroll active link*/
    $(window).on('scroll', function(){
        var curPositionWindow = $(window).scrollTop(),
            curClickElement = $('.nav-landing a');

        var arrayValuesPosAnchorElems = [];

        arrayAnchorBlock.each(function(){
            arrayValuesPosAnchorElems.push($(this).offset().top - 115);
        });

        arrayValuesPosAnchorElems.forEach(function(element, index){
            if(curPositionWindow >= element - 115) {
                curClickElement
                    .parent()
                    .eq(index)
                    .addClass('current-menu-item')
                    .siblings()
                    .removeClass('current-menu-item');
            }
            else if(curPositionWindow < arrayValuesPosAnchorElems[0]) {
                curClickElement.parent().removeClass('current-menu-item');
            }
        });
    });
});