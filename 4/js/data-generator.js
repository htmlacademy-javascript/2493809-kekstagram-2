import { getRandomInteger, getRandomArrayElement } from "./util.js";

const DESCRIPTIONS = [
  'Закат над морем',
  'Городская улица ночью',
  'Заснеженный лес',
  'Кафе на набережной',
  'Горная вершина',
  'Цветущая сакура',
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
  'Артем',
  'Александр',
  'Виктор',
  'Василий',
  'Петр',
  'Анастасия',
  'Валерия',
  'Виктория',
  'Дарья',
  'Елизавета',
];

const PHOTO_OBJECTS_AMOUNT = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;

const createIdGenerator = function(min, max) {
  const previousValues = [];

  return function() {
    let lastGeneratedId = getRandomInteger(min, max);

    if(previousValues.length >= (max - min + 1)) {
      console.log('Закончились уникальные идентификаторы');
      return null;
    }

    while(previousValues.includes(lastGeneratedId)) {
      lastGeneratedId = getRandomInteger(min, max);
    }

    previousValues.push(lastGeneratedId);
    return lastGeneratedId;
  };
};

const generateCommentId = createIdGenerator(1, PHOTO_OBJECTS_AMOUNT * MAX_COMMENTS);

const createCommentObject = () => {
  return {
    id: generateCommentId(),
    avatar:  'img/avatar-' + getRandomInteger(1, 6) + '.svg',
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  }
};

const createPhotoObject = (_, index) => {
  return {
    id: index,
    url: 'photos/' + index++ + '.jpg',
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
    comments: Array.from({length: getRandomInteger(MIN_COMMENTS, MAX_COMMENTS)}, createCommentObject)
  }
};

const generatePhotoObjects = () => Array.from({length: PHOTO_OBJECTS_AMOUNT}, createPhotoObject);

export { generatePhotoObjects };
