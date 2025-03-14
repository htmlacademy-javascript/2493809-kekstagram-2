const buttonSmaller = document.querySelector('.scale__control--smaller');
const buttonBigger = document.querySelector('.scale__control--bigger');
const scaleValueField = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');

const MAX_SCALE_VALUE = 100;
const MIN_SCALE_VALUE = 25;
const STEP_SCALE_VALUE = 25;

buttonBigger.addEventListener('click', () => {
  if(parseFloat(scaleValueField.value) < MAX_SCALE_VALUE) {
    scaleValueField.value = `${parseFloat(scaleValueField.value) + STEP_SCALE_VALUE}%`;
    scaleValueField.dispatchEvent(new Event('change'));
  }
});

buttonSmaller.addEventListener('click', () => {
  if(parseFloat(scaleValueField.value) > MIN_SCALE_VALUE) {
    scaleValueField.value = `${parseFloat(scaleValueField.value) - STEP_SCALE_VALUE}%`;
    scaleValueField.dispatchEvent(new Event('change'));
  }
});

scaleValueField.addEventListener('change', () => {
  imagePreview.style.transform = `scale(${scaleValueField.value})`;
});

export { imagePreview, scaleValueField };
