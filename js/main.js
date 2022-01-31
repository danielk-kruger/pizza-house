'use strict';

const menuToggleBtn = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.navbar');
const slides = document.querySelectorAll('.carousel-wrapper');
const pagers = document.querySelectorAll('.carousel-slider');

menuToggleBtn.addEventListener('click', function () {
  menuToggleBtn.classList.toggle('active');
  mobileMenu.classList.toggle('show');
});

let index = 0;
const hideClass = 'off',
  count = slides.length;
nextSlide();

// This function handles the changing of slides
function nextSlide() {
  const currentSlide = slides[index++ % count];
  const previousSlide = slides[index % count];

  currentSlide.classList.add(hideClass);
  previousSlide.classList.remove(hideClass);
  handlePager();
}

// This function handles the pager buttons on the slide in the home page
function handlePager() {
  for (let i = 0; i < pagers.length; i++) {
    pagers[i].addEventListener('click', function (e) {
      const clickElem = e.target;
      const prevElem = clickElem.previousElementSibling;
      const nextElem = clickElem.nextElementSibling;
      const activeClass = 'active';

      if (pagers[i] === clickElem && clickElem.classList.contains(activeClass)) return;
      if (!clickElem.classList.contains(activeClass)) {
        clickElem.classList.add(activeClass);

        if (prevElem) {
          prevElem.classList.remove(activeClass);
          nextSlide();
        } else {
          nextElem.classList.remove(activeClass);
          nextSlide();
        }
      }
    });
  }
}
