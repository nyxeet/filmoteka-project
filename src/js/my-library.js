import api from '../api/tv-api';
import markupCard from '../templates/movie-card.hbs';

const watchedBtnRef = document.querySelector('#js-watched');
const queueBtnRef = document.querySelector('#js-queue');
const controlsRef = document.querySelector('.menu-controls');
const movieList = document.querySelector('.movies');

function renderWatched() {
  const id = JSON.parse(localStorage.getItem('watched'));
  console.log(id);

  const filteredId = id.filter(onlyUnique);
  console.log(filteredId);

  const type = 'movie';

  filteredId.forEach(item => {
    api
      .fetchShowDetails(type, item)
      .then(res => {
        const data = parseData(res);
        return data;
      })
      .then(data => {
        const markup = markupCard(data);
        movieList.insertAdjacentHTML('beforeend', markup);
      })
      .then(() => {
        api.fetchShowDetails('movie', 634528).then(data => console.log(data));
      })
      .then(() => {
        watchedBtnRef.addEventListener('click', console.log('a'));
      });
  });
}

function renderQueue() {
  const id = JSON.parse(localStorage.getItem('queue'));
  console.log(id);

  const filteredId = id.filter(onlyUnique);
  console.log(filteredId);

  const type = 'movie';

  filteredId.forEach(item => {
    api
      .fetchShowDetails(type, item)
      .then(res => {
        const data = parseData(res);
        return data;
      })
      .then(data => {
        const markup = markupCard(data);
        movieList.insertAdjacentHTML('beforeend', markup);
      })
      .then(() => {
        api.fetchShowDetails('movie', 634528).then(data => console.log(data));
      })
      .then(() => {
        watchedBtnRef.addEventListener('click', console.log('a'));
      });
  });
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

function onlyUnique(e, i, a) {
  return a.indexOf(e) === i;
}

export { renderWatched };
