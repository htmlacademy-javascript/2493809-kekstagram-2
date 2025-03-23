import { imagePreview } from './image-scaling.js';

const sliderNodeWrapper = document.querySelector('.img-upload__effect-level');
const sliderNode = sliderNodeWrapper.querySelector('.effect-level__slider');
const valueNode = document.querySelector('.effect-level__value');
const chromeEffectNode = document.querySelector('#effect-chrome');
const sepiaEffectNode = document.querySelector('#effect-sepia');
const marvinEffectNode = document.querySelector('#effect-marvin');
const phobosEffectNode = document.querySelector('#effect-phobos');
const heatEffectNode = document.querySelector('#effect-heat');
const radioInputSection = document.querySelector('.img-upload__effects');
const effectPreviewElements = radioInputSection.querySelectorAll('.effects__preview');
let currentSliderValue = 0;

sliderNodeWrapper.classList.add('hidden');

noUiSlider.create(sliderNode, {
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
  if (chromeEffectNode.checked) {
    imagePreview.style.filter = `grayscale(${currentSliderValue})`;
  } else if (sepiaEffectNode.checked) {
    imagePreview.style.filter = `sepia(${currentSliderValue})`;
  } else if (marvinEffectNode.checked) {
    imagePreview.style.filter = `invert(${currentSliderValue}%)`;
  } else if (phobosEffectNode.checked) {
    imagePreview.style.filter = `blur(${currentSliderValue}px)`;
  } else if (heatEffectNode.checked) {
    imagePreview.style.filter = `brightness(${currentSliderValue})`;
  } else {
    imagePreview.style.filter = '';
  }
};

sliderNode.noUiSlider.on('update', () => {
  currentSliderValue = sliderNode.noUiSlider.get();
  valueNode.value = currentSliderValue;
  applyFilter();
});

radioInputSection.addEventListener('click', (evt) => {
  if (evt.target.matches('input[type="radio"]')) {
    let options = {};
    sliderNodeWrapper.classList.remove('hidden');
    switch (evt.target) {
      case chromeEffectNode:
      case sepiaEffectNode:
        options = { range: { min: 0, max: 1 }, start: 1, step: 0.1 };
        break;
      case marvinEffectNode:
        options = { range: { min: 0, max: 100 }, start: 100, step: 1 };
        break;
      case phobosEffectNode:
        options = { range: { min: 0, max: 3 }, start: 3, step: 0.1 };
        break;
      case heatEffectNode:
        options = { range: { min: 1, max: 3 }, start: 3, step: 0.1 };
        break;
      default:
        options = { range: { min: 0, max: 0 }, start: 0};
        applyFilter();
        sliderNodeWrapper.classList.add('hidden');
    }

    sliderNode.noUiSlider.updateOptions(options);
  }
});

export { sliderNodeWrapper, effectPreviewElements };
