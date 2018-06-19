$().ready(function () {   
    var caseStudy = Barba.BaseView.extend({
        namespace: 'case-study',
        onEnter: function () {
            initializeCaseStudy();
        }
    });

    caseStudy.init();
});

function initializeCaseStudy(){
    lightBackground(false);
}