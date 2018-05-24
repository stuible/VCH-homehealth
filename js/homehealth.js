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

    $('.menu-icon').click(function(){
      if($(".menu").is(":visible")){
        $(".menu").hide();
      }
      else {
        $(".menu").show();
      }
    });
  });