// логика работы с комментариями

const onLoaderClick = () => {
  const SHOWABLE_COMMENTS_COUNT = 5;
  const commentsContainer = document.querySelector('.social__comments');
  const commentsLength = commentsContainer.children.length;
  const commentsLoader = document.querySelector('.comments-loader');
  const visibleCommentsCount = document.querySelector('.visible-comments-count');
  let hiddenCommentsLength = commentsContainer.querySelectorAll('.hidden').length;

  if (hiddenCommentsLength > SHOWABLE_COMMENTS_COUNT) {
    for (let i = 0; i <= commentsLength - hiddenCommentsLength - 1 + SHOWABLE_COMMENTS_COUNT; i++) {
      commentsContainer.children[i].classList.remove('hidden');
    }
    hiddenCommentsLength = commentsContainer.querySelectorAll('.hidden').length;
    visibleCommentsCount.textContent = commentsLength - hiddenCommentsLength;
  } else {
    for (let i = 0; i <= commentsLength - 1; i++) {
      commentsContainer.children[i].classList.remove('hidden');
    }
    commentsLoader.classList.add('hidden');
    hiddenCommentsLength = commentsContainer.querySelectorAll('.hidden').length;
    visibleCommentsCount.textContent = commentsLength - hiddenCommentsLength;
  }
};

export { onLoaderClick };
