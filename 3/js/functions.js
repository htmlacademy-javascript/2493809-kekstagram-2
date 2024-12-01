function isLesserOrEqual(string, maxLength) {
  return string.length <= maxLength;
}

function isPalindrome(string) {
  const normalizedString = string.replaceAll(' ', '').toLowerCase();
  const reversedString = normalizedString.split('').reverse().join('');

  return normalizedString === reversedString;
}

function toPositiveNumber(string) {
  const normalizedString = string.toString().replaceAll(' ', '');
  let result = '';

  for (let i = 0; i < normalizedString.length; i++) {
    if(!isNaN(Number(normalizedString[i]))) {
      result += normalizedString[i];
    }
  }

  return parseInt(result, 10);
}

