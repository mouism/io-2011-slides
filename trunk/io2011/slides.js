var PERMANENT_URL_PREFIX = 'http://io-2011-slides.googlecode.com/svn/trunk/io2011/';

// Make dev easier
//var PERMANENT_URL_PREFIX = 'io2011/';


var curSlide;

function handleBodyKeyDown(event) {
  switch (event.keyCode) {
    case 37: // left arrow
    case 38: // top arrow
      prevSlide();
      break;

    case 39: // right arrow
    case 40: // down arrow
    case 13: // Enter
    case 32: // space
      nextSlide();
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

function updateSlideClass(el, className) {
  if (el) {
    el.classList.remove('far-past');
    el.classList.remove('past');
    el.classList.remove('current');
    el.classList.remove('next');
    el.classList.remove('far-next');

    if (className) {
      el.classList.add(className);
    }
  }
}

function updateSlideClasses() {
  for (var i = 0, el; el = slideEls[i]; i++) {
    updateSlideClass(el);
  }

  updateSlideClass(slideEls[curSlide - 2], 'far-past');
  updateSlideClass(slideEls[curSlide - 1], 'past');
  updateSlideClass(slideEls[curSlide], 'current');
  updateSlideClass(slideEls[curSlide + 1], 'next');
  updateSlideClass(slideEls[curSlide + 2], 'far-next');

  updateHash();
}

/*
function showFrames: function() {
  var frames = queryAll('iframe', this._node);
      function show() {
        frames.forEach(function(el) {
          var _src = el.getAttribute('_src');
          if (_src && _src.length) {
            el.src = _src;
          }
        });
      }
      setTimeout(show, 0);
    }
}*/

/*function hideFrames() {
    _hideFrames: function() {
      var frames = queryAll('iframe', this._node);
      function hide() {
        frames.forEach(function(el) {
          var _src = el.getAttribute('_src');
          if (_src && _src.length) {
            el.src = '';
          }
        });
      }
      setTimeout(hide, 250);
    },
    
}*/

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
  el.href = 'http://fonts.googleapis.com/css?family=Open+Sans';

  document.body.appendChild(el);
}

function addGeneralStyle() {
  var el = document.createElement('link');
  el.rel = 'stylesheet';
  el.type = 'text/css';
  el.href = PERMANENT_URL_PREFIX + 'styles.css';

  document.body.appendChild(el);
}

function addIOLogos() {
  var slides = document.getElementsByTagName('article');
  for (var i = 0, slide; slide = slides[i]; i++) {
    if (slide.className.indexOf('biglogo') != -1) {
      continue;
    }

    var segue = slide.className.indexOf('segue') != -1;
    var logo = document.createElement('DIV');
    logo.className = 'small-logo';
    slide.appendChild(logo);
  }
}

function handleDomLoaded() {
  slideEls = document.querySelectorAll('section.slides > article');

  addFontStyle();
  addGeneralStyle();
  addIOLogos();

  document.body.classList.add('loaded');

  updateSlideClasses();

  document.body.addEventListener('keydown', handleBodyKeyDown, false);
}

function initialize() {
  getCurSlideFromHash();

  document.addEventListener('DOMContentLoaded', handleDomLoaded, false);
}

initialize();
