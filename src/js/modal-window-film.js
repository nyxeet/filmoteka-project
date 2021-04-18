import api from '../api/tv-api';
import modalTemplate from '../templates/modal-window-film.hbs';
// модалка
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { renderWatched } from './my-library';

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
  await api
    .fetchShowDetails(mediaType, filmId)
    .then(res => {
      obj = res;
      obj.media_type = mediaType;
      console.log(obj);
      const array = JSON.parse(localStorage.getItem('watched'));
      let isWatched;
      if (array) {
        isWatched = array.find(item => item.id == res.id);
      }

      // парсим данные
      const data = parsedData(res, isWatched);

      return { data, isWatched };
    })
    .then(({ data, isWatched }) => {
      // получаем data и рисуем разметку страницы

      const markup = modalTemplate(data);
      console.log(data);

      return { markup, isWatched };
    })
    .then(({ markup, isWatched }) => {
      // создаем плагин basicLightbox и передаем в него разметку
      instance = basicLightbox.create(markup);
      // показываем модалку
      instance.show();
      return isWatched;
    })
    .then(isWatched => {
      const watchedBtnRef = document.querySelector('.watchedBtn');

      watchedBtnRef.addEventListener('click', () => {
        if (!isWatched) {
          if (localStorage.getItem('watched')) {
            storageWatched = JSON.parse(localStorage.getItem('watched'));
          }
          storageWatched.push(obj);
          localStorage.setItem('watched', JSON.stringify(storageWatched));
          watchedBtnRef.disabled = true;
          watchedBtnRef.textContent = 'Added';
        } else {
          storageWatched = JSON.parse(localStorage.getItem('watched'));
          const index = storageWatched.findIndex(
            item => item.id == isWatched.id,
          );
          storageWatched.splice(index, 1);
          if (storageWatched.length === 0) {
            localStorage.removeItem('watched');
          } else {
            localStorage.setItem('watched', JSON.stringify(storageWatched));
          }
          watchedBtnRef.disabled = true;
          watchedBtnRef.textContent = 'Removed';
          if (window.location.href.endsWith('my-library')) {
            renderWatched();
          }
        }
      });
    })
    .then(() => {
      const queueBtnRef = document.querySelector('.queueBtn');

      queueBtnRef.addEventListener('click', () => {
        if (localStorage.getItem('queue')) {
          storageQueue = JSON.parse(localStorage.getItem('queue'));
        }
        storageQueue.push(obj);

        localStorage.setItem('queue', JSON.stringify(storageQueue));
      });
    });

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
function parsedData(res, isWatched) {
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
  const genres =
    res.genres.map(item => item.name).join(', ') || 'No information';
  const watchText = isWatched ? 'remove from watched' : 'add to Watched';

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
    watchText,
  };
}
