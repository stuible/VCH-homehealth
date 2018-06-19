//function for instantiating main Modules Carousel

$().ready(function () {   
  var modules = Barba.BaseView.extend({
      namespace: 'modules',
      onEnter: function () {
        darkBackground(true);
        instantiateSlider();
        $(".module-menu").attr("href", "#");
      }
  });

  modules.init();
});

function instantiateSlider() {
    //Instantiate Swiper (Carousel)
    var mySwiper = new Swiper('.swiper-container', {
      // Optional parameters
      direction: 'horizontal',
      loop: true,
      slidesPerView: 'auto',
      centeredSlides: true,
      // spaceBetween: '50',
      mousewheel: false,
      hashNavigation: true,
      hashNavigation: {
        watchState: true,
      },
      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },
  
      keyboard: {
        enabled: true,
        onlyInViewport: false,
      },
  
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  
    //Update variable with the last slide the user saw on the modules page
    mySwiper.on('slideChange', function () {
      lastmoduleSlide = $(mySwiper.slides[mySwiper.activeIndex]).data('hash');
    });
  
    //BEFORE I BEGIN POPUP CODE
    vex.dialog.buttons.YES.text = 'Begin'
    vex.dialog.buttons.NO.text = 'Cancel'
    $('.before-begin-button').click(function () {
      var href = $(this).data('href');
  
      vex.dialog.open({
        message: 'Before You Begin',
        input: [
          '<div class="vex-custom-field-wrapper">',
          '<label for="date">Label</label>',
          '<div class="vex-custom-input-wrapper">',
          'Thing',
          '</div>',
          '</div>',
          '<div class="vex-custom-field-wrapper">',
          '<label for="color">Color</label>',
          '<div class="vex-custom-input-wrapper">',
          'Thing',
          '</div>',
          '</div>'
        ].join(''),
        buttons: [
          $.extend({}, vex.dialog.buttons.YES, {
            text: 'Begin',
            click: function ($vexContent, event) {
              // $vexContent.data().vex.value = 'yes';
              // vex.close($vexContent.data().vex.id);
              Barba.Dispatcher.trigger('linkClicked', this, event);
  
              Barba.Pjax.goTo(href);
              return false;
            }
          }),
          $.extend({}, vex.dialog.buttons.NO, {
            text: 'Cancel'
          })
        ],
        // callback: function (data) {
        //     if (!data) {
        //         return console.log('Cancelled')
        //     }
        //     console.log('Date', data.date, 'Color', data.color)
        //     $('.demo-result-custom-vex-dialog').show().html([
        //         '<h4>Result</h4>',
        //         '<p>',
        //             'Date: <b>' + data.date + '</b><br/>',
        //             'Color: <input type="color" value="' + data.color + '" readonly />',
        //         '</p>'
        //     ].join(''))
        // }
      });
    });
  
  }
//functions for instantiating Introdunction and individual module pages

$().ready(function () {   
    var narrative = Barba.BaseView.extend({
        namespace: 'module',
        onEnter: function () {
            darkBackground(true);
            instantiateModule();
            $(".module-menu").attr("href", baseurl + '/modules/#' + lastmoduleSlide);
        }
    });

    narrative.init();
});

$().ready(function () {   
    var introduction = Barba.BaseView.extend({
        namespace: 'introduction',
        onEnter: function () {
            instantiateIntro();
            $(".module-menu").attr("href", baseurl + '/modules/#' + lastmoduleSlide);
        }
    });

    introduction.init();
});

function instantiateIntro() {

    var introSwiper = new Swiper('.intro-swiper-container', {
        direction: 'vertical',
        slideClass: 'intro-swiper-slide',
        // touchReleaseOnEdges: true,
        mousewheelSensitivity: 0,
        mousewheelReleaseOnEdges: true,
        hashNavigation: {
            watchState: true,
        },
        mousewheel: {
            invert: false,
            sensitivity: 1
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
}

function instantiateModule() {

    var introSwiper = new Swiper('.module-swiper-container', {
        direction: 'vertical',
        slideClass: 'module-swiper-slide',
        mousewheel: {
            invert: false,
        },
        hashNavigation: {
            watchState: true,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
}
$().ready(function () {   
    var narrative = Barba.BaseView.extend({
        namespace: 'narrative',
        onEnter: function () {
            darkBackground(true);
            initializeBranching();
            $(".module-menu").attr("href", baseurl + '/modules/#' + lastmoduleSlide);
        }
    });

    narrative.init();
});

function initializeBranching() { 
    $('.narrative-answer').click(function(){
        console.log('ya clicked: ' + $(this).attr('href'));
        var nextQuestion = $(this).attr('href');
        $('.question-container').hide();
        $('.question-container[data-narrative="' + nextQuestion + '"]').show();
        return false;
    });
}
$().ready(function () {   
    var caseStudy = Barba.BaseView.extend({
        namespace: 'case-study',
        onEnter: function () {
            initializeCaseStudy();
        }
    });

    caseStudy.init();
});

function initializeCaseStudy(){
    lightBackground(false);
}
$().ready(function () {

  // Barba Page Transition
  var FadeTransition = Barba.BaseTransition.extend({
    start: function () {
      /**
       * This function is automatically called as soon the Transition starts
       * this.newContainerLoading is a Promise for the loading of the new container
       * (Barba.js also comes with an handy Promise polyfill!)
       */

      // As soon the loading is finished and the old page is faded out, let's fade the new page
      Promise
        .all([this.newContainerLoading, this.fadeOut()])
        .then(this.fadeIn.bind(this));
    },

    fadeOut: function () {
      /**
       * this.oldContainer is the HTMLElement of the old Container
       */

      return $(this.oldContainer).animate({ opacity: 0 }).promise();
    },

    fadeIn: function () {
      /**
       * this.newContainer is the HTMLElement of the new Container
       * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
       * Please note, newContainer is available just after newContainerLoading is resolved!
       */

      var _this = this;
      var $el = $(this.newContainer);

      $(this.oldContainer).hide();

      $el.css({
        visibility: 'visible',
        opacity: 0
      });

      $el.animate({ opacity: 1 }, 400, function () {
        /**
         * Do not forget to call .done() as soon your transition is finished!
         * .done() will automatically remove from the DOM the old Container
         */

        _this.done();
      });
    }
  });

  /**
   * Next step, you have to tell Barba to use the new Transition
   */

  Barba.Pjax.getTransition = function () {
    /**
     * Here you can use your own logic!
     * For example you can use different Transition based on the current page or link...
     */

    return FadeTransition;
  };

  Barba.Pjax.start();
  Barba.Prefetch.init();

  Barba.Pjax.originalPreventCheck = Barba.Pjax.preventCheck;

  //Fix for bug in Barba where URLs with hashes (#) in them will cause a full browser reload
  Barba.Pjax.preventCheck = function (evt, element) {
    if ($(element).attr('href') && $(element).attr('href').indexOf('#') > -1)
      return true;
    else
      return Barba.Pjax.originalPreventCheck(evt, element)
  };

  Barba.Dispatcher.on('linkClicked', function (el) {
    lastElementClicked = el;
  });

  //Check to see if the page we're loading has swiper on it before trying to initialize
  Barba.Dispatcher.on('newPageReady', function (currentStatus, prevStatus, container) {
    // var newpage = getLastPart(currentStatus.url.split("#")[0]);
    // currentPage = newpage;
    // // newpage = newpage.split("/").pop().replace(".html","");
    // initializeBranching(); 
    // if (newpage == 'modules') {
    //   instantiateSlider();
    //   $(".module-menu").attr("href", "#");
    // }
    // else if (newpage == 'introduction') {
    //   instantiateIntro();
    //   $(".module-menu").attr("href", baseurl + '/modules/#' + lastmoduleSlide);
    // }
    // else if (newpage == 'person-centered-care' ||
    //   newpage == 'wound-care' ||
    //   newpage == 'collaboration' ||
    //   newpage == 'iv-therapy' ||
    //   newpage == 'pallative-care') {

    //   instantiateModule();
    //   $(".module-menu").attr("href", baseurl + '/modules/#' + lastmoduleSlide);
    // }
    // else {
    //   $(".module-menu").attr("href", baseurl + '/modules/#' + lastmoduleSlide);
    // }

  });
  

});

function getLastPart(url) {
  var parts = url.split("/");
  return (url.lastIndexOf('/') !== url.length - 1
    ? parts[parts.length - 1]
    : parts[parts.length - 2]);
}
//Function for changing the Homehealth background during async page loads
function darkBackground(menu){
    $('body').animate({backgroundColor: '#161D2B'}, 'slow');
    if(menu){
        lightMenu();
    }
    else {
        darkMenu();
    }
}

function lightBackground(menu){
    $('body').animate({backgroundColor: '#ffffff'}, 'slow');
    if(menu){
        darkMenu();
    }
    else {
        lightMenu();
    }
}

function lightMenu(){
    $('.menubar, .menubar a').css('color', '#fff');
    $(".menu-icon").children().children().children().attr("stroke","#fff");
}

function darkMenu(){
    $('.menubar, .menubar a').css('color', '#000');
    $(".menu-icon").children().children().children().attr("stroke","#000");
}