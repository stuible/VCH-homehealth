//Functions for instantiating main Modules Carousel Page
var introInstantiated = false;

function instantiateSlider() {

  centerLoader();

  if(introInstantiated !== true){
    Waypoint.destroyAll();

    //Instantiate Swiper (Carousel)
    var mySwiper = new Swiper('.swiper-container', {
      // Optional parameters
      direction: 'horizontal',
      loop: true,
      slidesPerView: 'auto',
      centeredSlides: true,
      updateOnImagesReady: true,
      // spaceBetween: '50',
      mousewheel: false,
      threshold: 20,
      // hashNavigation: true,
      hashNavigation: {
        watchState: true,
        replaceState: true,
    },
      // If we need pagination
      pagination: {
        el: '.modules-pagination',
        clickable: true
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
      on: {
        init: function () {
          var videosWeNeedLoaded = [];
          $('.module-video').each(function(index){
            if(index == 0 || index == 1 || index == $('.module-video').length - 1){
              // alert('setting up load listener on video: ' + index);
              this.addEventListener('loadeddata', function() {
                // alert('have finished loading video ' + index);
                videosWeNeedLoaded.push(this);
                if(videosWeNeedLoaded.length == 3){
                  $('.swiper-container').addClass('initialized');
                  $('.modules-pagination').addClass('initialized');
                  $('.modules-loader').addClass('initialized');
                }
            }, false);
            }
            
          });
        },
      },
    });

    showMenu();
    // clearBackground();
    darkBackground(true);
    setBackground($(mySwiper.slides[mySwiper.activeIndex]).data('background'));
  
    //Update variable with the last slide the user saw on the modules page
    mySwiper.on('slideChange', function () {
      console.log('current Page: ' + currentPage);
      if(currentPage == 'modules'){
        lastmoduleSlide = $(mySwiper.slides[mySwiper.activeIndex]).data('hash');
        setBackground($(mySwiper.slides[mySwiper.activeIndex]).data('background'));
      }
      
    });

    var startProg = 95;
    var firstCheck = false;
    mySwiper.on('touchStart', function (progress) {
      firstCheck = true;
    });

    mySwiper.on('progress', function (progress) {
      // console.log(progress);
      if(firstCheck){
        startProg = progress;
        firstCheck = false;
        console.log('START PROGRESS: ' + startProg);
      }
      if(progress > startProg + 0.0007 ){
        startProg = 95;
        clearBackground();
      }
    });

    mySwiper.on('touchEnd', function (progress) {
      // setBackground($(mySwiper.slides[mySwiper.activeIndex]).data('background'));
      if(lastmoduleSlide == $(mySwiper.slides[mySwiper.activeIndex]).data('hash')){
        setBackground($(mySwiper.slides[mySwiper.activeIndex]).data('background'));
      }
    });

      instantiatePopups();
      introInstantiated = true;
    }
    
  }

  function centerLoader(){
    var loaderWidth = $('.faux-slide-wrapper').width();
    $('.faux-slide-wrapper').css("transform", "translate(-" + (loaderWidth - $(document).width()) / 2 + "px,0)");
  }

  function instantiatePopups(){
    //BEFORE I BEGIN POPUP CODE
    // vex.dialog.buttons.YES.text = 'Start';
    // vex.dialog.buttons.NO.text = 'Cancel';
    $('.before-begin-button').click(function () {
      var href = $(this).data('href');
      var prereqs = $(this).data('content');

      console.log(prereqs);


      var beforeBeginningHTML = '<div class="vex-custom-field-wrapper">';
      var imageURL;
      for (prereq in prereqs)
      {
        if(prereqs[prereq].image) imageURL = prereqs[prereq].image;

        beforeBeginningHTML += '<div class="vex-duration">' + prereqs[prereq].duration +'</div>';
        beforeBeginningHTML += '<a href="' + prereqs[prereq].link +'" class="vex-title" target="_blank">' + prereqs[prereq].linktext +'</a>';
        beforeBeginningHTML += '<div class="vex-custom-input-wrapper">';
        beforeBeginningHTML += '<div class="vex-notes">' + prereqs[prereq].text +'</div>';
        beforeBeginningHTML += '</div>';
      }
      beforeBeginningHTML += '</div>';

      vex.dialog.open({
        message: 'Before I Begin',
        input: beforeBeginningHTML,
        className: 'vex-theme-default prereq',
        buttons: [
          $.extend({}, vex.dialog.buttons.YES, {
            text: 'Start',
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
      });
      $('.vex-content').prepend('<div class="prereq-image" style="background-image: url(\'' + baseurl + '/image/modules/' + imageURL +'\')"></div><div class="prereq-image-placeholder"></div>');
    });
    
  }