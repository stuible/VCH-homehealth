$().ready(function () {   
    
});

function initializeBranching() { 
    console.log('instantiating branching');

    showMenu();

    $('.narrative-answer').click(function(){
        console.log('ya clicked: ' + $(this).attr('href'));
        var nextQuestion = $(this).attr('href');
        $('.question-container').hide();
        $('.question-container[data-narrative="' + nextQuestion + '"]').show();
        return false;
    });
}