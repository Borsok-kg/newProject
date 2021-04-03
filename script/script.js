window.addEventListener('DOMContentLoaded', () => {
    // eslint-disable-next-line strict
    'use strict';

    // timer
    function countTimer(deadline) {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining() {
            const dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);

            return { timeRemaining, hours, minutes, seconds };
        }

        function updateClock() {
            const timer = getTimeRemaining();

            if (timer.hours < 10) {
                timerHours.textContent = '0' + timer.hours;
            } else {
                timerHours.textContent = timer.hours;
            }

            if (timer.minutes < 10) {
                timerMinutes.textContent = '0' + timer.minutes;
            } else {
                timerMinutes.textContent = timer.minutes;
            }

            if (timer.seconds < 10) {
                timerSeconds.textContent = '0' + timer.seconds;
            } else {
                timerSeconds.textContent = timer.seconds;
            }

            if (timer.timeRemaining > 0) {
                setTimeout(updateClock, 1000);
            } else {
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }
        }

        updateClock();
    }

    countTimer('25 mar 2021');

    // Menu
    const toggleMenu = () =>  {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu');

        btnMenu.addEventListener('click', () => menu.classList.add('active-menu'));

        menu.addEventListener('click', event => {
            const target = event.target;
            if (target.classList.contains('close-btn')) {
                menu.classList.toggle('active-menu');
            } else if (target.tagName === 'A') {
                menu.classList.toggle('active-menu');
            }
        });
    };

    toggleMenu();

    // PopUp
    const togglePopUp = () => {

        function animate({ timing, draw, duration }) {
            const start = performance.now();

            requestAnimationFrame(function animate(time) {
                // timeFraction изменяется от 0 до 1
                let timeFraction = (time - start) / duration;
                if (timeFraction > 1) timeFraction = 1;

                // вычисление текущего состояния анимации
                const progress = timing(timeFraction);

                draw(progress); // отрисовать её

                if (timeFraction < 1) {
                    requestAnimationFrame(animate);
                }
            });
        }

        const popUp = document.querySelector('.popup'),
            popUpBtn = document.querySelectorAll('.popup-btn');

        popUpBtn.forEach(elem => {
            elem.addEventListener('click', () => {
                popUp.style.display = 'block';

                if (screen.width > 768) {
                    animate({
                        duration: 500,
                        timing(timeFraction) {
                            return timeFraction;
                        },
                        draw(progress) {
                            popUp.style.opacity = progress * 1;
                        }
                    });
                }
            });
        });

        popUp.addEventListener('click', event => {
            let target = event.target;
            if (target.classList.contains('popup-close')) {
                popUp.style.display = 'none';
            } else {
                target = target.closest('.popup-content');
                if (!target) {
                    popUp.style.display = 'none';
                }
            }
        });
    };

    togglePopUp();

    // Tabs
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = index => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', event => {
            let target = event.target;
            target = target.closest('.service-header-tab');
            if (target) {
                // eslint-disable-next-line no-loop-func
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });
    };

    tabs();

    // Slider
    const slider = () => {
        const slideWrapper = document.querySelector('.portfolio-content'),
            slide = slideWrapper.querySelectorAll('.portfolio-item'),
            dotsWrapper = slideWrapper.querySelector('.portfolio-dots');

        let currentSlide = 0,
            interval;

        slide.forEach(() => {
            dotsWrapper.innerHTML += `<li class="dot"></li>`;
        });

        const dot = dotsWrapper.querySelectorAll('.dot');

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) { currentSlide = 0; }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slideWrapper.addEventListener('click', event => {
            event.preventDefault();

            const target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            } else if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });

        slideWrapper.addEventListener('mouseover', event => {
            const target = event.target;
            if (target.matches('.portfolio-btn') || target.matches('.dot')) {
                stopSlide();
            }
        });

        slideWrapper.addEventListener('mouseout', event => {
            const target = event.target;
            if (target.matches('.portfolio-btn') || target.matches('.dot')) {
                startSlide();
            }
        });

        startSlide(20000);
    };

    slider();

    // Photo teams
    const image = () => {
        const photoCommand = document.querySelectorAll('#command .row img');

        let url;
        photoCommand.forEach(item => {
            item.addEventListener('mouseenter', event => {
                const target = event.target;
                url = target.src;
                target.src = target.getAttribute('data-img');
            });

            item.addEventListener('mouseout', event => {
                const target = event.target;
                target.src = url;
            });
        });
    };

    image();

    // Изменение ввода

    const correctnessOfInput = () => {
        const calc = document.getElementById('calc'),
            mainForm = document.querySelector('.main-form'),
            popUpForm = document.querySelector('.popup'),
            connect = document.querySelector('.connect');

        const onlyNumbers = e => {
            const target = e.target;
            if (target.matches('input')) {
                target.value = target.value.replace(/\D/, '');
            }
        };

        calc.addEventListener('input', onlyNumbers);

        const onlyLetters = e => {
            const target = e.target;
            if (target.closest('#form2-name, #form2-message')) {
                target.value = target.value.replace(/[^а-яА-Я -]/, '');
            } else if (target.closest('#form2-email')) {
                target.value = target.value.replace(/ +/, '');
                target.value = target.value.replace(/[^a-zA-Z\@\_\-\~\.\!\*]/, '');
            } else if (target.closest('#form2-phone')) {
                target.value = target.value.replace(/[^1-9\(\)]/, '');
            }
        };

        const blur = e => {

            const target = e.target;
            let newMas = [];
            if (target.closest('#form2-name')) {
                target.value = target.value.replace(/[\-]+/, '-');
                const mas = target.value.split(/[\s,\-]+/);
                mas.forEach(item => {
                    newMas.push(item[0].toUpperCase() + item.substring(1).toLowerCase());
                });

                newMas = newMas.join(' ');
                target.value = newMas;
            } else if (target.closest('#form2-email')) {
                target.value.trim();
            }
        };

        const blur1 = e => {

            const target = e.target;
            let newMas = [];
            if (target.closest('.form-name')) {
                target.value = target.value.replace(/[\-]+/, '-');
                const mas = target.value.split(/[\s,\-]+/);
                mas.forEach(item => {
                    newMas.push(item[0].toUpperCase() + item.substring(1).toLowerCase());
                });

                newMas = newMas.join(' ');
                target.value = newMas;
            } else if (target.closest('form-email')) {
                target.value.trim();
            }
        };

        connect.addEventListener('input', onlyLetters);
        connect.addEventListener('focusout', blur);

        const checkMainForm = event => {
            const target = event.target;

            if (target === target.closest('.form-name')) {
                target.value = target.value.replace(/[^а-яА-Я -]/, '');
            } else if (target === target.closest('.form-email')) {
                target.value = target.value.replace(/ +/, '');
                target.value = target.value.replace(/[^a-zA-Z\@\_\-\~\.\!\*]/, '');
            } else if (target === target.closest('.form-phone')) {
                target.value = target.value.replace(/[^1-9\(\)]/, '');
            } else { return; }
        };

        mainForm.addEventListener('input', checkMainForm);
        mainForm.addEventListener('focusout', blur1);

        const popUpChange = event => {
            const target = event.target;

            if (target === target.closest('.form-name')) {
                target.value = target.value.replace(/[^а-яА-Я -]/, '');
            } else if (target === target.closest('.form-email')) {
                target.value = target.value.replace(/ +/, '');
                target.value = target.value.replace(/[^a-zA-Z\@\_\-\~\.\!\*]/, '');
            } else if (target === target.closest('.form-phone')) {
                target.value = target.value.replace(/[^1-9\(\)]/, '');
            } else { return; }
        };

        popUpForm.addEventListener('input', popUpChange);
        popUpForm.addEventListener('focusout', blur1);
    };

    correctnessOfInput();

});

