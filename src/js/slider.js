export function initSlider() {
  const slides = document.querySelectorAll('.carousel .card');
  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');

  if (!slides.length || !prev || !next) return;

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
}
