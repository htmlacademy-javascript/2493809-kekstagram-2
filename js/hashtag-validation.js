const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;

function validateHashtag(value) {
  const hashtagArray = value.split(' ');
  return value === '' ? true : hashtagArray.every((el) => hashtag.test(el)) && hashtagArray.length <= 5;
}

function checkForRepeatingHashtag(value) {
  const hashtagArray = value.toLowerCase().split(' ');
  const checkSet = new Set(hashtagArray);
  return checkSet.size === hashtagArray.length;
}

export { validateHashtag, checkForRepeatingHashtag }
