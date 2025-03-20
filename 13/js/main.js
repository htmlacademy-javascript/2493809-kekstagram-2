import { renderPictures } from './pictures-preview-loader.js';
import { loadData } from './api.js';
import { setImageUploadFormSubmit } from './image-upload.js';
import { debounce } from './util.js';
import { getRandomInteger } from './util.js';
import { setDefaultFilterClickHandler, setRandomFilterClickHandler, setMostDiscussedFilterClickHandler, compareCommentsCount } from './image-filtration.js';

import './show-image-fullscreen.js';
import './image-upload.js';
import './image-scaling.js';
import './image-effect.js';
import './image-filtration.js';

const RERENDER_DELAY = 500;

loadData()
  .then((picturesObjects) => {
    renderPictures(picturesObjects);
    setDefaultFilterClickHandler(debounce(
      () => renderPictures(picturesObjects),
      RERENDER_DELAY
    ));
    setMostDiscussedFilterClickHandler(debounce(
      () => renderPictures(picturesObjects.slice().sort(compareCommentsCount)),
      RERENDER_DELAY
    ));
    setRandomFilterClickHandler(debounce(
      () => renderPictures(picturesObjects.slice().sort(() => getRandomInteger(-1, 1)).splice(0, 10)),
      RERENDER_DELAY
    ));
  });

setImageUploadFormSubmit();
