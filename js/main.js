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

const getRandomInteger = (min, max) => Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + min;

const getUniqueRandomInteger = (min, max) => {
  const previousValues = [];
  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const generateId = getUniqueRandomInteger(1, NUMBER_OF_OBJECTS);
const generateUrl = getUniqueRandomInteger(1, NUMBER_OF_OBJECTS);
const generateCommentId = getUniqueRandomInteger(1000, 9999);

const createComment = () => ({
  id: generateCommentId(), // рандомный и уникальный для ВСЕХ комментариев
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`, // рандомный -> В задании этого нет, но сделать бы уникальным для одного объекта, но не для всех в целом. Олег, ты не подскажешь, как это можно реализовать?
  message: MESSAGES[getRandomInteger(0, MESSAGES.length - 1)], // рандомное -> сделать бы уникальным для одного объекта, но не для всех в целом
  name: NAMES[getRandomInteger(0, NAMES.length - 1)], // рандомное -> сделать бы уникальным для одного объекта, но не для всех в целом
});

const createObject = () => ({
  id: generateId(), // рандомный и уникальный
  url: `photos/${generateUrl()}.jpg`, // рандомный и уникальный
  description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)], // рандомное
  likes: getRandomInteger(15, 200), // рандомное
  comments: Array.from({length: getRandomInteger(1, MAX_COMMENTS)}, createComment)
});

// eslint-disable-next-line no-unused-vars
const objects = Array.from({length: NUMBER_OF_OBJECTS}, createObject);
