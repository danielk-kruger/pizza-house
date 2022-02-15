'use strict';

const menuToggleBtn = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.navbar');
const slides = document.querySelectorAll('.carousel-wrapper');
const pagers = document.querySelectorAll('.carousel-slider');
const navMenu = document.querySelector('.navbar-links');

menuToggleBtn.addEventListener('click', function () {
  menuToggleBtn.classList.toggle('active');
  mobileMenu.classList.toggle('show');

  // Logic for the enable/disable of the window scrolling
  if (!mobileMenu.classList.contains('show')) unlockScrolling();
  else lockScrolling();
});

navMenu.addEventListener('click', function (e) {
  const isActiveMenu = document.querySelector('.navbar.show');
  const linksList = navMenu.children;

  // This logic only applies to mobile devices i.e Tablets, Cell Phones, etc
  // Check if the menu is active
  if (window.innerWidth < 820 && isActiveMenu) {
    hideMenu();

    // Loop through each link
    for (let i = 0; i <= linksList.length - 1; i++) {
      const link = linksList[i].children[0];

      if (e.target === link && !e.target.classList.contains('active')) e.target.classList.add('active');
      if (link.classList.contains('active') && link !== e.target) link.classList.remove('active');
    }
  }
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

// a function that returns TRUE if it is a laptop or FALSE if it is a mobile device
function isLaptop() {
  if (window.innerWidth > 992) return true;
}

// Set the whole document body to an overflow of hidden to disable scrolling
function lockScrolling() {
  document.querySelector('body').style.overflow = 'hidden';
}

// Set the whole document body to an overflow of auto to enable scrolling again
function unlockScrolling() {
  document.querySelector('body').style.overflow = 'auto';
}

// A re-usable function to hide the menu sidebar
function hideMenu() {
  menuToggleBtn.classList.remove('active');
  mobileMenu.classList.remove('show');
  unlockScrolling();
}

window.addEventListener('DOMContentLoaded', function () {
  // Check if the device is not a laptop to add a sticky class to the header
  // The sticky class will make the header shorter
});

// JQUERY

$(document).ready(function () {
  $('.owl-carousel').owlCarousel({
    center: true,
    items: 1,
    loop: true,
    margin: 20,
    dots: false,
    nav: true,
    autoplay: true,
    autoplayTimeout: 8000,
    autoplayHoverPause: true,
    merge: true,
    mouseDrag: false,
    smartSpeed: 250,
    navContainer: '.owl-nav',
    navText: ['<i class="fas fa-arrow-left"></i>', '<i class="fas fa-arrow-right"></i>'],

    responsive: {
      768: {
        items: 2,
        margin: 30,
      },

      992: {
        items: 3,
      },
    },
  });

  const menuLinks = $('.navbar-links--item > a');
  const sections = $('section[id]');

  $(window).on('scroll', function () {
    if (!isLaptop()) {
      if (isScrolledIntoView($('#enable-sticky-nav'))) {
        $('header').addClass('sticky');
      } else if (isScrolledIntoView($('#home'))) {
        $('header').removeClass('sticky');
      }
    } else {
      // laptop settings
    }
  });

  function isScrolledIntoView(elem) {
    return (
      elem.offset().top + elem.outerHeight() >= $(window).scrollTop() && elem.offset().top <= $(window).scrollTop() + $(window).height()
    );
  }
});
