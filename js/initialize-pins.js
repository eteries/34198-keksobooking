'use strict';

(function () {

  // Пины и диалог
  var map = document.querySelector('.tokyo__pin-map');
  var activePin = document.querySelector('.pin--active');

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
  };

  // Деактивировать текущий активный пин
  var clearActive = function () {
    if (activePin) {
      activePin.classList.remove('pin--active');
      activePin.setAttribute('aria-pressed', 'false');
    }
  };

  // Ожидание клика на пине
  map.addEventListener('click', function (event) {
    var pin = detectTargetPin(event);
    if (pin) {
      setActive(pin);
      window.showCard();
    }
  });

  // Ожидание Enter на пине
  map.addEventListener('keydown', function (event) {
    var pin = detectTargetPin(event);
    if (pin && window.utils.isEnter(event)) {
      setActive(pin);
      window.showCard(function () {
        activePin.focus();
      });
    }
  });

})();
