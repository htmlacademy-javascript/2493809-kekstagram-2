import { uploadFormCloseHandler, documentKeydownHandler } from './image-upload.js';
import { isEscapeKey } from './util.js';

const ERROR_TIMEOUT_MS = 5000;

const dataErrorTemplateNode = document.querySelector('#data-error').content.querySelector('.data-error');
const errorTemplateNode = document.querySelector('#error').content.querySelector('.error');
const successTemplateNode = document.querySelector('#success').content.querySelector('.success');
const dataErrorMessageNode = dataErrorTemplateNode.cloneNode(true);
const errorMessage = errorTemplateNode.cloneNode(true);
const successMessage = successTemplateNode.cloneNode(true);

const showError = () => {
  document.body.appendChild(dataErrorMessageNode);
  setTimeout(() => {
    dataErrorMessageNode.remove();
  }, ERROR_TIMEOUT_MS);
};


const onSuccessMessageKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    successMessageCloseHandler();
    successMessage.removeEventListener('click', successMessageCloseHandler);
  }
};

function successMessageCloseHandler() {
  successMessage.remove();
  document.removeEventListener('keydown', onSuccessMessageKeydown);
}

const uploadSuccessful = () => {
  document.body.appendChild(successMessage);
  document.addEventListener('keydown', onSuccessMessageKeydown);

  successMessage.addEventListener('click', (evt) => {
    if(!evt.target.closest('div') || evt.target.closest('button')) {
      successMessageCloseHandler();
    }
  });

  uploadFormCloseHandler();
};

const errorMessageCloseHandler = () => {
  errorMessage.remove();
  document.removeEventListener('keydown', errorMessageCloseHandler);
  document.addEventListener('keydown', documentKeydownHandler);
};

const errorMessageKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    errorMessageCloseHandler();
    errorMessage.removeEventListener('click', errorMessageCloseHandler);
  }
};

const uploadError = () => {
  document.body.appendChild(errorMessage);
  document.removeEventListener('keydown', documentKeydownHandler);
  document.addEventListener('keydown', errorMessageKeydown);

  errorMessage.addEventListener('click', (evt) => {
    if(!evt.target.closest('div') || evt.target.closest('button')) {
      errorMessageCloseHandler();
    }
  });
};

export { showError, uploadSuccessful, uploadError};
