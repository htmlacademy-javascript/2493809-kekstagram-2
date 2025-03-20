const picturesFilter = document.querySelector('.img-filters');
const filterDefaultButton = picturesFilter.querySelector('#filter-default');
const filterRandomButton = picturesFilter.querySelector('#filter-random');
const filterMostDiscussedButton = picturesFilter.querySelector('#filter-discussed');

const compareCommentsCount = (photoA, photoB) => {
  const commentsA = photoA.comments.length;
  const commentsB = photoB.comments.length;

  return commentsB - commentsA;
};

const setDefaultFilterClickHandler = (cb) => {
  filterDefaultButton.addEventListener('click', () => {
    const activeFilter = document.querySelector('.img-filters__button--active');
    activeFilter.classList.remove('img-filters__button--active');
    filterDefaultButton.classList.add('img-filters__button--active');
    if(activeFilter !== filterDefaultButton) {
      cb();
    }
  });
};

const setMostDiscussedFilterClickHandler = (cb) => {
  filterMostDiscussedButton.addEventListener('click', () => {
    const activeFilter = document.querySelector('.img-filters__button--active');
    activeFilter.classList.remove('img-filters__button--active');
    filterMostDiscussedButton.classList.add('img-filters__button--active');
    if(activeFilter !== filterMostDiscussedButton) {
      cb();
    }
  });
};

const setRandomFilterClickHandler = (cb) => {
  filterRandomButton.addEventListener('click', () => {
    const activeFilter = document.querySelector('.img-filters__button--active');
    activeFilter.classList.remove('img-filters__button--active');
    filterRandomButton.classList.add('img-filters__button--active');
    cb();
  });
};

export { compareCommentsCount, setDefaultFilterClickHandler, setMostDiscussedFilterClickHandler, setRandomFilterClickHandler, picturesFilter };
