'use strict';
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
var pictures = document.querySelector('.pictures');
var commentsList = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var authorName = [
  'Дамблдор',
  'Волдеморт',
  'Доктор Стрендж',
  'Гарри Поттер',
  'Пендальф',
  'Радагаст'
];

var randomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max - min));
};

// Функция возвращает случайный элемент массива
/* var getRandomItem = function (arr) {
  return arr[randomNumber(0, arr.length)];
}; */

var getCommentsMessege = function (arr) {
  var copyArr = arr.concat();
  var textMessage = '';
  // Рандомное количество составляющих текста комментария
  // (Для формирования комментария вам необходимо взять одно или два случайных предложений)
  var randomQuantity = randomNumber(1, 2);
  for (var i = 0; i < randomQuantity; i++) {
    var randomIndex = randomNumber(0, copyArr.length);
    var textItem;
    // если больше 2 частей текста, нужно чтобы после первой части вставлялся пробел.
    // если больше 2 частей и номер итерации не последний, добавляется пробел
    if (randomQuantity > 1 && i < randomQuantity - 1) {
      textItem = copyArr.splice(randomIndex, 1)[0] + ' ';
    } else {
      textItem = copyArr.splice(randomIndex, 1)[0];
    }
    textMessage += textItem;
  }

  return textMessage;

};

// Функция возвращает массив комментариев (случайное количество)
var getArrayComments = function (arr) {
  var arrayOfComments = [];
  var randomQuantity = randomNumber(0, arr.length);

  for (var i = 0; i < randomQuantity; i++) {
    var commentItem = {
      avatar: 'img/avatar-' + (i + 1) + '.svg',
      messege: getCommentsMessege(commentsList),
      name: authorName[i]
    };

    arrayOfComments.push(commentItem);
  }

  return arrayOfComments;
};

// Функция, которая записывает данные в объект, пушит в массив и возвращает массив фотографий
var getArrayOfPhotos = function () {
  var arrayOfPhotos = [];

  for (var i = 0; i < 25; i++) {
    var photoItem = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: randomNumber(15, 200),
      comments: getArrayComments(authorName)
    };

    arrayOfPhotos.push(photoItem);
  }

  return arrayOfPhotos;
};

var getPictureElement = function (photoCard) {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = photoCard.url;
  pictureElement.querySelector('.picture__likes').textContent = photoCard.likes;
  pictureElement.querySelector('.picture__comments').textContent = photoCard.comments.length;

  return pictureElement;
};

var allPohotos = getArrayOfPhotos();
var fragment = document.createDocumentFragment();
for (var i = 0; i < allPohotos.length; i++) {
  fragment.appendChild(getPictureElement(allPohotos[i]));
}
pictures.appendChild(fragment);

// 4.1.1

var uploadImageForm = document.querySelector('.img-upload');
var uploadFile = uploadImageForm.querySelector('#upload-file');
var editForm = uploadImageForm.querySelector('.img-upload__overlay');
var closeButton = uploadImageForm.querySelector('#upload-cancel');
var ESC_KEYCODE = 27;

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  editForm.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  editForm.classList.add('hidden');
  uploadFile.value = '';
  document.removeEventListener('keydown', onPopupEscPress);
};

uploadFile.addEventListener('change', function () {
  openPopup();
});

closeButton.addEventListener('click', function () {
  closePopup();
});

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


// filters
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

// 4.2

var commentInput = document.querySelector('.text__description');

commentInput.addEventListener('focus', function () {
  document.removeEventListener('keydown', onPopupEscPress);
});

commentInput.addEventListener('blur', function () {
  document.addEventListener('keydown', onPopupEscPress);
});
