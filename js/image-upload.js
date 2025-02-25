import { isEscapeKey } from './util.js';
import { validateHashtag, checkForRepeatingHashtag } from './hashtag-validation.js'

const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadNode = imageUploadForm.querySelector('.img-upload__overlay');
const imageUploadCloseButton = imageUploadForm.querySelector('.img-upload__cancel');

const pristine = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

pristine.addValidator(imageUploadForm.querySelector('.text__hashtags'), validateHashtag, 'Неправильно введен хештэг');

pristine.addValidator(imageUploadForm.querySelector('.text__hashtags'), checkForRepeatingHashtag, 'Один и тот же хэштег не может быть использован дважды');

imageUploadForm.addEventListener('change', ()=> {
  imageUploadNode.classList.remove('hidden');

  const isValid = pristine.validate();


});

imageUploadCloseButton.addEventListener('click', () => {
  imageUploadNode.classList.add('hidden');
});
