'use strict';

(function () {

// Пины и диалог
  var map = document.querySelector('.tokyo__pin-map');
  var infoWindow = document.querySelector('.dialog');
  var activePin = document.querySelector('.pin--active');
  var closer = document.querySelector('.dialog__close');

  var detectTargetPin = function (event) {
    var target = event.target;

    while (target !== map) {
      if (target.classList.contains('pin')) {
        return target;
      }
      target = target.parentNode;
    }

    return false;
  };

//  Активировать пин
  var setActive = function (pin) {
    clearActive(activePin);
    pin.classList.add('pin--active');
    pin.setAttribute('aria-pressed', 'true');
    activePin = pin;
    infoWindow.style.display = 'block';
    infoWindow.setAttribute('aria-hidden', 'false');
    document.addEventListener('keydown', infoWindowKeyDownHandler);
  };

// Закрыть диалог
  var closeInfoWindow = function (event) {
    event.preventDefault();
    infoWindow.style.display = 'none';
    infoWindow.setAttribute('aria-hidden', 'true');
    clearActive();
    document.removeEventListener('keydown', infoWindowKeyDownHandler);
  };

  var infoWindowKeyDownHandler = function (event) {
    if (window.isEscape(event)) {
      closeInfoWindow(event);
    }
  };

  // Деактивировать текущий активный пин
  var clearActive = function () {
    if (activePin) {
      activePin.classList.remove('pin--active');
      activePin.setAttribute('aria-pressed', 'false');
    }
  };

  // Ожидание нажатия клавиши для закрытия окна
  document.addEventListener('keydown', infoWindowKeyDownHandler);

// Ожидание клика на пине
  map.addEventListener('click', function (event) {
    var pin = detectTargetPin(event);
    if (pin) {
      setActive(pin);
    }
  });

// Ожидание Enter на пине
  map.addEventListener('keydown', function (event) {
    var pin = detectTargetPin(event);
    if (pin && window.isEnter(event)) {
      setActive(pin);
    }
  });

// Ожидание клика на закрытие
  closer.addEventListener('click', function (event) {
    closeInfoWindow(event);
  });

// Ожидание нажатия Enter или Escape на закрытие
  closer.addEventListener('keydown', function (event) {
    if (window.isEnter(event) || window.isEscape(event)) {
      closeInfoWindow(event);
    }
  });

})();
