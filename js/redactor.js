// Логика обработки фото

// логика работы масштабирования фото
const uploadButton = document.querySelector('.img-upload__input');
const smallerScaleButton = document.querySelector('.scale__control--smaller');
const biggerScaleButton = document.querySelector('.scale__control--bigger');
let scaleControlInputValue = 100;
const previewImage = document.querySelector('.img-upload__preview img');

const updateButtonStatus = () => {
  smallerScaleButton.disabled = scaleControlInputValue <= 25;
  biggerScaleButton.disabled = scaleControlInputValue >= 100;
};
updateButtonStatus();

smallerScaleButton.addEventListener('click', () => {
  scaleControlInputValue -= 25;
  document.querySelector('.scale__control--value').value = `${scaleControlInputValue}%`;
  previewImage.style.transform = `scale(${scaleControlInputValue}%)`;
  updateButtonStatus();
});

biggerScaleButton.addEventListener('click', () => {
  scaleControlInputValue += 25;
  document.querySelector('.scale__control--value').value = `${scaleControlInputValue}%`;
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

function onUploadButtonChange () {
  sliderElement.classList.add('hidden'); // чтобы по умолчанию у "оригинал" не было слайдера при переоткрытиях
  previewImage.className = ''; // чтобы все эффекты сбрасывались при переоткрытии
  previewImage.style.filter = ''; // чтобы сбрасывался стиль фото при переоткрытии
  // чтобы сбрасывался масштаб фото
  scaleControlInputValue = 100;
  document.querySelector('.scale__control--value').value = `${scaleControlInputValue}%`;
  previewImage.style.transform = `scale(${scaleControlInputValue}%)`;
  updateButtonStatus();
}
uploadButton.addEventListener('change', onUploadButtonChange);
