//functions for instantiating Glossary pages

var glossary;

function instantiateGlossary() {

    glossary = $('.glossary.container').data('glossary');



    $.each( glossary, function( key, value ) {
        console.log( value['term'] );
        $('.glossary .results>.list').append('<li><div class="term">' + value['term'] +'</div></li>');
      });

      var wordList = new List('search', { 
        valueNames: ['term']
      });

    $('.glossary').on("click", '.term', function () {
        console.log($(this).text());
        glossaryDefine($(this).text());
    });

}

function glossaryDefine(word){
    if(getDefinition(word)){
        $('.glossary .input input').val(word);
        $('.glossary .definition').text(getDefinition(word));
        glossaryViewMode('definition');
    }
    
}

function glossaryViewMode(mode){
    if (mode == 'definition'){
        $('.glossary .results').hide();
        $('.glossary .definition').show();
    }
    else if (mode == 'terms'){
        $('.glossary .results').show();
        $('.glossary .definition').hide();
    }
}

function getDefinition(word){
    var definition = null;
    $.each( glossary, function( key, value ) {
        if(value['term'] == word){
            definition = value['definition'];
        }
      });

    if(definition != null) return definition;
    else return false;
}