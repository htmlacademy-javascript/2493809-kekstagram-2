import { generatePhotoObjects } from './data-generator.js';

const pictures = document.querySelector('.pictures');
const usersPictures = generatePhotoObjects();
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesFragment = document.createDocumentFragment();

usersPictures.forEach(({ url, description, likes, comments}) => {
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__img').alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  picturesFragment.appendChild(pictureElement);
});

pictures.appendChild(picturesFragment);
