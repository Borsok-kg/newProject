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
            target.value = target.value.replace(/[^а-яА-Я1-9\,\.\?\! ]/, '');
        } else if (target.closest('#form2-email')) {
            target.value = target.value.replace(/ +/, '');
            target.value = target.value.replace(/[^a-zA-Z\@\_\-\~\.\!\*]/, '');
        } else if (target.closest('#form2-phone')) {
            target.value = target.value.replace(/[^1-9\+{1}]/, '');
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
                newMas.push(item.slice(0, 1).toUpperCase() + item.substring(1).toLowerCase());
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
            target.value = target.value.replace(/[^1-9\+{1}]/, '');
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
            target.value = target.value.replace(/[^1-9\+{1}]/, '');
        } else { return; }
    };

    popUpForm.addEventListener('input', popUpChange);
    popUpForm.addEventListener('focusout', blur1);
};

export default correctnessOfInput;