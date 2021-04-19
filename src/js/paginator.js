//import { renderHomePageByPageNum } from './main';

export default function paginationFunc(max, callback, ...args) {
  const paginatorRef = document.querySelector('.paginator');

  const firstItem = document.querySelector('.firstItem');
  const peginatorPrev = document.querySelector('.paginator-previous');
  const peginatorNext = document.querySelector('.paginator-next');

  const current = document.querySelector('.paginator-current');

  const prev = document.querySelector('.prev');
  const prevprev = document.querySelector('.prevprev');
  const next = document.querySelector('.next');
  const dots = document.querySelector('.dots');
  const lastdots = document.querySelector('.lastdots');
  const nextnext = document.querySelector('.nextnext');
  const pages = document.querySelector('.pages');
  const lastItem = document.querySelector('.lastItem');

  let paginatorCurrent = 1;

  peginatorPrev.addEventListener('click', event => {
    event.preventDefault();
    console.log(paginatorCurrent);
    if (paginatorCurrent > 1) {
      current.textContent = Number(current.textContent) - 1;
      next.textContent = Number(current.textContent) + 1;
      nextnext.textContent = Number(current.textContent) + 2;
      prev.textContent = Number(current.textContent) - 1;
      prevprev.textContent = Number(current.textContent) - 2;
      paginatorCurrent -= 1;
      args.length > 0
        ? callback(args[0], paginatorCurrent)
        : callback(paginatorCurrent);
    }
    showFirstItems();
    showLastItems();
  });

  peginatorNext.addEventListener('click', event => {
    event.preventDefault();

    current.textContent = Number(current.textContent) + 1;
    next.textContent = Number(current.textContent) + 1;
    nextnext.textContent = Number(current.textContent) + 2;
    prev.textContent = Number(current.textContent) - 1;
    prevprev.textContent = Number(current.textContent) - 2;
    paginatorCurrent += 1;
    args.length > 0
      ? callback(args[0], paginatorCurrent)
      : callback(paginatorCurrent);
    showFirstItems();
    showLastItems();
  });

  pages.addEventListener('click', event => {
    event.preventDefault();

    const pageNum = Number(event.target.textContent);

    current.textContent = event.target.textContent;
    next.textContent = Number(current.textContent) + 1;
    nextnext.textContent = Number(current.textContent) + 2;
    prev.textContent = Number(current.textContent) - 1;
    prevprev.textContent = Number(current.textContent) - 2;

    paginatorCurrent = pageNum;
    args.length > 0 ? callback(args[0], pageNum) : callback(pageNum);
    showFirstItems();
    showLastItems();
  });

  firstItem.addEventListener('click', event => {
    const pageNum = Number(event.target.textContent);
    current.textContent = event.target.textContent;
    next.textContent = Number(current.textContent) + 1;
    nextnext.textContent = Number(current.textContent) + 2;
    paginatorCurrent = pageNum;
    args.length > 0 ? callback(args[0], pageNum) : callback(pageNum);
    showFirstItems();
    showLastItems();
  });

  lastItem.addEventListener('click', event => {
    const pageNum = Number(event.target.textContent);
    current.textContent = event.target.textContent;
    prev.textContent = Number(current.textContent) - 1;
    prevprev.textContent = Number(current.textContent) - 2;
    paginatorCurrent = pageNum;
    args.length > 0 ? callback(args[0], pageNum) : callback(pageNum);
    showFirstItems();
    showLastItems();
  });

  function showFirstItems() {
    paginatorCurrent > 1
      ? prev.classList.remove('is-hidden')
      : prev.classList.add('is-hidden');

    paginatorCurrent > 2
      ? prevprev.classList.remove('is-hidden')
      : prevprev.classList.add('is-hidden');

    if (paginatorCurrent > 3) {
      dots.classList.remove('is-hidden');
      firstItem.classList.remove('is-hidden');
      peginatorPrev.classList.remove('is-hidden');
    } else {
      dots.classList.add('is-hidden');
      firstItem.classList.add('is-hidden');
      peginatorPrev.classList.add('is-hidden');
    }
  }

  function showLastItems() {
    paginatorCurrent < max
      ? next.classList.remove('is-hidden')
      : next.classList.add('is-hidden');

    paginatorCurrent < max - 1
      ? nextnext.classList.remove('is-hidden')
      : nextnext.classList.add('is-hidden');

    if (paginatorCurrent < max - 2) {
      lastdots.classList.remove('is-hidden');
      lastItem.classList.remove('is-hidden');
      peginatorNext.classList.remove('is-hidden');
    } else {
      lastdots.classList.add('is-hidden');
      lastItem.classList.add('is-hidden');
      peginatorNext.classList.add('is-hidden');
    }
  }
}

//console.log(pages);
