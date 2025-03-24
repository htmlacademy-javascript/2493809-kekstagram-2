import { isEscapeKey } from './util.js';
import { showComments, clearComments } from './comments-loader.js';

const picture = document.querySelector('.big-picture');
const pictureLikesCount = document.querySelector('.likes-count');
const pictureCloseButton = document.querySelector('#picture-cancel');
const pictureDescription = document.querySelector('.social__caption');

const documentKeydownHandler = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePicturePopup();
    document.removeEventListener('keydown', documentKeydownHandler);

    clearComments();
  }
};

function closePicturePopup() {
  document.body.classList.remove('modal-open');

  picture.classList.add('hidden');

  clearComments();

  pictureCloseButton.removeEventListener('click', closePicturePopup);
  document.removeEventListener('keydown', documentKeydownHandler);
}

const openPicturePopup = (pictureData) => {
  document.body.classList.add('modal-open');

  picture.classList.remove('hidden');

  picture.querySelector('img').src = pictureData.url;
  pictureLikesCount.textContent = pictureData.likes;
  pictureDescription.textContent = pictureData.description;
  pictureCloseButton.addEventListener('click', closePicturePopup);

  showComments(pictureData.comments);

  document.addEventListener('keydown', documentKeydownHandler);
};


export { openPicturePopup };
