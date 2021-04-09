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

            if (sendVerify(body)) {
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
            }
        });
    });

    const sendVerify = (body) => {
        if (body.user_name.length <= 1) {
            statusMessage.textContent = 'В поле "Ваше имя" должно быть минимум 2 символа';
            return false;
        }
        if (body.user_email === '') {
            statusMessage.textContent = 'Пустое поле "E-mail"';
            return false;
        }
        if (body.user_phone.length <= 7 || body.user_phone.length >= 12) {
            statusMessage.textContent = 'В поле "Номер телефона" должно быть от 7 до 12 символов';
            return false;
        }
        if (body.user_message === '') {
            statusMessage.textContent = 'Введите сообщение';
            return false;
        }
        return true;
    };

};

export default sendForm;