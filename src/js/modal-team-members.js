import templateOfDevTeam from '../templates/modal-team-members.hbs';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

// для записи переменной в глобальную область видимости
let instance;

function openModalBtn(ref) {
  // слушатель на кнопку в футере
  ref.addEventListener('click', onModalBtnClick);
}

function onModalBtnClick(event) {
  event.preventDefault();
  const markup = templateOfDevTeam();
  // создаем плагин basicLightbox и передаем в него разметку
  instance = basicLightbox.create(markup, {
    onShow: instance => {
      document.body.style.overflow = 'hidden';
    },
    onClose: instance => {
      document.body.style.overflow = 'visible';
    },
  });
  // показываем модалку
  instance.show();

  // ссылка на кнопку закрытия
  const closeBtnRef = document.querySelectorAll('.js-close-team-btn');
  // слушатель на нажатие для закрытия модалки
  closeBtnRef.forEach(btn => {
    btn.addEventListener('click', onClose);
  });

  // во время когда модалка открыта - вешаем слушателя окно для закрытия по ESCAPE
  window.addEventListener('keydown', onClose);
}

// закрытие модалки по ESCAPE или кнопке
function onClose(event) {
  //   console.log(event.target.nodeName);
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

export default openModalBtn;
