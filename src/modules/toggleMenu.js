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

export default toggleMenu;