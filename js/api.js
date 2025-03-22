import { uploadFormCloseHandler } from './image-upload.js';
import { unblockSubmitButton } from './image-upload.js';
import { isEscapeKey } from './util.js';

const dataErrorTemplateNode = document.querySelector('#data-error').content.querySelector('.data-error');
const successTemplateNode = document.querySelector('#success').content.querySelector('.success');
const errorTemplateNode = document.querySelector('#error').content.querySelector('.error');
const successMessage = successTemplateNode.cloneNode(true);
const ERROR_TIMEOUT_MS = 5000;
const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const showError = () => {
  const errorMessageNode = dataErrorTemplateNode.cloneNode(true);
  document.body.appendChild(errorMessageNode);
  setTimeout(() => {
    errorMessageNode.remove();
  }, ERROR_TIMEOUT_MS);
};

const uploadSuccessfulCloseHandler = () => {
  successMessage.remove()
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    uploadSuccessfulCloseHandler();
    successMessage.removeEventListener('click', uploadSuccessfulCloseHandler);
  }
};

const uploadSuccessful = () => {
  document.body.appendChild(successMessage);
  document.addEventListener('keydown', onDocumentKeydown);

  successMessage.addEventListener('click', (evt) => {
    if(!evt.target.closest('div') || evt.target.closest('button')) {
      uploadSuccessfulCloseHandler();
    }
  })

  uploadFormCloseHandler();
};

const uploadError = () => {
  const errorMessage = errorTemplateNode.cloneNode(true);
  document.body.appendChild(errorMessage);

  const errorTemplateNodeClickHandler = (evt) => {
    if(!evt.target.closest('div') || evt.target.closest('button')) {
      errorMessage.remove();
      document.body.removeEventListener('click', errorTemplateNodeClickHandler);
    }
  };

  document.body.addEventListener('click', errorTemplateNodeClickHandler);
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

    return uploadSuccessful();
  }).catch(uploadError)
    .finally(unblockSubmitButton);
};

export { loadData, uploadData, showError };
