'use strict';
// data.js

// gallery.js

// form.js
// 4.1.2

// zoom

var zoomValue = document.querySelector('.scale__control--value');
var zoomControlsSmaller = document.querySelector('.scale__control--smaller');
var zoomControlsBigger = document.querySelector('.scale__control--bigger');
var zoomStep = 25;

zoomControlsSmaller.addEventListener('click', function () {
  zoomValue.setAttribute('value', zoomValue.value += zoomStep + '%');
});

zoomControlsBigger.addEventListener('click', function () {
  zoomValue.setAttribute('value', zoomValue.value -= zoomStep);
});


// filters.js
// 4.2
// valid.js
