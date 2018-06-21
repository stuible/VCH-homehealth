function initializeCaseStudy(){

    console.log('instantiating case study');

    lightBackground(false);

}

function finalizeCaseStudy(){
    console.log('finalizing case study');
    var caseStudyContainerWaypoint = new Waypoint({
        element: $('.case-study-container'),
        handler: function(direction) {
            console.log(direction);
            if(direction == 'down'){
                darkMenu();
            }
            else {
                lightMenu();
            }          
        },
        offset: -10 
      })
}