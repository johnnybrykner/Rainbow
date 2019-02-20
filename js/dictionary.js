document.addEventListener("DOMContentLoaded", function() {
    new Vue({
        el: '#page',
        data() {
            return {
                lang: localStorage.getItem('lang') ? localStorage.getItem('lang') : 'pl',
                texts: {
                    nav_lang_switch: {
                        pl: 'EN',
                        en: 'PL',
                    },
                    nav_item_events: {
                        pl: 'Wydarzenia',
                        en: 'Events',
                    },
                    nav_item_news: {
                        pl: 'Nowości',
                        en: 'News',
                    },
                    nav_item_about: {
                        pl: 'O nas',
                        en: 'About',
                    },
                    nav_item_contact: {
                        pl: 'Kontakt ',
                        en: 'Contact',
                    },
                    nav_item_support: {
                        pl: 'Wesprzyj Patrię ',
                        en: 'Support Patria',
                    },
                    index_header_weare: {
                        pl: 'Jesteśmy',
                        en: 'We are',
                    },
                    index_events_heading: {
                        pl: 'Nadchodzące wydarzenia',
                        en: 'Upcoming events',
                    },
                    index_posts_heading: {
                        pl: 'Najnowsze posty',
                        en: 'News',
                    },
                    index_posts_button_older: {
                        pl: 'Starsze posty →',
                        en: 'Older posts →',
                    },
                    index_insta_heading: {
                        pl: 'Patria na Instagramie',
                        en: 'Patria on Instagram',
                    },
                    index_insta_button_more: {
                        pl: 'Więcej na Instagramie',
                        en: 'More on Instagram',
                    },
                    footer_button_support: {
                        pl: 'Wesprzyj Patrię',
                        en: 'Support Patria',
                    },
                    footer_copyright: {
                        pl: 'Patria 2019',
                        en: 'Patria 2019',
                    },
                    about_header_heading: {
                        pl: 'Naszą misją jest promowanie polskiej kultury ludowej i pielęgnowanie naszego dziedzictwa.',
                        en: 'Our mission is to promote Polish folk culture and keep our heritage alive.',
                    },
                    about_section_one_heading: {
                        pl: 'Patria jest organizacją publiczną typu non-profit. Założona w 2005 roku, składa się z byłych członków studenckiego studenckiego zespołu pieśni i tańca ludowego "Katowice".',
                        en: 'Patria is a non-profit public organization. Founded in 2005, it consists of former members of a Polish student folk song and dance ensemble “Katowice”.',
                    },
                    about_section_two_heading: {
                        pl: 'Nasza misja',
                        en: 'Our mission',
                    },
                    about_section_two_descr: {
                        pl: 'Pomysł utworzenia Patrii narodził się w czasie jednej z naszych podróży zagranicznych od byłych i obecnych członków  zespołu "Katowice". Celem organizacji było zgromadzenie ludzi, którzy podzielają tę samą pasję do polskiej kultury ludowej i których misją jest utrzymanie jej przy życiu. Organizujemy pokazy, koncerty i warsztaty na całym świecie. W ten sposób możemy zapewnić młodym pokoleniom dostęp do naszego dziedzictwa kulturowego. Polska ma unikalną tożsamość kulturową i bardzo ważne jest dla nas zachowanie jej w dzisiejszych czasach.',
                        en: 'The idea of forming Patria came from the former and current members of “Katowice” during one of our trips abroad. The goal of the organization was to gather people who share the same passion for Polish folk culture and whose mission is to keep it alive. We do it by organizing shows, concerts and workshops all over the world. That way we can ensure our cultural heritage reaching the young generations. Poland has an unique cultural identity and we find it very important to preserve it in the modern days.',
                    },
                    about_support_heading: {
                        pl: 'Patria jest czymś więcej niż tylko zgromadzeniem, jesteśmy rodziną',
                        en: 'Patria is more than just an association, it’s a family.',
                    },
                    about_support_how_to: {
                        pl: 'Potrzebujemy Twojego wsparcia, aby nasza rodzina mogła się rozwijać. Organizacja pokazów i warsztatów kosztuje nie tylko czas, ale i pieniądze. Wesprzyj nas przekazując 1% swojego podatku. Ciebie to nic nie kosztuje a nam bardzo pomaga.',
                        en: 'We need your support to keep our family growing. Organizing shows and workshop costs not only time, but also money. Support us by donating 1% of your tax. It doesn\'t cost you anything, but it helps us a lot.',
                    },
                    about_contact_heading: {
                        pl: 'Skontaktuj się z nami!',
                        en: 'Contact us',
                    },
                    about_contact_collab: {
                        pl: 'Będziemy bardzo szczęśliwi mogąc wystąpić na Twojej imprezie. Jeśli masz jakiś projekt lub pomysł, w którym moglibyśmy Ci pomóc, nie wahaj się - napisz do nas wiadomość!',
                        en: 'We would be more than happy to perform at your event. If you have any project or an idea on your mind that we could help you with, don\'t be shy - shoot us a message!',
                    },
                    about_contact_email: {
                        pl: 'Wyślij do nas e-mail',
                        en: 'Email us',
                    },
                    about_contact_call: {
                        pl: 'Zadzwoń do nas',
                        en: 'Call us',
                    },
                    about_contact_follow: {
                        pl: 'Obserwuj nas na Instagramie',
                        en: 'Follow us on Instagram',
                    },
                    archive_header_heading: {
                        pl: 'ARCHIWUM NOWOŚCI',
                        en: 'NEWS ARCHIVE',
                    },
                },
            }
        },
        methods: {
            langSwitch(key) {
                return this.texts[key][this.lang];
            },
            changeLang() {
                this.lang === 'pl' ? this.lang = 'en' : this.lang = 'pl';
                localStorage.setItem('lang', this.lang);
            }
        }
    })
})

