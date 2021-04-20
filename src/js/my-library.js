import { renderWatchedList } from './renderList';

const movieList = document.querySelector('.movies');

function renderWatched() {
  const array = JSON.parse(localStorage.getItem('watched'));
  if (!array) {
    movieList.innerHTML =
      '<li class="nothing-message">Nothing in watched yet :)</li>';
    return;
  }
  const data = onlyUnique(array);
  renderWatchedList(data);
}

function renderQueue() {
  const array = JSON.parse(localStorage.getItem('queue'));
  if (!array) {
    movieList.innerHTML =
      '<li class="nothing-message">Nothing in queue yet :)</li>';
    return;
  }
  const data = onlyUnique(array);
  renderWatchedList(data);
}

function onlyUnique(array) {
  return array.filter((e, i) => array.findIndex(obj => obj.id === e.id) === i);
}

export { renderWatched, renderQueue };
