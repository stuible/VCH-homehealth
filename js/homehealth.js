$().ready(function() {

  //initialize main caroussel
  $('.main-carousel').slick({
    dots: true
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