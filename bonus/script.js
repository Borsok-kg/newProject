window.addEventListener('DOMContentLoaded', () => {
    // eslint-disable-next-line strict
    'use strict';

    function updateClock() {
        let hours = String(new Date().getHours()),
            minutes = new Date().getMinutes(),
            seconds = new Date().getSeconds(),
            hourFormat,
            timeOfDay,
            showWeek;

        const day = new Date().getDay(),
            week = ['Понедельник', 'вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
            dateStop = new Date('01 jan 2022').getTime(),
            dateNow = new Date().getTime(),
            timeRemaining = (dateStop - dateNow) / 1000,
            newYear = Math.floor(timeRemaining / 60 / 60 / 24);

        // Добавляем ноль
        if (hours < 10) {
            hours = '0' + new Date().getHours();
        }
        if (minutes < 10) {
            minutes = '0' + new Date().getMinutes();
        }
        if (seconds < 10) {
            seconds = '0' + new Date().getSeconds();
        }

        // Вывод AM - PM
        if (hours >= '01') {
            hourFormat = 'AM';
        } if (hours >= '13') {
            hourFormat = 'PM';
        }

        // Вывод времени суток
        if (hours >= '06') {
            timeOfDay = 'Доброе утро';
        } if (hours >= '11') {
            timeOfDay = 'Добрый день';
        } if (hours >= '16') {
            timeOfDay = 'Добрый вечер';
        } if (hours >= '21') {
            timeOfDay = 'Доброй ночи';
        }

        week.forEach((_item, i) => {
            if (i === day - 1) {
                showWeek = week[i];
            }
        });

        document.body.innerHTML = `
            <div>${timeOfDay}</div>
            <div>Сегодня: ${showWeek}</div>
            <div>Текущее время:${hours}:${minutes}:${seconds} ${hourFormat}</div>
            <div>До нового года осталось ${newYear} дня</div>
        `;

        setTimeout(updateClock, 1000);
    }

    updateClock();
});
