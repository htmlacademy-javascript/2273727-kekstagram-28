// модуль под логику загрузки фото

import { isEscKeydown } from './util.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadButton = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const formCloseButton = uploadForm.querySelector('.img-upload__cancel');
const inputHashtags = uploadForm.querySelector('.text__hashtags');
const inputText = uploadForm.querySelector('.text__description');
const submitButton = uploadForm.querySelector('.img-upload__submit');
const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

// валидация поля хэштегов (разбита на три случая для вывода корректных сообщений об ошибке)
function validateHashtagsByExaple (value) {
  if (value === '') {
    return true;
  }
  const hashtags = value.trim().split(' ');
  const hashtagExample = /^#[a-zа-яё0-9]{1,19}$/i;
  for (let i = 0; i < hashtags.length; i++) {
    const hashtag = hashtags[i];
    if (!hashtagExample.test(hashtag)) {
      return false;
    }
  }
  return true;
}

function validateHashtagsByUsed (value) {
  const hashtags = value.trim().split(' ');
  const usedTags = {};
  for (let i = 0; i < hashtags.length; i++) {
    const hashtag = hashtags[i];

    if (usedTags[hashtag.toLowerCase()]) {
      return false;
    } else {
      usedTags[hashtag.toLowerCase()] = true;
    }
  }
  return true;

}

function validateHashtagsByLength (value) {
  const hashtags = value.trim().split(' ');
  for (let i = 0; i < hashtags.length; i++) {
    if (hashtags.length > 5) {
      return false;
    }
  }
  return true;
}

pristine.addValidator(inputHashtags, validateHashtagsByExaple, 'Хэштег должен содержать только буквы и цифры, длина не более 20 символов!');
pristine.addValidator(inputHashtags, validateHashtagsByUsed, 'Хэштег уже использовался!');
pristine.addValidator(inputHashtags, validateHashtagsByLength, 'Количество хэштегов - не более 5!');

inputHashtags.addEventListener('keyup', () => {
  pristine.validate();
  if (!pristine.validate()) {
    submitButton.disabled = true;
  } else {
    submitButton.disabled = false;
  }
});

// валидация текста
function validateText (value) {
  submitButton.disabled = (value.length > 140);
  return value.length <= 140;
}

pristine.addValidator(inputText, validateText, 'Максимальная длина комментария - 140 символов');

inputText.addEventListener('keyup', () => {
  pristine.validate();
});

// здесь убирается нажатие Escape при фокусе в инпуте
inputHashtags.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

inputText.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

// открытие формы
function onUploadButtonChange () {
  uploadOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  // место под обработчики событий
}
uploadButton.addEventListener('change', onUploadButtonChange);


// закрытие формы
function onFormCloseButtonClick () {
  uploadOverlay.classList.add('hidden');
  uploadButton.value = '';
  // здесь удаляются все обработчики событий внутри формы ЕСЛИ они создаются при открытии формы
}
formCloseButton.addEventListener('click', onFormCloseButtonClick);

document.addEventListener('keydown', (evt) => {
  if (isEscKeydown(evt)) {
    uploadOverlay.classList.add('hidden');
    uploadButton.value = '';
    // здесь удаляются все обработчики событий внутри формы ЕСЛИ они создаются при открытии формы
    document.querySelector('body').classList.remove('modal-open');
  }
});


// логика работы масштабирования фото - НАЧИНАЯ ОТСЮДА ПЕРЕНЕСТИ ВСЕ В REDACTOR.JS

const smallerScaleButton = uploadForm.querySelector('.scale__control--smaller');
const biggerScaleButton = uploadForm.querySelector('.scale__control--bigger');
let scaleControlInputValue = uploadForm.querySelector('.scale__control--value').value;
const previewImage = document.querySelector('.img-upload__preview img');

const updateButtonStatus = () => {
  smallerScaleButton.disabled = parseFloat(scaleControlInputValue) <= 25;
  biggerScaleButton.disabled = parseFloat(scaleControlInputValue) >= 100;
};
updateButtonStatus();

smallerScaleButton.addEventListener('click', () => {
  scaleControlInputValue = `${parseFloat(scaleControlInputValue) - 25}%`;
  uploadForm.querySelector('.scale__control--value').value = scaleControlInputValue;
  previewImage.style.transform = `scale(${scaleControlInputValue})`;
  updateButtonStatus();
});

biggerScaleButton.addEventListener('click', () => {
  scaleControlInputValue = `${parseFloat(scaleControlInputValue) + 25}%`;
  uploadForm.querySelector('.scale__control--value').value = scaleControlInputValue;
  previewImage.style.transform = `scale(${scaleControlInputValue})`;
  updateButtonStatus();
});

// выбор эффекта

const effectsContainer = document.querySelector('.effects__list');

function onEffectCheck (evt) {
  if (evt.target.closest('.effects__item')) {
    previewImage.className = '';
    if (evt.target.closest('.effects__item').querySelector('.effects__radio').value === 'none') {
      return;
    }
    previewImage.classList.add(`effects__preview--${evt.target.closest('.effects__item').querySelector('.effects__radio').value}`);
  }
}

effectsContainer.addEventListener('change', onEffectCheck);

// похоже надо навесить обработчики событий на фильтры, чтобы при клике создавался слайдер. при клике на фильтр "оригинал" слайдер уничтожается.

