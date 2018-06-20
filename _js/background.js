//Function for changing the Homehealth background during async page loads
function darkBackground(lightMenu){
    $('.background').css('background', '#161D2B');
    if(lightMenu){
        lightMenu();
    }
    else {
        darkMenu();
    }
}

function lightBackground(darkMenu){
    $('.background').css('background', '#ffffff');
    if(darkMenu){
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