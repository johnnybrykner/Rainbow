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

    $(".navbar-toggler").click(function () {
        $(".burger-line1, .burger-line2, .burger-line3").toggleClass("change");
        $("body").toggleClass("overflown");
    });

    $(".nav-link").click(function () {
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
            console.log(json);
        });

    function appendWPpost(post) {
        let news = [],
            linez = [],
            archive = [];
        if (document.querySelector(".posts-container")) {
            for (let i = 0; i < 3; i++) {
                news[i] = document.querySelector(".posts-container").insertBefore(document.createElement("article"), null);
                news[i].innerHTML = `<h2>${post[i].title.rendered}</h2><p>${post[i].content.rendered}</p><small>${humanize(post[i].date)}</small>`;
                news[i].classList.add("article", i);
                linez[i] = document.querySelector(".posts-container").insertBefore(document.createElement("hr"), null);
                linez[i].classList.add("line");
            }
        }
        if (document.querySelector(".archive-container")) {
            for (let i = 0; i < Object.keys(post).length; i++) {
                archive[i] = document.querySelector(".archive-container").insertBefore(document.createElement("article"), null);
                archive[i].innerHTML = `<h2>${post[i].title.rendered}</h2><p>${post[i].content.rendered}</p><small>${humanize(post[i].date)}</small>`;
                archive[i].classList.add("article", i);
                linez[i] = document.querySelector(".archive-container").insertBefore(document.createElement("hr"), null);
                linez[i].classList.add("line");
            }
        }
    }

    function humanize(date) {
        let split = date.split(/[-T\s]/g);
        return `Published ${split[2]}.${split[1]}.${split[0]} at ${split[3]}`;
    }

    function monthize(date) {
        let split = date.split(/[-T\s]/g),
            monthnames = ["0", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return monthnames[Number(split[1])] + ", " + split[0];
    }

    function dayize(date) {
        let split = date.split(/[-T\s]/g);
        return split[2];
    }

    function timize(date) {
        let split = date.split(/[-T\s]/g);
        return split[3];
    }



    fetch('http://skif-patria.pl/wordpress/wp-json/tribe/events/v1/events')
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            appendEvents(json.events);
            console.log(json.events);
        });

    function appendEvents(events) {
        for (let i = 0; i < events.length; i++) {
            let event = {};
            event.start = events[i].start_date;
            event.end = events[i].end_date;
            event.title = events[i].title;
            if (events[i].venue.length !== 0) {
                event.venue = ' at ' + events[i].venue.venue + ", " + events[i].venue.city;
            } else {
                event.venue = "";
            }
            //event.allDay = events[i].all_day;
            wydarzenia[i] = event;
        }

        for (let i = 0; i < boxes.length; i++) {
            let day = dayize(wydarzenia[i].start),
                month = monthize(wydarzenia[i].start),
                time;
            if (timize(wydarzenia[i].start) === "00:00:00") {
                time = "All day";
            } else {
                time = timize(wydarzenia[i].start);
            }
            labels[i].innerHTML = '<h3>' + month + '</h3>';
            boxes[i].innerHTML += '<h4>' + day + '</h4>' + '<p>' + wydarzenia[i].title + wydarzenia[i].venue + ", " + time + '</p>';
        }

        /*if (document.querySelector("#calendar")) {
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
        }*/
    }



    /*--------------------------------------------------Event Swiping--------------------------------------------------*/

    let wydarzenia = [],
        boxes = document.querySelectorAll(".event-showcase"),
        labels = document.querySelectorAll(".event__month"),
        counter = 2;

    console.log(boxes, wydarzenia);

    if (document.querySelector(".calendar")) {
        if (counter > 1) {document.querySelector(".left").classList.add(".hidden")}
        document.querySelector(".right").addEventListener("click", function() {
            if (counter < wydarzenia.length-counter) {
                counter ++;
                document.querySelector(".left").classList.remove(".hidden");
                let newOne = document.querySelector(".calendar").insertBefore(document.createElement("figure"), null);
                newOne.classList.add("event-showcase");

                boxes[0].parentNode.removeChild(boxes[0]);
                boxes = document.querySelectorAll(".event-showcase");
                console.log(boxes);
                newOne.innerHTML = `<section class="event__month"><h3>${monthize(wydarzenia[counter].start)}</h3></section><h4>${dayize(wydarzenia[counter].start)}</h4><p>${wydarzenia[counter].title} ${wydarzenia[counter].venue}</p>`;
            }
        });

        document.querySelector(".left").addEventListener("click", function() {
            if (counter > 2) {
                counter --;
                console.log(counter);
                let newOne = document.querySelector(".calendar").insertBefore(document.createElement("figure"), null);
                newOne.classList.add("event-showcase");

                boxes[2].parentNode.removeChild(boxes[2]);
                boxes = document.querySelectorAll(".event-showcase");
                console.log(boxes);
                boxes[1].innerHTML = `<section class="event__month"><h3>${monthize(wydarzenia[counter-1].start)}</h3></section><h4>${dayize(wydarzenia[counter-1].start)}</h4><p>${wydarzenia[counter-1].title} ${wydarzenia[counter-1].venue}</p>`;
                boxes[0].innerHTML = `<section class="event__month"><h3>${monthize(wydarzenia[counter-2].start)}</h3></section><h4>${dayize(wydarzenia[counter-2].start)}</h4><p>${wydarzenia[counter-2].title} ${wydarzenia[counter-2].venue}</p>`;
                newOne.innerHTML = `<section class="event__month"><h3>${monthize(wydarzenia[counter].start)}</h3></section><h4>${dayize(wydarzenia[counter].start)}</h4><p>${wydarzenia[counter].title} ${wydarzenia[counter].venue}</p>`;
            }
        });
    }



})(jQuery); // End of use strict
