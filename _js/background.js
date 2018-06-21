//Function for changing the Homehealth background during async page loads
function darkBackground(menu){
    $('body').animate({backgroundColor: '#161D2B'}, 'slow');
    if(menu){
        lightMenu();
    }
    else {
        darkMenu();
    }
}

function lightBackground(menu){
    $('body').animate({backgroundColor: '#ffffff'}, 'slow');
    if(menu){
        darkMenu();
    }
    else {
        lightMenu();
    }
}

function lightMenu(){
    $('.menubar, .menubar a').animate({color: '#fff'}, 'fast');
    $(".menu-icon").children().children().children().attr("stroke","#fff");
}

function darkMenu(){
    $('.menubar, .menubar a').animate({color: '#000'}, 'z');
    $(".menu-icon").children().children().children().attr("stroke","#000");
}

function hideMenu(){
    $('.module-menu').fadeOut()
}
function showMenu(){
    $('.module-menu').fadeIn()
}