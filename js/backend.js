'use strict';
(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';

  var load = function (loadHandler, erroroHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      loadHandler(xhr.response);
    });

    xhr.send();
  };

  window.backend = {
    load: load
  };
})();
