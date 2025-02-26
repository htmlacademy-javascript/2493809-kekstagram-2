import { isEscapeKey } from './util.js';
import { showComments, clearComments } from './comments-loader.js';

const picture = document.querySelector('.big-picture');
const picturesLikesCount = document.querySelector('.likes-count');
const pictureCloseButton = document.querySelector('#picture-cancel');
const pictureDescription = document.querySelector('.social__caption');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePicturePopup();
    document.removeEventListener('keydown', onDocumentKeydown);

    clearComments();
  }
};

function closePicturePopup() {
  document.body.classList.remove('modal-open');

  picture.classList.add('hidden');

  clearComments();

  pictureCloseButton.removeEventListener('click', closePicturePopup);
  document.removeEventListener('keydown', onDocumentKeydown);
}

const openPicturePopup = (url, description, likes, comments) => {
  document.body.classList.add('modal-open');

  picture.classList.remove('hidden');
  picture.querySelector('img').src = url;
  picturesLikesCount.textContent = likes;
  pictureDescription.textContent = description;
  pictureCloseButton.addEventListener('click', closePicturePopup);

  showComments(comments);

  document.addEventListener('keydown', onDocumentKeydown);
};


export { openPicturePopup };
