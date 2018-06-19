$().ready(function () {   
    var narrative = Barba.BaseView.extend({
        namespace: 'narrative',
        onEnter: function () {
            darkBackground(true);
            initializeBranching();
            $(".module-menu").attr("href", baseurl + '/modules/#' + lastmoduleSlide);
        }
    });

    narrative.init();
});

function initializeBranching() { 
    $('.narrative-answer').click(function(){
        console.log('ya clicked: ' + $(this).attr('href'));
        var nextQuestion = $(this).attr('href');
        $('.question-container').hide();
        $('.question-container[data-narrative="' + nextQuestion + '"]').show();
        return false;
    });
}