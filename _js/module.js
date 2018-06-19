//functions for instantiating Introdunction and individual module pages

function instantiateIntro() {

    var introSwiper = new Swiper('.intro-swiper-container', {
        direction: 'vertical',
        slideClass: 'intro-swiper-slide',
        hashNavigation: {
            watchState: true,
        },
        mousewheel: {
            invert: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
}

function instantiateModule() {

    var introSwiper = new Swiper('.module-swiper-container', {
        direction: 'vertical',
        slideClass: 'module-swiper-slide',
        mousewheel: {
            invert: false,
        },
        hashNavigation: {
            watchState: true,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
}