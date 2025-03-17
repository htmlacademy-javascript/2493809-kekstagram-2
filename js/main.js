import { renderPictures } from './pictures-preview-loader.js';
import { loadData } from './api.js';
import { setImageUploadFormSubmit } from './image-upload.js';

import './show-image-fullscreen.js';
import './image-upload.js';
import './image-scaling.js';
import './image-effect.js';
import './image-filtration.js';

loadData(renderPictures);
setImageUploadFormSubmit();
