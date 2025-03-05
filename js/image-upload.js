import { isEscapeKey } from './util.js';
import { imagePreview, scaleValueField } from './image-scaling.js';
import { validateHashtag, checkForRepeatingHashtag, checkForHashtagCount } from './hashtag-validation.js';

const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadNode = imageUploadForm.querySelector('.img-upload__overlay');
const imageUploadInput = imageUploadForm.querySelector('.img-upload__input');
const imageUploadCloseButton = imageUploadForm.querySelector('.img-upload__cancel');
const effectOriginal = imageUploadForm.querySelector('#effect-none');
const hashtagsInput = imageUploadForm.querySelector('.text__hashtags');
const commentInput = imageUploadForm.querySelector('.text__description');

const pristine = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
}, false);

pristine.addValidator(imageUploadForm.querySelector('.text__hashtags'), validateHashtag, 'Введён невалидный хэштег');
pristine.addValidator(imageUploadForm.querySelector('.text__hashtags'), checkForRepeatingHashtag, 'Хэштеги повторяются');
pristine.addValidator(imageUploadForm.querySelector('.text__hashtags'), checkForHashtagCount, 'Превышено количество хэштегов');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    uploadFormCloseHandler();
    document.removeEventListener('keydown', onDocumentKeydown);
    imageUploadForm.removeEventListener('keydown', uploadFormNoEscWhenInputActive);
    imageUploadCloseButton.removeEventListener('click', uploadFormCloseHandler);
  }
};

function uploadFormClear() {
  imageUploadInput.value = '';
  hashtagsInput.value = '';
  commentInput.value = '';
  effectOriginal.checked = true;
  imagePreview.style.transform = '';
  scaleValueField.value = '100%';
}

function uploadFormCloseHandler() {
  imageUploadNode.classList.add('hidden');
  document.body.classList.remove('modal-open');

  uploadFormClear();
  document.removeEventListener('keydown', onDocumentKeydown);
  imageUploadCloseButton.removeEventListener('click', uploadFormCloseHandler);
}

function uploadFormNoEscWhenInputActive(evt) {
  if(isEscapeKey(evt) && (evt.target === hashtagsInput || evt.target === commentInput)) {
    evt.stopPropagation();
  }
}

imageUploadInput.addEventListener('change', ()=> {
  imageUploadNode.classList.remove('hidden');
  document.body.classList.add('modal-open');

  imageUploadForm.addEventListener('keydown', uploadFormNoEscWhenInputActive);
  imageUploadCloseButton.addEventListener('click', uploadFormCloseHandler);
  document.addEventListener('keydown', onDocumentKeydown);
});

imageUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();

  imageUploadForm.removeEventListener('keydown', uploadFormNoEscWhenInputActive);
  imageUploadCloseButton.removeEventListener('click', uploadFormCloseHandler);
});


