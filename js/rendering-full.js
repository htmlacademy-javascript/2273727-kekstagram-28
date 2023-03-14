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

    const commentsLoader = bigPicture.querySelector('.comments-loader');
    const checkLoaderStatus = () => {
      if (commentsLength <= 5) {
        commentsLoader.classList.add('hidden');
      } else {
        commentsLoader.classList.remove('hidden');
      }
    };

    checkLoaderStatus();


    function showComments () {
      console.log('длина комментов' + commentsLength)
      let commentsVisibleLength = commentsLength;
      if (commentsLength > 5) {
        commentsVisibleLength = 5;
      }
      console.log('отображаемых сообщений: ' + commentsVisibleLength)
      let commentsHiddenLength = commentsLength - commentsVisibleLength;
      console.log('спрятанных сообщений: ' + commentsHiddenLength)

      if (commentsHiddenLength <= 5) {
        return function () {
          for (let i = 0; i <= commentsVisibleLength + commentsHiddenLength - 1; i++) {
            commentContainer.children[i].classList.remove('hidden');

          }


        };

      }

      if (commentsHiddenLength > 5) { // другой случай если остаток больше 5
        // counter = Math.floor(commentsHiddenLength / 5);
        // commentsHiddenLength = commentsHiddenLength % 5;
        return function () {
          for (let i = 0; i <= commentsVisibleLength - 1 + 5; i++) {
            commentContainer.children[i].classList.remove('hidden');
          }
          commentsVisibleLength += 5;
          return commentsVisibleLength;

        };
      }

    // if (commentsHiddenLength === 0) {commentsLoader.classList.add('hidden')} // почему не работает???????? В ЦЕЛОМ НАДО ПОНЯТЬ КАК ФУНКЦИИ СОХРАНЯТЬ ДАННЫЕ МЕЖДУ ИТЕРАЦИЯМИ
    }

    const onLoaderClick = showComments();

    commentsLoader.addEventListener('click', onLoaderClick);

    document.querySelector('body').classList.add('modal-open');
  }
}

picturesContainer.addEventListener('click', onMiniatureClick);

function onCloseClick () {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  // bigPicture.querySelector('.comments-loader').removeEventListener('click', onLoaderClick);
}

bigPicture.querySelector('.big-picture__cancel').addEventListener('click', onCloseClick);

const isEscKeydown = (evt) => evt.key === 'Escape';

document.addEventListener('keydown', () => {
  if (isEscKeydown) {
    bigPicture.classList.add('hidden');
    // bigPicture.querySelector('.comments-loader').removeEventListener('click', onLoaderClick);
    document.querySelector('body').classList.remove('modal-open');
  }
});
