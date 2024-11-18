function isLesserOrEqual(string, maxLength) {
  return string.length <= maxLength;
}

function isPalindrome(string) {
  let normalizedString = string.replaceAll(" ", "").toLowerCase();
  let reversedString = normalizedString.split("").reverse().join("");

  return normalizedString === reversedString;
}

function toPositiveNumber(string) {
  let normalizedString = string.toString().replaceAll(" ", "");
  let result = "";

  for (let i = 0; i < normalizedString.length; i++) {
    if(!isNaN(Number(normalizedString[i]))) {
      result += normalizedString[i];
    }
  }

  return parseInt(result);
}

