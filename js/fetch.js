import { renderPhotos } from './rendering-mini.js';
import { picturesContainer } from './rendering-mini.js';
import { onMiniatureClick } from './rendering-full.js';

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const getData = () => fetch(
  'https://28.javascript.pages.academy/kekstagram/data')
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  })
  .catch(() => {
    throw new Error(ErrorText.GET_DATA);
  })
  .then((objects) => {
    renderPhotos(objects);
    picturesContainer.addEventListener('click', (evt) => onMiniatureClick(evt, objects));
  });

const sendData = (body) => fetch(
  'https://28.javascript.pages.academy/kekstagram',
  {
    method: 'POST',
    body,
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
  })
  .catch(() => {
    throw new Error(ErrorText.SEND_DATA);
  });

export { getData, sendData };
