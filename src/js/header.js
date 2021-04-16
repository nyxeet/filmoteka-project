import header from '../html/header.html';
import { renderWatched } from './my-library';
const wrapperRef = document.querySelector('.wrapper');
const movieList = document.querySelector('.movies');

wrapperRef.innerHTML = header;

const linkLibrary = document.querySelector('.nav-link-library');
const linkMain = document.querySelector('.nav-link-home');
const menuControlsRef = document.querySelector('.menu-controls');
const menuSearchRef = document.querySelector('.menu-search');
const headerRef = document.querySelector('#header');
const queueBtnRef = document.querySelector('#js-queue');
const watchedBtnRef = document.querySelector('#js-watched');

linkLibrary.addEventListener('click', event => {
  event.preventDefault();
  movieList.innerHTML = '';
  renderWatched();
  menuControlsRef.classList.remove('is-hidden');
  menuSearchRef.classList.add('is-hidden');
  headerRef.classList.remove('header__background-home');
  headerRef.classList.add('header__background-myLibrary');
  linkMain.classList.remove('current');
  linkLibrary.classList.add('current');
});

linkMain.addEventListener('click', event => {
  event.preventDefault();
  menuSearchRef.classList.remove('is-hidden');
  menuControlsRef.classList.add('is-hidden');
  headerRef.classList.remove('header__background-myLibrary');
  headerRef.classList.add('header__background-home');
  linkMain.classList.add('current');
  linkLibrary.classList.remove('current');
});

queueBtnRef.addEventListener('click', event => {
  watchedBtnRef.classList.remove('active-control-btn');
  queueBtnRef.classList.add('active-control-btn');
});

watchedBtnRef.addEventListener('click', event => {
  queueBtnRef.classList.remove('active-control-btn');
  watchedBtnRef.classList.add('active-control-btn');
});
