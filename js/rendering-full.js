// логика отрисовщика большого фото и комментариев

import {objects, picturesContainer} from './rendering-mini.js';
import {renderComments} from './rendering-comments.js';
import {onLoaderClick} from './change-comments.js';

const bigPicture = document.querySelector('.big-picture');

function onMiniatureClick (evt) {
  evt.preventDefault();
  if (evt.target.closest('.picture')) {
    const id = evt.target.closest('a').dataset.id;
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.big-picture__img').querySelector('img').src = objects[id].url;
    bigPicture.querySelector('.big-picture__img').querySelector('img').alt = objects[id].description;
    bigPicture.querySelector('.social__caption').textContent = objects[id].description;
    bigPicture.querySelector('.likes-count').textContent = objects[id].likes;
    bigPicture.querySelector('.comments-count').textContent = objects[id].comments.length;
    renderComments(id);

    const commentContainer = bigPicture.querySelector('.social__comments');
    const commentsLength = commentContainer.children.length;
    const commentsLoader = bigPicture.querySelector('.comments-loader');

    if (commentsLength <= 5) {
      commentsLoader.classList.add('hidden');
    } else {
      commentsLoader.classList.remove('hidden');
    }

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

const isEscKeydown = (evt) => evt.key === 'Escape';

document.addEventListener('keydown', () => {
  if (isEscKeydown) {
    bigPicture.classList.add('hidden');
    bigPicture.querySelector('.comments-loader').removeEventListener('click', onLoaderClick);
    document.querySelector('body').classList.remove('modal-open');
  }
});