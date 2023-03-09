// логика отрисовщика большого фото и комментариев

import {picturesContainer} from './rendering-mini.js';

const bigPicture = document.querySelector('.big-picture');



function onMiniatureClick (evt) {

  if (evt.target.closest('.picture')) {
    const picture = evt.target.parentNode;
    console.log(picture);
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.big-picture__img').querySelector('img').src = evt.target.src;

  }
}

picturesContainer.addEventListener('click', onMiniatureClick);
