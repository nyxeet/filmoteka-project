import footer from '../html/footer.html';
import openModalBtn from './modal-team-members';

const footerRef = document.querySelector('.footer');
footerRef.innerHTML = footer;

// ссылка на кнопку открытия модалки
const openModalBtnRef = document.querySelector('.open-modal-develop');
// функция открытия модалки
openModalBtn(openModalBtnRef);
