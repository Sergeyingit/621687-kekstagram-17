'use strict';
(function () {
  var effectLevelSlider = document.querySelector('.effect-level');
  var pin = effectLevelSlider.querySelector('.effect-level__pin');

  var effectLevelScale = effectLevelSlider.querySelector('.effect-level__line');

  var effectLevel = effectLevelSlider.querySelector('.effect-level__value');
  // var PIN_SIZE = 18;
  var effectsToggles = document.querySelectorAll('.effects__radio');
  var effectDepth = document.querySelector('.effect-level__depth');
  var photoPreview = document.querySelector('.img-upload__preview img');
  var pinPositionDefault = 453;
  var effectDepthDefault = 453;

  // функция сбрасывает значение эффектов к дефолтным
  var resetEffect = function () {
    effectLevel.setAttribute('value', 100);
    pin.style.left = pinPositionDefault + 'px';
    effectDepth.style.width = effectDepthDefault + 'px';
    photoPreview.style = '';
  // // console.log(effectLevel.value);
  };

  // Читаю расположение пина относительно родительского блока ( шкалы)
  // Читаю длину шкалы ( мах значение)
  // записываю
  // Вызываю функцию изменения глубины эффекта с значением расположения ползунка в %
  var pinCoords = function (evt) {
    var pinPosition = evt.target.offsetLeft;
    var maxEffectLevel = effectLevelScale.offsetWidth;

    effectLevel.setAttribute('value', Math.round(pinPosition * 100 / maxEffectLevel));
    definesDepth(effectLevel.value);
  };


  // Функция изменения глубины эффекта
  // определяю какой эффект применён к фото в данный момент по классу
  // у списка классов единственное значение, по этому [0]
  var definesDepth = function (value) {
    var effect = photoPreview.classList[0];
    var property;
    if (effect === 'effects__preview--chrome') {
      property = 'grayscale';
      value = value / 100;
    } else if (effect === 'effects__preview--sepia') {
      property = 'sepia';
      value = value / 100;
    } else if (effect === 'effects__preview--marvin') {
      property = 'invert';
      value = value + '%';
    } else if (effect === 'effects__preview--phobos') {
      property = 'blur';
      value = value / 100 * 3 + 'px';
    } else if (effect === 'effects__preview--heat') {
      property = 'brightness';
      value = value / 100 * 3;
    }
    photoPreview.style.cssText = 'filter: ' + property + '(' + value + ')';
  };


  // Слушаю пин
  pin.addEventListener('mousedown', function (evt) {

    var startCoords = {
      x: evt.clientX
    };

    var onMouseMove = function (moveEvt) {

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };


      var dragX = (pin.offsetLeft - shift.x);
      if (dragX <= 0) {
        dragX = 0;
      } else if (dragX >= effectLevelScale.offsetWidth) {
        dragX = effectLevelScale.offsetWidth;
      }
      pin.style.left = dragX + 'px';
      effectDepth.style.width = dragX + 'px';
      pinCoords(moveEvt);
    };

    var onMouseUp = function (upEvt) {
      pinCoords(upEvt);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };


    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // Функция назначения классов в соответствии с эффектом
  var setClassEffects = function (evt) {
    photoPreview.className = '';
    effectLevelSlider.classList.remove('hidden');
    var effect = evt.target.value;
    photoPreview.classList.add('effects__preview--' + effect);

    if (effect === 'none') {
      effectLevelSlider.classList.add('hidden');
    }
  };

  var clickEffectToggle = function (effectsToggle) {
    effectsToggle.addEventListener('change', function (evt) {
      setClassEffects(evt);
      resetEffect();
    });
  };

  for (var j = 0; j < effectsToggles.length; j++) {
    var effectsToggle = effectsToggles[j];
    clickEffectToggle(effectsToggle);
  }
})();
