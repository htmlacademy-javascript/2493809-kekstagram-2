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

const getRandomInteger = function(min, max) {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

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

const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

const generatePhotoId = createIdGenerator(1, 25);

const generatePhotoUrlId = createIdGenerator(1, 25);

const generateCommentId = createIdGenerator(1, 750);

const createCommentObject = () => ({
  id: generateCommentId(),
  avatar:  'img/avatar-' + getRandomInteger(1, 6) + '.svg',
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createPhotoObject = () => ({
  id: generatePhotoId(),
  url: 'photos/' + generatePhotoUrlId() + '.jpg',
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(0, 30)}, createCommentObject)
});

const testPhotoObjects = Array.from({length: 25}, createPhotoObject);
