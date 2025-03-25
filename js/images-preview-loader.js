import { openImagePopup } from './show-image-fullscreen.js';

const imagesFragment = document.createDocumentFragment();
const imagesContainer = document.querySelector('.pictures');
const imageTemplate = document.querySelector('#picture').content.querySelector('.picture');

/**
* Отображает превью изображений на странице.
* @param {Array} usersImages - Массив объектов с данными изображений.
*/

const renderImages = (usersImages) => {
  const existingImages = imagesContainer.querySelectorAll('.picture');
  existingImages.forEach((picture) => picture.remove());

  usersImages.forEach(({ id, url, description, likes, comments }) => {
    const imageElement = imageTemplate.cloneNode(true);

    imageElement.dataset.id = id;
    imageElement.querySelector('.picture__img').src = url;
    imageElement.querySelector('.picture__img').alt = description;
    imageElement.querySelector('.picture__likes').textContent = likes;
    imageElement.querySelector('.picture__comments').textContent = comments.length;

    imagesFragment.appendChild(imageElement);
  });

  imagesContainer.appendChild(imagesFragment);
};

const setImagesContainerClickHandler = (images) => {
  imagesContainer.addEventListener('click', (evt) => {
    const currentImageNode = evt.target.closest('.picture');
    if (currentImageNode){
      const currentImageNodeId = currentImageNode.dataset.id;

      const currentImageObject = images.find((image) => image.id === Number(currentImageNodeId));

      if (currentImageObject) {
        openImagePopup(currentImageObject);
      }
    }
  });
};

export { imagesContainer, renderImages, setImagesContainerClickHandler };
