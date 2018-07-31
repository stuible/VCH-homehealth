function instantiateMore() { 

    showMenu();

    $('.quiz.button').click(function(){
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
                $('.quiz.feedback').addClass('incorrect');
            }
            else {
                console.log('YOU NAILED IT');
                $('.quiz.feedback').addClass('correct');
            }
        }
    });

}