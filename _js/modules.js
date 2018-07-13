//Functions for instantiating main Modules Carousel Page

$().ready(function () {   
  
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
      threshold: 20,
      hashNavigation: true,
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
    });

    hideMenu();
    // clearBackground();
    darkBackground(true);
    setBackground($(mySwiper.slides[mySwiper.activeIndex]).data('background'));
  
    //Update variable with the last slide the user saw on the modules page
    mySwiper.on('slideChange', function () {
      console.log('current Page: ' + currentPage);
      if(currentPage == 'modules'){
        lastmoduleSlide = $(mySwiper.slides[mySwiper.activeIndex]).data('hash');
        setBackground($(mySwiper.slides[mySwiper.activeIndex]).data('background'));
        // console.log($(mySwiper.slides[mySwiper.activeIndex]).data('background'));
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
  
    //BEFORE I BEGIN POPUP CODE
    vex.dialog.buttons.YES.text = 'Begin'
    vex.dialog.buttons.NO.text = 'Cancel'
    $('.before-begin-button').click(function () {
      var href = $(this).data('href');
      var content = $(this).data('content');
      // var json = JSON.parse($(this).data('content'));

      // for (prereq in json)
      // {
      //   console.log(content[prereq].title);
      // }

      vex.dialog.open({
        message: 'Before I Begin',
        input: [
          '<div class="vex-custom-field-wrapper">',
          '<label for="date">Clinical Care Plan e-learning</label>',
          '<div class="vex-custom-input-wrapper">',
          '(6 modules)',
          '</div>',
          '</div>',
          '<div class="vex-custom-field-wrapper">',
          '<label for="color">Wound Management</label>',
          '<div class="vex-custom-input-wrapper">',
          'Online x 4 modules (6 modules)',
          '</div>',
          '<div class="vex-custom-input-wrapper">',
          '(If unable to use direct links to any of the wound management, please use CLWK website',
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