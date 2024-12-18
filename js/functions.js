const isLesserOrEqual = (string, maxLength) => string.length <= maxLength;

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

const timeToMinutesNumber = (arr) => Number(arr[0]) * 60 + Number(arr[1]);


function isMeetingInWorkingHours(timeStart, timeEnd, meetingTime, meetingDuration) {
  const timeStartNormalized = timeToMinutesNumber(timeStart.split(':'));
  const timeEndNormalized = timeToMinutesNumber(timeEnd.split(':'));
  const meetingTimeNormalized = timeToMinutesNumber(meetingTime.split(':'));

  return (meetingTimeNormalized >= timeStartNormalized && (meetingTimeNormalized + meetingDuration) <= timeEndNormalized);
}
