const sendForm = () => {
    const errorMessage = 'Что то пошло не так...',
        loadMessage = 'Загрузка',
        successMessage = 'Спасибо! Мы скоро с вами свяжемся',
        body = {},
        form = document.querySelectorAll('form');

    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 2rem; color: red;';

    const postData = body => fetch('./server.php', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(body)
    });

    form.forEach(item => {
        item.addEventListener('submit', event => {
            event.preventDefault();
            statusMessage.textContent = loadMessage;
            item.appendChild(statusMessage);

            const formData = new FormData(item);

            formData.forEach((val, key) => {
                body[key] = val;
            });

            postData(body)
                .then(response => {
                    if (response.status !== 200) {
                        throw new Error();
                    }
                    statusMessage.textContent = successMessage;
                    form.forEach(item => {
                        item.reset();
                    });
                    setTimeout(() => {
                        if (item.matches('#form3')) {
                            const popupClose = document.querySelector('.popup');
                            popupClose.style.display = 'none';
                        }
                        statusMessage.textContent = '';
                    }, 3500);
                })
                .catch(() => {
                    statusMessage.textContent = errorMessage;
                });
        });
    });

};

export default sendForm;