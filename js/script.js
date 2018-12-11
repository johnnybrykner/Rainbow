(function ($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: (target.offset().top - 54)
                }, 1000, "easeInOutExpo");
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function () {
        $('.navbar-collapse').collapse('hide');
    });

    $( ".navbar-toggler" ).click(function() {
      $(".burger-line1, .burger-line2, .burger-line3" ).toggleClass( "change" );
      $("body").toggleClass("overflown");
    });

    $(".nav-link").click(function() {
      $("body").removeClass("overflown");
      $(".burger-menu div").removeClass("change");
    });
    /*// Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
        target: '#mainNav',
        offset: 56
    });*/

    // Collapse Navbar
    var navbarCollapse = function () {
        if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-shrink");
        } else {
            $("#mainNav").removeClass("navbar-shrink");
        }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);













    /*--------------------------------------------------INSTAFEED--------------------------------------------------*/

    let feed = new Instafeed({
            accessToken: '9393991895.1677ed0.35e5798602e943c28a7e5bc5da8433d3',
            userId: '9393991895',
            get: 'user',
            limit: 6,
            mock: true,
            success: (response) => {
                appendImages(response.data);
            }
        }),
        divs = new Array,
        appendImages = (images) => {
            for (var i = 0; i < images.length; i++) {
                let image = images[i];

                if (image.caption === null) {
                    image.caption = "";
                }

                divs[i] = document.querySelector('.instafeed__images').insertBefore(document.createElement("div"), null);
                divs[i].style.backgroundImage = "url(" + `${image.images.standard_resolution.url}` + ")";
            }
        };
    feed.run();



    /*--------------------------------------------------Fetch WP--------------------------------------------------*/

    let begin = [],
        end = [],
        machineBegin = [],
        machineEnd = [],
        events = [];

    fetch("http://viitek.dk/wp/wp-json/wp/v2/tags")
        .then(function (response) {
            return response.json();
        })
        .then(json => {
            appendWPtag(json);
        });

    function appendWPtag(tag) {
        console.log(tag);
      let crudeBegin = [],
          crudeMachineBegin = [],
          crudeEnd = [],
          crudeMachineEnd = [];
      for (let i = 0; i < Object.keys(tag).length; i+=2) {
          crudeBegin[i] = tag[i].name;
          crudeMachineBegin[i] = machinerize(tag[i].name);
      }
      begin = crudeBegin.filter(function(el) {
          return el != "";
      });
        machineBegin = crudeMachineBegin.filter(function(el) {
            return el != "";
        });
      for (let i = 1; i < Object.keys(tag).length; i+=2) {
          crudeEnd[i] = tag[i].name;
          crudeMachineEnd[i] = machinerize(tag[i].name);
      }
      end = crudeEnd.filter(function(el) {
          return el != "";
      });
        machineEnd = crudeMachineEnd.filter(function(el) {
            return el != "";
        });

        generateEvents();
        initialize();
    }

    function machinerize(date) {
        let split = date.split(/[.\s]/g);
        return `${split[2]}-${split[1]}-${split[0]}T${split[3]}:00.000`;
    }

    function generateEvents() {
        for (let i = 0; i < begin.length; i++) {
            events[i]={
                title: "Wydarzenie",
                start: machineBegin[i],
                end: machineEnd[i]
            }
        }
    }



    fetch("http://viitek.dk/wp/wp-json/wp/v2/posts")
        .then(function (response) {
            return response.json();
        })
        .then(json => {
            appendWPpost(json);
        });

    function appendWPpost(post) {
        let articles = [],
            linez = [];
        for (let i = 0; i < Object.keys(post).length; ++i) {
            articles[i] = document.querySelector(".posts-container").insertBefore(document.createElement("article"), null);
            articles[i].innerHTML = `<h2>${post[i].title.rendered}</h2><p>${post[i].content.rendered}</p><p>Starts: ${begin[i]}</p><p>Ends: ${end[i]}</p><p>Machine will see: ${machineBegin[i]}</p><p>Machine will see: ${machineEnd[i]}</p>`;
            articles[i].classList.add("article", i);
            linez[i] = document.querySelector(".posts-container").insertBefore(document.createElement("hr"), null);
            linez[i].classList.add("line");
        }
    }

console.log(events);
function initialize (){
    $('#calendar').fullCalendar({

        heigth:250,
        events:events


    })
}



})(jQuery); // End of use strict
