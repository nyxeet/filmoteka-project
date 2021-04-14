import api from './../api/tv-api';
import genres from './genres';
import filmCard from './../templates/movie-card.hbs';

const moviesRef = document.querySelector('.movies');
api.fetchPopular().then(console.log);
api.fetchPopular().then(({ results }) => {
  const data = results.map(item => parseData(item));
  const markup = data.map(item => filmCard(item)).join('');
  moviesRef.insertAdjacentHTML('beforeend', markup);
});

function parseData(data) {
  const id = data.id;
  const title = data.title ? data.title : 'No information';
  const url = `https://image.tmdb.org/t/p/w300${data.poster_path}`;
  const year = data.release_date ? data.release_date.slice(0, 4) : 'No info';
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
    title,
    url,
    year,
    genresStr,
  };
}
