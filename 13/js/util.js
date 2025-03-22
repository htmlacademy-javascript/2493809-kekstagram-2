const getRandomInteger = function(min, max) {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

export { getRandomInteger, isEscapeKey, getRandomArrayElement };
