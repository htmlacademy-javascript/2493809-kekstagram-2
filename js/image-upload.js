import { isEscapeKey } from './util.js';
import { imagePreview, scaleValueField } from './image-scaling.js';
import { sliderElementWrapper } from './image-effect.js';
import { validateAllHashtags, validateHashtagError } from './hashtag-validation.js';
import { validateComment } from './comment-validation.js';

const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadNode = imageUploadForm.querySelector('.img-upload__overlay');
const imageUploadInput = imageUploadForm.querySelector('.img-upload__input');
const imageUploadCloseButton = imageUploadForm.querySelector('.img-upload__cancel');
const effectOriginal = imageUploadForm.querySelector('#effect-none');
const hashtagsInput = imageUploadForm.querySelector('.text__hashtags');
const commentInput = imageUploadForm.querySelector('.text__description');

const pristine = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
}, false);

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
  sliderElementWrapper.classList.add('hidden');
  imagePreview.style.transform = '';
  imagePreview.style.filter = '';
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

pristine.addValidator(imageUploadForm.querySelector('.text__hashtags'), validateAllHashtags, validateHashtagError);
pristine.addValidator(imageUploadForm.querySelector('.text__description'), validateComment, 'Длина комментария не может составлять больше 140 символов');

imageUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();

  imageUploadForm.removeEventListener('keydown', uploadFormNoEscWhenInputActive);
  imageUploadCloseButton.removeEventListener('click', uploadFormCloseHandler);
});
