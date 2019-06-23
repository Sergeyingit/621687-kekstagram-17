'use strict';
(function () {
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var pictures = document.querySelector('.pictures');
  var getPictureElement = function (photoCard) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = photoCard.url;
    pictureElement.querySelector('.picture__likes').textContent = photoCard.likes;
    pictureElement.querySelector('.picture__comments').textContent = photoCard.comments.length;

    return pictureElement;
  };


  var loadHandler = function (allPohotos) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < allPohotos.length; i++) {
      fragment.appendChild(getPictureElement(allPohotos[i]));
    }
    pictures.appendChild(fragment);
  };

  window.backend.load(loadHandler);
})();
