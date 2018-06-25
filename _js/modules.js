//Functions for instantiating main Modules Carousel Page

$().ready(function () {   
  
});

function instantiateSlider() {
  
    hideMenu();
    darkBackground(true);

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
  
    //Update variable with the last slide the user saw on the modules page
    mySwiper.on('slideChange', function () {
      console.log('current Page: ' + currentPage);
      if(currentPage == 'modules'){
        lastmoduleSlide = $(mySwiper.slides[mySwiper.activeIndex]).data('hash');
        // console.log(lastmoduleSlide);
      }
      
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