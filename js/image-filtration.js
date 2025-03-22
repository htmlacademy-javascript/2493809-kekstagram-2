import { renderPictures } from './pictures-preview-loader.js';
import { getRandomInteger } from './util.js';

const picturesFilter = document.querySelector('.img-filters');
const FilterButtons = {
  default: picturesFilter.querySelector('#filter-default'),
  random: picturesFilter.querySelector('#filter-random'),
  discussed: picturesFilter.querySelector('#filter-discussed'),
};

const RANDOM_PHOTOS_COUNT = 10;
const RERENDER_DELAY = 500;

const compareCommentsCount = (photoA, photoB) => {
  const commentsA = photoA.comments.length;
  const commentsB = photoB.comments.length;

  return commentsB - commentsA;
};

const showFilter = () => picturesFilter.classList.remove('img-filters--inactive');

const renderRandomPhotos = (photos) => {
  const randomPhotos = photos.slice().sort(() => getRandomInteger(-1, 1)).splice(0, RANDOM_PHOTOS_COUNT);
  renderPictures(randomPhotos);
};
const renderMostDiscussedPhotos = (photos) => {
  const sortedPhotos = photos.slice().sort(compareCommentsCount);
  renderPictures(sortedPhotos);
};

const debounceRender = (renderFunction) => {
  clearTimeout(debounceRender.lastDebouncedCall);
  debounceRender.lastDebouncedCall = setTimeout(() => {
    renderFunction();
  }, RERENDER_DELAY);
};

const setFilterClickHandler = (photos) => {
  picturesFilter.addEventListener('click', (evt) => {
    const activeFilter = document.querySelector('.img-filters__button--active');

    if (evt.target === activeFilter && evt.target !== FilterButtons.random) {
      return;
    }

    if (evt.target.closest('button')) {
      activeFilter.classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
    }

    switch (evt.target) {
      case FilterButtons.default:
        debounceRender(() => renderPictures(photos));
        break;

      case FilterButtons.random:
        debounceRender(() => renderRandomPhotos(photos));
        break;

      case FilterButtons.discussed:
        debounceRender(() => renderMostDiscussedPhotos(photos));
        break;

      default:
        break;
    }
  });
};


export { showFilter, setFilterClickHandler };
