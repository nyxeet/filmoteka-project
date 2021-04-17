import api from '../api/tv-api';
import markupCard from '../templates/movie-card.hbs';

const watchedBtnRef = document.querySelector('#js-watched');
const queueBtnRef = document.querySelector('#js-queue');
const controlsRef = document.querySelector('.menu-controls');
const movieList = document.querySelector('.movies');

function renderWatched() {
  const array = JSON.parse(localStorage.getItem('watched'));
  if (!array) {
    movieList.innerHTML =
      '<li class="nothing-message">Nothing in watched yet :)</li>';
    return;
  }
  const filtered = onlyUnique(array);
  const data = filtered.map(item => parseData(item));
  const markup = data.map(item => markupCard(item)).join('');

  movieList.innerHTML = markup;
}

function renderQueue() {
  const array = JSON.parse(localStorage.getItem('queue'));
  if (!array) {
    movieList.innerHTML =
      '<li class="nothing-message">Nothing in queue yet :)</li>';
    return;
  }
  const filtered = onlyUnique(array);
  const data = filtered.map(item => parseData(item));
  const markup = data.map(item => markupCard(item)).join('');

  movieList.innerHTML = markup;
}

function parseData(data) {
  const id = data.id;

  const type = 'movie';
  const title = data.original_title || data.title || data.original_name;
  const url = 'https://image.tmdb.org/t/p/w500' + data.poster_path;

  const year = data.release_date
    ? data.release_date.slice(0, 4)
    : data.first_air_date.slice(0, 4);

  const genresStr =
    data.genres.map(item => item.name).join(', ') || 'No information';

  return {
    id,
    title,
    url,
    year,
    genresStr,
    type,
  };
}

function onlyUnique(array) {
  return array.filter((e, i) => array.findIndex(obj => obj.id === e.id) === i);
}

export { renderWatched, renderQueue };
