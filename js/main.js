import { renderImages, setImagesContainerClickHandler } from './images-preview-loader.js';
import { loadData, showError } from './api.js';
import { initForm } from './image-upload.js';
import { showFilter, setFilterClickHandler } from './image-filtration.js';

import './show-image-fullscreen.js';
import './image-upload.js';
import './image-scaling.js';
import './image-effect.js';
import './image-filtration.js';


const init = async () => {
  try {
    const imagesData = await loadData();
    renderImages(imagesData);
    setImagesContainerClickHandler(imagesData);
    showFilter();
    setFilterClickHandler(imagesData);
  } catch {
    showError();
  }
};

init();
initForm();

