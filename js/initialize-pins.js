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

  var adjustContent = function (pin) {
    if (pin !== activePin) {
      var id = pin.dataset.num || 0;
      window.fillCard(similarApartments[id]);
    }
  };


  // Ожидание клика на пине
  map.addEventListener('click', function (event) {
    var pin = detectTargetPin(event);
    if (pin) {
      adjustContent(pin);
      setActive(pin);
      window.showCard();
    }
  });

  // Ожидание Enter на пине
  map.addEventListener('keydown', function (event) {
    var pin = detectTargetPin(event);
    if (pin && window.utils.isEnter(event)) {
      adjustContent(pin);
      setActive(pin);
      window.showCard(function () {
        activePin.focus();
      });
    }
  });

  // Для скачивания объявлений
  var similarApartments = [];
  var templateElement = document.querySelector('#pin-template');
  var templatePin = templateElement.content.querySelector('.pin');

  // Сделать новый пин
  var renderPin = function (template, data, id) {
    var newElement = template.cloneNode(true);
    var newElementImg = newElement.querySelector('img');
    map.appendChild(newElement);
    newElement.style.left = data.location.x + 'px';
    newElement.style.right = data.location.y + 'px';
    newElement.dataset.num = id;
    newElementImg.src = data.author.avatar;
  };

  // Выбрать пины для отрисовки
  var selectPins = function () {
    similarApartments.forEach(function (apartment, index) {
      if (index > 0 && index <= 3) {
        renderPin(templatePin, apartment, index);
      }
    });
  };

  // Загрузка и отбор данных
  window.load('https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data', function (data) {
    similarApartments = data;
    selectPins();
    // Заполнение стартовой карточки актуальными данными
    window.fillCard(similarApartments[0]);
    // Показ стартового окна с запуском ожидания Escape
    window.showCard();
  });

})();
