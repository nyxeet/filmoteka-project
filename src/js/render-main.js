import api from '../api/tv-api';
import genres from './genres';
import filmCard from './../templates/movie-card.hbs';
import placeholder from './spinner'

api.fetchPopular().then(console.log);

const formRef = document.querySelector('.search-form');
const input = document.querySelector('.search-field');
const moviesRef = document.querySelector('.movies');

formRef.addEventListener('submit', event => {
  event.preventDefault();
  api.fetchShowWithQuery(input.value).then(({ results }) => render(results));
});

function parseData(data) {
  const id = data.id;
  const type = data.media_type; // changed
  const title = data.title ? data.title : data.original_name; // changed
  const url = `https://image.tmdb.org/t/p/w300${data.poster_path}`;
  const year = data.release_date
    ? data.release_date.slice(0, 4)
    : data.first_air_date.slice(0, 4); // changed

  const genresStr = data.genre_ids
    .map(item => {
      const genre = genres.find(genre => genre.id === item);
      if (genre) {
        return genre.name;
      }
    })
    .filter(item => item)
    .join(', ');

  return {
    id,
    type, // changed
    title,
    url,
    year,
    genresStr,
  };
}

function renderHomePageByPageNum(pageNum) {
  api.fetchPopularByPage(pageNum).then(({ results }) => {
    placeholder.spinner.show();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    render(results);
  })
    .then(res => placeholder.spinner.close());
}

function renderHomePage() {
  api.fetchPopular().then(({ results }) => {
    placeholder.spinner.show();
    render(results)
  })
    .then(res => placeholder.spinner.close());
}

function render(results) {
  const data = results.map(item => parseData(item));
  const markup = data.map(item => filmCard(item)).join('');
  moviesRef.innerHTML = markup;
}

renderHomePage();

export default {
  renderHomePage,
  renderHomePageByPageNum,
};
