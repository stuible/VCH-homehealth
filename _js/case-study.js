function initializeCaseStudy(){

    console.log('instantiating case study');

    Waypoint.destroyAll();
    lightBackground(false);
    showMenu();

}

function finalizeCaseStudy(){
    console.log('finalizing case study');
    var prevDirection = "";
    var caseStudyContainerWaypoint = new Waypoint({
        element: $('.case-study-container'),
        handler: function(direction) {
            console.log(direction);
            if(direction != prevDirection){
                if(direction == 'down'){
                    prevDirection = 'down';
                    setMenu('white');
                }
                else {
                    prevDirection = 'up';
                    lightMenu();
                }
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