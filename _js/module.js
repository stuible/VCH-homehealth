//functions for instantiating Introdunction and individual module pages

//Declare swiper variables globally
var introSwiper;
var moduleSwiper;

function instantiateIntro() {

    console.log('instantiating intro');
    showMenu();
    darkBackground(true);

    introSwiper = new Swiper('.intro-swiper-container', {
        direction: 'vertical',
        slideClass: 'intro-swiper-slide',
        setWrapperSize: true,
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
                $('.module-swiper-container').addClass('initialized');
            },
          },
    });
}

function instantiateModule() {

    console.log('instantiating module');
    showMenu();


    moduleSwiper = new Swiper('.module-swiper-container', {
        direction: 'vertical',
        slideClass: 'module-swiper-slide',
        speed: 400,
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
}

function updateMoreOnTopicUI(){
    $('.more-on-topic').each(function(){
        console.log($(this).data('name') + " done: " + getProgress($('.barba-container').data('module'), 'more-on-topic', $(this).data('name')));
        if(getProgress($('.barba-container').data('module'), 'more-on-topic', $(this).data('name'))){
            $(this).children('.narrative-name').css('background-color', "blue");
        }
        
    });
}


// $().ready(function() {
//     // Init
//     var container = $('.narrative'),
//         inner = $('.narrative>img');
  
//     // Mouse
//     var mouse = {
//       _x: 0,
//       _y: 0,
//       x: 0,
//       y: 0,
//       updatePosition: function(event) {
//         var e = event || window.event;
//         this.x = e.clientX - this._x;
//         this.y = (e.clientY - this._y) * -1;
//       },
//       setOrigin: function(e) {
//         this._x = e.offsetLeft + Math.floor(e.offsetWidth / 2);
//         this._y = e.offsetTop + Math.floor(e.offsetHeight / 2);
//       },
//       show: function() {
//         return "(" + this.x + ", " + this.y + ")";
//       }
//     };
  
//     // Track the mouse position relative to the center of the container.
//     mouse.setOrigin(container);
  
//     //----------------------------------------------------
  
//     var counter = 0;
//     var refreshRate = 10;
//     var isTimeToUpdate = function() {
//       return counter++ % refreshRate === 0;
//     };
  
//     //----------------------------------------------------
  
//     var onMouseEnterHandler = function(event) {
//       update(event);
//     };
  
//     var onMouseLeaveHandler = function() {
//       inner.style = "";
//     };
  
//     var onMouseMoveHandler = function(event) {
//       if (isTimeToUpdate()) {
//         update(event);
//       }
//     };
  
//     //----------------------------------------------------
  
//     var update = function(event) {
//       mouse.updatePosition(event);
//       updateTransformStyle(
//         (mouse.y / inner.offsetHeight / 2).toFixed(2),
//         (mouse.x / inner.offsetWidth / 2).toFixed(2)
//       );
//     };
  
//     var updateTransformStyle = function(x, y) {
//       var style = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
//       inner.style.transform = style;
//       inner.style.webkitTransform = style;
//       inner.style.mozTranform = style;
//       inner.style.msTransform = style;
//       inner.style.oTransform = style;
//     };
  
//     //--------------------------------------------------------
  
//     container.onmousemove = onMouseMoveHandler;
//     container.onmouseleave = onMouseLeaveHandler;
//     container.onmouseenter = onMouseEnterHandler;
//   });