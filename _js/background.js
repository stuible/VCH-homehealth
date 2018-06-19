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
    $('.menubar, .menubar a').css('color', '#fff');
    $(".menu-icon").children().children().children().attr("stroke","#fff");
}

function darkMenu(){
    $('.menubar, .menubar a').css('color', '#000');
    $(".menu-icon").children().children().children().attr("stroke","#000");
}