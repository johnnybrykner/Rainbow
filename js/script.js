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









    $(function () {

        $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
            preventSubmit: true,
            submitError: function ($form, event, errors) {
                // additional error messages or events
            },
            submitSuccess: function ($form, event) {
                event.preventDefault(); // prevent default submit behaviour
                // get values from FORM
                var name = $("input#name").val();
                var email = $("input#email").val();
                var phone = $("input#phone").val();
                var message = $("textarea#message").val();
                var firstName = name; // For Success/Failure Message
                // Check for white space in name for Success/Fail message
                if (firstName.indexOf(' ') >= 0) {
                    firstName = name.split(' ').slice(0, -1).join(' ');
                }
                $this = $("#sendMessageButton");
                $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
                $.ajax({
                    url: "././mail/contact_me.php",
                    type: "POST",
                    data: {
                        name: name,
                        phone: phone,
                        email: email,
                        message: message
                    },
                    cache: false,
                    success: function () {
                        // Success message
                        $('#success').html("<div class='alert alert-success'>");
                        $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                        $('#success > .alert-success')
                            .append("<strong>Your message has been sent. </strong>");
                        $('#success > .alert-success')
                            .append('</div>');
                        //clear all fields
                        $('#contactForm').trigger("reset");
                    },
                    error: function () {
                        // Fail message
                        $('#success').html("<div class='alert alert-danger'>");
                        $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                        $('#success > .alert-danger').append($("<strong>").text("Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!"));
                        $('#success > .alert-danger').append('</div>');
                        //clear all fields
                        $('#contactForm').trigger("reset");
                    },
                    complete: function () {
                        setTimeout(function () {
                            $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
                        }, 1000);
                    }
                });
            },
            filter: function () {
                return $(this).is(":visible");
            },
        });

        $("a[data-toggle=\"tab\"]").click(function (e) {
            e.preventDefault();
            $(this).tab("show");
        });
    });

    /*When clicking on Full hide fail/success boxes */
    $('#name').focus(function () {
        $('#success').html('');
    });



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
        }
    feed.run();



    /*--------------------------------------------------Fetch WP--------------------------------------------------*/

    let begin = new Array,
        end = new Array;

    fetch("http://viitek.dk/wp/wp-json/wp/v2/tags")
        .then(function (response) {
            return response.json();
        })
        .then(json => {
            appendWPtag(json);
        });

    function appendWPtag(tag) {
      let crudeBegin = new Array,
          crudeEnd = new Array;
      for (let i = 0; i < Object.keys(tag).length; i+=2) {
          crudeBegin[i] = tag[i].name;
      };
      begin = crudeBegin.filter(function(el) {
          return el != "";
      });
      console.log(begin);
      for (let i = 1; i < Object.keys(tag).length; i+=2) {
          crudeEnd[i] = tag[i].name;
      }
      end = crudeEnd.filter(function(el) {
          return el != "";
      });
      console.log(end);
    }

    fetch("http://viitek.dk/wp/wp-json/wp/v2/posts")
        .then(function (response) {
            return response.json();
        })
        .then(json => {
            appendWPpost(json);
        });



    function appendWPpost(post) {
        let articles = new Array,
            linez = new Array;
        for (let i = 0; i < Object.keys(post).length; ++i) {
            articles[i] = document.querySelector(".posts-container").insertBefore(document.createElement("article"), null);
            articles[i].innerHTML = `<h2>${post[i].title.rendered}</h2> <p>${post[i].content.rendered}</p> <p>Starts: ${begin[i]}</p> <p>Ends: ${end[i]}</p>`;
            articles[i].classList.add("article", i);
            linez[i] = document.querySelector(".posts-container").insertBefore(document.createElement("hr"), null);
            linez[i].classList.add("line");
        };
    }



    function machinerize(date) {
    }





})(jQuery); // End of use strict
