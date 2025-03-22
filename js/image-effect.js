import { imagePreview } from './image-scaling.js';

const sliderElementWrapper = document.querySelector('.img-upload__effect-level');
const sliderElement = sliderElementWrapper.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const chromeValue = document.querySelector('#effect-chrome');
const sepiaValue = document.querySelector('#effect-sepia');
const marvinValue = document.querySelector('#effect-marvin');
const phobosValue = document.querySelector('#effect-phobos');
const heatValue = document.querySelector('#effect-heat');
const radioInputSection = document.querySelector('.img-upload__effects');
const effectsPreviewElements = radioInputSection.querySelectorAll('.effects__preview');
let currentSliderValue = 0;

sliderElementWrapper.classList.add('hidden');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 0,
  },
  start: 0,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const applyFilter = () => {
  if (chromeValue.checked) {
    imagePreview.style.filter = `grayscale(${currentSliderValue})`;
  } else if (sepiaValue.checked) {
    imagePreview.style.filter = `sepia(${currentSliderValue})`;
  } else if (marvinValue.checked) {
    imagePreview.style.filter = `invert(${currentSliderValue}%)`;
  } else if (phobosValue.checked) {
    imagePreview.style.filter = `blur(${currentSliderValue}px)`;
  } else if (heatValue.checked) {
    imagePreview.style.filter = `brightness(${currentSliderValue})`;
  } else {
    imagePreview.style.filter = '';
  }
};

sliderElement.noUiSlider.on('update', () => {
  currentSliderValue = sliderElement.noUiSlider.get();
  valueElement.value = currentSliderValue;
  applyFilter();
});

radioInputSection.addEventListener('click', (evt) => {
  if (evt.target.matches('input[type="radio"]')) {
    let options = {};
    sliderElementWrapper.classList.remove('hidden');
    switch (evt.target) {
      case chromeValue:
      case sepiaValue:
        options = { range: { min: 0, max: 1 }, start: 1, step: 0.1 };
        break;
      case marvinValue:
        options = { range: { min: 0, max: 100 }, start: 100, step: 1 };
        break;
      case phobosValue:
        options = { range: { min: 0, max: 3 }, start: 3, step: 0.1 };
        break;
      case heatValue:
        options = { range: { min: 1, max: 3 }, start: 3, step: 0.1 };
        break;
      default:
        options = { range: { min: 0, max: 0 }, start: 0};
        applyFilter();
        sliderElementWrapper.classList.add('hidden');
    }

    sliderElement.noUiSlider.updateOptions(options);
  }
});

export { sliderElementWrapper, effectsPreviewElements };
