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
    fragment.append(li);
  }
  commentContainer.innerHTML = '';
  commentContainer.append(fragment);
};

export {renderComments};
