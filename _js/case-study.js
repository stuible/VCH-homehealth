function initializeCaseStudy(){
    lightBackground(false);

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