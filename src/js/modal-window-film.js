import api from '../api/tv-api';
import modalTemplate from '../templates/modal-window-film.hbs';
// модалка
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

// todo ссылка нашего списка. Добавить актуальную
const filmListRef = document.querySelector('#list');

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

  // вызываем api и ищем по id в базе наш фильм
  await api
    .fetchShowDetails(filmId)
    .then(data => {
      // получаем разметку страницы
      const markup = modalTemplate(data);
      // console.log(markup);
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

// закрытие по ESCAPE или кнопке
function onClose(event) {
  if (event.code === 'Escape' || event.target === event.currentTarget) {
    console.log('Закрыли кнопкой');
    instance.close();
  }

  // снимаем слушателя с кнопки
  window.removeEventListener('keydown', onClose);
}
