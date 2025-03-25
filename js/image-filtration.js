import { renderImages } from './images-preview-loader.js';
import { getRandomInteger, debounce } from './util.js';

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
  const randomImages = images
    .slice()
    .sort(() => getRandomInteger(-1, 1))
    .splice(0, RANDOM_IMAGES_COUNT);
  renderImages(randomImages);
};
const renderMostDiscussedImages = (images) => {
  const sortedImages = images
    .slice()
    .sort(compareCommentsCount);
  renderImages(sortedImages);
};

const setFilterClickHandler = (images) => {

  const applyFilter = (selectedFilter) => {
    switch (selectedFilter) {
      case 'defaultFilter':
        renderImages(images);
        break;
      case 'random':
        renderRandomImages(images);
        break;
      case 'discussed':
        renderMostDiscussedImages(images);
        break;
    }
  };

  const debouncedApplyFilter = debounce(applyFilter, RERENDER_DELAY);

  imagesFilter.addEventListener('click', (evt) => {
    const activeFilter = document.querySelector('.img-filters__button--active');

    if (evt.target === activeFilter && evt.target !== FilterButtons.random) {
      return;
    }

    if (evt.target.closest('button')) {
      activeFilter.classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
    }

    let selectedFilter;

    switch (evt.target) {
      case FilterButtons.default:
        selectedFilter = 'defaultFilter';
        break;

      case FilterButtons.random:
        selectedFilter = 'random';
        break;

      case FilterButtons.discussed:
        selectedFilter = 'discussed';
        break;
    }

    debouncedApplyFilter(selectedFilter);
  });
};

export { showFilter, setFilterClickHandler };
