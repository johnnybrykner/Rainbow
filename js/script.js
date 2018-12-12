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
if (document.querySelector(".instafeed")) {
    feedTheInsta();
}

function feedTheInsta() {
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
}


    /*--------------------------------------------------Fetch WP--------------------------------------------------*/

    /*let begin = [],
        end = [],
        machineBegin = [],
        machineEnd = [],
        events = [];

    fetch("http://skif-patria.pl/wordpress/wp-json/wp/v2/tags")
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
    }*/



    fetch("http://skif-patria.pl/wordpress/wp-json/wp/v2/posts")
        .then(function (response) {
            return response.json();
        })
        .then(json => {
            appendWPpost(json);
        });

    function appendWPpost(post) {
        let news = [],
            linez = [],
            archive = [];
        for (let i = 0, a = 0; i===2, a < Object.keys(post).length; i++, a++) {
            if (document.querySelector(".posts-container")) {
                news[i] = document.querySelector(".posts-container").insertBefore(document.createElement("article"), null);
                news[i].innerHTML = `<h2>${post[i].title.rendered}</h2><p>${post[i].content.rendered}</p>`;
                news[i].classList.add("article", i);
            }

            if (document.querySelector(".archive-container")) {
                archive[a] = document.querySelector(".archive-container").insertBefore(document.createElement("article"), null);
                archive[a].innerHTML = `<h2>${post[a].title.rendered}</h2><p>${post[a].content.rendered}</p>`;
                archive[a].classList.add("article", a);
            }
            linez[a] = document.querySelector(".posts-container, .archive-container").insertBefore(document.createElement("hr"), null);
            linez[a].classList.add("line");
        }
        console.log(news, archive);
    }



    fetch('http://skif-patria.pl/wordpress/wp-json/tribe/events/v1/events')
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            appendEvents(json.events);
        });

    function appendEvents(events) {
        let wydarzenia = [];

        for (let i = 0; i < events.length; i++) {
            let event = {};
            event.start = events[i].start_date;
            event.end = events[i].end_date;
            event.title = events[i].title;
            event.allDay = events[i].all_day;
            wydarzenia[i] = event;
        }

        console.log(wydarzenia);
        if (document.querySelector("#calendar")) {
            $('#calendar').fullCalendar({
                locale: "pl",
                events: wydarzenia,
                eventBackgroundColor: "#E01734",
                eventTextColor: "white",
                defaultView: 'agenda',
                dayCount: 7,
                height: 100,
                allDayText: "They took our room"
            });
        }
    }



})(jQuery); // End of use strict
