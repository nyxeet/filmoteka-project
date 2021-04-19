import api from '../api/tv-api';
import { renderList } from './renderList';
import placeholder from './spinner';

function renderHomeByQuery(query, messageRef) {
  placeholder.spinner.show();
  return api
    .fetchShowWithQuery(query)
    .then(res => {
      if (res.results.length === 0) {
        messageRef.classList.add('warning-message');
      } else {
        messageRef.classList.remove('warning-message');
      }
      renderList(res.results);
      return { q: query, pages: res.total_pages };
    })
    .finally(() => placeholder.spinner.close());
}
function renderHomePageByPageNum(pageNum) {
  placeholder.spinner.show();
  api
    .fetchPopularByPage(pageNum)
    .then(({ results }) => {
      console.log(results);
      renderList(results);
    })
    .finally(() => placeholder.spinner.close());
  window.scrollTo(0, 0);
}

function renderSearchPageByPageNum(query, pageNum) {
  placeholder.spinner.show();
  api
    .fetchShowWithQueryByPage(query, pageNum)
    .then(({ results }) => {
      renderList(results);
    })
    .finally(() => placeholder.spinner.close());
  window.scrollTo(0, 0);
}

function renderHomePage() {
  placeholder.spinner.show();
  api
    .fetchPopular()
    .then(({ results }) => {
      renderList(results);
    })
    .finally(() => placeholder.spinner.close());
}

export {
  renderHomePage,
  renderHomePageByPageNum,
  renderHomeByQuery,
  renderSearchPageByPageNum,
};
