// логика работы с комментариями

function onLoaderClick () {
  const commentContainer = document.querySelector('.social__comments');
  const commentsLength = commentContainer.children.length;
  const commentsLoader = document.querySelector('.big-picture').querySelector('.comments-loader');
  let commentsVisibleLength = commentsLength;
  if (commentsLength > 5) {
    commentsVisibleLength = 5;
  }

  document.querySelector('.big-picture').querySelector('.visible-comments-count').textContent = commentsVisibleLength;
  const commentsHiddenLength = commentContainer.getElementsByClassName('hidden').length;

  if (commentsHiddenLength > 5) {
    for (let i = 0; i <= commentsVisibleLength - 1 + 5; i++) {
      commentContainer.children[i].classList.remove('hidden');
    }
    commentsVisibleLength += 5;
    document.querySelector('.big-picture').querySelector('.visible-comments-count').textContent = commentsVisibleLength;
    if (commentsVisibleLength >= commentsLength) {
      commentsLoader.classList.add('hidden');
    }
  }

  if (commentsHiddenLength <= 5) {
    for (let i = 0; i <= commentsVisibleLength + commentsHiddenLength - 1; i++) {
      commentContainer.children[i].classList.remove('hidden');
    }
    commentsVisibleLength += commentsHiddenLength;
    commentsLoader.classList.add('hidden');
    document.querySelector('.big-picture').querySelector('.visible-comments-count').textContent = commentsVisibleLength;
  }
}

export {onLoaderClick};
