const HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;

const validateHashtag = (value) => {
  const hashtagsArray = value.split(/\s+/);
  return hashtagsArray.every((el) => HASHTAG.test(el));
};

const checkForRepeatingHashtag = (value) => {
  const hashtagsArray = value.toLowerCase().split(/\s+/);
  const checkSet = new Set(hashtagsArray);
  return checkSet.size === hashtagsArray.length;
};

const checkForHashtagCount = (value) => {
  const hashtagsArray = value.split(/\s+/);
  return hashtagsArray.length <= 5;
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
