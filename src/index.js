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

function cardElement(value, price) {
  const item = document.createElement('div');
  const button = document.createElement('div');
  const deleteButton = document.createElement('span');
  const image = document.createElement('div');
  const img = document.createElement('img');
  const description = document.createElement('div');
  const descriptionText = document.createElement('div');
  const quantity = document.createElement('div');
  const quantityInput = document.createElement('input');
  const plusButton = document.createElement('button');
  const minusButton = document.createElement('button');
  const total = document.createElement('div');

  item.classList.add('item');
  button.classList.add('button-container');
  deleteButton.classList.add('delete-btn');
  image.classList.add('cart-image');
  description.classList.add('description');
  quantity.classList.add('quantity');
  plusButton.classList.add('plus-btn');
  minusButton.classList.add('minus-btn');
  total.classList.add('total-price');

  img.src = `./images/toGo/${value}.png`;
  img.alt = `${value}`;

  descriptionText.innerText = `${value}`;
  deleteButton.innerHTML = '<img src="./images/icons/close.svg">';
  plusButton.type = 'button';
  plusButton.name = 'button';
  plusButton.innerHTML = '<img src="./images/icons/plus.svg"/>';
  minusButton.type = 'button';
  minusButton.name = 'button';
  minusButton.innerHTML = '<img src="./images/icons/minus.svg"/>';
  quantityInput.type = 'text';
  quantityInput.name = 'name';
  quantityInput.value = '1';
  total.innerText = `$${price}`;

  button.appendChild(deleteButton);
  image.appendChild(img);
  description.appendChild(descriptionText);
  quantity.appendChild(minusButton);
  quantity.appendChild(quantityInput);
  quantity.appendChild(plusButton);
  description.appendChild(quantity);

  item.appendChild(button);
  item.appendChild(image);
  item.appendChild(description);
  // item.appendChild(quantity);
  item.appendChild(total);

  cart.appendChild(item);
}

overlay.addEventListener('click', closeCart);

addButtons.forEach((button) => {
  button.addEventListener('click', () => {
    openCart();
    cardElement(button.value, button.dataset.price);
  });
});
