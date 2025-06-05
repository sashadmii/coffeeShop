import '../index.html';
import '../scss/main.scss';

import { initSlider } from './slider';
import { initCart } from './cart';

document.addEventListener('DOMContentLoaded', () => {
  initSlider();
  initCart();
});
