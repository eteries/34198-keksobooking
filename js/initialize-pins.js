'use strict';

(function () {

  // Пины и диалог
  var map = document.querySelector('.tokyo__pin-map');
  var activePin = document.querySelector('.pin--active');

  // Фильтры
  var filterControls = document.querySelector('.tokyo__filters');
  var housingTypeFilter = filterControls.querySelector('#housing_type');
  var housingPriceFilter = filterControls.querySelector('#housing_price');
  var roomsNumberFilter = filterControls.querySelector('#housing_room-number');
  var guestsNumberFilter = filterControls.querySelector('#housing_guests-number');
  var housingFeaturesFilters = filterControls.querySelectorAll('#housing_features input');

  //  Активировать пин
  var setActive = function (pin) {
    cleanActive();
    pin.classList.add('pin--active');
    pin.setAttribute('aria-pressed', 'true');
    activePin = pin;
  };

  // Деактивировать текущий активный пин
  var cleanActive = function () {
    if (activePin) {
      activePin.classList.remove('pin--active');
      activePin.setAttribute('aria-pressed', 'false');
    }
  };

  // Очистить карту
  var cleanMap = function () {
    var pins = map.querySelectorAll('.pin');
    [].forEach.call(pins, function (item) {
      if (item.className !== 'pin.pin--main') {
        item.removeEventListener('click', window._pinClickHandler);
        item.removeEventListener('keydown', window._pinEnterHandler);
        map.removeChild(item);
      }
    });
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

    window._pinClickHandler = function (event) {
      setActive(event.currentTarget);
      window.showCard(data, function () {
        cleanActive();
      });
    };

    window._pinEnterHandler = function (event) {
      if (window.utils.isEnter(event)) {
        window.showCard(data, function () {
          activePin.focus();
          cleanActive();
        });
        setActive(event.currentTarget);
      }
    };

    newElement.addEventListener('click', window._pinClickHandler);
    newElement.addEventListener('keydown', window._pinEnterHandler);
  };

  // Выбрать пины для отрисовки
  var selectPins = function (array, number) {
    number = number || array.length;
    array.forEach(function (apartment, index) {
      if (index < number) {
        renderPin(templatePin, apartment);
      }
    });
  };

  // Загрузка и отбор данных
  window.load('https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data', function (data) {
    similarApartments = data;
    selectPins(similarApartments, 3);
  });

  // Изменяемый список условий для фильтрации
  var currentFilters = {
    type: 'any',
    price: '',
    rooms: 'any',
    guests: 'any',
    features: {
      wifi: '',
      dishwasher: '',
      parking: '',
      washer: '',
      elevator: '',
      conditioner: ''
    }
  };

  // Применить каскадный фильтр к исходному списку квартир в соответствии с текущим набором условий
  var applyFilters = function () {
    var filtered = similarApartments;

    // По типу
    if (currentFilters.type && currentFilters.type !== 'any') {
      filtered = filtered.filter(
          function (apartment) {
            if (apartment['offer']['type'] === currentFilters.type) {
              return true;
            } else {
              return false;
            }
          });
    }

    // В низшем диапазоне цен
    if (currentFilters.price && currentFilters.price === 'low') {
      filtered = filtered.filter(
          function (apartment) {
            if (apartment['offer']['price'] < 10000) {
              return true;
            } else {
              return false;
            }
          });
    }

    // В среднем диапазоне цен
    if (currentFilters.price && currentFilters.price === 'middle') {
      filtered = filtered.filter(
          function (apartment) {
            if (apartment['offer']['price'] >= 10000 && apartment['offer']['price'] <= 50000) {
              return true;
            } else {
              return false;
            }
          });
    }

    // В высшем диапазоне цен
    if (currentFilters.price && currentFilters.price === 'hight') {
      filtered = filtered.filter(
          function (apartment) {
            if (apartment['offer']['price'] > 50000) {
              return true;
            } else {
              return false;
            }
          });
    }

    // По числу комнат
    if (currentFilters.rooms && currentFilters.rooms !== 'any') {
      filtered = filtered.filter(
          function (apartment) {
            if (apartment['offer']['rooms'].toString() === currentFilters.rooms) {
              return true;
            } else {
              return false;
            }
          });
    }

    // По числу гостей
    if (currentFilters.guests && currentFilters.guests !== 'any') {
      filtered = filtered.filter(
          function (apartment) {
            if (apartment['offer']['guests'].toString() === currentFilters.guests) {
              return true;
            } else {
              return false;
            }
          });
    }

    // В соответстии с набором удобств
    var currentFeatures = currentFilters.features;
    for (var feature in currentFeatures) {
      if (currentFeatures.hasOwnProperty(feature) && currentFeatures[feature]) {
        filtered = filtered.filter(
            function (apartment) {
              if (apartment['offer']['features'].indexOf(feature) !== -1) {
                return true;
              } else {
                return false;
              }
            });
      }
    }

    return filtered;
  };

  // Обновление типа жилья при изменении и переотрисовка
  housingTypeFilter.addEventListener('change', function () {
    currentFilters.type = housingTypeFilter.value;
    cleanMap();
    selectPins(applyFilters());
  });

  // Обновление диапазона цен при изменении и переотрисовка
  housingPriceFilter.addEventListener('change', function () {
    currentFilters.price = housingPriceFilter.value;
    cleanMap();
    selectPins(applyFilters());
  });

  // Обновление числа комнат при изменении и переотрисовка
  roomsNumberFilter.addEventListener('change', function () {
    currentFilters.rooms = roomsNumberFilter.value;
    cleanMap();
    selectPins(applyFilters());
  });

  // Обновление числа гостей при изменении и переотрисовка
  guestsNumberFilter.addEventListener('change', function () {
    currentFilters.guests = guestsNumberFilter.value;
    cleanMap();
    selectPins(applyFilters());
  });

  // Обновление выбранных удобств при изменении и переотрисовка
  [].forEach.call(housingFeaturesFilters, function (checkbox) {
    checkbox.addEventListener('change', function () {
      currentFilters.features[checkbox.value] = checkbox.checked;
      cleanMap();
      selectPins(applyFilters());
    });
  });


  // Сброс фильтров пр перезагрузке
  window.addEventListener('load', function () {
    filterControls.reset();
  });

})();
