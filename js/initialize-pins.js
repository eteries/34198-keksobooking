'use strict';

(function () {

  // Пины и диалог
  var map = document.querySelector('.tokyo__pin-map');
  var pins = [];
  var activePin = document.querySelector('.pin--active');

  // Фильтры
  var filterControls = document.querySelector('.tokyo__filters');
  var housingTypeFilter = filterControls.querySelector('#housing_type');
  var housingPriceFilter = filterControls.querySelector('#housing_price');
  var roomsNumberFilter = filterControls.querySelector('#housing_room-number');
  var guestsNumberFilter = filterControls.querySelector('#housing_guests-number');
  var housingFeaturesFilters = filterControls.querySelectorAll('#housing_features input');

  // Активировать пин
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
    pins.forEach(function (item) {
      map.removeChild(item);
    });
    pins.length = 0;
  };

  // Для скачивания объявлений
  var similarApartments = [];
  var templateElement = document.querySelector('#pin-template');
  var templatePin = templateElement.content.querySelector('.pin');

  // Сделать новый пин
  var renderPin = function (template, data) {
    var newElement = template.cloneNode(true);
    var newElementImg = newElement.querySelector('img');

    pins.push(newElement);
    map.appendChild(newElement);

    newElement.style.left = data.location.x - newElement.offsetWidth / 2 + 'px';
    newElement.style.top = data.location.y - newElement.offsetHeight + 'px';
    newElementImg.src = data.author.avatar;

    newElement.addEventListener('click', function (event) {
      setActive(event.currentTarget);
      window.showCard(data, function () {
        cleanActive();
      });
    });

    newElement.addEventListener('keydown', function (event) {
      if (window.utils.isEnter(event)) {
        window.showCard(data, function () {
          activePin.focus();
          cleanActive();
        });
        setActive(event.currentTarget);
      }
    });
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

  // Возможные значения, приходящие из формы фильтров
  var filterValues = {
    ANY: 'any',
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'hight'
  };

  // Цифровые значения цен
  var price = {
    LOW: 10000,
    HIGH: 50000
  };

  // Изменяемый список условий для фильтрации
  var currentFilters = {
    type: filterValues.ANY,
    price: filterValues.MIDDLE,
    rooms: filterValues.ANY,
    guests: filterValues.ANY,
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
    if (currentFilters.type && currentFilters.type !== filterValues.ANY) {
      filtered = filtered.filter(function (apartment) {
        return apartment['offer']['type'] === currentFilters.type;
      });
    }

    // По цене
    switch (currentFilters.price) {
      case filterValues.LOW:
        filtered = filtered.filter(function (apartment) {
          return apartment['offer']['price'] < price.LOW;
        });
        break;
      case filterValues.MIDDLE:
        filtered = filtered.filter(function (apartment) {
          return apartment['offer']['price'] >= price.LOW && apartment['offer']['price'] <= price.HIGH;
        });
        break;
      case filterValues.HIGH:
        filtered = filtered.filter(function (apartment) {
          return apartment['offer']['price'] > price.HIGH;
        });
    }

    // По числу комнат
    if (currentFilters.rooms && currentFilters.rooms !== filterValues.ANY) {
      filtered = filtered.filter(function (apartment) {
        return apartment['offer']['rooms'].toString() === currentFilters.rooms;
      });
    }

    // По числу гостей
    if (currentFilters.guests && currentFilters.guests !== filterValues.ANY) {
      filtered = filtered.filter(function (apartment) {
        return apartment['offer']['guests'].toString() === currentFilters.guests;
      });
    }

    // В соответствии с набором удобств
    var currentFeatures = currentFilters.features;
    for (var feature in currentFeatures) {
      if (currentFeatures.hasOwnProperty(feature) && currentFeatures[feature]) {
        filtered = filtered.filter(function (apartment) {
          return apartment['offer']['features'].indexOf(feature) !== -1;
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

  // Сброс фильтров при перезагрузке
  window.addEventListener('load', function () {
    filterControls.reset();
  });

})();
