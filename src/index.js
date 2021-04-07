// eslint-disable-next-line strict
'use strict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import image from './modules/image';
import correctnessOfInput from './modules/correctnessOfInput';
import calc from './modules/calc';
import sendForm from './modules/sendForm';

// timer
countTimer('25 mar 2021');

// Menu
toggleMenu();

// PopUp
togglePopUp();

// Tabs
tabs();

// Slider
slider();

// Photo teams
image();

// Валидация ввода для input
correctnessOfInput();

// Calculator
calc(100);

// Send ajax form
sendForm();