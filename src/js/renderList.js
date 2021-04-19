import genres from './genres';
import filmCard from '../templates/movie-card.hbs';
const moviesRef = document.querySelector('.movies');

function renderList(results) {
  const data = results.map(item => parseData(item));
  const markup = data.map(item => filmCard(item)).join('');
  moviesRef.innerHTML = markup;
}

function parseData(data) {
  const id = data.id || 'No information';
  const type = data.media_type ? data.media_type : data.type || 'movie';
  const title = data.title
    ? data.title
    : data.original_name || data.name || 'No information';

  const url = data.poster_path
    ? `https://image.tmdb.org/t/p/w300${data.poster_path}`
    : 'https://images.pexels.com/photos/4439425/pexels-photo-4439425.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';

  const yearInfo = data.release_date || data.first_air_date || 'No information';
  let year = yearInfo;
  if (yearInfo !== 'No information') {
    year = yearInfo.slice(0, 4);
  }

  const gen = data.genre_ids || data.genres || 'No information'; // added
  let genresStr = gen;
  if (typeof gen[0] === 'number') {
    genresStr = gen
      .map(item => {
        const genre = genres.find(genre => genre.id === item);
        if (genre) {
          return genre.name;
        }
      })
      .filter(item => item)
      .join(', ');
  } else if (typeof gen[0] === 'object') {
    genresStr = gen.map(genre => genre.name).join(', ');
  } else {
    genresStr = 'No information';
  }

  // const genresStr = gen
  //   .map(item => {
  //     const genre = genres.find(genre => genre.id === item);
  //     if (genre) {
  //       return genre.name;
  //     }
  //   })
  //   .filter(item => item)
  //   .join(', ');

  return {
    id,
    type,
    title,
    url,
    year,
    genresStr,
  };
}

export { renderList };
