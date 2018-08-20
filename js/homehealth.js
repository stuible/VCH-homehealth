//Global Variable for last viewed slide on modules page
var lastmoduleSlide = "";
var lastmoduleSection = "";
var allRects = null;

function lightMenu() {
    setMenu('light');
}

function darkMenu() {
    setMenu('dark');
}

function setMenu(menu) {

    switch (menu) {
        case 'dark':

            $('.menubar').removeClass('white');
            $('.menubar, .menubar a').stop( true, false ).animate({ color: '#000' }, 'z');
            $(".menu-icon").children().stop( true, false ).children().children().attr("stroke", "#000");
            menuIsLight = false;

            break;

        case 'light':

            $('.menubar').removeClass('white');
            $('.menubar, .menubar a').stop( true, false ).animate({ color: '#fff' }, 'fast');
            $(".menu-icon").children().children().children().attr("stroke", "#fff");
            menuIsLight = true;

            break;

        case 'white':

            setMenu('dark');
            $('.menubar').addClass('white');
            addMenuDropshadowWaypoint();

            break;

        default:
            break;
    }

}

function hideMenu() {
    // $('.module-menu').fadeOut();
}
function showMenu() {
    $('.module-menu').fadeIn();
}

function setBreadcrumbs(containerEl) {
    console.log($(containerEl).data('nav-text'));
    console.log($(containerEl).data('nav-url'));

    var navText = $(containerEl).data('nav-text');
    var navUrl = $(containerEl).data('nav-url');

    $(".menu-name").empty();

    jQuery.each(navText, function (i) {
        var classText = "";
        if (i == 0) classText = " class=\"module-menu\" ";

        //Check if last breadcrumb
        if (i == navText.length - 1) {
            //If last, then don't add breadcrum '>' symbol
            // if(i == 0) $(".menu-name").append('<a ' + classText + 'href="' + baseurl + navUrl[i] + '#' + navText[i + 1].replace(/\s+/g, '-') +'">' + this + '</a>');
            $(".menu-name").append('<a ' + classText + 'href="' + baseurl + navUrl[i] + '">' + this + '</a>');
        }
        else {
            //If not, then add '>' symbol
            if(i == 0) $(".menu-name").append('<a ' + classText + 'href="' + baseurl + navUrl[i] + '#' + navText[i + 1].replace(/\s+/g, '-') +'">' + this + '</a><span> > </span>');
            else if(i == 1) $(".menu-name").append('<a ' + classText + 'href="' + baseurl + navUrl[i] + '#' + lastmoduleSection +'">' + this + '</a><span> > </span>');
            else  $(".menu-name").append('<a ' + classText + 'href="' + baseurl + navUrl[i] + '">' + this + '</a><span> > </span>');
        }

    });
}

function addMenuDropshadowWaypoint() {
    var menuWaypoint = new Waypoint({
        element: $('.menubar'),
        handler: function (direction) {

            if (direction == 'down') $('.menubar').addClass('shadow');
            else $('.menubar').removeClass('shadow');

        },
        offset: '-20px'
    });
}

function removeMenuDropshadowWaypoint() {
    $('.menubar').waypoint('destroy');
}

function drawModulesIcon(){
    //Draw modules icon
    var s = Snap();
    var mainRect = s.rect(18, 5, 20, 20, 2);
    var rightRect = s.rect(43, 10, 10, 10, 2);
    var leftRect = s.rect(3, 10, 10, 10, 2);
    var farleftRect = s.rect(-16, 10, 10, 10, 2);

    var allRects = s.group(mainRect, rightRect, leftRect, farleftRect);

    var strokeColour;

    if (menuIsLight) strokeColour = '#fff';
    else strokeColour = '#000';

    mainRect.attr({
        fill: "none",
        stroke: strokeColour,
        strokeWidth: 2,
        "vector-effect": "non-scaling-stroke"

    });

    rightRect.attr({
        fill: "none",
        stroke: strokeColour,
        strokeWidth: 2,
        "vector-effect": "non-scaling-stroke"
    });

    leftRect.attr({
        fill: "none",
        stroke: strokeColour,
        strokeWidth: 2,
        "vector-effect": "non-scaling-stroke"
    });

    farleftRect.attr({
        fill: "none",
        stroke: strokeColour,
        strokeWidth: 2,
        "vector-effect": "non-scaling-stroke"
    });

    var container = document.getElementsByClassName("menu-icon");
    $(container).append(s.node);

    //Animate Icon on mouse enter
    $('.menubar').on("mouseenter", ".module-menu", function (e) {
        if (currentPage != 'modules') {
            allRects.animate({ transform: 'translate(20,0)' }, 700, mina.bounce);
            mainRect.animate({ transform: 's0.5,0.5' }, 700, mina.bounce);
            leftRect.animate({ transform: 's2,2' }, 700, mina.bounce);
        }
        else {
            //mainRect.animate({ transform: 's1.4,1.4' }, 700,  mina.bounce);
            //leftRect.animate({ opacity: '0' }, 500);
            //rightRect.animate({ opacity: '0' }, 500);
        }
    });

    //Animate icon back on mouse leave
    $('.menubar').on("mouseleave", ".module-menu", function (e) {
        if (currentPage != 'modules') {
            allRects.animate({ transform: 'translate(0,0)' }, 700, mina.bounce);
            mainRect.animate({ transform: 's1,1' }, 700, mina.bounce);
            leftRect.animate({ transform: 's1,1' }, 700, mina.bounce);
        }
        else {
            //mainRect.animate({ transform: 's1,1' }, 700,  mina.bounce);
            //leftRect.animate({ opacity: '1' }, 500);
            //rightRect.animate({ opacity: '1' }, 500);
        }
    });

    //Reset icon on mouse click
    $('.menubar').on("click", ".module-menu", function (e) {
        allRects.animate({ transform: 'translate(0,0)' }, 700, mina.bounce);
        mainRect.animate({ transform: 's1,1' }, 700, mina.bounce);
        leftRect.animate({ transform: 's1,1' }, 700, mina.bounce);
        leftRect.animate({ opacity: '1' }, 500);
        rightRect.animate({ opacity: '1' }, 500);
    });


    //mainRect.animate({ transform:'translateX(-5)'}, 700, mina.bounce );
    //mainRect.animate({ transform:'translateY(-5)'}, 700, mina.bounce );

    // mainRect.animate({ry:1}, 220, function(){
    //  mainRect.animate({ry: 90}, 300);
    //  }); 
}
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
var progressCookieName = 'module-progress';

