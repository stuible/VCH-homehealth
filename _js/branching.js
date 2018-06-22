$().ready(function () {   
    
});

function initializeBranching() { 
    console.log('instantiating branching');

    setBackground($('.narrative-primary').data('background'));
    showMenu();

    $('.narrative-answer').click(function(){
        console.log('ya clicked: ' + $(this).attr('href'));
        var nextQuestion = $(this).attr('href');
        setBackground($('.question-container[data-narrative="' + nextQuestion + '"]').data('background'));
        $('.question-container').hide();
        $('.question-container[data-narrative="' + nextQuestion + '"]').show();
        return false;
    });
}