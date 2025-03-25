const getRandomInteger = function(min, max) {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const debounce = (callback, delayMS = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), delayMS);
  };
};

export { getRandomInteger, isEscapeKey, debounce };
