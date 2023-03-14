// когда я нажимаю на крест надо удалять обработчик события с клика по загрузить еще

const createComments = () => {
  const commentContainer = document.querySelector('.social__comments');
  const commentsLength = commentContainer.children.length;
  document.querySelector('.big-picture').querySelector('.visible-comments-count').textContent = commentsLength;
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
};

export {createComments};
