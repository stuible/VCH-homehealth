function initializeBranching() { 
    console.log('instantiating branching');

    setBackground($('.narrative-primary').data('background'), 'high');
    showMenu();

    var answerCount = 0;

    $('.narrative-answer').click(function(){
        console.log('ya clicked: ' + $(this).attr('href'));
        var nextQuestion = $(this).attr('href');
        setBackground($('.question-container[data-narrative="' + nextQuestion + '"]').data('background'), 'high');
        $('.question-container').hide();
        $('.question-container[data-narrative="' + nextQuestion + '"]').show();
        answerCount++;

        if(answerCount > 1){
            $('.narrative-back').show();
        }

        return false;
    });
}