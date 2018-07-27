//Global variable that states whaether or not a backgorund image should be displayed
var showBackgroundImage = false;
var menuIsLight = true;

//Function for changing the Homehealth background during async page loads
function darkBackground(menu){
    // clearBackground();
    $('body').animate({backgroundColor: '#161616'}, 'slow');
    if(menu){
        lightMenu();
    }
    else {
        darkMenu();
    }
}

function lightBackground(menu){
    // clearBackground();
    $('body').animate({backgroundColor: '#ffffff'}, 'slow');
    if(menu){
        darkMenu();
    }
    else {
        lightMenu();
    }
}

function setBackground(image, presence){
    presence = (presence !== undefined) ? presence : 'low';
    var currentBG = $( ".background" ).first().css('background-image');
    currentBG = currentBG.replace('url("','').replace('")','').replace(/^.*\/\/[^/]+/, ''); //used to be replace(/^.*\/\/[^\/]+/, '')

    // console.log("Current Image: " + currentBG);
    // console.log("Future Image: " + image);

    if(currentBG != image){
        showBackgroundImage = true;
        $( ".background" ).stop( true, false ).fadeOut("slow", function() {

            if(presence == 'low'){
                $(this).remove().clone().appendTo('body').hide().css({"background-image":"url(" + image +")", "filter":"blur(5px)", "opacity":"0.2"}).waitForImages(true).done(function() {
                    // All descendant images have loaded, now slide up.
                    if(showBackgroundImage){
                        $(this).fadeIn("slow");
                    } 
                });
            }
            else if(presence == 'high'){
                $(this).remove().clone().appendTo('body').hide().css({"background-image":"url(" + image +")", "filter":"blur(0px)", "opacity":"0.4"}).waitForImages(true).done(function() {
                    // All descendant images have loaded, now slide up.
                    if(showBackgroundImage){
                        $(this).fadeIn("slow");
                    } 
                });
            }

        });
    }
    else {
        // console.log('correct image already set, chill out');
    }
    
}

function clearBackground(){
    showBackgroundImage = false;
    $(".background").stop( true, false ).fadeOut(function(){
        $(this).css({"background-image":"unset"});
    });
    $(".background").not(':last').remove();
}

function lightMenu(){
    $('.menubar, .menubar a').animate({color: '#fff'}, 'fast');
    $(".menu-icon").children().children().children().attr("stroke","#fff");
    menuIsLight = true;
    // if(allRects){
    //     allRects.animate({ stroke: "#fff" }, 500);
    // }
    
}

function darkMenu(){
    $('.menubar, .menubar a').animate({color: '#000'}, 'z');
    $(".menu-icon").children().children().children().attr("stroke","#000");
    menuIsLight = false;
    // if(allRects){
    //     allRects.animate({ stroke: "#000" }, 500);
    // }
}

function hideMenu(){
    // $('.module-menu').fadeOut();
}
function showMenu(){
    $('.module-menu').fadeIn();
}