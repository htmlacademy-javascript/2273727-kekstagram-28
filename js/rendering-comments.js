// логика рендера комментов

import {objects} from './rendering-mini.js';

const renderComments = (id) => {
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

export {renderComments};

// при нажатии на "загрузить еще" удалять класс hidden у элементов контейнера комментов из диапазона длиной в +5 к текущей длине
// по идее функция должна снимать класс hidden у +5 элементов при клике и проверять, остались ли еще hidden элементы. Если не остались, то добавлять хидден уже самой кнопке
