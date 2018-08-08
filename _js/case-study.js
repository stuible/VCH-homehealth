function initializeCaseStudy(){

    console.log('instantiating case study');

    lightBackground(false);
    showMenu();

}

function finalizeCaseStudy(){
    console.log('finalizing case study');
    var caseStudyContainerWaypoint = new Waypoint({
        element: $('.case-study-container'),
        handler: function(direction) {
            console.log(direction);
            if(direction == 'down'){
                setMenu('white');
            }
            else {
                lightMenu();
            }          
        },
        offset: -5
      });

      //Set up case study accordions
      $( ".accordion" ).accordion({
        animate: 200,
        collapsible: true,
        active: false,
        icons: { "header": "ui-icon-plus", "activeHeader": "ui-icon-minus" }
      });
}