// логика работы с комментариями

function onLoaderClick () {
  const commentContainer = document.querySelector('.social__comments');
  const commentsLength = commentContainer.children.length;
  const commentsLoader = document.querySelector('.big-picture').querySelector('.comments-loader');
  let commentsVisibleLength = commentsLength;
  if (commentsLength > 5) {
    commentsVisibleLength = 5;
  }

  const commentsHiddenLength = commentContainer.getElementsByClassName('hidden').length;

  if (commentsHiddenLength > 5) {
    for (let i = 0; i <= commentsLength - commentsHiddenLength - 1 + 5; i++) {
      commentContainer.children[i].classList.remove('hidden');
    }
    commentsVisibleLength += 5; // в области функции после достижения 10 комментов визибл ленгс опять становится равным 5
    document.querySelector('.big-picture').querySelector('.visible-comments-count').textContent = commentsVisibleLength;
    if (commentsVisibleLength >= commentsLength) {
      commentsLoader.classList.add('hidden');
    }
  } else {
    for (let i = 0; i <= commentsLength - 1; i++) {
      commentContainer.children[i].classList.remove('hidden');
    }
    commentsVisibleLength += commentsHiddenLength;
    commentsLoader.classList.add('hidden');
    document.querySelector('.big-picture').querySelector('.visible-comments-count').textContent = commentsVisibleLength;
  }

}

export {onLoaderClick};
