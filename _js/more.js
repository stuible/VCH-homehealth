function instantiateMore() { 

    showMenu();
    Waypoint.destroyAll();

    $('.quiz.answer').on("click", function(){
        console.log('clicked answer: ');
        console.log($(this).children('input').prop( "checked", !$(this).children('input').prop( "checked") ));
        $(this).children('input').change();

    });

    $('.button-container').on("click",'.quiz.button.submit', function(){
        //Check if user didn't make a selection
        if(!$("input[name=multiple-select-quiz]").is(':checked')){
            vex.dialog.alert("Please chose at least one answer");
        }
        else {
            console.log('you slected at least one asnwer');
            var incorrectAnwers = [];
            $("input[name=multiple-select-quiz]").each(function(i){
                
                if($(this).is(':checked') && $(this).data('correct') == true){
                    console.log('For Quesiton ' + i + ': U WAS RIGHT');
                }
                else if(!$(this).is(':checked') && $(this).data('correct') == false){
                    console.log('For Quesiton ' + i + ': U WAS RIGHT');
                }
                else {
                    console.log('For Quesiton ' + i + ': U WAS WRONG');
                    incorrectAnwers.push(this);
                }
            });
            if(incorrectAnwers.length > 0){
                console.log('YOU FAILED');
                // $('.quiz.feedback').addClass('incorrect');
                showQuizScreen('.quiz', 'incorrect', 'Wrong', 'You were wrong', 'again', 'Try Again');
            }
            else {
                console.log('YOU NAILED IT');
                // $('.quiz.feedback').addClass('correct');
                showQuizScreen('.quiz', 'correct', 'Correct', 'You were right', 'back', 'Back');
            }
        }
    });

    $('.button-container').on("click",'.quiz.button.again', function(){
        hideQuizScreen('.quiz', 'incorrect', 'again');
    });
    $('.button-container').on("click",'.quiz.button.back', function(){
        hideQuizScreen('.quiz', 'correct', 'back');
    });
    
    var dropped = false;

    //Counter
    counter = 0;
    //Make element draggable
    $(".matching-answer").draggable({
        helper: 'clone',
        containment: 'frame',
        revert: "invalid",
        //When first dragged
        start: function( event, ui ) {
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
        drop: function(event, ui ) {
            var category = $(ui.draggable).data('category');
            var background = $(ui.draggable).data('background');
            console.log(category);
            console.log($(this).data('category'));
            if($(this).data('category') == category){
                console.log('correct');
                $(this).addClass('correct');
                console.log($(this).children().first().children().first().children('.matching-circle'));
                $(this).children().first().children().first().children('.matching-circle').css('background-image', 'url(' + background + ')');
                dropped = true;  
            }
            
        }
    });
}

function showQuizScreen(quiz, screen, title, description, button, buttonText){
    $(quiz).children('.response-title').text(title);
    $(quiz).children('.response-description').text(description);
    $(quiz).children('.quiz.feedback').addClass(screen);
    $(quiz).children('.quiz.button.submit').removeClass('submit').addClass(button).text(buttonText);
}

function hideQuizScreen(quiz, screen, button){
    $(quiz).children('.quiz.feedback').removeClass(screen);
    $(quiz).children('.quiz.button.' + button).removeClass(button).addClass('submit').text('Submit');
}