function getProgress(modulename, component, element){

    console.log("getting progress for " + modulename + ": " + component + " | " + element);

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
                'careofolderadults' : new element(false),
                'chronicconditions' : new element(false),
                'medicationmanagement' : new element(false),
                'deliverables' : new element(false),
            })
    });

    }

    // var progress = {'pcc' : pcc, 'wound' : wound };
    Cookies.set(progressCookieName, progress);
}

function module(components){
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
    vex.dialog.buttons.YES.text = 'Begin';
    vex.dialog.buttons.NO.text = 'Cancel';
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
      });
      $('.vex-content').prepend('<div class="prereq-image" style="background-image: url(\'../' + baseurl + 'image/modules/' + imageURL +'\')"></div><div class="prereq-image-placeholder"></div>');
    });
    
  }
//functions for instantiating Introdunction and individual module pages

//Declare swiper variables globally
var introSwiper;
var moduleSwiper;

function instantiateIntro() {

    console.log('instantiating intro');
    showMenu();
    Waypoint.destroyAll();
    darkBackground(true);

    introSwiper = new Swiper('.intro-swiper-container', {
        direction: 'vertical',
        slideClass: 'intro-swiper-slide',
        setWrapperSize: true,
        init: false,
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
        on: {
            init: function () {
                $('.intro-swiper-container').addClass('initialized');
            },
        },
    });

    //Update variable with the last slide the user saw on the module page
    introSwiper.on('slideChange', function () {
        lastmoduleSection = $(introSwiper.slides[introSwiper.activeIndex]).data('hash');
        console.log('last module section was: ' + lastmoduleSection);

    });
    introSwiper.on('init', function () {
        introSwiper.update();
    });
    introSwiper.init();
}

function instantiateModule() {

    console.log('instantiating module');
    showMenu();


    moduleSwiper = new Swiper('.module-swiper-container', {
        direction: 'vertical',
        slideClass: 'module-swiper-slide',
        speed: 400,
        init: false,
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
        on: {
            init: function () {
                $('.module-swiper-container').addClass('initialized');
            },
        },
    });

    //Update variable with the last slide the user saw on the module page
    moduleSwiper.on('slideChange', function () {
        lastmoduleSection = $(moduleSwiper.slides[moduleSwiper.activeIndex]).data('hash');
        console.log('last module section was: ' + lastmoduleSection);

    });
    moduleSwiper.on('init', function () {
        moduleSwiper.update();
    });
    moduleSwiper.init();
}

