import { isEscapeKey } from './util.js';
import { showComments, clearComments } from './comments-loader.js';

const image = document.querySelector('.big-picture');
const imageLikesCount = document.querySelector('.likes-count');
const imageCloseButton = document.querySelector('#picture-cancel');
const imageDescription = document.querySelector('.social__caption');

const documentKeydownHandler = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImagePopup();
    document.removeEventListener('keydown', documentKeydownHandler);

    clearComments();
  }
};

function closeImagePopup() {
  document.body.classList.remove('modal-open');

  image.classList.add('hidden');

  clearComments();

  imageCloseButton.removeEventListener('click', imageCloseButtonClickHandler);
  document.removeEventListener('keydown', documentKeydownHandler);
}

function imageCloseButtonClickHandler() {
  closeImagePopup();
}

const openImagePopup = (imageData) => {
  document.body.classList.add('modal-open');

  image.classList.remove('hidden');

  image.querySelector('img').src = imageData.url;
  imageLikesCount.textContent = imageData.likes;
  imageDescription.textContent = imageData.description;
  imageCloseButton.addEventListener('click', imageCloseButtonClickHandler);

  showComments(imageData.comments);

  document.addEventListener('keydown', documentKeydownHandler);
};


export { openImagePopup };
