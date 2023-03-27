import { renderPhotos } from './rendering-mini.js';
import { picturesContainer } from './rendering-mini.js';
import { onMiniatureClick } from './rendering-full.js';
import { isEscKeydown } from './util.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const successWindow = successTemplate.cloneNode(true);
successWindow.classList.add('hidden');
document.body.append(successWindow);

const showSuccess = () => {
  successWindow.classList.remove('hidden');
  const closeButton = successWindow.querySelector('.success__button');
  const successInner = document.querySelector('.success__inner');
  function closeSuccessWindow () {
    successWindow.classList.add('hidden');
  }
  closeButton.addEventListener('click', closeSuccessWindow);
  document.addEventListener('keydown', (evt) => {
    if (isEscKeydown(evt)) {
      closeSuccessWindow();
    }
  });
  document.addEventListener('click', (evt) => {
    if (evt.target !== successInner) {
      closeSuccessWindow();
    }
  });
};

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorWindow = errorTemplate.cloneNode(true);
errorWindow.classList.add('hidden');
document.body.append(errorWindow);

const closeButton = errorWindow.querySelector('.error__button');
const errorInner = document.querySelector('.error__inner');

function closeErrorWindow () {
  errorWindow.classList.add('hidden');
}
closeButton.addEventListener('click', closeErrorWindow);
document.addEventListener('keydown', (evt) => {
  if (isEscKeydown(evt)) {
    closeErrorWindow();
  }
});
document.addEventListener('click', (evt) => {
  if (evt.target !== errorInner) {
    closeErrorWindow();
  }
});

const showError = () => {
  errorWindow.classList.remove('hidden');
};

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

const sendData = (body, onSuccess) => fetch(
  'https://28.javascript.pages.academy/kekstagram',
  {
    method: 'POST',
    body,
  })
  .then((response) => {
    if (response.ok) {
      onSuccess();
      showSuccess();
    } else {
      showError();
    }
  })
  .catch(() => {
    throw new Error(ErrorText.SEND_DATA);
  });

export { getData, sendData };
