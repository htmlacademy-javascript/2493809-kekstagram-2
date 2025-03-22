import { isEscapeKey } from './util.js';
import { uploadData } from './api.js';
import { imagePreview, scaleValueField } from './image-scaling.js';
import { sliderElementWrapper, effectsPreviewElements } from './image-effect.js';
import { validateAllHashtags, validateHashtagError } from './hashtag-validation.js';
import { validateComment, validateCommentError } from './comment-validation.js';

const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadNode = imageUploadForm.querySelector('.img-upload__overlay');
const imageUploadInput = imageUploadForm.querySelector('.img-upload__input');
const imageUploadSubmit = imageUploadForm.querySelector('.img-upload__submit');
const imageUploadCloseButton = imageUploadForm.querySelector('.img-upload__cancel');
const effectOriginal = imageUploadForm.querySelector('#effect-none');
const hashtagsInput = imageUploadForm.querySelector('.text__hashtags');
const commentInput = imageUploadForm.querySelector('.text__description');
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const pristine = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
}, false);

const blockSubmitButton = () => {
  imageUploadSubmit.disabled = true;
};

const unblockSubmitButton = () => {
  imageUploadSubmit.disabled = false;
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    uploadFormCloseHandler();
    imageUploadForm.removeEventListener('keydown', uploadFormNoEscWhenInputActive);
    imageUploadCloseButton.removeEventListener('click', uploadFormCloseHandler);
  }
};

function uploadFormClear() {
  hashtagsInput.value = '';
  commentInput.value = '';
  effectOriginal.checked = true;
  sliderElementWrapper.classList.add('hidden');
  imagePreview.style.filter = '';
  scaleValueField.value = '100%';
  imagePreview.style.transform = '';
}

function uploadFormCloseHandler() {
  imageUploadNode.classList.add('hidden');
  document.body.classList.remove('modal-open');
  imageUploadInput.value = '';
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
  const file = imageUploadInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((extension) => fileName.endsWith(extension));
  if (matches) {
    const tempPath = URL.createObjectURL(file)
    imagePreview.src = tempPath;
    effectsPreviewElements.forEach((preview) => preview.style.backgroundImage = `url("${tempPath}")`);
  }

  imageUploadNode.classList.remove('hidden');
  document.body.classList.add('modal-open');

  imageUploadForm.addEventListener('keydown', uploadFormNoEscWhenInputActive);
  imageUploadCloseButton.addEventListener('click', uploadFormCloseHandler);
  document.addEventListener('keydown', onDocumentKeydown);
});

pristine.addValidator(imageUploadForm.querySelector('.text__hashtags'), validateAllHashtags, validateHashtagError);
pristine.addValidator(imageUploadForm.querySelector('.text__description'), validateComment, validateCommentError);


const setImageUploadFormSubmit = () => {
  imageUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if(isValid) {
      const formData = new FormData(evt.target);
      blockSubmitButton();
      uploadData(formData);
    }

    imageUploadForm.removeEventListener('keydown', uploadFormNoEscWhenInputActive);
    imageUploadCloseButton.removeEventListener('click', uploadFormCloseHandler);
  });
};

export { setImageUploadFormSubmit, uploadFormCloseHandler, unblockSubmitButton };
