import { renderPhotos } from './rendering-mini.js';
import { renderFull } from './rendering-full.js';


fetch('https://28.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((objects) => {
    console.log(objects);
    renderPhotos(objects);
    renderFull(objects);
  });

// ЧТО МНЕ НАДО СДЕЛАТЬ: ОТКАТИТЬ ИЗМЕНЕНИЯ В ПОДКЛЮЧАЕМЫХ К RENDERFULL ФАЙЛАХ, И ПЕРЕДАТЬ КОНСТАНТЫ И ФУНКЦИИ ОБЪЕКТАМИ В ФУНКЦИЮ RENDERFULL ТАМ И ЗДЕСЬ. В ЭТОМ МОДУЛЕ!;
