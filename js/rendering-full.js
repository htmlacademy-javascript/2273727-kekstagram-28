// логика отрисовщика большого фото и комментариев

import { picturesContainer } from './rendering-mini.js';
import { renderComments } from './rendering-comments.js';
import { onLoaderClick } from './change-comments.js';
import { isEscKeydown } from './util.js';

const bigPicture = document.querySelector('.big-picture');

function onMiniatureClick (evt, objects) {
  if (evt.target.closest('.picture')) {
    evt.preventDefault();
    const id = evt.target.closest('a').dataset.id;
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.big-picture__img').querySelector('img').src = objects[id].url;
    bigPicture.querySelector('.big-picture__img').querySelector('img').alt = objects[id].description;
    bigPicture.querySelector('.social__caption').textContent = objects[id].description;
    bigPicture.querySelector('.likes-count').textContent = objects[id].likes;
    bigPicture.querySelector('.comments-count').textContent = objects[id].comments.length;
    renderComments(id, objects);

    const commentContainer = bigPicture.querySelector('.social__comments');
    const commentsLength = commentContainer.children.length;
    const commentsLoader = bigPicture.querySelector('.comments-loader');
    commentsLoader.classList.toggle('hidden', commentsLength <= 5);
    bigPicture.querySelector('.visible-comments-count').textContent = (commentsLength > 5) ? 5 : commentsLength;

    commentsLoader.addEventListener('click', onLoaderClick);
    document.querySelector('body').classList.add('modal-open');
  }
}

picturesContainer.addEventListener('click', onMiniatureClick);

function onCloseClick () {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  bigPicture.querySelector('.comments-loader').removeEventListener('click', onLoaderClick);
}

bigPicture.querySelector('.big-picture__cancel').addEventListener('click', onCloseClick);

document.addEventListener('keydown', (evt) => {
  if (isEscKeydown(evt)) {
    bigPicture.classList.add('hidden');
    bigPicture.querySelector('.comments-loader').removeEventListener('click', onLoaderClick);
    document.querySelector('body').classList.remove('modal-open');
  }
});

export {onMiniatureClick};
