function lightMenu(){
    setMenu('light');
    // $('.menubar, .menubar a').animate({color: '#fff'}, 'fast');
    // $(".menu-icon").children().children().children().attr("stroke","#fff");
    // menuIsLight = true;
    // if(allRects){
    //     allRects.animate({ stroke: "#fff" }, 500);
    // }   
}

function darkMenu(){
    setMenu('dark');
    // $('.menubar, .menubar a').animate({color: '#000'}, 'z');
    // $(".menu-icon").children().children().children().attr("stroke","#000");
    // menuIsLight = false;
    // if(allRects){
    //     allRects.animate({ stroke: "#000" }, 500);
    // }
}

function setMenu(menu){

    switch (menu) {
        case 'dark':

            $('.menubar').removeClass('white');
            $('.menubar, .menubar a').animate({color: '#000'}, 'z');
            $(".menu-icon").children().children().children().attr("stroke","#000");
            menuIsLight = false;

            break;

        case 'light':

            $('.menubar').removeClass('white');
            $('.menubar, .menubar a').animate({color: '#fff'}, 'fast');
            $(".menu-icon").children().children().children().attr("stroke","#fff");
            menuIsLight = true;
            
            break;

        case 'white':

            setMenu('dark');
            $('.menubar').addClass('white');
            addMenuDropshadowWaypoint();
            
            break;
    
        default:
            break;
    }

}

function hideMenu(){
    // $('.module-menu').fadeOut();
}
function showMenu(){
    $('.module-menu').fadeIn();
}

function setBreadcrumbs(containerEl){
    console.log($(containerEl).data('nav-text'));
    console.log($(containerEl).data('nav-url'));

    var navText = $(containerEl).data('nav-text');
    var navUrl = $(containerEl).data('nav-url');

    $(".menu-name").empty();

    jQuery.each(navText, function(i) {
      var classText = "";
      if(i == 0){
        classText = " class=\"module-menu\" ";
      }
      if(i == navText.length - 1) {
        $(".menu-name").append('<a ' + classText +'href="' + navUrl[i] + '">' + this +'</a>');
      }
      else {
        $(".menu-name").append('<a ' + classText +'href="' + navUrl[i] + '">' + this +'</a><span> > </span>');
      }
      
    });
}

function addMenuDropshadowWaypoint(){
    var menuWaypoint = new Waypoint({
        element: $('.menubar'),
        handler: function(direction) {
            
            if(direction == 'down') $('.menubar').addClass('shadow');
            else $('.menubar').removeClass('shadow');
            
        },
        offset: '-20px'
      });
}

function removeMenuDropshadowWaypoint(){
    $('.menubar').waypoint('destroy');
}