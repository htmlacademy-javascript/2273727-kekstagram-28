// логика работы с комментариями

const changeComments = () => {
  const commentContainer = document.querySelector('.social__comments');
  const commentsLength = commentContainer.children.length;

  const commentsLoader = document.querySelector('.big-picture').querySelector('.comments-loader');
  const checkLoaderStatus = () => {
    if (commentsLength <= 5) {
      commentsLoader.classList.add('hidden');
    } else {
      commentsLoader.classList.remove('hidden');
    }
  };

  checkLoaderStatus();

  function showComments () {
    let commentsVisibleLength = commentsLength;
    if (commentsLength > 5) {
      commentsVisibleLength = 5;
    }
    document.querySelector('.big-picture').querySelector('.visible-comments-count').textContent = commentsVisibleLength;
    const commentsHiddenLength = commentsLength - commentsVisibleLength;

    if (commentsHiddenLength > 5) {
      return function () {
        for (let i = 0; i <= commentsVisibleLength - 1 + 5; i++) {
          commentContainer.children[i].classList.remove('hidden');
        }
        commentsVisibleLength += 5;
        document.querySelector('.big-picture').querySelector('.visible-comments-count').textContent = commentsVisibleLength;
        if (commentsVisibleLength >= commentsLength) {
          commentsLoader.classList.add('hidden'); // почему-то срабатывает для целых значений вроде 10 и 15, но не работает для 12 и 17
        }
        return commentsVisibleLength;
      };
    }

    if (commentsHiddenLength <= 5) { // эта проверка не запускается, и функция "доделывает" остаток используя первую проверку, выбивая ошибку на удаление hidden у несуществующих элементов
      return function () {

        for (let i = 0; i <= commentsVisibleLength + commentsHiddenLength - 1; i++) {
          commentContainer.children[i].classList.remove('hidden');
        }
        commentsVisibleLength += commentsHiddenLength;
        commentsLoader.classList.add('hidden');
        document.querySelector('.big-picture').querySelector('.visible-comments-count').textContent = commentsVisibleLength;
        return commentsVisibleLength;
      };
    }

  }

  const onLoaderClick = showComments();

  commentsLoader.addEventListener('click', onLoaderClick);
};

export {changeComments};
