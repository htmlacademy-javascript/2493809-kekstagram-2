import { renderPictures } from "./pictures-preview-loader.js";
import { getRandomInteger } from './util.js';

const picturesFilter = document.querySelector('.img-filters');
const filterDefaultButton = picturesFilter.querySelector('#filter-default');
const filterRandomButton = picturesFilter.querySelector('#filter-random');
const filterMostDiscussedButton = picturesFilter.querySelector('#filter-discussed');

const compareCommentsCount = (photoA, photoB) => {
  const commentsA = photoA.comments.length;
  const commentsB = photoB.comments.length;

  return commentsB - commentsA;
};

const showFilter = () => picturesFilter.classList.remove('img-filters--inactive');

const setFilterClickHandler = (photos) => {

  picturesFilter.addEventListener('click', (evt) => {

    if(evt.target === filterDefaultButton) {
      const activeFilter = document.querySelector('.img-filters__button--active');
      activeFilter.classList.remove('img-filters__button--active');
      filterDefaultButton.classList.add('img-filters__button--active');
      if(activeFilter !== filterDefaultButton) {
        renderPictures(photos);
      }
    }

    if(evt.target === filterRandomButton) {
      const activeFilter = document.querySelector('.img-filters__button--active');
      activeFilter.classList.remove('img-filters__button--active');
      filterRandomButton.classList.add('img-filters__button--active');
      renderPictures(photos.slice().sort(() => getRandomInteger(-1, 1)).splice(0, 10));
    }

    if(evt.target === filterMostDiscussedButton) {
      const activeFilter = document.querySelector('.img-filters__button--active');
      activeFilter.classList.remove('img-filters__button--active');
      filterMostDiscussedButton.classList.add('img-filters__button--active');
      if(activeFilter !== filterMostDiscussedButton) {
        renderPictures(photos.slice().sort(compareCommentsCount));
      }
    }
  });
};


export { showFilter, setFilterClickHandler };
