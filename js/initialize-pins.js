'use strict';

(function () {

  // Пины и диалог
  var map = document.querySelector('.tokyo__pin-map');
  var activePin = document.querySelector('.pin--active');

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

  // Для скачивания объявлений
  var similarApartments = [];
  var templateElement = document.querySelector('#pin-template');
  var templatePin = templateElement.content.querySelector('.pin');

  // Сделать новый пин
  var renderPin = function (template, data) {
    var newElement = template.cloneNode(true);
    var newElementImg = newElement.querySelector('img');

    newElement.style.left = data.location.x + 'px';
    newElement.style.right = data.location.y + 'px';
    newElementImg.src = data.author.avatar;

    map.appendChild(newElement);

    newElement.addEventListener('click', function (event) {
      setActive(event.currentTarget);
      window.showCard(data);
    });

    newElement.addEventListener('keydown', function (event) {
      if (window.utils.isEnter(event)) {
        window.showCard(data, function () {
          activePin.focus();
        });
        setActive(event.currentTarget);
      }
    });
  };

  // Выбрать пины для отрисовки
  var selectPins = function (array, number) {
    array.forEach(function (apartment, index) {
      if (index < number) {
        renderPin(templatePin, apartment, index);
      }
    });
  };

  // Загрузка и отбор данных
  window.load('https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data', function (data) {
    similarApartments = data;
    selectPins(similarApartments, 3);
  });

})();
