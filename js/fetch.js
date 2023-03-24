import { renderPhotos } from './rendering-mini.js';
import { picturesContainer } from './rendering-mini.js';
import { onMiniatureClick } from './rendering-full.js';

fetch('https://28.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((objects) => {
    renderPhotos(objects);
    picturesContainer.addEventListener('click', (evt) => onMiniatureClick(evt, objects));
  });
