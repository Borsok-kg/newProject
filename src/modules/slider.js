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

export default slider;