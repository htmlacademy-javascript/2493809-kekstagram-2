import { openPicturePopup } from './show-image-fullscreen.js';

const picturesFragment = document.createDocumentFragment();
const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

/**
* Отображает превью изображений на странице.
* @param {Array} usersPictures - Массив объектов с данными изображений.
*/

const renderPictures = (usersPictures) => {
  const existingPictures = picturesContainer.querySelectorAll('.picture');
  existingPictures.forEach((picture) => picture.remove());

  usersPictures.forEach(({ id, url, description, likes, comments }) => {
    const pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.dataset.id = id;
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;

    picturesFragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(picturesFragment);
};

const setPicturesContainerClickHandler = (pictures) => {
  picturesContainer.addEventListener('click', (evt) => {
    const currentPictureNode = evt.target.closest('.picture');
    const currentPictureNodeId = currentPictureNode.dataset.id;

    const currentPicture = pictures.find((picture) => picture.id === Number(currentPictureNodeId));

    if (currentPicture) {
      openPicturePopup(currentPicture);
    }
  });
};

export { picturesContainer, renderPictures, setPicturesContainerClickHandler };
