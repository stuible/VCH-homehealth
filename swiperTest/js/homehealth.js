$().ready(function() {

  //initialize main caroussel
  $('.main-carousel').slick({
    dots: true,
    swipe: true,

  });

  $('.introduction-carousel').slick({
    dots: true,
    swipe: false,
    swipeToSlide: false,
    touchMove: false
  });

  $('.slide-two').click(function(){
    console.log("clicked intro slide");
    // $(".slick-list").css({
    //   overflow: "visible", 

    // });

    $(".slide-two").css({
      width: "100vw", 
      height: "100vh",
      // position: "absolute",
      "margin-left": "calc(-50vw + 50%)",
      // left: "-10vw",
      // "background-color": "black"
    });

    // $(".animsition").animsition({
    //   inClass: 'zoom-in',
    //   outClass: 'zoom-out',
    //   inDuration: 1500,
    //   outDuration: 800,
    //   linkElement: 'introduction.html',
    //   // e.g. linkElement: 'a:not([target="_blank"]):not([href^="#"])'
    //   loading: true,
    //   loadingParentElement: 'body', //animsition wrapper element
    //   loadingClass: 'animsition-loading',
    //   loadingInner: '', // e.g '<img src="loading.svg" />'
    //   timeout: false,
    //   timeoutCountdown: 5000,
    //   onLoadEvent: true,
    //   browser: [ 'animation-duration', '-webkit-animation-duration'],
    //   // "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
    //   // The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
    //   overlay : false,
    //   overlayClass : 'animsition-overlay-zoom',
    //   overlayParentElement : 'body',
    //   transition: function(url){ window.location.href = url; }
    // });
  });

    $('.menu-icon').click(function(){
      if($(".menu").is(":visible")){
        $(".menu").hide();
      }
      else {
        $(".menu").show();
      }
    });
  });