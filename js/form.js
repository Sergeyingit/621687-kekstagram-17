'use strict';
(function () {
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

  window.form = {
    onPopupEscPress: onPopupEscPress
  };

})();
