$().ready(function() {

  //Instantiate Menu
  $(".menu").menu();
  $('.menu-icon-container').click(function() {
    toggleMenu();
  });
  $('.menu-icon').click(function() {
    toggleMenu();
  });
  $('.menu-name').click(function() {
    toggleMenu();
  });


    var FadeTransition = Barba.BaseTransition.extend({
      start: function() {
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
    
      fadeOut: function() {
        /**
         * this.oldContainer is the HTMLElement of the old Container
         */
    
        return $(this.oldContainer).animate({ opacity: 0 }).promise();
      },
    
      fadeIn: function() {
        /**
         * this.newContainer is the HTMLElement of the new Container
         * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
         * Please note, newContainer is available just after newContainerLoading is resolved!
         */
    
        var _this = this;
        var $el = $(this.newContainer);
    
        $(this.oldContainer).hide();
    
        $el.css({
          visibility : 'visible',
          opacity : 0
        });
    
        $el.animate({ opacity: 1 }, 400, function() {
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
    
    Barba.Pjax.getTransition = function() {
      /**
       * Here you can use your own logic!
       * For example you can use different Transition based on the current page or link...
       */
    
      return FadeTransition;
    };

    Barba.Pjax.start();
    Barba.Prefetch.init();

    Barba.Dispatcher.on('linkClicked', function(el) {
      lastElementClicked = el;
    });

    Barba.Dispatcher.on('transitionCompleted', function(currentStatus, oldStatus, container) {
      instantiateSlider();
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

  function instantiateSlider(){
  //Instantiate Swiper (Carousel)
  var mySwiper = new Swiper ('.swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    slidesPerView: 'auto',
    centeredSlides: true,
    // spaceBetween: '50',

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  }

  function toggleMenu(){
    if($(".menu").is(":visible")){
      $(".menu").hide();
    }
    else {
      $(".menu").show();
    }
  }