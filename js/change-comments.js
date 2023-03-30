// логика работы с комментариями

const onLoaderClick = () => {
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
};

export {onLoaderClick};
