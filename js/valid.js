'use strict';
(function () {
  var commentInput = document.querySelector('.text__description');

  commentInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', window.form.onPopupEscPress);
  });

  commentInput.addEventListener('blur', function () {
    document.addEventListener('keydown', window.form.onPopupEscPress);
  });
})();
