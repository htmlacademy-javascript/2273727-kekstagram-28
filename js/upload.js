// модуль под логику загрузки и редактирования фото

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

// логика работы масштабирования фото

const smallerScaleButton = uploadForm.querySelector('.scale__control--smaller');
const biggerScaleButton = uploadForm.querySelector('.scale__control--bigger');
let scaleControlInputValue = 100;
const previewImage = document.querySelector('.img-upload__preview img');

const updateButtonStatus = () => {
  smallerScaleButton.disabled = scaleControlInputValue <= 25;
  biggerScaleButton.disabled = scaleControlInputValue >= 100;
};
updateButtonStatus();

smallerScaleButton.addEventListener('click', () => {
  scaleControlInputValue -= 25;
  uploadForm.querySelector('.scale__control--value').value = `${scaleControlInputValue}%`;
  previewImage.style.transform = `scale(${scaleControlInputValue}%)`;
  updateButtonStatus();
});

biggerScaleButton.addEventListener('click', () => {
  scaleControlInputValue += 25;
  uploadForm.querySelector('.scale__control--value').value = `${scaleControlInputValue}%`;
  previewImage.style.transform = `scale(${scaleControlInputValue}%)`;
  updateButtonStatus();
});

// создание слайдера

const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

const applyFilter = (effectName) => {
  const intensity = parseFloat(sliderElement.noUiSlider.get());
  valueElement.value = intensity;
  switch(effectName) {
    case 'chrome':
      previewImage.style.filter = `grayscale(${intensity})`;
      break;
    case 'sepia':
      previewImage.style.filter = `sepia(${intensity})`;
      break;
    case 'marvin':
      previewImage.style.filter = `invert(${intensity}%)`;
      break;
    case 'phobos':
      previewImage.style.filter = `blur(${intensity}px)`;
      break;
    case 'heat':
      previewImage.style.filter = `brightness(${intensity})`;
      break;
    default:
      previewImage.style.filter = '';
  }
};

sliderElement.noUiSlider.on('update', () => {
  const effectName = document.querySelector('.effects__item input:checked').value;
  applyFilter(effectName);
});

// выбор эффекта

const effectsContainer = document.querySelector('.effects__list');

const updateSliderOptions = (rangeMin, rangeMax, startValue, stepValue) => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: rangeMin,
      max: rangeMax,
    },
    start: startValue,
    step: stepValue,
  });
};

const applyEffectSettings = (effectName) => {
  switch(effectName) {
    case 'chrome':
      updateSliderOptions(0, 1, 1, 0.1);
      break;
    case 'sepia':
      updateSliderOptions(0, 1, 1, 0.1);
      break;
    case 'marvin':
      updateSliderOptions(0, 100, 100, 1);
      break;
    case 'phobos':
      updateSliderOptions(0, 3, 3, 0.1);
      break;
    case 'heat':
      updateSliderOptions(1, 3, 3, 0.1);
      break;
    default:
      previewImage.style.filter = '';
      break;
  }
};

function onEffectCheck (evt) {
  const effectName = evt.target.closest('.effects__item').querySelector('.effects__radio').value;
  if (evt.target.closest('.effects__item')) {
    previewImage.className = '';
    sliderElement.classList.toggle('hidden', effectName === 'none');
    previewImage.classList.add(`effects__preview--${effectName}`);
    applyEffectSettings(effectName);
  }
}

effectsContainer.addEventListener('change', onEffectCheck);

// открытие формы
function onUploadButtonChange () {
  sliderElement.classList.add('hidden'); // нужно, чтобы по умолчанию у "оригинал" не было слайдера при переоткрытиях
  uploadOverlay.classList.remove('hidden'); // собственно отображение формы загрузки
  previewImage.className = ''; // нужно, чтобы все эффекты сбрасывались при переоткрытии
  previewImage.style.filter = ''; // чтобы сбрасывался стиль фото при переоткрытии
  // этот код чтобы сбрасывался масштаб изображения
  scaleControlInputValue = 100;
  uploadForm.querySelector('.scale__control--value').value = `${scaleControlInputValue}%`;
  previewImage.style.transform = `scale(${scaleControlInputValue}%)`;
  updateButtonStatus();

  document.querySelector('body').classList.add('modal-open');
}
uploadButton.addEventListener('change', onUploadButtonChange);


// закрытие формы
function onFormCloseButtonClick () {
  uploadOverlay.classList.add('hidden');
  uploadButton.value = '';
}
formCloseButton.addEventListener('click', onFormCloseButtonClick);

document.addEventListener('keydown', (evt) => {
  if (isEscKeydown(evt)) {
    uploadOverlay.classList.add('hidden');
    uploadButton.value = '';
    document.querySelector('body').classList.remove('modal-open');
  }
});


