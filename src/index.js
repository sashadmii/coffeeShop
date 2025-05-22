import './index.html';
import './scss/main.scss';

// SLIDER FUNCTIONALITY
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

// OPEN / CLOSE CART
const overlay = document.getElementById('overlay');
const cart = document.getElementById('cart');
const cartContent = document.querySelector('.cart-content');
const addButtons = document.querySelectorAll('.order-btn');
const cartTotal = document.getElementById('cart-total');

function openCart() {
  cart.classList.add('open');
  overlay.classList.add('show');
}

function closeCart() {
  cart.classList.remove('open');
  overlay.classList.remove('show');
}

overlay.addEventListener('click', closeCart);

// CREATE CART ITEM
function createCardElement(value, price) {
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
  const itemTotal = document.createElement('div');

  item.classList.add('item');
  item.setAttribute('id', `${value}`);
  button.classList.add('button-container');
  deleteButton.classList.add('delete-btn');
  image.classList.add('cart-image');
  description.classList.add('description');
  quantity.classList.add('quantity');
  plusButton.classList.add('plus-btn');
  minusButton.classList.add('minus-btn');
  itemTotal.classList.add('item-total');

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
  itemTotal.innerText = `$${price}`;
  itemTotal.setAttribute('data-price', `${price}`);

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
  item.appendChild(itemTotal);

  cartContent.appendChild(item);
  countTotal();

  // DELETE CART ITEM
  deleteButton.addEventListener('click', (e) => {
    const item = e.target.closest('.item');
    item.remove();

    countTotal();
  });

  // INCREASE QUANTITY
  plusButton.addEventListener('click', (e) => {
    const currentQuantity = parseInt(quantityInput.value) || 0;
    const newQuantity = currentQuantity + 1;
    quantityInput.value = newQuantity;

    itemTotal.innerText = `$${(price * newQuantity).toFixed(2)}`;

    countTotal();
  });

  // DECREASE QUANTITY
  minusButton.addEventListener('click', (e) => {
    let currentQuantity = parseInt(quantityInput.value) || 0;
    currentQuantity -= 1;

    if (currentQuantity <= 0) {
      const item = e.target.closest('.item');
      item.remove();
    } else {
      quantityInput.value = currentQuantity;
      itemTotal.innerText = `$${(price * currentQuantity).toFixed(2)}`;
    }

    countTotal();
  });
}

// ADD CART ITEM
addButtons.forEach((button) => {
  button.addEventListener('click', () => {
    openCart();

    const itemId = button.value;
    const itemPrice = button.dataset.price;
    const cartItem = document.getElementById(itemId);

    if (cartItem) {
      increaseItemQuantity(cartItem);
    } else {
      createCardElement(itemId, itemPrice);
    }
  });
});

function increaseItemQuantity(cartItem) {
  const quantityInput = cartItem.querySelector('.quantity input');
  const currentQuantity = parseInt(quantityInput.value) || 0;
  const newQuantity = currentQuantity + 1;
  quantityInput.value = newQuantity;

  const itemTotal = cartItem.querySelector('.item-total');
  const unitPrice = parseFloat(itemTotal.dataset.price);
  itemTotal.innerText = `$${(unitPrice * newQuantity).toFixed(2)}`;

  countTotal();
}

// COUNT CART TOTAL
function countTotal() {
  const prices = document.querySelectorAll('.item-total');
  const numericPrices = Array.from(prices).map((el) =>
    parseFloat(el.innerText.replace(/[^0-9.]/g, ''))
  );

  const total = numericPrices.reduce((acc, val) => acc + val, 0).toFixed(2);

  const totalNum = document.getElementById('cart-total');
  totalNum.innerText = total;
}
