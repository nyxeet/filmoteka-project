import './sass/main.scss';
import api from './api/tv-api';
import './js/pages';

api.fetchPopular().then(console.log);
api.fetchShowWithQuery('batman').then(console.log);
