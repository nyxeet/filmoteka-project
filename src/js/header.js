import header from '../html/header.html';
import { renderWatched, renderQueue } from './my-library';
import {
  renderHomePage,
  renderHomeByQuery,
  renderHomePageByPageNum,
  renderSearchPageByPageNum,
} from './main';
import paginationTemp from '../templates/paginator.hbs';
import paginationFunc from './paginator';

const wrapperRef = document.querySelector('.wrapper');
const movieList = document.querySelector('.movies');

const cen = document.querySelector('.cen');
wrapperRef.innerHTML = header;
//const pag = document.querySelector('.paginator');
const logo = document.querySelector('.site-logo__link');
const linkLibrary = document.querySelector('.nav-link-library');
const linkMain = document.querySelector('.nav-link-home');
const menuControlsRef = document.querySelector('.menu-controls');
const menuSearchRef = document.querySelector('.menu-search');
const headerRef = document.querySelector('#header');
const queueBtnRef = document.querySelector('#js-queue');
const watchedBtnRef = document.querySelector('#js-watched');
const formRef = document.querySelector('.search-form');
const input = document.querySelector('.search-field');
const warningRef = document.querySelector('.warning');

renderHomePage();
cen.innerHTML = paginationTemp({ totalPages: 1000 });
paginationFunc(1000, renderHomePageByPageNum);

formRef.addEventListener('submit', event => {
  event.preventDefault();
  renderHomeByQuery(input.value, warningRef).then(res => {
    cen.innerHTML = paginationTemp({ totalPages: res.pages });
    paginationFunc(res.pages, renderSearchPageByPageNum, res.q);
  });
  input.value = '';
});

linkLibrary.addEventListener('click', event => myLibraryRoute(event));
linkMain.addEventListener('click', event => mainRoute(event));
logo.addEventListener('click', event => mainRoute(event));

queueBtnRef.addEventListener('click', event => {
  watchedBtnRef.classList.remove('active-control-btn');
  queueBtnRef.classList.add('active-control-btn');
  renderQueue();
});

watchedBtnRef.addEventListener('click', event => {
  queueBtnRef.classList.remove('active-control-btn');
  watchedBtnRef.classList.add('active-control-btn');
  renderWatched();
});

function mainRoute(event) {
  event.preventDefault();
  formRef.reset();
  menuSearchRef.classList.remove('is-hidden');
  menuControlsRef.classList.add('is-hidden');
  headerRef.classList.remove('header__background-myLibrary');
  headerRef.classList.add('header__background-home');
  linkMain.classList.add('current');
  linkLibrary.classList.remove('current');
  queueBtnRef.classList.remove('active-control-btn');
  watchedBtnRef.classList.remove('active-control-btn');
  cen.classList.remove('is-hidden');
  warningRef.classList.remove('warning-message');
  renderHomePage();
  cen.innerHTML = paginationTemp({ totalPages: 1000 });
  paginationFunc(1000, renderHomePageByPageNum);
  window.history.replaceState({}, null, '/');
}
function myLibraryRoute(event) {
  event.preventDefault();
  movieList.innerHTML = '';
  renderWatched();
  menuControlsRef.classList.remove('is-hidden');
  menuSearchRef.classList.add('is-hidden');
  headerRef.classList.remove('header__background-home');
  headerRef.classList.add('header__background-myLibrary');
  linkMain.classList.remove('current');
  linkLibrary.classList.add('current');
  watchedBtnRef.classList.add('active-control-btn');
  cen.classList.add('is-hidden');
  window.history.replaceState({}, null, '/my-library');
}
