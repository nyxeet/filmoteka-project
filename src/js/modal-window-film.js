import api from '../api/tv-api';
import modalTemplate from '../templates/modal-window-film.hbs';
// модалка
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { renderWatched, renderQueue } from './my-library';

// ссылка нашего списка
const filmListRef = document.querySelector('.movies');

// для записи переменной в глобальную область видимости
let instance;

let storageWatched = [];
let storageQueue = [];
let obj = {};

// вешаем слушателя на список и отслеживаем клик по img
filmListRef.addEventListener('click', onOpen);

// открытие модалки.
async function onOpen(event) {
  const target = event.target;

  // проверка на click в карточку фильма
  if (
    target.nodeName !== 'IMG' &&
    target.nodeName !== 'DIV' &&
    target.nodeName !== 'SPAN' &&
    target.nodeName !== 'H2' &&
    target.nodeName !== 'LI'
  ) {
    console.log('wrong target');
    return;
  }

  // считываем значение id у данного фильма
  const filmId = target.dataset.id;
  // считываем значение id у данного фильма
  const mediaType = target.dataset.type;

  // вызываем api и ищем по id в базе наш фильм
  await api.fetchShowDetails(mediaType, filmId).then(res => {
    obj = res;
    obj.media_type = mediaType;
    console.log(obj);
    const arrWatched = JSON.parse(localStorage.getItem('watched'));
    let isWatched;
    if (arrWatched) {
      isWatched = arrWatched.find(item => item.id == res.id);
    }

    let inQueue;
    const arrQueue = JSON.parse(localStorage.getItem('queue'));
    if (arrQueue) {
      inQueue = arrQueue.find(item => item.id == res.id);
    }

    const data = parsedData(res);
    const markup = modalTemplate(data);
    instance = basicLightbox.create(markup);
    // показываем модалку
    instance.show();

    const watchedAddBtnRef = document.querySelector('.watched-add');
    const watchedRemoveBtnRef = document.querySelector('.watched-remove');
    if (isWatched) {
      watchedAddBtnRef.classList.add('is-hidden');
    } else {
      watchedRemoveBtnRef.classList.add('is-hidden');
    }
    // if (isWatched) {
    //   watchedBtnRef.classList.add('btn-active');
    // }
    watchedAddBtnRef.addEventListener('click', () => {
      if (!isWatched) {
        //watchedBtnRef.classList.add('btn-active');
        if (localStorage.getItem('watched')) {
          storageWatched = JSON.parse(localStorage.getItem('watched'));
        }
        storageWatched.push(obj);
        localStorage.setItem('watched', JSON.stringify(storageWatched));
        watchedAddBtnRef.classList.add('is-hidden');
        watchedRemoveBtnRef.classList.remove('is-hidden');
      }
      isWatched = true;
      if (window.location.href.endsWith('my-library')) {
        renderWatched();
      }
    });
    watchedRemoveBtnRef.addEventListener('click', () => {
      storageWatched = JSON.parse(localStorage.getItem('watched'));
      console.log(storageWatched);
      const index = storageWatched.findIndex(item => item.id == isWatched.id);
      storageWatched.splice(index, 1);
      if (storageWatched.length === 0) {
        localStorage.removeItem('watched');
      } else {
        localStorage.setItem('watched', JSON.stringify(storageWatched));
      }
      watchedRemoveBtnRef.classList.add('is-hidden');
      watchedAddBtnRef.classList.remove('is-hidden');
      if (window.location.href.endsWith('my-library')) {
        renderWatched();
      }
      isWatched = false;
    });

    return inQueue;
  });
  // .then(inQueue => {
  //   const queueBtnRef = document.querySelector('.queueBtn');
  //   if (inQueue) {
  //     queueBtnRef.classList.add('btn-active');
  //   }
  //   queueBtnRef.addEventListener('click', () => {
  //     if (!inQueue) {
  //       queueBtnRef.classList.add('btn-active');
  //       if (localStorage.getItem('queue')) {
  //         storageQueue = JSON.parse(localStorage.getItem('queue'));
  //       }
  //       storageQueue.push(obj);
  //       localStorage.setItem('queue', JSON.stringify(storageQueue));
  //       queueBtnRef.disabled = true;
  //       queueBtnRef.textContent = 'Added to queue';
  //     } else {
  //       storageQueue = JSON.parse(localStorage.getItem('queue'));
  //       const index = storageQueue.findIndex(item => item.id == inQueue.id);
  //       storageQueue.splice(index, 1);
  //       if (storageQueue.length === 0) {
  //         localStorage.removeItem('queue');
  //       } else {
  //         localStorage.setItem('queue', JSON.stringify(storageQueue));
  //       }
  //       queueBtnRef.disabled = true;
  //       queueBtnRef.textContent = 'Removed from queue';
  //       if (window.location.href.endsWith('my-library')) {
  //         renderQueue();
  //       }
  //     }
  //   });
  // });

  // ссылка на кнопку закрытия
  const closeBtnRef = document.querySelectorAll('.js-close-btn');
  // слушатель на нажатие для закрытия модалки
  closeBtnRef.forEach(item => {
    item.addEventListener('click', onClose);
  });
  // во время когда модалка открыта - вешаем слушателя окно для закрытия по ESCAPE
  window.addEventListener('keydown', onClose);
}

// закрытие модалки по ESCAPE или кнопке
function onClose(event) {
  console.log(event.target.nodeName);
  if (
    event.code === 'Escape' ||
    event.target === event.currentTarget ||
    event.code === 'SVG' ||
    event.code === 'path'
  ) {
    console.log('Закрыли кнопкой');
    instance.close();
  }
  // снимаем слушателя с кнопки
  window.removeEventListener('keydown', onClose);
}

// парсим полученые данные с API
function parsedData(res, isWatched, inQueue) {
  const img = 'https://image.tmdb.org/t/p/w500' + res.poster_path;
  const name =
    res.title ||
    res.original_title ||
    res.original_name ||
    res.name ||
    'No information';
  const originalName =
    res.original_title ||
    res.title ||
    res.original_name ||
    res.name ||
    'No information';
  const imgAlt = name + ' poster';
  const overview = res.overview || 'No information';
  const voteAverage = res.vote_average || 'No information';
  const voteCount = res.vote_count || 'No information';
  const popularity = res.popularity || 'No information';
  const genres = res.genres
    ? res.genres.map(item => item.name).join(', ')
    : 'No information';
  // const watchText = isWatched ? 'remove from watched' : 'add to Watched';
  //const queueText = inQueue ? 'remove from queue' : 'add to Queue';

  return {
    img,
    name,
    originalName,
    imgAlt,
    overview,
    voteAverage,
    voteCount,
    popularity,
    genres,
    // watchText,
    //queueText,
  };
}
