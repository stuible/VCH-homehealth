function instantiateMore() {

    showMenu();
    Waypoint.destroyAll();

    instantiateMultipleChoiceQuiz();
    instantiateMatchingQuiz();
    instantiateVideoGallery();

}

function instantiateMultipleChoiceQuiz() {

    var correctText = "You were correct";
    var partialText = "You were partially correct";
    var wrongText = "You were wrong";

    if($('.quiz.feedback').data('feedback')){
        
        var customFeedback = $('.quiz.feedback').data('feedback');

        if(customFeedback.length == 2){
        
            wrongText = customFeedback[0];
            correctText = customFeedback[1];

        }
        else if (customFeedback.length == 3){
            wrongText = customFeedback[0];
            partialText = customFeedback[1];
            correctText = customFeedback[2];
        }

    }
    

    $('.quiz.answer').on("click", function () {
        console.log('clicked answer: ');
        console.log($(this).children('input').prop("checked", !$(this).children('input').prop("checked")));
        $(this).children('input').change();

    });

    $('.button-container').on("click", '.quiz.button.submit', function () {
        //Check if user didn't make a selection
        if (!$("input[name=multiple-select-quiz]").is(':checked')) {
            vex.dialog.alert("Please chose at least one answer");
        }
        else {
            console.log('you slected at least one asnwer');
            var incorrectAnwers = [];
            var partiallyCorrect = false;
            $("input[name=multiple-select-quiz]").each(function (i) {

                if ($(this).is(':checked') && $(this).data('correct') == true) {
                    console.log('For Quesiton ' + i + ': U WAS RIGHT');
                    partiallyCorrect = true;
                }
                else if (!$(this).is(':checked') && $(this).data('correct') == false) {
                    console.log('For Quesiton ' + i + ': U WAS RIGHT');
                }
                else {
                    console.log('For Quesiton ' + i + ': U WAS WRONG');
                    incorrectAnwers.push(this);
                }
            });
            if (incorrectAnwers.length > 0) {
                if(!partiallyCorrect){
                    console.log('YOU FAILED');
                    // $('.quiz.feedback').addClass('incorrect');
                    showQuizScreen('.quiz', 'incorrect', 'Wrong', wrongText, 'again', 'Try Again');
                }
                else {
                    console.log('YOU WERE PARTIALLY RIGHT');
                    // $('.quiz.feedback').addClass('incorrect');
                    showQuizScreen('.quiz', 'incorrect', 'Partially Correct', partialText, 'again', 'Try Again');
                }
                
            }
            else {
                console.log('YOU NAILED IT');
                // $('.quiz.feedback').addClass('correct');
                showQuizScreen('.quiz', 'correct', 'Correct', correctText, 'back', 'Back');
            }
        }
    });

    $('.button-container').on("click", '.quiz.button.again', function () {
        hideQuizScreen('.quiz', 'incorrect', 'again');
    });
    $('.button-container').on("click", '.quiz.button.back', function () {
        hideQuizScreen('.quiz', 'correct', 'back');
    });
}

function instantiateMatchingQuiz() {
    var dropped = false;

    //Counter
    counter = 0;
    //Make element draggable
    $(".matching-answer").draggable({
        helper: 'clone',
        containment: 'frame',
        revert: true,
        //When first dragged
        start: function (event, ui) {
            $(ui.helper).children('.seven').remove();
        },
        stop: function (ev, ui) {

            var pos = $(ui.helper).offset();
            objName = "#clonediv" + counter;
            $(objName).css({
                "left": pos.left,
                "top": pos.top
            });
            $(objName).removeClass("drag");
            //When an existiung object is dragged
            $(objName).draggable({
                containment: 'parent',
                stop: function (ev, ui) {
                    var pos = $(ui.helper).offset();
                    console.log($(this).attr("id"));
                    console.log(pos.left);
                    console.log(pos.top);
                }
            });
        }
    });

    $('.matching-option').droppable({
        accept: '.matching-answer',
        drop: function (event, ui) {
            var category = $(ui.draggable).data('category');
            var background = $(ui.draggable).data('background');
            var droppableCircle = $(this).children().first().children().first().children('.matching-circle');
            console.log(category);
            console.log($(this).data('category'));
            if ($(this).data('category') == category) {
                $(ui.helper).remove();
                console.log('correct');
                $(this).addClass('correct');
                console.log(droppableCircle);
                $(droppableCircle).css('background-image', 'url(' + background + ')');
                dropped = true;
            }
            else {
                console.log('incorrect');
                var originalColour = $(droppableCircle).css("border-color");
                $(droppableCircle)  .animate({"border-color" : "red"})
                                    .effect('shake', {distance: 7, times: 3  })
                                    .animate({"border-color" : originalColour});
                $(droppableCircle).css("border-color", "");
                                    
            }


        }
    });
}

function showQuizScreen(quiz, screen, title, description, button, buttonText) {
    $(quiz).children('.response-title').text(title);
    $(quiz).children('.response-description').text(description);
    $(quiz).children('.quiz.feedback').addClass(screen);
    $(quiz).children('.quiz.button.submit').removeClass('submit').addClass(button).text(buttonText);
}

function hideQuizScreen(quiz, screen, button) {
    $(quiz).children('.quiz.feedback').removeClass(screen);
    $(quiz).children('.quiz.button.' + button).removeClass(button).addClass('submit').text('Submit');
}

function instantiateVideoGallery() {
    $('.video.gallery .name').first().addClass('active');
    $('.video.gallery iframe').attr('src', $('.video.gallery .name').first().data('video'));

    $('.video.gallery .name').on("click", function () {
        $('.video.gallery .name').removeClass('active');
        $(this).addClass('active');
        $('.video.gallery iframe').attr('src', $(this).data('video'));
    });

}