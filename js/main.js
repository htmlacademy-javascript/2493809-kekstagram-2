import { renderPictures, setPicturesContainerClickHandler } from './pictures-preview-loader.js';
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
    const picturesData = await loadData();
    renderPictures(picturesData);
    setPicturesContainerClickHandler(picturesData);
    showFilter();
    setFilterClickHandler(picturesData);
  } catch {
    showError();
  }
};

init();
initForm();

