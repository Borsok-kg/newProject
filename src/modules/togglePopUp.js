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

export default togglePopUp;