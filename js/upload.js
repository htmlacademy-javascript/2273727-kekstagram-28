// файл под логику загрузки фото
import { isEscKeydown } from './util.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadButton = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const formCloseButton = uploadForm.querySelector('.img-upload__cancel');

new Pristine(uploadForm);

// открытие формы
function onUploadButtonChange () {
  uploadOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

}
uploadButton.addEventListener('change', onUploadButtonChange);


// закрытие формы
function onFormCloseButtonClick () {
  uploadOverlay.classList.add('hidden');
  uploadButton.value = '';
  // здесь удаляются все ивент листенеры внутри формы НАВЕРНОЕ
}
formCloseButton.addEventListener('click', onFormCloseButtonClick);

document.addEventListener('keydown', () => {
  if (isEscKeydown) {
    uploadOverlay.classList.add('hidden');
    uploadButton.value = '';
    // здесь удаляются все ивент листенеры внутри формы НАВЕРНОЕ
    document.querySelector('body').classList.remove('modal-open');
  }
});
