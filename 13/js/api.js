import { uploadFormCloseHandler, documentKeydownHandler } from './image-upload.js';
import { unblockSubmitButton } from './image-upload.js';
import { isEscapeKey } from './util.js';

const ERROR_TIMEOUT_MS = 5000;
const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const dataErrorTemplateNode = document.querySelector('#data-error').content.querySelector('.data-error');
const successTemplateNode = document.querySelector('#success').content.querySelector('.success');
const errorTemplateNode = document.querySelector('#error').content.querySelector('.error');
const errorMessage = errorTemplateNode.cloneNode(true);
const successMessage = successTemplateNode.cloneNode(true);

const showError = () => {
  const errorMessageNode = dataErrorTemplateNode.cloneNode(true);
  document.body.appendChild(errorMessageNode);
  setTimeout(() => {
    errorMessageNode.remove();
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

const loadData = () =>
  fetch(`${BASE_URL}${Route.GET_DATA}`)
    .then((response) => {
      if(!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      showError();
    });

const uploadData = (body) => {
  fetch(
    `${BASE_URL}${Route.SEND_DATA}`,
    {
      method: 'POST',
      body: body,
    },
  ).then((response) => {
    if(!response.ok) {
      throw new Error();
    }
    uploadSuccessful();
  }).catch(uploadError)
    .finally(unblockSubmitButton);
};

export { loadData, uploadData, showError };
