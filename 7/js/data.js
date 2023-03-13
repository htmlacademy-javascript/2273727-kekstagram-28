// создание псевдоданных

import {getRandomInteger, getUniqueRandomInteger} from './util.js';

const NUMBER_OF_OBJECTS = 25;
const MAX_COMMENTS = 6;

const DESCRIPTIONS = [
  'Вот так вот',
  'Мир, каким я его вижу',
  'Кросивое',
  'Прикольно получилось',
  'Лучшее фото, что я снял',
  'LOL',
  'LMAO',
  'Сос мыслом',
  'Зацените:',
  'Никогда такого не было и вот опять!',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Артём',
  'Олег',
  'Евгений',
  'Егор',
  'Мария',
  'Алла',
  'Александр',
];

const generateUrl = getUniqueRandomInteger(1, NUMBER_OF_OBJECTS);
let generateId = -1;
let generateCommentId = -1;

const createComment = () => {
  const generateAvatarId = getRandomInteger(1, 6);
  const generateAvatar = `img/avatar-${generateAvatarId}.svg`;
  const generateMessage = Array.from({length: getRandomInteger(1, 2)}, () => MESSAGES[getUniqueRandomInteger(0, MESSAGES.length - 1)()]).join(' ');
  const generateName = NAMES[generateAvatarId];
  generateCommentId++;
  return {
    id: generateCommentId,
    avatar: generateAvatar,
    message: generateMessage,
    name: generateName,
  };
};

const createObject = () => {
  generateId++;
  return {
    id: generateId,
    url: `photos/${generateUrl()}.jpg`,
    description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
    likes: getRandomInteger(15, 200),
    comments: Array.from({length: getRandomInteger(1, MAX_COMMENTS)}, createComment),
  };
};

const createObjects = () => Array.from({length: NUMBER_OF_OBJECTS}, createObject);

export {createObjects};
