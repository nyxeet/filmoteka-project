import header from '../html/header.html';
import header2 from '../html/header-mylibrary.html';
const wrapperRef = document.querySelector('.wrapper');

wrapperRef.innerHTML = header;

const linkLibrary = document.querySelector('.nav-link-library');
const linkMain = document.querySelector('.nav-link-home');

linkLibrary.addEventListener('click', event => {
  event.preventDefault();
  wrapperRef.innerHTML = header2;
});
linkMain.addEventListener('click', event => {
  event.preventDefault();
  wrapperRef.innerHTML = header;
});

// console.log(markup);
