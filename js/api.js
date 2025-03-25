import { showError, uploadSuccessful, uploadError } from './show-status-popup.js';
import { unblockSubmitButton } from './image-upload.js';

const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const loadData = () =>
  fetch(`${BASE_URL}${Route.GET_DATA}`)
    .then((response) => {
      if(!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(showError);

const uploadData = async (body) => {
  fetch(
    `${BASE_URL}${Route.SEND_DATA}1`,
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

export { loadData, uploadData };
