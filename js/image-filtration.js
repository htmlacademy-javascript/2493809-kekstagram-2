import { renderImages } from './images-preview-loader.js';
import { getRandomInteger } from './util.js';

const RANDOM_IMAGES_COUNT = 10;
const RERENDER_DELAY = 500;

const imagesFilter = document.querySelector('.img-filters');
const FilterButtons = {
  default: imagesFilter.querySelector('#filter-default'),
  random: imagesFilter.querySelector('#filter-random'),
  discussed: imagesFilter.querySelector('#filter-discussed'),
};

const compareCommentsCount = (imageA, imageB) => {
  const commentsA = imageA.comments.length;
  const commentsB = imageB.comments.length;

  return commentsB - commentsA;
};

const showFilter = () => imagesFilter.classList.remove('img-filters--inactive');

const renderRandomImages = (images) => {
  const randomImages = images.slice().sort(() => getRandomInteger(-1, 1)).splice(0, RANDOM_IMAGES_COUNT);
  renderImages(randomImages);
};
const renderMostDiscussedImages = (images) => {
  const sortedImages = images.slice().sort(compareCommentsCount);
  renderImages(sortedImages);
};

const debounceRender = (renderFunction) => {
  clearTimeout(debounceRender.lastDebouncedCall);
  debounceRender.lastDebouncedCall = setTimeout(() => {
    renderFunction();
  }, RERENDER_DELAY);
};

const setFilterClickHandler = (images) => {
  imagesFilter.addEventListener('click', (evt) => {
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
        debounceRender(() => renderImages(images));
        break;

      case FilterButtons.random:
        debounceRender(() => renderRandomImages(images));
        break;

      case FilterButtons.discussed:
        debounceRender(() => renderMostDiscussedImages(images));
        break;
    }
  });
};


export { showFilter, setFilterClickHandler };
