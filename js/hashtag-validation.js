const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;

const validateHashtag = (value) => {
  const hashtagArray = value.split(/\s+/);
  console.log(hashtagArray);
  return hashtagArray.every((el) => hashtag.test(el));
};

const checkForRepeatingHashtag = (value) => {
  const hashtagArray = value.toLowerCase().split(/\s+/);
  const checkSet = new Set(hashtagArray);
  return checkSet.size === hashtagArray.length;
};

const checkForHashtagCount = (value) => {
  const hashtagArray = value.split(/\s+/);
  return hashtagArray.length <= 5;
};

const validateAllHashtags = (value) => {
  if (value.trim() === '') {
    return true;
  }

  const hashtagValidation = validateHashtag(value);
  if (!hashtagValidation) {
    return false;
  }

  const repeatingValidation = checkForRepeatingHashtag(value);
  if (!repeatingValidation) {
    return false;
  }

  const countValidation = checkForHashtagCount(value);
  if (!countValidation) {
    return false;
  }

  return true;
};

const validateHashtagError = (value) => {
  if (value.trim() === '') {
    return '';
  }

  const hashtagValidation = validateHashtag(value);
  if (!hashtagValidation) {
    return 'Не валидный хэштег';
  }

  const repeatingValidation = checkForRepeatingHashtag(value);
  if (!repeatingValidation) {
    return 'Хэштеги повторяются';
  }

  const countValidation = checkForHashtagCount(value);
  if (!countValidation) {
    return 'Превышено количество хэштегов';
  }

  return '';
};

export { validateAllHashtags, validateHashtagError };
