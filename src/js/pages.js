import header from '../templates/header.hbs';

const wrapperRef = document.querySelector('.wrapper');

const markup = header();

wrapperRef.insertAdjacentHTML('afterbegin', markup);

// console.log(markup);
