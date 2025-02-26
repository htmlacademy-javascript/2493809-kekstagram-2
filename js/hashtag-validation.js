const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;

const validateHashtag = (value) => {
  const hashtagArray = value.split(' ');
  return value === '' ? true : hashtagArray.every((el) => hashtag.test(el));
};

const checkForRepeatingHashtag = (value) => {
  const hashtagArray = value.toLowerCase().split(' ');
  const checkSet = new Set(hashtagArray);
  return checkSet.size === hashtagArray.length;
};

const checkForHashtagCount = (value) => {
  const hashtagArray = value.split(' ');
  return hashtagArray.length <= 5;
};

export { validateHashtag, checkForRepeatingHashtag, checkForHashtagCount };
