import header from '../html/header.html';
import header2 from '../html/header-mylibrary.html';
import { renderWatched } from './my-library';
const wrapperRef = document.querySelector('.wrapper');
const movieList = document.querySelector('.movies');

wrapperRef.innerHTML = header;

const linkLibrary = document.querySelector('.nav-link-library');
const linkMain = document.querySelector('.nav-link-home');

linkLibrary.addEventListener('click', event => {
  event.preventDefault();
  wrapperRef.innerHTML = header2;
  movieList.innerHTML = '';

  renderWatched();
});
linkMain.addEventListener('click', event => {
  event.preventDefault();
  wrapperRef.innerHTML = header;
});

// console.log(markup);
