// логика работы с комментариями

function onLoaderClick () {
  const commentContainer = document.querySelector('.social__comments');
  const commentsLength = commentContainer.children.length;
  const commentsLoader = document.querySelector('.big-picture').querySelector('.comments-loader');
  let commentsHiddenLength = commentContainer.getElementsByClassName('hidden').length;

  if (commentsHiddenLength > 5) {
    for (let i = 0; i <= commentsLength - commentsHiddenLength - 1 + 5; i++) {
      commentContainer.children[i].classList.remove('hidden');
    }
    commentsHiddenLength = commentContainer.getElementsByClassName('hidden').length;
    document.querySelector('.big-picture').querySelector('.visible-comments-count').textContent = commentsLength - commentsHiddenLength;
  } else {
    for (let i = 0; i <= commentsLength - 1; i++) {
      commentContainer.children[i].classList.remove('hidden');
    }
    commentsLoader.classList.add('hidden');
    commentsHiddenLength = commentContainer.getElementsByClassName('hidden').length;
    document.querySelector('.big-picture').querySelector('.visible-comments-count').textContent = commentsLength - commentsHiddenLength;
  }
}
export {onLoaderClick};
