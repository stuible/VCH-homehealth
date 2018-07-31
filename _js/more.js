function instantiateMore() { 

    showMenu();

    $('.quiz.button').click(function(){
        //Check if user didn't make a selection
        if(!$("input[name=multiple-select-quiz]").is(':checked')){
            vex.dialog.alert("Please chose at least one answer");
        }
        else {
            console.log('you slected at least one asnwer');
            $("input[name=multiple-select-quiz]").each(function(){
                
                if($(this).is(':checked') && $(this).data('correct') == true){
                    console.log('Answer was: ' + $(this).data('correct') );
                }
                else if($(this).is(':checked') && $(this).data('correct') == false){
                    console.log('Answer was: ' + $(this).data('correct') );
                }
                else if(!$(this).is(':checked') && $(this).data('correct') == false){
                    console.log('Answer was: ' + $(this).data('correct') );
                }
                else if(!$(this).is(':checked') && $(this).data('correct') == true){
                    console.log('Answer was: ' + $(this).data('correct') );
                }
            });
        }
    });

}