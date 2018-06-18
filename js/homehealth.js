$().ready(function () {

  //Instantiate Menu (Not used at the moment)
  // $(".menu").menu();
  // $('.menu-icon-container').click(function() {
  //   toggleMenu();
  // });
  // $('.menu-icon').click(function() {
  //   toggleMenu();
  // });
  // $('.menu-name').click(function() {
  //   toggleMenu();
  // });
  // $('.module-menu').mouseleave(function(){
  //   if($('.menu').is(':visible')){
  //     toggleMenu();
  //   }
  // });


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
    var newpage = getLastPart(currentStatus.url.split("#")[0]);
    currentPage = newpage;
    // newpage = newpage.split("/").pop().replace(".html","");
    initializeBranching(); 
    if (newpage == 'modules') {
      instantiateSlider();
      $(".module-menu").attr("href", "#");
    }
    else if (newpage == 'introduction') {
      instantiateIntro();
      $(".module-menu").attr("href", baseurl + '/modules/#' + lastmoduleSlide);
    }
    else if (newpage == 'person-centered-care' ||
      newpage == 'wound-care' ||
      newpage == 'collaboration' ||
      newpage == 'iv-therapy' ||
      newpage == 'pallative-care') {

      instantiateModule();
      $(".module-menu").attr("href", baseurl + '/modules/#' + lastmoduleSlide);
    }
    else {
      $(".module-menu").attr("href", baseurl + '/modules/#' + lastmoduleSlide);
    }

  });

  // Barba.Dispatcher.on('newPageReady', instantiateSlider());




  // ZOOM THING TO INVESTIGATE LATER
  //   var lastElementClicked;
  // Barba.Pjax.init();
  // Barba.Prefetch.init();

  // Barba.Dispatcher.on('linkClicked', function(el) {
  //   lastElementClicked = el;
  // });

  // var ExpandTransition = Barba.BaseTransition.extend({
  //   start: function() {
  //     this.originalThumb = lastElementClicked;

  //     Promise
  //       .all([this.newContainerLoading, this.enlargeThumb()])
  //       .then(this.showNewPage.bind(this));
  //   },

  //   enlargeThumb: function() {
  //     var deferred = Barba.Utils.deferred();
  //     var thumbPosition = this.originalThumb.getBoundingClientRect();

  //     this.cloneThumb = this.originalThumb.cloneNode(true);
  //     this.cloneThumb.style.position = 'absolute';
  //     this.cloneThumb.style.top = thumbPosition.top + 'px';
  //     this.cloneThumb.style.left = thumbPosition.left + 'px';
  //     this.cloneThumb.zIndex = "11";

  //     this.oldContainer.appendChild(this.cloneThumb);

  //     TweenLite.to(this.cloneThumb, 1.5, {
  //       top: 0,
  //       left: 0,
  //       right: 0,
  //       bottom: 0,
  //       height: window.innerHeight,
  //       width: window.innerWidth,
  //       onComplete: function() {
  //         deferred.resolve();
  //       }
  //     });

  //     return deferred.promise;
  //   },

  //   showNewPage: function() {
  //     this.newContainer.style.visibility = 'visible';
  //     this.done();
  //   }
  // });


  // var ShrinkTransition = Barba.BaseTransition.extend({
  //   start: function() {
  //     this.newContainerLoading.then(this.shrinkImage.bind(this));
  //   },

  //   shrinkImage: function() {
  //     var _this = this;

  //     this.oldContainer.style.zIndex = '10';
  //     this.newContainer.style.visibility = 'visible';

  //     var href = Barba.HistoryManager.prevStatus().url.split('/').pop();
  //     var destThumb = this.newContainer.querySelector('a[href="' + href + '"]');
  //     var destThumbPosition = destThumb.getBoundingClientRect();
  //     var fullImage = this.oldContainer.querySelector('.full');

  //     TweenLite.to(this.oldContainer.querySelector('.back'), 0.2, { opacity: 0 });

  //     TweenLite.to(fullImage, 0.3, {
  //       top: destThumbPosition.top,
  //       height: destThumb.clientHeight,
  //       width: destThumb.clientWidth,
  //       onComplete: function() {
  //         _this.done();
  //       }
  //     });
  //   }
  // });

  // Barba.Pjax.getTransition = function() {
  //   var transitionObj = ExpandTransition;

  //   if (Barba.HistoryManager.prevStatus().namespace === 'detail') {
  //     transitionObj = ShrinkTransition;
  //   }

  //   return transitionObj;
  // };

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

function instantiateIntro() {

  var introSwiper = new Swiper('.intro-swiper-container', {
    direction: 'vertical',
    slideClass: 'intro-swiper-slide',
    hashNavigation: {
      watchState: true,
    },
    mousewheel: {
      invert: false,
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

// function toggleMenu(){

//     $(".menu").slideToggle( "fast", function() {
//       // Animation complete.
//     });

// }

function getLastPart(url) {
  var parts = url.split("/");
  return (url.lastIndexOf('/') !== url.length - 1
    ? parts[parts.length - 1]
    : parts[parts.length - 2]);
}
function initializeBranching() { 
    $('.narrative-answer').click(function(){
        console.log('ya clicked: ' + $(this).attr('href'));
        var nextQuestion = $(this).attr('href');
        $('.question-container').hide();
        $('.question-container[data-narrative="' + nextQuestion + '"]').show();
        return false;
    });
}