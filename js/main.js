import { renderPictures } from './pictures-preview-loader.js';
import { loadData, showError } from './api.js';
import { setImageUploadFormSubmit } from './image-upload.js';
import { debounce } from './util.js';
import { showFilter, setFilterClickHandler } from './image-filtration.js';

import './show-image-fullscreen.js';
import './image-upload.js';
import './image-scaling.js';
import './image-effect.js';
import './image-filtration.js';

const RERENDER_DELAY = 500;

try {
  loadData()
  .then((picturesObjects) => {
    renderPictures(picturesObjects);
    showFilter();
    setFilterClickHandler(picturesObjects);
  });
} catch {
  showError()
}

setImageUploadFormSubmit();
