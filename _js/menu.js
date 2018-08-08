//Global Variable for last viewed slide on modules page
var lastmoduleSlide = "";
var lastmoduleSection = "";
var allRects = null;

window.onload = function () {
    drawModulesIcon();
};

function lightMenu() {
    setMenu('light');
}

function darkMenu() {
    setMenu('dark');
}

function setMenu(menu) {

    switch (menu) {
        case 'dark':

            $('.menubar').removeClass('white');
            $('.menubar, .menubar a').stop( true, false ).animate({ color: '#000' }, 'z');
            $(".menu-icon").children().stop( true, false ).children().children().attr("stroke", "#000");
            menuIsLight = false;

            break;

        case 'light':

            $('.menubar').removeClass('white');
            $('.menubar, .menubar a').stop( true, false ).animate({ color: '#fff' }, 'fast');
            $(".menu-icon").children().children().children().attr("stroke", "#fff");
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

function hideMenu() {
    // $('.module-menu').fadeOut();
}
function showMenu() {
    $('.module-menu').fadeIn();
}

function setBreadcrumbs(containerEl) {
    console.log($(containerEl).data('nav-text'));
    console.log($(containerEl).data('nav-url'));

    var navText = $(containerEl).data('nav-text');
    var navUrl = $(containerEl).data('nav-url');

    $(".menu-name").empty();

    jQuery.each(navText, function (i) {
        var classText = "";
        if (i == 0) classText = " class=\"module-menu\" ";

        //Check if last breadcrumb
        if (i == navText.length - 1) {
            //If last, then don't add breadcrum '>' symbol
            // if(i == 0) $(".menu-name").append('<a ' + classText + 'href="' + baseurl + navUrl[i] + '#' + navText[i + 1].replace(/\s+/g, '-') +'">' + this + '</a>');
            $(".menu-name").append('<a ' + classText + 'href="' + baseurl + navUrl[i] + '">' + this + '</a>');
        }
        else {
            //If not, then add '>' symbol
            if(i == 0) $(".menu-name").append('<a ' + classText + 'href="' + baseurl + navUrl[i] + '#' + navText[i + 1].replace(/\s+/g, '-') +'">' + this + '</a><span> > </span>');
            else if(i == 1) $(".menu-name").append('<a ' + classText + 'href="' + baseurl + navUrl[i] + '#' + lastmoduleSection +'">' + this + '</a><span> > </span>');
            else  $(".menu-name").append('<a ' + classText + 'href="' + baseurl + navUrl[i] + '">' + this + '</a><span> > </span>');
        }

    });
}

function addMenuDropshadowWaypoint() {
    var menuWaypoint = new Waypoint({
        element: $('.menubar'),
        handler: function (direction) {

            if (direction == 'down') $('.menubar').addClass('shadow');
            else $('.menubar').removeClass('shadow');

        },
        offset: '-20px'
    });
}

function removeMenuDropshadowWaypoint() {
    $('.menubar').waypoint('destroy');
}

function drawModulesIcon(){
    //Draw modules icon
    var s = Snap();
    var mainRect = s.rect(18, 5, 20, 20, 2);
    var rightRect = s.rect(43, 10, 10, 10, 2);
    var leftRect = s.rect(3, 10, 10, 10, 2);
    var farleftRect = s.rect(-16, 10, 10, 10, 2);

    var allRects = s.group(mainRect, rightRect, leftRect, farleftRect);

    var strokeColour;

    if (menuIsLight) strokeColour = '#fff';
    else strokeColour = '#000';

    mainRect.attr({
        fill: "none",
        stroke: strokeColour,
        strokeWidth: 2,
        "vector-effect": "non-scaling-stroke"

    });

    rightRect.attr({
        fill: "none",
        stroke: strokeColour,
        strokeWidth: 2,
        "vector-effect": "non-scaling-stroke"
    });

    leftRect.attr({
        fill: "none",
        stroke: strokeColour,
        strokeWidth: 2,
        "vector-effect": "non-scaling-stroke"
    });

    farleftRect.attr({
        fill: "none",
        stroke: strokeColour,
        strokeWidth: 2,
        "vector-effect": "non-scaling-stroke"
    });

    var container = document.getElementsByClassName("menu-icon");
    $(container).append(s.node);

    //Animate Icon on mouse enter
    $('.menubar').on("mouseenter", ".module-menu", function (e) {
        if (currentPage != 'modules') {
            allRects.animate({ transform: 'translate(20,0)' }, 700, mina.bounce);
            mainRect.animate({ transform: 's0.5,0.5' }, 700, mina.bounce);
            leftRect.animate({ transform: 's2,2' }, 700, mina.bounce);
        }
        else {
            //mainRect.animate({ transform: 's1.4,1.4' }, 700,  mina.bounce);
            //leftRect.animate({ opacity: '0' }, 500);
            //rightRect.animate({ opacity: '0' }, 500);
        }
    });

    //Animate icon back on mouse leave
    $('.menubar').on("mouseleave", ".module-menu", function (e) {
        if (currentPage != 'modules') {
            allRects.animate({ transform: 'translate(0,0)' }, 700, mina.bounce);
            mainRect.animate({ transform: 's1,1' }, 700, mina.bounce);
            leftRect.animate({ transform: 's1,1' }, 700, mina.bounce);
        }
        else {
            //mainRect.animate({ transform: 's1,1' }, 700,  mina.bounce);
            //leftRect.animate({ opacity: '1' }, 500);
            //rightRect.animate({ opacity: '1' }, 500);
        }
    });

    //Reset icon on mouse click
    $('.menubar').on("click", ".module-menu", function (e) {
        allRects.animate({ transform: 'translate(0,0)' }, 700, mina.bounce);
        mainRect.animate({ transform: 's1,1' }, 700, mina.bounce);
        leftRect.animate({ transform: 's1,1' }, 700, mina.bounce);
        leftRect.animate({ opacity: '1' }, 500);
        rightRect.animate({ opacity: '1' }, 500);
    });


    //mainRect.animate({ transform:'translateX(-5)'}, 700, mina.bounce );
    //mainRect.animate({ transform:'translateY(-5)'}, 700, mina.bounce );

    // mainRect.animate({ry:1}, 220, function(){
    //  mainRect.animate({ry: 90}, 300);
    //  }); 
}