function updateMoreOnTopicUI() {
    $('.more-on-topic').each(function () {
        console.log($(this).data('name') + " done: " + getProgress($('.barba-container').data('module'), 'more-on-topic', $(this).data('name')));
        if (getProgress($('.barba-container').data('module'), 'more-on-topic', $(this).data('name'))) {
            $(this).addClass('done');
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

    Waypoint.destroyAll();
    lightBackground(false);
    showMenu();

}

function finalizeCaseStudy(){
    console.log('finalizing case study');
    var prevDirection = "";
    var caseStudyContainerWaypoint = new Waypoint({
        element: $('.case-study-container'),
        handler: function(direction) {
            console.log(direction);
            if(direction != prevDirection){
                if(direction == 'down'){
                    prevDirection = 'down';
                    setMenu('white');
                }
                else {
                    prevDirection = 'up';
                    lightMenu();
                }
            }         
        },
        offset: -5
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
    Waypoint.destroyAll();

    instantiateMultipleChoiceQuiz();
    instantiateMatchingQuiz();

}

function instantiateMultipleChoiceQuiz() {
    $('.quiz.answer').on("click", function () {
        console.log('clicked answer: ');
        console.log($(this).children('input').prop("checked", !$(this).children('input').prop("checked")));
        $(this).children('input').change();

    });

    $('.button-container').on("click", '.quiz.button.submit', function () {
        //Check if user didn't make a selection
        if (!$("input[name=multiple-select-quiz]").is(':checked')) {
            vex.dialog.alert("Please chose at least one answer");
        }
        else {
            console.log('you slected at least one asnwer');
            var incorrectAnwers = [];
            $("input[name=multiple-select-quiz]").each(function (i) {

                if ($(this).is(':checked') && $(this).data('correct') == true) {
                    console.log('For Quesiton ' + i + ': U WAS RIGHT');
                }
                else if (!$(this).is(':checked') && $(this).data('correct') == false) {
                    console.log('For Quesiton ' + i + ': U WAS RIGHT');
                }
                else {
                    console.log('For Quesiton ' + i + ': U WAS WRONG');
                    incorrectAnwers.push(this);
                }
            });
            if (incorrectAnwers.length > 0) {
                console.log('YOU FAILED');
                // $('.quiz.feedback').addClass('incorrect');
                showQuizScreen('.quiz', 'incorrect', 'Wrong', 'You were wrong', 'again', 'Try Again');
            }
            else {
                console.log('YOU NAILED IT');
                // $('.quiz.feedback').addClass('correct');
                showQuizScreen('.quiz', 'correct', 'Correct', 'You were right', 'back', 'Back');
            }
        }
    });

    $('.button-container').on("click", '.quiz.button.again', function () {
        hideQuizScreen('.quiz', 'incorrect', 'again');
    });
    $('.button-container').on("click", '.quiz.button.back', function () {
        hideQuizScreen('.quiz', 'correct', 'back');
    });
}

function instantiateMatchingQuiz() {
    var dropped = false;

    //Counter
    counter = 0;
    //Make element draggable
    $(".matching-answer").draggable({
        helper: 'clone',
        containment: 'frame',
        revert: true,
        //When first dragged
        start: function (event, ui) {
            $(ui.helper).children('.seven').remove();
        },
        stop: function (ev, ui) {

            var pos = $(ui.helper).offset();
            objName = "#clonediv" + counter;
            $(objName).css({
                "left": pos.left,
                "top": pos.top
            });
            $(objName).removeClass("drag");
            //When an existiung object is dragged
            $(objName).draggable({
                containment: 'parent',
                stop: function (ev, ui) {
                    var pos = $(ui.helper).offset();
                    console.log($(this).attr("id"));
                    console.log(pos.left);
                    console.log(pos.top);
                }
            });
        }
    });

    $('.matching-option').droppable({
        accept: '.matching-answer',
        drop: function (event, ui) {
            var category = $(ui.draggable).data('category');
            var background = $(ui.draggable).data('background');
            var droppableCircle = $(this).children().first().children().first().children('.matching-circle');
            console.log(category);
            console.log($(this).data('category'));
            if ($(this).data('category') == category) {
                $(ui.helper).remove();
                console.log('correct');
                $(this).addClass('correct');
                console.log(droppableCircle);
                $(droppableCircle).css('background-image', 'url(' + background + ')');
                dropped = true;
            }
            else {
                console.log('incorrect');
                var originalColour = $(droppableCircle).css("border-color");
                $(droppableCircle)  .animate({"border-color" : "red"})
                                    .effect('shake', {distance: 7, times: 3  })
                                    .animate({"border-color" : originalColour});
                $(droppableCircle).css("border-color", "");
                                    
            }


        }
    });
}

function showQuizScreen(quiz, screen, title, description, button, buttonText) {
    $(quiz).children('.response-title').text(title);
    $(quiz).children('.response-description').text(description);
    $(quiz).children('.quiz.feedback').addClass(screen);
    $(quiz).children('.quiz.button.submit').removeClass('submit').addClass(button).text(buttonText);
}

function hideQuizScreen(quiz, screen, button) {
    $(quiz).children('.quiz.feedback').removeClass(screen);
    $(quiz).children('.quiz.button.' + button).removeClass(button).addClass('submit').text('Submit');
}
//Global variable that states whaether or not a backgorund image should be displayed
var showBackgroundImage = false;
var menuIsLight = true;

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
        setMenu('white');
    }
    else {
        // lightMenu();
    }
}

function setBackground(image, presence){
    presence = (presence !== undefined) ? presence : 'low';
    var currentBG = $( ".background" ).first().css('background-image');
    currentBG = currentBG.replace('url("','').replace('")','').replace(/^.*\/\/[^/]+/, ''); //used to be replace(/^.*\/\/[^\/]+/, '')

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
    
}

function clearBackground(){
    showBackgroundImage = false;
    $(".background").stop( true, false ).fadeOut(function(){
        $(this).css({"background-image":"unset"});
    });
    $(".background").not(':last').remove();
}