// логика отрисовщика большого фото и комментариев

const renderFull = (objects) => {
  const bigPicture = document.querySelector('.big-picture');
  const picturesContainer = document.querySelector('.pictures');
  function onLoaderClick () {
    const SHOWABLE_COMMENTS = 5;
    const commentContainer = document.querySelector('.social__comments');
    const commentsLength = commentContainer.children.length;
    const commentsLoader = document.querySelector('.comments-loader');
    const visibleCommentsCount = document.querySelector('.visible-comments-count');
    let commentsHiddenLength = commentContainer.querySelectorAll('.hidden').length;

    if (commentsHiddenLength > SHOWABLE_COMMENTS) {
      for (let i = 0; i <= commentsLength - commentsHiddenLength - 1 + SHOWABLE_COMMENTS; i++) {
        commentContainer.children[i].classList.remove('hidden');
      }
      commentsHiddenLength = commentContainer.querySelectorAll('.hidden').length;
      visibleCommentsCount.textContent = commentsLength - commentsHiddenLength;
    } else {
      for (let i = 0; i <= commentsLength - 1; i++) {
        commentContainer.children[i].classList.remove('hidden');
      }
      commentsLoader.classList.add('hidden');
      commentsHiddenLength = commentContainer.querySelectorAll('.hidden').length;
      visibleCommentsCount.textContent = commentsLength - commentsHiddenLength;
    }
  }

  function onMiniatureClick (evt) {
    if (evt.target.closest('.picture')) {
      evt.preventDefault();
      const id = evt.target.closest('a').dataset.id;
      bigPicture.classList.remove('hidden');
      bigPicture.querySelector('.big-picture__img').querySelector('img').src = objects[id].url;
      bigPicture.querySelector('.big-picture__img').querySelector('img').alt = objects[id].description;
      bigPicture.querySelector('.social__caption').textContent = objects[id].description;
      bigPicture.querySelector('.likes-count').textContent = objects[id].likes;
      bigPicture.querySelector('.comments-count').textContent = objects[id].comments.length;
      const renderComments = () => {
        const fragment = document.createDocumentFragment();
        const commentContainer = document.querySelector('.social__comments');

        for (let i = 0; i < objects[id].comments.length; i++) {
          const li = document.createElement('li');
          li.classList.add('social__comment');
          li.dataset.id = objects[id].comments[i].id;
          const img = document.createElement('img');
          img.classList.add('social__picture');
          img.src = objects[id].comments[i].avatar;
          img.alt = objects[id].comments[i].name;
          img.width = '35';
          img.height = '35';
          li.appendChild(img);
          const p = document.createElement('p');
          p.classList.add('social__text');
          p.textContent = objects[id].comments[i].message;
          li.appendChild(p);
          if (fragment.children.length >= 5) {
            li.classList.add('hidden');
          }
          fragment.append(li);
        }

        commentContainer.innerHTML = '';
        commentContainer.append(fragment);
      };
      renderComments(); // ID аргумент

      const commentsLength = bigPicture.querySelector('.social__comments').children.length;
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
    if (evt.key === 'Escape') {
      bigPicture.classList.add('hidden');
      bigPicture.querySelector('.comments-loader').removeEventListener('click', onLoaderClick);
      document.querySelector('body').classList.remove('modal-open');
    }
  });
};

export { renderFull };
