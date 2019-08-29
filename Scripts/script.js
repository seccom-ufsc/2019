$(document).ready(function () {
    $('.beat').viewportChecker({
        classToAdd: 'pulsar',
        offset: 100
    });

    // map setup
    toggleTimerVisibility();
    toggleWorkshopsLayout();
    toggleBrandImageSource();

    // hide navbar on landscape
    if (innerWidth < 768 && innerHeight < innerWidth) {
        $(document).scroll(function () {
            var position = $(window).scrollTop();
            if (position >= 570) {
                $('.navbar-custom').hide('slow');
            }
            if (position < 570) {
                $('.navbar-custom').show('slow');
            }
        });
    }

    // navigation menu click actions
    $('.menu-but').on('click', function (event) {
        event.preventDefault();
        var sectionID = $(this).attr("data-id");
        scrollToID('#' + sectionID, 1000);
        $('.navbar-toggle').removeClass('focused');
    });

    // scroll to top action
    $('.scroll-top').on('click', function (event) {
        event.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 1200);
        if ($('#navbar').hasClass("in")) {
            $('#navbar').removeClass("in");
            $('.navbar-toggle').removeClass('focused');
        }
    });

    // mobile navigation toggle
    $('.navbar-toggle').on('click', function (event) {
        if ($(this).hasClass('focused')) {
            $(this).removeClass('focused');
        }
        else {
            $(this).addClass('focused');
        }
    });
});

if (typeof console === "undefined") {
    console = {
        log: function () { }
    };
}

// scroll to chosen element function
function scrollToID(id, speed) {
    var offSet = 100;
    var targetOffset = $(id).offset().top - offSet;
    var mainNav = $('#navbar-collapse');
    $('html,body').animate({ scrollTop: targetOffset }, speed);
    if (mainNav.hasClass("open")) {
        mainNav.css("height", "1px").removeClass("in").addClass("collapse");
        mainNav.removeClass("open");
    }
}

var JUMBO_HEIGHT = $('.jumbotron').outerHeight();

// parallax effect
function parallax() {
    var scrolled = $(window).scrollTop();
    $('.bg').css('height', (JUMBO_HEIGHT - scrolled) + 'px');
}

$(window).scroll(function (e) {
    parallax();
    var position = $(window).scrollTop();
    if (position > 1400){
        $('.upper').slideDown();
    }
    else{
        $('.upper').slideUp();
    }

    if ($('#navbar').hasClass("in")) {
        $('#navbar').removeClass("in");
        $('.navbar-toggle').removeClass('focused');
    }
});

// css-related actions
function checkHover() {
    $('#ddmenu').removeClass('open');
    $("#ddmenu").hover(function () {
        if (innerWidth > 760) {
            $(this).toggleClass('open');
            document.getElementById('open-menu').removeAttribute('data-toggle');
        }
        else {
            $('#open-menu').attr('data-toggle', 'dropdown');
        }
    });
}
checkHover();

function toggleTimerVisibility() {
    if (innerWidth < 768) {
        $('#timer').hide();
    }
    else {
        $('#timer').show();
    }
}

// hide loader
$(window).load(function () {
    var loader = $('.loader');
    var loadHide = function () {
        loader.fadeOut();
    }
    setTimeout(loadHide, 700);
});

function toggleWorkshopsLayout() {
    if (innerWidth > 768) {
        $('#workshops').show();
        $('#workshops-mobile').hide();
    }
    else {
        $('#workshops').hide();
        $('#workshops-mobile').show();
        if (innerWidth == 768) {
            $('.rowspan').css('height', '205px');
        }
    }
}

function toggleBrandImageSource() {
    if (innerWidth <= 320) {
        $('#brand-image').attr('src', 'Images/new-logo.jpg');
    }
    else {
        $('#brand-image').attr('src', 'Images/new-logo.jpg');
    }
}

$(window).resize(function () {
    checkHover();
    toggleTimerVisibility();
    toggleWorkshopsLayout();
    toggleBrandImageSource();
});


$('#days').countdown('2019/09/30 8:20:00', function (event) {
    $(this).html(event.strftime('%D') + '<br><small style="font-size: 0.6em">dias<small>');
    $('#hours').html(event.strftime('%H ')  + '<br><small style="font-size: 0.6em">horas<small>');
    $('#minutes').html(event.strftime('%M ') + '<br><small style="font-size: 0.6em;">minutos<small>');
});

function showcontent(title, desc, speach, src, company, workshop) {
    var docHeight = $(document).height();
    var scrollTop = $(window).scrollTop();

    $('.overlay-img').attr('src', src);
    $('#credentials').html(title + " - " + company);
    $('#description').html(desc);
    if (workshop !== undefined){
        $('#workshop').html('Workshop: ' + '<strong>' + workshop + '</strong>');
    }
    else{
        $('#workshop').html('');
    }

    if (speach !== undefined) {
        $('#speach').html('Lecture: ' + '<strong>' + speach + '</strong>');
    }
    else {
        $('#speach').html('');
    }

    $('#overlay').show().css({ 'height': docHeight });
    if (innerWidth < 768 && innerHeight < innerWidth) {
        $('.overlay-content').show().css({ 'top': scrollTop - 570 + 'px' });
        $('.overlay-img').hide();
    }
    else {
        $('.overlay-content').show().css({ 'top': scrollTop - 450 + 'px' });
    }
}

function closecontent() {
    $('#overlay').hide();
    $('.overlay-content').hide();
}

$('.speaker-link').click(function (event) {
    event.preventDefault();
    var title = $(this).data('title');
    var desc = $(this).data('desc');
    var speach = $(this).data('speach');
    var src = $(this).data('src');
    var company = $(this).data('company');
    var workshop = $(this).data('work');
    showcontent(title, desc, speach, src, company, workshop);
});

$('.hdoverlay, #overlay').click(function () {
    closecontent();
});
