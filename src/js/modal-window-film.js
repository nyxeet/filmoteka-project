import api from '../api/tv-api';
import modalTemplate from '../templates/modal-window-film.hbs';
// модалка
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

// ссылка нашего списка
const filmListRef = document.querySelector('.movies');

// для записи переменной в глобальную область видимости
let instance;

// вешаем слушателя на список и отслеживаем клик по img
filmListRef.addEventListener('click', onOpen);

// открытие модалки.
async function onOpen(event) {
  const target = event.target;

  // проверка, чтобы клацнуть в img
  if (target.nodeName !== 'IMG') {
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
      // парсим данные
      const data = parsedData(res);
      return data;
    })
    .then(data => {
      // получаем data и рисуем разметку страницы
      const markup = modalTemplate(data);
      return markup;
    })
    .then(markup => {
      // создаем плагин basicLightbox и передаем в него разметку
      instance = basicLightbox.create(markup);
      // показываем модалку
      instance.show();
    });

  // ссылка на кнопку закрытия
  const closeBtnRef = document.querySelector('.close-icon');
  // слушатель на нажатие для закрытия модалки
  closeBtnRef.addEventListener('click', onClose);
  // во время когда модалка открыта - вешаем слушателя окно для закрытия по ESCAPE
  window.addEventListener('keydown', onClose);
}

// закрытие модалки по ESCAPE или кнопке
function onClose(event) {
  if (event.code === 'Escape' || event.target === event.currentTarget) {
    console.log('Закрыли кнопкой');
    instance.close();
  }
  // снимаем слушателя с кнопки
  window.removeEventListener('keydown', onClose);
}

// парсим полученые данные с API
function parsedData(res) {
  const img = 'https://image.tmdb.org/t/p/w500' + res.poster_path;
  const name = res.title || res.original_title || res.original_name;
  const originalName = res.original_title || res.title || res.original_name;
  const imgAlt = name + ' poster';
  const overview = res.overview || 'No information';
  const voteAverage = res.vote_average || 'No information';
  const voteCount = res.vote_count || 'No information';
  const popularity = res.popularity || 'No information';
  const genres =
    res.genres.map(item => item.name).join(', ') || 'No information';

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
  };
}
