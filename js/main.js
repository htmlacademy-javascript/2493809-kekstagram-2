import { generatePhotoObjects } from './data-generator.js';
import { renderPictures} from './pictures-loader.js';

import './hashtag-checker.js';
import './image-scaling.js';
import './image-effect.js';
import './image-upload.js';
import './server-upload.js';
import './image-filtration.js';

renderPictures(generatePhotoObjects());
