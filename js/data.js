'use strict';
(function () {
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

  window.data = {
    getArrayOfPhotos: getArrayOfPhotos
  };
})();
