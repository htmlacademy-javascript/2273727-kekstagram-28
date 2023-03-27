import { renderPhotos } from './rendering-mini.js';
import { picturesContainer } from './rendering-mini.js';
import { onMiniatureClick } from './rendering-full.js';
import { isEscKeydown, showAlert } from './util.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const successWindow = successTemplate.cloneNode(true);
successWindow.classList.add('hidden');
document.body.append(successWindow);

const showSuccess = () => {
  successWindow.classList.remove('hidden');
  const closeSuccessButton = successWindow.querySelector('.success__button');
  const successInner = document.querySelector('.success__inner');
  function closeSuccessWindow () {
    successWindow.classList.add('hidden');
  }
  closeSuccessButton.addEventListener('click', closeSuccessWindow);
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

const filters = document.querySelector('.img-filters');
const getData = async () => {
  let response;
  try {
    response = await fetch('https://28.javascript.pages.academy/kekstagram/data');
    if (!response.ok) {
      throw new Error();
    }
  } catch {
    showAlert(ErrorText.GET_DATA);
  }
  const objects = await response.json();
  renderPhotos(objects);
  picturesContainer.addEventListener('click', (evt) => onMiniatureClick(evt, objects));
  filters.classList.remove('img-filters--inactive');
};

const sendData = async (body, onSuccess) => {
  let response;
  try {
    response = await fetch(
      'https://28.javascript.pages.academy/kekstagram',
      {
        method: 'POST',
        body,
      });
    if (response.ok) {
      onSuccess();
      showSuccess();
    } else {
      showError();
    }
  } catch {
    showAlert(ErrorText.SEND_DATA);
  }
};

export { getData, sendData };
