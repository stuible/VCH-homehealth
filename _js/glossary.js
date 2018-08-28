//functions for instantiating Glossary pages


function instantiateGlossary() {

    var glossary = $('.glossary.container').data('glossary');



    $.each( glossary, function( key, value ) {
        console.log( value['term'] );
        $('.glossary .results>.list').append('<li><div class="term">' + value['term'] +'</div></li>');
      });

      var wordList = new List('search', { 
        valueNames: ['term']
      });

}