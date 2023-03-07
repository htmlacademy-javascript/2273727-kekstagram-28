// логика отрисовщика фото

import {createObjects} from './data.js';
const renderPhotos = () => {
  const objects = createObjects();
  const picturesContainer = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();
  const pictureTemplate = document.querySelector('#picture').content;

  for (let i = 0; i < objects.length; i++) {
    const picture = pictureTemplate.cloneNode(true);
    picture.querySelector('.picture__img').src = objects[i].url;
    picture.querySelector('.picture__likes').textContent = objects[i].likes;
    picture.querySelector('.picture__comments').textContent = objects[i].comments.length;
    fragment.appendChild(picture);
  }

  picturesContainer.appendChild(fragment);
};

export {renderPhotos};
