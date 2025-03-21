import { uploadFormCloseHandler } from './image-upload.js';
import { unblockSubmitButton } from './image-upload.js';

const dataErrorTemplateNode = document.querySelector('#data-error').content.querySelector('.data-error');
const successTemplateNode = document.querySelector('#success').content.querySelector('.success');
const errorTemplateNode = document.querySelector('#error').content.querySelector('.error');
const ERROR_TIMEOUT_MS = 5000;
const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const showError = () => {
  const errorMessage = dataErrorTemplateNode.cloneNode(true);
  document.body.appendChild(errorMessage);
  setTimeout(() => {
    errorMessage.remove();
  }, ERROR_TIMEOUT_MS);
};

const uploadSuccessful = () => {
  const successMessage = successTemplateNode.cloneNode(true);
  document.body.appendChild(successMessage);

  const successTemplateNodeClickHandler = (evt) => {
    if(!evt.target.closest('div') || evt.target.closest('button')) {
      successMessage.remove();
      document.body.removeEventListener('click', successTemplateNodeClickHandler);
    }
  };
  document.body.addEventListener('click', successTemplateNodeClickHandler);

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

  uploadFormCloseHandler(true);
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
