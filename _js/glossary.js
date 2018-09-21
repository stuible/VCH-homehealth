//functions for instantiating Glossary pages

var glossary;
var wordList;

function instantiateGlossary() {

    glossary = $('.glossary.container').data('glossary');

    $.each( glossary, function( key, value ) {
        console.log( value['term'] );
        $('.glossary .results>.list').append('<li><div class="term">' + value['term'] +'</div></li>');
      });

      wordList = new List('search', { 
        valueNames: ['term']
      });

    $('.glossary').on("click", '.term', function () {
        console.log($(this).text());
        glossaryDefine($(this).text());
        updateSize($('.width-dynamic'));
    });

    $('.glossary').on("click", '.clear', function () {
        glossaryReset();
        updateSize($('.width-dynamic'));
    });
    $('.glossary').on("click", 'input.word', function () {
        glossaryReset();
        updateSize($('.width-dynamic'));
    });

    $.fn.textWidth = function(text, font) {
    
        if (!$.fn.textWidth.fakeEl) $.fn.textWidth.fakeEl = $('<span>').hide().appendTo(document.body);
        
        $.fn.textWidth.fakeEl.text(text || this.val() || this.text() || this.attr('placeholder')).css({
            'font-weight' : this.css('font-weight'),
            'font-size' : this.css('font-size'),
            'font-family' : this.css('font-family')
        });
        
        return $.fn.textWidth.fakeEl.width();
    };
    
    $('.width-dynamic').on('input', function() {
        updateSize(this);
    }).trigger('input');

    function updateSize(element){
        var inputWidth = $(element).textWidth();
        $(element).css({
            width: inputWidth
        });
    }
    
    
    function inputWidth(elem, minW, maxW) {
        elem = $(this);
        console.log(elem);
    }
    
    var targetElem = $('.width-dynamic');
    
    inputWidth(targetElem);

}

function glossaryReset(){
    $('.glossary .input input').val("");
    glossaryViewMode('terms');
    wordList.search();
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
