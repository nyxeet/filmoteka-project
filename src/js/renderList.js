import genres from './genres';
import filmCard from '../templates/movie-card.hbs';
const moviesRef = document.querySelector('.movies');

function renderList(results) {
  const data = results.map(item => parseData(item));
  const markup = data.map(item => filmCard(item)).join('');
  moviesRef.innerHTML = markup;
}

function parseData(data) {
  const id = data.id;
  const type = data.media_type ? data.media_type : 'movie'; // changed
  const title = data.title ? data.title : data.original_name; // changed
  const url = `https://image.tmdb.org/t/p/w300${data.poster_path}`;
  const year = data.release_date
    ? data.release_date.slice(0, 4)
    : data.first_air_date.slice(0, 4); // changed

  const gen = data.genre_ids ? data.genre_ids : data.genres;
  const genresStr = gen
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

export { renderList };
