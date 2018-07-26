$().ready(function () {

  if(Cookies.get(progressCookieName) === undefined) createProgress();

      //Enable lazy loading
      // $('.lazy').Lazy({
      //   // your configuration goes here
      //   //scrollDirection: 'vertical',
      //   effect: 'fadeIn',
      //   effectTime: 200,
      //   visibleOnly: true,
      //   onError: function(element) {
      //       console.log('error lazy loading ' + element.data('src'));
      //   }
      // });

      setBreadcrumbs($('.barba-container'));

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

var narrative = Barba.BaseView.extend({
  namespace: 'narrative',
  onEnter: function () {
      darkBackground(true);
      initializeBranching();
      $(".module-menu").attr("href", baseurl + '/modules/#' + lastmoduleSlide);
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
  namespace: 'more-on-topic',
  onEnter: function () {
      clearBackground();
      instantiateMore();
      lightBackground(true);
      $(".module-menu").attr("href", baseurl + '/modules/#' + lastmoduleSlide);
  },
  onEnterCompleted: function () {
    updateProgress($('.barba-container').data('module-parent'), 'more-on-topic', $('.barba-container').data('name'), true);
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
      return Barba.Pjax.originalPreventCheck(evt, element)
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
    // newpage = newpage.split("/").pop().replace(".html","");
    // initializeBranching(); 
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

function setBreadcrumbs(containerEl){
    console.log($(containerEl).data('nav-text'));
    console.log($(containerEl).data('nav-url'));

    var navText = $(containerEl).data('nav-text');
    var navUrl = $(containerEl).data('nav-url');

    $(".menu-name").empty();

    jQuery.each(navText, function(i) {
      var classText = ""
      if(i == 0){
        classText = " class=\"module-menu\" ";
      }
      if(i == navText.length - 1) {
        $(".menu-name").append('<a ' + classText +'href="' + navUrl[i] + '">' + this +'</a>');
      }
      else {
        $(".menu-name").append('<a ' + classText +'href="' + navUrl[i] + '">' + this +'</a><span> > </span>');
      }
      
    });
}
var progressCookieName = 'module-progress';

function getProgress(modulename, component, element){

    var object = Cookies.getJSON(progressCookieName);

    if (component === undefined){
        return object[modulename];
    }
    else if (element === undefined){
        return object[modulename].components[component];
    }
    else {
        return object[modulename].components[component].element[element].status;
    }
}

function updateProgress(modulename, component, element, status){
    var object = Cookies.getJSON(progressCookieName);
    object[modulename].components[component].element[element].status = status;
    Cookies.set(progressCookieName, object);
    return object;
}

//Set up cookie "Schema"
function createProgress(){

    var progress = {};

    for (var i = 0; i < modules.length; i++) {
        
        progress[modules[i]] = new module({
            'objectives' : new component({
                'objectives' : new element(false),
            }),
            'case-study' : new component({
                'margret' : new element(false),
                'franny' : new element(false),
                'luigi' : new element(false),
                'agit' : new element(false),
            }),
            'more-on-topic' : new component({
                'holisticcare' : new element(false),
                'careofanolderadult' : new element(false),
                'chronicconditions' : new element(false),
                'careplanning' : new element(false),
                'deliverables&quiz' : new element(false),
            })
    });

    }

    // var progress = {'pcc' : pcc, 'wound' : wound };
    Cookies.set(progressCookieName, progress);
}

function module(components)
{
   this.components=components;
}
function component(element){
    this.element=element;
}
function element(status){
    this.status=status;
}
//Functions for instantiating main Modules Carousel Page
var introInstantiated = false;

function instantiateSlider() {

  if(introInstantiated !== true){

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

  function instantiatePopups(){
    //BEFORE I BEGIN POPUP CODE
    vex.dialog.buttons.YES.text = 'Begin'
    vex.dialog.buttons.NO.text = 'Cancel'
    $('.before-begin-button').click(function () {
      var href = $(this).data('href');
      var prereqs = $(this).data('content');

      console.log(prereqs);


      var beforeBeginningHTML = '<div class="vex-custom-field-wrapper">';
      for (prereq in prereqs)
      {
        beforeBeginningHTML += '<div class="vex-duration">' + prereqs[prereq].duration +'</div>';
        beforeBeginningHTML += '<a href="' + prereqs[prereq].link +'" class="vex-title">' + prereqs[prereq].linktext +'</a>';
        beforeBeginningHTML += '<div class="vex-custom-input-wrapper">';
        beforeBeginningHTML += '<div class="vex-notes">' + prereqs[prereq].text +'</div>';
        beforeBeginningHTML += '</div>';
      }
      beforeBeginningHTML += '</div>';

      vex.dialog.open({
        message: 'Before I Begin',
        input: beforeBeginningHTML,
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

//Declare swiper variables globally
var introSwiper;
var moduleSwiper;

function instantiateIntro() {

    console.log('instantiating intro');
    showMenu();
    darkBackground(true);

    introSwiper = new Swiper('.intro-swiper-container', {
        direction: 'vertical',
        slideClass: 'intro-swiper-slide',
        setWrapperSize: true,
        // touchReleaseOnEdges: true,
        // mousewheelSensitivity: 0,
        // mousewheelReleaseOnEdges: true,
        // autoHeight: true,
        // height: "300%",
        speed: 400,
        hashNavigation: {
            watchState: true,
            replaceState: true,
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

    console.log('instantiating module');
    showMenu();


    moduleSwiper = new Swiper('.module-swiper-container', {
        direction: 'vertical',
        slideClass: 'module-swiper-slide',
        speed: 400,
        mousewheel: {
            invert: false,
        },
        hashNavigation: {
          watchState: true,
          replaceState: true,
      },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
}

function updateMoreOnTopicUI(){
    $('.more-on-topic').each(function(){
        console.log($(this).data('name') + " done: " + getProgress($('.barba-container').data('module'), 'more-on-topic', $(this).data('name')));
        if(getProgress($('.barba-container').data('module'), 'more-on-topic', $(this).data('name'))){
            $(this).children('.narrative-name').css('background-color', "blue");
        }
        
    });
}


// $().ready(function() {
//     // Init
//     var container = $('.narrative'),
//         inner = $('.narrative>img');
  
//     // Mouse
//     var mouse = {
//       _x: 0,
//       _y: 0,
//       x: 0,
//       y: 0,
//       updatePosition: function(event) {
//         var e = event || window.event;
//         this.x = e.clientX - this._x;
//         this.y = (e.clientY - this._y) * -1;
//       },
//       setOrigin: function(e) {
//         this._x = e.offsetLeft + Math.floor(e.offsetWidth / 2);
//         this._y = e.offsetTop + Math.floor(e.offsetHeight / 2);
//       },
//       show: function() {
//         return "(" + this.x + ", " + this.y + ")";
//       }
//     };
  
//     // Track the mouse position relative to the center of the container.
//     mouse.setOrigin(container);
  
//     //----------------------------------------------------
  
//     var counter = 0;
//     var refreshRate = 10;
//     var isTimeToUpdate = function() {
//       return counter++ % refreshRate === 0;
//     };
  
//     //----------------------------------------------------
  
//     var onMouseEnterHandler = function(event) {
//       update(event);
//     };
  
//     var onMouseLeaveHandler = function() {
//       inner.style = "";
//     };
  
//     var onMouseMoveHandler = function(event) {
//       if (isTimeToUpdate()) {
//         update(event);
//       }
//     };
  
//     //----------------------------------------------------
  
//     var update = function(event) {
//       mouse.updatePosition(event);
//       updateTransformStyle(
//         (mouse.y / inner.offsetHeight / 2).toFixed(2),
//         (mouse.x / inner.offsetWidth / 2).toFixed(2)
//       );
//     };
  
//     var updateTransformStyle = function(x, y) {
//       var style = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
//       inner.style.transform = style;
//       inner.style.webkitTransform = style;
//       inner.style.mozTranform = style;
//       inner.style.msTransform = style;
//       inner.style.oTransform = style;
//     };
  
//     //--------------------------------------------------------
  
//     container.onmousemove = onMouseMoveHandler;
//     container.onmouseleave = onMouseLeaveHandler;
//     container.onmouseenter = onMouseEnterHandler;
//   });
$().ready(function () {   
    
});

function initializeBranching() { 
    console.log('instantiating branching');

    setBackground($('.narrative-primary').data('background'), 'high');
    showMenu();

    var answerCount = 0;

    $('.narrative-answer').click(function(){
        console.log('ya clicked: ' + $(this).attr('href'));
        var nextQuestion = $(this).attr('href');
        setBackground($('.question-container[data-narrative="' + nextQuestion + '"]').data('background'), 'high');
        $('.question-container').hide();
        $('.question-container[data-narrative="' + nextQuestion + '"]').show();
        answerCount++;

        if(answerCount > 1){
            $('.narrative-back').show();
        }

        return false;
    });
}
function initializeCaseStudy(){

    console.log('instantiating case study');

    lightBackground(false);
    showMenu();

}

function finalizeCaseStudy(){
    console.log('finalizing case study');
    var caseStudyContainerWaypoint = new Waypoint({
        element: $('.case-study-container'),
        handler: function(direction) {
            console.log(direction);
            if(direction == 'down'){
                darkMenu();
            }
            else {
                lightMenu();
            }          
        },
        offset: -10 
      });

      //Set up case study accordions
      $( ".accordion" ).accordion({
        animate: 200,
        collapsible: true,
        active: false,
        icons: { "header": "ui-icon-plus", "activeHeader": "ui-icon-minus" }
      });
}
function instantiateMore() { 

    showMenu();

}
//Global variable that states whaether or not a backgorund image should be displayed
var showBackgroundImage = false;

//Function for changing the Homehealth background during async page loads
function darkBackground(menu){
    // clearBackground();
    $('body').animate({backgroundColor: '#161616'}, 'slow');
    if(menu){
        lightMenu();
    }
    else {
        darkMenu();
    }
}

function lightBackground(menu){
    // clearBackground();
    $('body').animate({backgroundColor: '#ffffff'}, 'slow');
    if(menu){
        darkMenu();
    }
    else {
        lightMenu();
    }
}

function setBackground(image, presence){
    presence = (presence !== undefined) ? presence : 'low';
    var currentBG = $( ".background" ).first().css('background-image');
    currentBG = currentBG.replace('url("','').replace('")','').replace(/^.*\/\/[^\/]+/, '');

    // console.log("Current Image: " + currentBG);
    // console.log("Future Image: " + image);

    if(currentBG != image){
        showBackgroundImage = true;
        $( ".background" ).stop( true, false ).fadeOut("slow", function() {

            if(presence == 'low'){
                $(this).remove().clone().appendTo('body').hide().css({"background-image":"url(" + image +")", "filter":"blur(5px)", "opacity":"0.2"}).waitForImages(true).done(function() {
                    // All descendant images have loaded, now slide up.
                    if(showBackgroundImage){
                        $(this).fadeIn("slow");
                    } 
                });
            }
            else if(presence == 'high'){
                $(this).remove().clone().appendTo('body').hide().css({"background-image":"url(" + image +")", "filter":"blur(0px)", "opacity":"0.4"}).waitForImages(true).done(function() {
                    // All descendant images have loaded, now slide up.
                    if(showBackgroundImage){
                        $(this).fadeIn("slow");
                    } 
                });
            }

        });
    }
    else {
        // console.log('correct image already set, chill out');
    }

    
    
    
    // $('.background').css({"background-image":"url(" + image +")"});
    
}

function clearBackground(){
    showBackgroundImage = false;
    $(".background").stop( true, false ).fadeOut(function(){
        $(this).css({"background-image":"unset"})
    });
    $(".background").not(':last').remove();
}

function lightMenu(){
    $('.menubar, .menubar a').animate({color: '#fff'}, 'fast');
    $(".menu-icon").children().children().children().attr("stroke","#fff");
    // if(allRects){
    //     allRects.animate({ stroke: "#fff" }, 500);
    // }
    
}

function darkMenu(){
    $('.menubar, .menubar a').animate({color: '#000'}, 'z');
    $(".menu-icon").children().children().children().attr("stroke","#000");
    // if(allRects){
    //     allRects.animate({ stroke: "#000" }, 500);
    // }
}

function hideMenu(){
    // $('.module-menu').fadeOut();
}
function showMenu(){
    $('.module-menu').fadeIn();
}