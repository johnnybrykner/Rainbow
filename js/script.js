document.addEventListener("DOMContentLoaded", function() {
    "use strict"; // Start of use strict

    window.onload = function() {
        if (document.getElementById(localStorage.getItem('scroll'))) {
            document.getElementById(localStorage.getItem('scroll')).scrollIntoView({behavior: 'smooth', block: 'center'})
        };
    };

    setTimeout(function(){
        // Smooth scrolling
        const redirectLinks = document.querySelectorAll(".link--redirect");
        const scrollLinks = document.querySelectorAll(".link--scroll");
        for (let i=0; i<redirectLinks.length; i++) {
            redirectLinks[i].addEventListener("click", function() {
                localStorage.removeItem('scroll');
            })
        }
        for (let i=0; i<scrollLinks.length; i++) {
            scrollLinks[i].addEventListener("click", function(e) {
                if (window.location.href === e.target.href) { e.preventDefault() };
                localStorage.setItem('scroll', e.target.getAttribute('el'));
                document.getElementById(localStorage.getItem('scroll')).scrollIntoView({behavior: 'smooth', block: 'center'});
            })
        }

        // Closes responsive menu when a scroll trigger link is clicked
        $(".navbar-toggler").click(function () {
            $(".burger-line1, .burger-line2, .burger-line3").toggleClass("change");
            $("body").toggleClass("overflown");
        });

        $(".nav-link, .btn-sm").click(function () {
            $("body").removeClass("overflown");
            $(".burger-menu div").removeClass("change");
            $('.navbar-collapse').collapse('hide');
        });
    }, 10);

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

    fetch("https://skif-patria.pl/wordpress/wp-json/wp/v2/posts")
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
        return `Opublikowane ${split[2]}.${split[1]}.${split[0]} o ${split[3]}`;
    }

    // function monthize(date) {
    //     let split = date.split(/[-T\s]/g),
    //         monthnames = ["0", "Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
    //     return monthnames[Number(split[1])] + ", " + split[0];
    // }

    // function dayize(date) {
    //     let split = date.split(/[-T\s]/g);
    //     return split[2];
    // }

    // function timize(date) {
    //     let split = date.split(/[-T\s]/g);
    //     return split[3].split("").slice(0,5).join("");
    // }



    /*--------------------------------------------------Event Swiping--------------------------------------------------*/

    // let wydarzenia = [],
    //     boxes = [],
    //     labels = [],
    //     counter = 2,
    //     mobile;

    // if (document.querySelector(".calendar")) {
    //     fetch('https://skif-patria.pl/wordpress/wp-json/tribe/events/v1/events')
    //         .then(function (response) {
    //             return response.json();
    //         })
    //         .then(function (json) {
    //             appendEvents(json.events);
    //         });
    // }



    // function appendEvents(events) {
    //     if (window.innerWidth<992) {
    //         boxes[0] = document.querySelector(".calendar").insertBefore(document.createElement("figure"), null);
    //         boxes[0].classList.add("event-showcase");
    //         labels[0] = document.querySelector(".event-showcase").insertBefore(document.createElement("section"), null);
    //         labels[0].classList.add("event__month");
    //         mobile = true;
    //         counter = 0;
    //     } else {
    //         for (let i=0; i<3; i++) {
    //             boxes[i] = document.querySelector(".calendar").insertBefore(document.createElement("figure"), null);
    //             boxes[i].classList.add("event-showcase");
    //             labels[i] = document.querySelectorAll(".event-showcase")[i].insertBefore(document.createElement("section"), null);
    //             labels[i].classList.add("event__month");
    //         }
    //         mobile = false;
    //         counter = 2;
    //     }
        
    //     for (let i = 0; i < events.length; i++) {
    //         let event = {},
    //             time;

    //         event.start = events[i].start_date;
    //         event.end = events[i].end_date;
    //         event.title = events[i].title;
    //         if (events[i].venue.length !== 0) {
    //             event.venue = ' w ' + events[i].venue.venue + ", " + events[i].venue.city;
    //         } else {
    //             event.venue = "";
    //         }
    //         wydarzenia[i] = event;

    //         if (timize(wydarzenia[i].start) === "00:00") {
    //             time = "Cały dzień";
    //         } else {
    //             time = timize(wydarzenia[i].start) + " - " + timize(wydarzenia[i].end);
    //         }
    //         wydarzenia[i].time = time;
    //     }

    //     for (let i = 0; i < boxes.length; i++) {
    //         let day = dayize(wydarzenia[i].start),
    //             month = monthize(wydarzenia[i].start);
    //         labels[i].innerHTML = '<h3>' + month + '</h3>';
    //         boxes[i].innerHTML += '<h4>' + day + '</h4>' + '<p>' + wydarzenia[i].title + wydarzenia[i].venue + '</p>' + '<p>' + wydarzenia[i].time + '</p>';
    //     }

    //     if (counter === 2 || counter === 0) {document.querySelector(".left").classList.add("hidden")}
    //     if (mobile===true) {
    //         if (wydarzenia.length === 1) {document.querySelector(".right").classList.add("hidden")}
    //     }
        
    //     if (mobile===false) {
    //         if (wydarzenia.length < 3) {
    //             document.querySelector(".right").classList.add("hidden");
    //             for (let i=wydarzenia.length; i<3; ++i) {
    //                 labels[i].innerHTML = "<h3>Więcej nadchodzi</h3>";
    //             }
    //         }
    //     }

    //     document.querySelector(".right").addEventListener("click", function() {
    //         if (counter < wydarzenia.length-1) {
    //             counter ++;

    //             document.querySelector(".left").classList.remove("hidden");
    //             if (counter === wydarzenia.length-1) {document.querySelector(".right").classList.add("hidden")}
    //             let newOne = document.querySelector(".calendar").insertBefore(document.createElement("figure"), null);
    //             newOne.classList.add("event-showcase");

    //             boxes[0].parentNode.removeChild(boxes[0]);
    //             boxes = document.querySelectorAll(".event-showcase");
    //             newOne.innerHTML = `<section class="event__month"><h3>${monthize(wydarzenia[counter].start)}</h3></section><h4>${dayize(wydarzenia[counter].start)}</h4><p>${wydarzenia[counter].title} ${wydarzenia[counter].venue}</p><p>${wydarzenia[counter].time}</p>`;
    //         }
    //     });

    //     document.querySelector(".left").addEventListener("click", function() {
    //         if (mobile===false) {
    //             if (counter > 2) {
    //                 counter --;

    //                 document.querySelector(".right").classList.remove("hidden");
    //                 if (counter === 2) {document.querySelector(".left").classList.add("hidden")}
    //                 let newOne = document.querySelector(".calendar").insertBefore(document.createElement("figure"), null);
    //                 newOne.classList.add("event-showcase");
    //                 boxes[2].parentNode.removeChild(boxes[2]);
    //                 boxes = document.querySelectorAll(".event-showcase");
    //                 boxes[1].innerHTML = `<section class="event__month"><h3>${monthize(wydarzenia[counter-1].start)}</h3></section><h4>${dayize(wydarzenia[counter-1].start)}</h4><p>${wydarzenia[counter-1].title} ${wydarzenia[counter-1].venue}</p><p>${wydarzenia[counter-1].time}</p>`;
    //                 boxes[0].innerHTML = `<section class="event__month"><h3>${monthize(wydarzenia[counter-2].start)}</h3></section><h4>${dayize(wydarzenia[counter-2].start)}</h4><p>${wydarzenia[counter-2].title} ${wydarzenia[counter-2].venue}</p><p>${wydarzenia[counter-2].time}</p>`;
    //                 newOne.innerHTML = `<section class="event__month"><h3>${monthize(wydarzenia[counter].start)}</h3></section><h4>${dayize(wydarzenia[counter].start)}</h4><p>${wydarzenia[counter].title} ${wydarzenia[counter].venue}</p><p>${wydarzenia[counter].time}</p>`;
    //             }
    //         } else {
    //             if (counter > 0) {
    //                 counter --;

    //                 document.querySelector(".right").classList.remove("hidden");
    //                 if (counter === 0) {document.querySelector(".left").classList.add("hidden")}
    //                 let newOne = document.querySelector(".calendar").insertBefore(document.createElement("figure"), null);
    //                 newOne.classList.add("event-showcase");
    //                 boxes[0].parentNode.removeChild(boxes[0]);
    //                 boxes = document.querySelectorAll(".event-showcase");
    //                 newOne.innerHTML = `<section class="event__month"><h3>${monthize(wydarzenia[counter].start)}</h3></section><h4>${dayize(wydarzenia[counter].start)}</h4><p>${wydarzenia[counter].title} ${wydarzenia[counter].venue}</p><p>${wydarzenia[counter].time}</p>`;
    //             }
    //         }
    //     });
    // }
}); // End of use strict
