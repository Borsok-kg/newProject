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

export default image;