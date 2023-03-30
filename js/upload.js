// модуль под логику загрузки и валидации фото

import { isEscKeydown } from './util.js';
import { showAlert } from './util.js';
import { sendData } from './fetch.js';
import { errorWindow } from './fetch.js';

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

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
const validateHashtagsByExample = (value) => {
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
};

const validateHashtagsByUsed = (value) => {
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

};

const validateHashtagsByLength = (value) => {
  const hashtags = value.trim().split(' ');
  if (hashtags.length > 5) {
    return false;
  }
  return true;
};

pristine.addValidator(inputHashtags, validateHashtagsByExample, 'Хэштег должен содержать только буквы и цифры, длина не более 20 символов!');
pristine.addValidator(inputHashtags, validateHashtagsByUsed, 'Хэштег уже использовался!');
pristine.addValidator(inputHashtags, validateHashtagsByLength, 'Количество хэштегов - не более 5!');

inputHashtags.addEventListener('keyup', () => {
  pristine.validate();
  submitButton.disabled = (!pristine.validate());
});

// валидация текста
const validateText = (value) => value.length <= 140;


pristine.addValidator(inputText, validateText, 'Максимальная длина комментария - 140 символов');

inputText.addEventListener('keyup', () => {
  pristine.validate();
  submitButton.disabled = (!pristine.validate());
});

// здесь убирается нажатие Escape при фокусе в инпуте
inputHashtags.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

inputText.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

// открытие формы
const onUploadButtonChange = () => {
  uploadOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
};

uploadButton.addEventListener('change', onUploadButtonChange);

// закрытие формы
const closeForm = () => {
  uploadOverlay.classList.add('hidden');
  uploadButton.value = '';
  document.querySelector('body').classList.remove('modal-open');
  uploadForm.reset();
};

formCloseButton.addEventListener('click', closeForm);

document.addEventListener('keydown', (evt) => {
  if (isEscKeydown(evt)) {
    if (errorWindow.classList.contains('hidden')) {
      closeForm();
    }
  }
});

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const setFormSubmit = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    blockSubmitButton();
    sendData(new FormData(evt.target), onSuccess)
      .catch((err) => {
        showAlert(err.message);
      }).finally(unblockSubmitButton);
  });
};

export { closeForm, setFormSubmit };
