// логика отрисовщика большого фото и комментариев

import {objects, picturesContainer} from './rendering-mini.js';
import {renderComments} from './rendering-comments.js';

const bigPicture = document.querySelector('.big-picture');

function onMiniatureClick (evt) {
  evt.preventDefault();
  if (evt.target.closest('.picture')) {
    const id = evt.target.closest('a').dataset.id;
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.big-picture__img').querySelector('img').src = objects[id].url;
    bigPicture.querySelector('.big-picture__img').querySelector('img').alt = objects[id].description;
    bigPicture.querySelector('.social__caption').textContent = objects[id].description;
    bigPicture.querySelector('.social__likes').textContent = objects[id].likes;
    bigPicture.querySelector('.comments-count').textContent = objects[id].comments.length;
    renderComments(id);

// подсчет комментариев
    const commentContainer = document.querySelector('.social__comments');
    const commentsLength = commentContainer.children.length;
    bigPicture.querySelector('.visible-comments-count').textContent = commentsLength;

    // if (commentContainer.children.length >= 5) {
    //   for (let i = 5; i >= commentContainer.children.length; i++) {
    //     commentContainer.children[i].classList.add('hidden');
    //   }
    // }


// по идее функция должна снимать класс hidden у +5 элементов при клике и проверять, остались ли еще hidden элементы. Если не остались, то добавлять хидден уже самой кнопке
    const commentsLoader = bigPicture.querySelector('.comments-loader');
    const checkLoaderStatus = () => {
      if (commentsLength <= 5) {
        commentsLoader.classList.add('hidden');
      } else {
        commentsLoader.classList.remove('hidden');
      }
    };
    checkLoaderStatus();

    function onLoaderClick () {
      let commentsVisibleLength = commentsLength; // возможно первые значения стоит убрать потому что КНОПКУ видно ТОЛЬКО тогда когда комментов больше 5
      let commentsHiddenLength = 0;
      if (commentsLength > 5) {
        commentsVisibleLength = 5;
        commentsHiddenLength = commentsLength - commentsVisibleLength;
      }

      for (let i = commentsVisibleLength; i <= commentsLength - 1; i++) {

        commentContainer.children[i].classList.remove('hidden');
      // commentsVisibleLength += 5;
      }
      console.log('Длина теперь' + commentsLength)
      checkLoaderStatus();
    }

    commentsLoader.addEventListener('click', onLoaderClick);

    document.querySelector('body').classList.add('modal-open');
  }
}

picturesContainer.addEventListener('click', onMiniatureClick);

function onCloseClick () {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
}

bigPicture.querySelector('.big-picture__cancel').addEventListener('click', onCloseClick);

const isEscKeydown = (evt) => evt.key === 'Escape';

document.addEventListener('keydown', () => {
  if (isEscKeydown) {
    bigPicture.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
  }
});
