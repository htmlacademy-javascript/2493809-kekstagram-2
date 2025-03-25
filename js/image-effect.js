import { imagePreview } from './image-scaling.js';
import { getRadioButtonsValue } from './util.js';

const EffectsOptions = {
  'none': { range: { min: 0, max: 0 }, start: 0},
  'chrome': { range: { min: 0, max: 1 }, start: 1, step: 0.1 },
  'sepia': { range: { min: 0, max: 1 }, start: 1, step: 0.1 },
  'marvin': { range: { min: 0, max: 100 }, start: 100, step: 1 },
  'phobos': { range: { min: 0, max: 3 }, start: 3, step: 0.1 },
  'heat': { range: { min: 1, max: 3 }, start: 3, step: 0.1 },
};

const sliderNodeWrapper = document.querySelector('.img-upload__effect-level');
const sliderNode = sliderNodeWrapper.querySelector('.effect-level__slider');
const valueNode = document.querySelector('.effect-level__value');
const radioInputSection = document.querySelector('.img-upload__effects');
const effectPreviewElements = radioInputSection.querySelectorAll('.effects__preview');
let currentSliderValue = 0;
let currentEffect = 'none';

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

const applyEffect = (effect) => {
  switch (effect) {
    case 'chrome':
      imagePreview.style.filter = `grayscale(${currentSliderValue})`;
      break;
    case 'sepia':
      imagePreview.style.filter = `sepia(${currentSliderValue})`;
      break;
    case 'marvin':
      imagePreview.style.filter = `invert(${currentSliderValue}%)`;
      break;
    case 'phobos':
      imagePreview.style.filter = `blur(${currentSliderValue}px)`;
      break;
    case 'heat':
      imagePreview.style.filter = `brightness(${currentSliderValue})`;
      break;
    default:
      imagePreview.style.filter = '';
  }
};

sliderNode.noUiSlider.on('update', () => {
  currentSliderValue = sliderNode.noUiSlider.get();
  valueNode.value = currentSliderValue;
  applyEffect(currentEffect);
});

radioInputSection.addEventListener('click', (evt) => {
  if (evt.target.matches('input[type="radio"]')) {
    let options = {};
    currentEffect = getRadioButtonsValue('effect');

    sliderNodeWrapper.classList.remove('hidden');
    options = EffectsOptions[currentEffect];
    if(currentEffect === 'none') {
      applyEffect();
      sliderNodeWrapper.classList.add('hidden');
    }
    sliderNode.noUiSlider.updateOptions(options);
  }
});

export { sliderNodeWrapper, effectPreviewElements };
