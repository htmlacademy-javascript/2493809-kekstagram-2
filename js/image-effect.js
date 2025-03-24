import { imagePreview } from './image-scaling.js';

const EffectsList = {
  chrome: document.querySelector('#effect-chrome'),
  sepia: document.querySelector('#effect-sepia'),
  marvin: document.querySelector('#effect-marvin'),
  phobos: document.querySelector('#effect-phobos'),
  heat: document.querySelector('#effect-heat'),
}

const sliderNodeWrapper = document.querySelector('.img-upload__effect-level');
const sliderNode = sliderNodeWrapper.querySelector('.effect-level__slider');
const valueNode = document.querySelector('.effect-level__value');
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

const applyEffect = () => {
  const isElementChecked = true;

  switch (isElementChecked) {
    case EffectsList.chrome.checked:
      imagePreview.style.filter = `grayscale(${currentSliderValue})`;
      break;
    case EffectsList.sepia.checked:
      imagePreview.style.filter = `sepia(${currentSliderValue})`;
      break;
    case EffectsList.marvin.checked:
      imagePreview.style.filter = `invert(${currentSliderValue}%)`;
      break;
    case EffectsList.phobos.checked:
      imagePreview.style.filter = `blur(${currentSliderValue}px)`;
      break;
    case EffectsList.heat.checked:
      imagePreview.style.filter = `brightness(${currentSliderValue})`;
      break;
    default:
      imagePreview.style.filter = '';
  }
};

sliderNode.noUiSlider.on('update', () => {
  currentSliderValue = sliderNode.noUiSlider.get();
  valueNode.value = currentSliderValue;
  applyEffect();
});

radioInputSection.addEventListener('click', (evt) => {
  if (evt.target.matches('input[type="radio"]')) {
    let options = {};
    sliderNodeWrapper.classList.remove('hidden');
    switch (evt.target) {
      case EffectsList.chrome:
      case EffectsList.sepia:
        options = { range: { min: 0, max: 1 }, start: 1, step: 0.1 };
        break;
      case EffectsList.marvin:
        options = { range: { min: 0, max: 100 }, start: 100, step: 1 };
        break;
      case EffectsList.phobos:
        options = { range: { min: 0, max: 3 }, start: 3, step: 0.1 };
        break;
      case EffectsList.heat:
        options = { range: { min: 1, max: 3 }, start: 3, step: 0.1 };
        break;
      default:
        options = { range: { min: 0, max: 0 }, start: 0};
        applyEffect();
        sliderNodeWrapper.classList.add('hidden');
    }

    sliderNode.noUiSlider.updateOptions(options);
  }
});

export { sliderNodeWrapper, effectPreviewElements };
