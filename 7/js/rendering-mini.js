// логика отрисовщика миниатюр фото

import {createObjects} from './data.js';

const picturesContainer = document.querySelector('.pictures');
const objects = createObjects();
const renderPhotos = () => {
  const fragment = document.createDocumentFragment();
  const pictureTemplate = document.querySelector('#picture').content;

  for (let i = 0; i < objects.length; i++) {
    const picture = pictureTemplate.cloneNode(true);
    picture.querySelector('a').dataset.id = objects[i].id;
    picture.querySelector('.picture__img').src = objects[i].url;
    picture.querySelector('.picture__img').alt = objects[i].description;
    picture.querySelector('.picture__likes').textContent = objects[i].likes;
    picture.querySelector('.picture__comments').textContent = objects[i].comments.length;
    fragment.append(picture);
  }

  picturesContainer.append(fragment);
};

renderPhotos();

export {objects, picturesContainer};
