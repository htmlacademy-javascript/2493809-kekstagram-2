import { isEscapeKey } from './util.js';

const htmlBody = document.querySelector('body');
const picture = document.querySelector('.big-picture');
const picturesLikesCount = document.querySelector('.likes-count');
const pictureCloseButton = document.querySelector('#picture-cancel');
const pictureDescription = document.querySelector('.social__caption');
const pictureComments = document.querySelector('.social__comment-count');
const commentsShowMoreButton = document.querySelector('.comments-loader');
const pictureShownComments = document.querySelector('.social__comment-shown-count');
const pictureTotalComments = document.querySelector('.social__comment-total-count');
const commentsList = document.querySelector('.social__comments');
const commentTemplate = commentsList.querySelector('li');

const loadComment = (avatarSrc, author, message) => {
  const newComment = commentTemplate.cloneNode(true);

  newComment.querySelector('.social__picture').src = avatarSrc;
  newComment.querySelector('.social__picture').alt = author;
  newComment.querySelector('.social__text').textContent = message;

  commentsList.appendChild(newComment);
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePicturePopup();
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

const closePicturePopup = () => {
  htmlBody.classList.remove('modal-open');

  picture.classList.add('hidden');

  pictureCloseButton.removeEventListener('click', closePicturePopup);
  document.removeEventListener('keydown', onDocumentKeydown);
};

const openPicturePopup = (url, description, likes, comments) => {
  htmlBody.classList.add('modal-open');

  picture.classList.remove('hidden');
  picture.querySelector('img').src = url;
  picturesLikesCount.textContent = likes;
  pictureDescription.textContent = description;
  pictureShownComments.textContent = comments.length;
  pictureTotalComments.textContent = comments.length;

  pictureCloseButton.addEventListener('click', closePicturePopup);

  commentsList.innerHTML = '';
  comments.forEach(({ avatar, name, message }) => {
    loadComment(avatar, name, message);
  });

  pictureComments.classList.add('hidden');
  commentsShowMoreButton.classList.add('hidden');

  document.addEventListener('keydown', onDocumentKeydown);
};

export { openPicturePopup };
