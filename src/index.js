import './index.html';
import './scss/main.scss';

const slides = document.querySelectorAll('.carousel .card');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
}

prev.addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
});

next.addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
});

const overlay = document.getElementById('overlay');
const cart = document.getElementById('cart');
const addButtons = document.querySelectorAll('.order-btn');
// const item = document.getElementsByClassName('active');

function openCart() {
  cart.classList.add('open');
  overlay.classList.add('show');
  // console.log(item[0]);
}

function closeCart() {
  cart.classList.remove('open');
  overlay.classList.remove('show');
}

function cardElement(value) {
  const item = document.createElement('div');
  const buttons = document.createElement('div');
  const likeButton = document.createElement('span');
  const deleteButton = document.createElement('span');
  const image = document.createElement('div');
  const img = document.createElement('img');
  const description = document.createElement('div');
  const descriptionText = document.createElement('span');
  const quantity = document.createElement('div');
  const quantityInput = document.createElement('input');
  const plusButton = document.createElement('button');
  const minusButton = document.createElement('button');
  const total = document.createElement('div');

  item.classList.add('item');
  buttons.classList.add('buttons');
  likeButton.classList.add('like-btn');
  deleteButton.classList.add('delete-btn');
  image.classList.add('image');
  description.classList.add('description');
  quantity.classList.add('quantity');
  plusButton.classList.add('plus-btn');
  minusButton.classList.add('minus-btn');
  total.classList.add('total-price');

  console.log(`./images/toGo/${value}.png`);

  img.src = `./images/toGo/${value}.png`;
  img.alt = `${value}`;
  img.style.width = '100px';
  img.style.height = '100px';

  descriptionText.innerText = `${value}`;
  plusButton.type = 'button';
  plusButton.name = 'button';
  plusButton.innerText = '+';
  minusButton.type = 'button';
  minusButton.name = 'button';
  minusButton.innerText = '-';
  quantityInput.type = 'text';
  quantityInput.name = 'name';
  quantityInput.value = '1';
  total.innerText = 'TOTAL';

  buttons.appendChild(likeButton);
  buttons.appendChild(deleteButton);
  image.appendChild(img);
  description.appendChild(descriptionText);
  quantity.appendChild(plusButton);
  quantity.appendChild(quantityInput);
  quantity.appendChild(minusButton);

  item.appendChild(buttons);
  item.appendChild(image);
  item.appendChild(description);
  item.appendChild(quantity);
  item.appendChild(total);

  cart.appendChild(item);
}

overlay.addEventListener('click', closeCart);

addButtons.forEach((button) => {
  button.addEventListener('click', () => {
    openCart();
    cardElement(button.value);
  });
});
