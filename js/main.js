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
var effectLevelSlider = document.querySelector('.effect-level');
var pin = effectLevelSlider.querySelector('.effect-level__pin');

//var effectLevelScale = effectLevelSlider.querySelector('.effect-level__line');

var effectLevel = effectLevelSlider.querySelector('.effect-level__value');
//var PIN_SIZE = 18;
var effectsToggles = document.querySelectorAll('.effects__radio');
//var preview = document.querySelector('.img-upload__preview');
var photoPreview = document.querySelector('.img-upload__preview img');

var resetEffect = function () {
  effectLevel.setAttribute('value', 100);
};
// var changeValueFilter = function () {

//   effectLevel.setAttribute('value', Math.round(pinPosition * 100 / maxEffectLevel));
// }


// pin.addEventListener('mouseup', function (evt) {
//   // Читаю расположение пина относительно родительского блока ( шкалы)
//   // Читаю длину шкалы ( мах значение)
//   // записываю
//   var pinPosition = evt.target.offsetLeft;
//   var maxEffectLevel = effectLevelScale.offsetWidth;
//   effectLevel.setAttribute('value', Math.round(pinPosition * 100 / maxEffectLevel));
// });

// Функция назначения классов в соответствии с эффектом
var setClassEffects = function (evt) {
  photoPreview.className = '';
  effectLevelSlider.classList.remove('hidden');
  resetEffect();
  var effect = evt.target.value;
  photoPreview.classList.add('effects__preview--' + effect);

  if (effect === 'none') {
    effectLevelSlider.classList.add('hidden');
  }
  // if (effect === 'none') {
  //   photoPreview.classList.add('effects__preview--none');
  //   effectLevelSlider.classList.add('hidden');
  // } else if (effect === 'chrome') {
  //   photoPreview.classList.add('effects__preview--chrome');
  //   effectLevelSlider.classList.remove('hidden');
  // } else if (effect === 'sepia') {
  //   photoPreview.classList.add('effects__preview--sepia');
  //   effectLevelSlider.classList.remove('hidden');
  // } else if (effect === 'marvin') {
  //   photoPreview.classList.add('effects__preview--marvin');
  //   effectLevelSlider.classList.remove('hidden');
  // } else if (effect === 'phobos') {
  //   photoPreview.classList.add('effects__preview--phobos');
  //   effectLevelSlider.classList.remove('hidden');
  // } else if (effect === 'heat') {
  //   photoPreview.classList.add('effects__preview--heat');
  //   effectLevelSlider.classList.remove('hidden');
  // }
};

var clickEffectToggle = function (effectsToggle) {
  effectsToggle.addEventListener('change', setClassEffects);
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
