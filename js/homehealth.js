$().ready(function() {
    $('.menu-icon').click(function(){
      if($(".menu").is(":visible")){
        $(".menu").hide();
      }
      else {
        $(".menu").show();
      }
    });
  });