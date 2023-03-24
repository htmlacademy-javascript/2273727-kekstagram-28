import { renderPhotos } from './rendering-mini.js';
import { picturesContainer } from './rendering-mini.js';
import { onMiniatureClick } from './rendering-full.js';




const getData = () => fetch(
  'https://28.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
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
    throw new Error('Не удалось отправить форму. Попробуйте ещё раз');
  });

export { getData, sendData };
