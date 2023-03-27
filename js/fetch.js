import { renderPhotos } from './rendering-mini.js';
import { picturesContainer } from './rendering-mini.js';
import { onMiniatureClick } from './rendering-full.js';
import { getUniqueRandomInteger, isEscKeydown, showAlert, debounce } from './util.js';

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
const compareByDiscussed = (a, b) => b.comments.length - a.comments.length;

const RERENDER_DELAY = 500;
const buttonFilterDefault = filters.querySelector('#filter-default');
const buttonFilterRandom = filters.querySelector('#filter-random');
const buttonFilterDiscussed = filters.querySelector('#filter-discussed');

const setFilterDefaultClick = (objects) => {
  buttonFilterDefault.addEventListener('click', debounce(() => {
    renderPhotos(objects);
    buttonFilterDefault.classList.toggle('img-filters__button--active'); // пробовал это (и ниже) обернуть в универсальную функцию, но не додумался, как ее сделать)
    buttonFilterRandom.classList.remove('img-filters__button--active');
    buttonFilterDiscussed.classList.remove('img-filters__button--active');
  }, RERENDER_DELAY));
};

const setFilterRandomClick = (objects) => {
  buttonFilterRandom.addEventListener('click', debounce(() => {
    const randomObjects = [];
    const randomIndex = getUniqueRandomInteger(0, 24);
    for (let i = 0; i < 10; i++) {
      randomObjects.push(objects[randomIndex()]);
    }
    renderPhotos(randomObjects);
    buttonFilterDefault.classList.remove('img-filters__button--active');
    buttonFilterRandom.classList.toggle('img-filters__button--active');
    buttonFilterDiscussed.classList.remove('img-filters__button--active');
  }, RERENDER_DELAY));
};

const setFilterDiscussedClick = (objects) => {
  buttonFilterDiscussed.addEventListener('click', debounce(() => {
    renderPhotos(objects, compareByDiscussed);
    buttonFilterDefault.classList.remove('img-filters__button--active');
    buttonFilterRandom.classList.remove('img-filters__button--active');
    buttonFilterDiscussed.classList.toggle('img-filters__button--active');
  }, RERENDER_DELAY));
};

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
  setFilterDefaultClick(objects);
  setFilterRandomClick(objects);
  setFilterDiscussedClick(objects);
  picturesContainer.addEventListener('click', (evt) => onMiniatureClick(evt, objects));
  filters.classList.remove('img-filters--inactive');
};

// отправка данных формы
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

export { getData, sendData, setFilterDefaultClick, setFilterDiscussedClick, setFilterRandomClick };
