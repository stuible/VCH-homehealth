//functions for instantiating Introdunction and individual module pages

//Declare swiper variables globally
var introSwiper;
var moduleSwiper;

function instantiateIntro() {

    console.log('instantiating intro');
    showMenu();
    Waypoint.destroyAll();
    darkBackground(true);

    introSwiper = new Swiper('.intro-swiper-container', {
        direction: 'vertical',
        slideClass: 'intro-swiper-slide',
        setWrapperSize: true,
        init: false,
        // touchReleaseOnEdges: true,
        // mousewheelSensitivity: 0,
        // mousewheelReleaseOnEdges: true,
        // autoHeight: true,
        // height: "300%",
        speed: 400,
        hashNavigation: {
            watchState: true,
            replaceState: true,
        },
        mousewheel: {
            invert: false,
            sensitivity: 1
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        on: {
            init: function () {
                $('.intro-swiper-container').addClass('initialized');
            },
        },
    });

    //Update variable with the last slide the user saw on the module page
    introSwiper.on('slideChange', function () {
        lastmoduleSection = $(introSwiper.slides[introSwiper.activeIndex]).data('hash');
        console.log('last module section was: ' + lastmoduleSection);

    });
    introSwiper.on('init', function () {
        introSwiper.update();
    });
    introSwiper.init();
}

function instantiateModule() {

    console.log('instantiating module');
    showMenu();


    moduleSwiper = new Swiper('.module-swiper-container', {
        direction: 'vertical',
        slideClass: 'module-swiper-slide',
        speed: 400,
        init: false,
        mousewheel: {
            invert: false,
        },
        hashNavigation: {
            watchState: true,
            replaceState: true,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        on: {
            init: function () {
                $('.module-swiper-container').addClass('initialized');
            },
        },
    });

    //Update variable with the last slide the user saw on the module page
    moduleSwiper.on('slideChange', function () {
        lastmoduleSection = $(moduleSwiper.slides[moduleSwiper.activeIndex]).data('hash');
        console.log('last module section was: ' + lastmoduleSection);

    });
    moduleSwiper.on('init', function () {
        moduleSwiper.update();
    });
    moduleSwiper.init();
}

function updateMoreOnTopicUI() {
    $('.more-on-topic').each(function () {
        console.log($(this).data('name') + " done: " + getProgress($('.barba-container').data('module'), 'more-on-topic', $(this).data('name')));
        if (getProgress($('.barba-container').data('module'), 'more-on-topic', $(this).data('name'))) {
            $(this).addClass('done');
        }

    });
}