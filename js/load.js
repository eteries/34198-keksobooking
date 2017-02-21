'use strict';

window.load = (function () {

  return function (url, onLoad) {

    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function (event) {

      var data = event.target.response;

      if (typeof onLoad === 'function') {
        onLoad(data);
      }
    });

    xhr.open('GET', url);

    xhr.send();
  };
})();
