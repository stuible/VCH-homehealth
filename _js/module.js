//functions for instantiating Introdunction and individual module pages

// $().ready(function () {   
//     var moduleView = Barba.BaseView.extend({
//         namespace: 'module',
//         onEnter: function () {
//             darkBackground(true);
//             instantiateModule();
//             $(".module-menu").attr("href", baseurl + '/modules/#' + lastmoduleSlide);
//         }
//     });

//     moduleView.init();
// });

// $().ready(function () {   
//     var introduction = Barba.BaseView.extend({
//         namespace: 'introduction',
//         onEnter: function () {
//             instantiateIntro();
//             $(".module-menu").attr("href", baseurl + '/modules/#' + lastmoduleSlide);
//         }
//     });

//     introduction.init();
// });

function instantiateIntro() {

    console.log('instantiating intro');
    showMenu();

    var introSwiper = new Swiper('.intro-swiper-container', {
        direction: 'vertical',
        slideClass: 'intro-swiper-slide',
        setWrapperSize: true,
        // touchReleaseOnEdges: true,
        // mousewheelSensitivity: 0,
        // mousewheelReleaseOnEdges: true,
        // autoHeight: true,
        // height: "300%",
        speed: 700,
        hashNavigation: {
            watchState: true,
        },
        mousewheel: {
            invert: false,
            sensitivity: 1
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
}

function instantiateModule() {

    console.log('instantiating module');
    showMenu();

    var moduleSwiper = new Swiper('.module-swiper-container', {
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