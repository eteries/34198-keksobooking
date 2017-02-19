'use strict';

window.showCard = (function () {

  var infoWindow = document.querySelector('.dialog');
  var closer = document.querySelector('.dialog__close');
  var onClose;

  // Закрыть диалог
  var closeInfoWindow = function (event, cb) {
    event.preventDefault();
    infoWindow.style.display = 'none';
    infoWindow.setAttribute('aria-hidden', 'true');
    document.removeEventListener('keydown', infoWindowKeyDownHandler);
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  // Закрывать по Escape
  var infoWindowKeyDownHandler = function (event) {
    if (window.utils.isEscape(event)) {
      closeInfoWindow(event);
    }
  };

  // Ожидание клика на закрытие
  closer.addEventListener('click', function (event) {
    closeInfoWindow(event);
  });

  // Ожидание нажатия Enter или Escape на закрытие
  closer.addEventListener('keydown', function (event) {
    if (window.utils.isEnter(event) || window.utils.isEscape(event)) {
      closeInfoWindow(event);
    }
  });

  // Возврат функции для выполнения действий при открытии и приёма колбэка
  return function (cb) {
    infoWindow.style.display = 'block';
    infoWindow.setAttribute('aria-hidden', 'false');
    document.addEventListener('keydown', infoWindowKeyDownHandler);
    onClose = cb;
  };

})();
