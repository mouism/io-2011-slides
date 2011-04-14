/*
  Google I/O 2011 HTML slides template

  Created by Luke Mahé (lukem@google.com) 
         and Marcin Wichary (mwichary@google.com).
 
  URL: http://go/io-html-slides
*/

var PERMANENT_URL_PREFIX = 'http://io-2011-slides.googlecode.com/svn/trunk/';

var curSlide;

function handleBodyKeyDown(event) {
  switch (event.keyCode) {
    case 39: // right arrow
    case 40: // down arrow
    case 13: // Enter
    case 32: // space
    case 34: // PgDn
      nextSlide();
      event.preventDefault();
      break;

    case 37: // left arrow
    case 38: // top arrow
    case 8: // Backspace
    case 33: // PgUp
      prevSlide();
      event.preventDefault();
      break;

  }
}

function getCurSlideFromHash() {
  var slideNo = parseInt(location.hash.substr(1));

  if (slideNo) {
    curSlide = slideNo - 1;
  } else {
    curSlide = 0;
  }
}

function updateHash() {
  location.replace('#' + (curSlide + 1));
}

function triggerSlideEvent(slide, slideNo) {
  if (!slide) {
    return;
  }

  var evt = document.createEvent('Event');
  evt.initEvent('slidechange', true, true);
  evt.slideNumber = slideNo + 1; // Make it readable
  slideEls[curSlide].dispatchEvent(evt);

  triggerEnterEvent(slide, slideNo);
}

function triggerEnterEvent(slide, slideNo) {
  if (!slide) {
    return;
  }

  var onEnter = slide.getAttribute('onslideenter');
  eval(onEnter);
};

function triggerLeaveEvent(slide, slideNo) {
  if (!slide) {
    return;
  }

  var onLeave = slide.getAttribute('onslideleave');
  eval(onLeave);
};

function updateSlideClass(el, className) {
  if (el) {    
    if (className) {
      el.classList.add(className);
    } else {
      el.classList.remove('far-past');
      el.classList.remove('past');
      el.classList.remove('current');
      el.classList.remove('next');
      el.classList.remove('far-next');      
    }
  }
}

function updateSlideClasses() {
  for (var i = 0, el; el = slideEls[i]; i++) {
    updateSlideClass(el);
  }
  
  updateSlideClass(slideEls[curSlide - 2], 'far-past');
  updateSlideClass(slideEls[curSlide - 1], 'past');

  triggerLeaveEvent(slideEls[curSlide - 1], curSlide - 1);

  updateSlideClass(slideEls[curSlide], 'current');

  triggerSlideEvent(slideEls[curSlide], curSlide);

  updateSlideClass(slideEls[curSlide + 1], 'next');
  updateSlideClass(slideEls[curSlide + 2], 'far-next');
  
  updateHash();
}

function prevSlide() {
  if (curSlide > 0) {
    curSlide--;
  
    updateSlideClasses();
  }
}

function nextSlide() {
  if (curSlide < slideEls.length - 1) {
    curSlide++;
  
    updateSlideClasses();
  }
}

function addFontStyle() {
  var el = document.createElement('link');
  el.rel = 'stylesheet';
  el.type = 'text/css';
  el.href = 'http://fonts.googleapis.com/css?family=Open+Sans:regular,semibold,italic,italicsemibold|Droid+Sans+Mono';
  
  document.body.appendChild(el);   
}

function addGeneralStyle() {
  var el = document.createElement('link');
  el.rel = 'stylesheet';
  el.type = 'text/css';
  el.href = PERMANENT_URL_PREFIX + 'styles.css';
  
  document.body.appendChild(el);    
}

function handleDomLoaded() {
  slideEls = document.querySelectorAll('section.slides > article');
  
  addFontStyle();  
  addGeneralStyle();
  
  document.body.classList.add('loaded');
  
  updateSlideClasses();

  document.body.addEventListener('keydown', handleBodyKeyDown, false);
}

function initialize() {
  getCurSlideFromHash();
  
  document.addEventListener('DOMContentLoaded', handleDomLoaded, false);
}

initialize();
