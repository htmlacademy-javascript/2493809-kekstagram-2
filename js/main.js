import { generatePhotoObjects } from './data-generator.js';
import { renderPictures } from './pictures-preview-loader.js';

import './show-image-fullscreen.js';
import './hashtag-validation.js';
import './comment-validation.js';
import './image-upload.js';
import './image-scaling.js';
import './image-effect.js';
import './image-filtration.js';

renderPictures(generatePhotoObjects());
