document.addEventListener("DOMContentLoaded", function() {
    new Vue({
        el: '#page',
        data() {
            return {
                lang: 'pl',
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
                    index_top_summary: {
                        pl: 'Akademickie Stowarzyszenie Kultury i Folkloru przy Uniwersytecie Śląskim',
                        en: ''
                    },
                    index_top_we_are: {
                        pl: 'Jesteśmy organizacją pożytku publicznego',
                        en: ''
                    },
                    index_events_heading: {
                        pl: 'Wydarzenia',
                        en: 'Upcoming events',
                    },
                    index_posts_heading: {
                        pl: 'Najnowsze posty',
                        en: 'News',
                    },
                    index_posts_button_older: {
                        pl: 'zobacz więcej →',
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
                        pl: 'Patria 2020',
                        en: 'Patria 2020',
                    },
                    about_header_heading: {
                        pl: 'Naszą misją jest promowanie polskiej kultury ludowej i dziedzictwa narodowego.',
                        en: 'Our mission is to promote Polish folk culture and keep our heritage alive.',
                    },
                    about_section_one_heading: {
                        pl: 'Stowarzyszenie "PATRIA" jest organizacją pożytku publicznego, które zostalo założone w 2004 roku przez wychowanków Studenckiego Zespołu Pieśni i Tańca "KATOWICE" przy Uniwersytecie Śląskim.',
                        en: 'Patria is a non-profit public organization. Founded in 2005, it consists of former members of a Polish student folk song and dance ensemble “Katowice”.',
                    },
                    about_section_two_heading: {
                        pl: 'Nasza misja',
                        en: 'Our mission',
                    },
                    about_section_two_descr: {
                        pl: 'Pomysł utworzenia Stowarzyszenia Patria narodził się w czasie jednej z naszych podróży zagranicznych wśród byłych członków  zespołu "Katowice". Celem organizacji było zgromadzenie ludzi, którzy podzielają pasję do polskiej kultury ludowej i których misją jest kultywowanie i rozpowszechnianie.',
                        en: 'The idea of forming Patria came from the former and current members of “Katowice” during one of our trips abroad. The goal of the organization was to gather people who share the same passion for Polish folk culture and whose mission is to keep it alive. We do it by organizing shows, concerts and workshops all over the world. That way we can ensure our cultural heritage reaching the young generations. Poland has an unique cultural identity and we find it very important to preserve it in the modern days.',
                    },
                    about_support_heading: {
                        pl: 'Patria jest czymś więcej niż tylko stowarzyszeniem, jesteśmy rodziną',
                        en: 'Patria is more than just an association, it’s a family.',
                    },
                    about_support_how_to: {
                        pl: 'Potrzebujemy Twojego wsparcia, aby nasza rodzina mogła się rozwijać. Organizacja koncertów i warsztatów kosztuje nie tylko czas, ale i pieniądze. Wesprzyj nas przekazując 1% swojego podatku. Ciebie to nic nie kosztuje a nam bardzo pomaga.',
                        en: 'We need your support to keep our family growing. Organizing shows and workshop costs not only time, but also money. Support us by donating 1% of your tax. It doesn\'t cost you anything, but it helps us a lot.',
                    },
                    about_support_transfer: {
                        pl: 'Możesz również wpłacić na nasze konto dowolną kwotę. Dziękujemy!',
                        en: 'You can also use our account and deposit any amount. Thank you!',
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
                        pl: 'ARCHIWUM WYDARZEŃ',
                        en: 'NEWS ARCHIVE',
                    },
                },
            }
        },
        methods: {
            langSwitch(key) {
                return this.texts[key][this.lang];
            }
            // changeLang() {
            //     this.lang === 'pl' ? this.lang = 'en' : this.lang = 'pl';
            //     localStorage.setItem('lang', this.lang);
            // }
        }
    })
})

