$().ready(function () {

  realBrowserCheck();

  //create progress cookie if one does not already exist
  if(Cookies.get(progressCookieName) === undefined) createProgress();

  instantiateMenu();

  var landing = Barba.BaseView.extend({
    namespace: 'landing',
    onEnter: function () {
      clearBackground();
      darkBackground(true);
    },
    onEnterCompleted: function () {
    }
});

landing.init();

  var modules = Barba.BaseView.extend({
    namespace: 'modules',
    onEnter: function () {
      instantiateSlider();
      darkBackground(true);
      
      $(".module-menu").attr("href", "#");
    },
    onEnterCompleted: function () {
      
    }
});

modules.init();

var glossary = Barba.BaseView.extend({
  namespace: 'glossary',
  onEnter: function () {
    clearBackground();
    instantiateGlossary();
    lightBackground(true);
    
  },
  onEnterCompleted: function () {
    
  }
});

glossary.init();

var narrative = Barba.BaseView.extend({
  namespace: 'narrative',
  onEnter: function () {
      darkBackground(true);
      initializeBranching();
      $(".module-menu").attr("href", baseurl + '/modules/#' + lastmoduleSlide);
  },
  onEnterCompleted: function () {
    if($('.barba-container').data('topic')){
      updateProgress($('.barba-container').data('module-parent'), 'topic', $('.barba-container').data('name'), true);
    }
  }
});

narrative.init();

var caseStudy = Barba.BaseView.extend({
  namespace: 'case-study',
  onEnter: function () {
      clearBackground();
      initializeCaseStudy();
  },
  onEnterCompleted: function () {
    finalizeCaseStudy();
    
  }
});

caseStudy.init();

var moduleView = Barba.BaseView.extend({
  namespace: 'module',
  onEnter: function () {
      darkBackground(true);
      instantiateModule();
      $(".module-menu").attr("href", baseurl + '/modules/#' + lastmoduleSlide);
  },
  onEnterCompleted: function () {
    setBackground($('.barba-container').data('background'));
    updateMoreOnTopicUI();
  }
});

moduleView.init();

var moreView = Barba.BaseView.extend({
  namespace: 'topic',
  onEnter: function () {
      clearBackground();
      instantiateMore();
      lightBackground(true);
      $(".module-menu").attr("href", baseurl + '/modules/#' + lastmoduleSlide);
  },
  onEnterCompleted: function () {
    updateProgress($('.barba-container').data('module-parent'), 'topic', $('.barba-container').data('name'), true);
  }
});

moreView.init();

var introduction = Barba.BaseView.extend({
  namespace: 'introduction',
  onEnter: function () {
      instantiateIntro();
      $(".module-menu").attr("href", baseurl + '/modules/#' + lastmoduleSlide);
  },
  onEnterCompleted: function () {
    setBackground($('.barba-container').data('background'));
    updateMoreOnTopicUI();
  }
});

introduction.init();

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
      return Barba.Pjax.originalPreventCheck(evt, element);
  };

  Barba.Dispatcher.on('linkClicked', function (el) {
    lastElementClicked = el;
  });


  //Check to see if the page we're loading has swiper on it before trying to initialize
  Barba.Dispatcher.on('newPageReady', function (currentStatus, prevStatus, container) {
    var newpage = getLastPart(currentStatus.url.split("#")[0]);
    introInstantiated = false;
    console.log('new page is being set to: ' + newpage);
    currentPage = newpage;
    if (newpage == 'modules') {
      $(".module-menu").attr("href", "#");
    }
    else if (newpage == 'introduction') {
      $(".module-menu").attr("href", baseurl + '/modules/#' + lastmoduleSlide);
    }
    else if (newpage == 'person-centered-care' ||
      newpage == 'wound-care' ||
      newpage == 'collaboration' ||
      newpage == 'iv-therapy' ||
      newpage == 'pallative-care') {

      $(".module-menu").attr("href", baseurl + '/modules/#' + lastmoduleSlide);
    }
    else {
      $(".module-menu").attr("href", baseurl + '/modules/#' + lastmoduleSlide);
    }

    setBreadcrumbs(container);

  });
  

});

function getLastPart(url) {
  var parts = url.split("/");
  return (url.lastIndexOf('/') !== url.length - 1
    ? parts[parts.length - 1]
    : parts[parts.length - 2]);
}

function realBrowserCheck() 
{

    var is_ie = false;
    var ua = window.navigator.userAgent;
    var old_ie = ua.indexOf('MSIE ');
    var new_ie = ua.indexOf('Trident/');

    if ((old_ie > -1) || (new_ie > -1)) {
      is_ie = true;
    }

    if ( is_ie ) {
      vex.dialog.alert({ unsafeMessage: '\
        <div class="ie-warning">\
        <h4 class="title">Internet Explorer Detected</h4>\
        <img src="' + baseurl + '/image/logos/sad-ie.png">\
        <p>This Home Health website uses new web technology that is not supported by Internet Explorer.  We strongly recommend you download a more modern browser like <a target="_blank" href="https://www.google.com/chrome/browser/">Google Chrome</a> as some features may not work as intended.</p>\
        </div>\
        ' });
    }
    else {
      console.log("at least it's not IE");
    }
}