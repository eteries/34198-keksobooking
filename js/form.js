'use strict';

// Пины и диалог
var pins = document.querySelectorAll('.pin');
var pinsNum = pins.length;
var infoWindow = document.querySelector('.dialog');
var activePin = document.querySelector('.pin--active');
var closer = document.querySelector('.dialog__close');

// Форма и её элементы
var form = document.querySelector('.notice__form');
var formTitle = form.querySelector('#title');
var formPrice = form.querySelector('#price');
var formAddress = form.querySelector('#address');
var formCheckIn = form.querySelector('#time');
var formCheckOut = form.querySelector('#timeout');
var formType = form.querySelector('#type');
var formRooms = form.querySelector('#room_number');
var formGuests = form.querySelector('#capacity');

var keys = {ENTER: 13, ESCAPE: 27};

// Слушать клик по пину
var pinClickHandler = function (pin) {
  pin.addEventListener('click', function () {
    setActive(pin);
  });
};

// Слушать нажатие клавиш на пине
var pinKeyHandler = function (pin) {
  pin.addEventListener('keydown', function (event) {
    if (isEnter(event)) {
      setActive(pin);
    }
  });
};

//  Активировать пин
var setActive = function (pin) {
  clearActive(activePin);
  pin.classList.add('pin--active');
  pin.setAttribute('aria-pressed', 'true');
  activePin = pin;
  infoWindow.style.display = 'block';
  infoWindow.setAttribute('aria-hidden', 'false');
};

// Закрыть диалог
var closeInfoWindow = function (event) {
  event.preventDefault();
  infoWindow.style.display = 'none';
  infoWindow.setAttribute('aria-hidden', 'true');
  clearActive();
};

// Нажали Enter?
var isEnter = function (event) {
  return event.keyCode && event.keyCode === keys.ENTER;
};

// Нажали Escape?
var isEscape = function (event) {
  return event.keyCode && event.keyCode === keys.ESCAPE;
};

// Деактивировать текущий активный пин
var clearActive = function () {
  if (activePin) {
    activePin.classList.remove('pin--active');
    activePin.setAttribute('aria-pressed', 'false');
  }
};

// Синхронизировать комнаты по гостям
var syncRooms = function () {
  formRooms.selectedIndex = (formGuests.selectedIndex === 0) ? 1 : 0;
};

// Синхронизировать гостей по комнатам
var syncGuests = function () {
  formGuests.selectedIndex = (formRooms.value === '1') ? 1 : 0;
};

// Настройка диалога
infoWindow.setAttribute('aria', 'dialog');

// Настройка кнопки закрытия
closer.setAttribute('aria', 'button');
closer.tabIndex = 1;

// Настройка пинов
for (var i = 0; i < pinsNum; i++) {
  pinClickHandler(pins[i]);
  pinKeyHandler(pins[i]);
  pins[i].setAttribute('aria', 'button');
  pins[i].setAttribute('aria-pressed', 'false');
  pins[i].tabIndex = 1;
}

// Ожидание клика на закрытие
closer.addEventListener('click', function (event) {
  closeInfoWindow(event);
});

// Ожидание нажатия Enter или Escape на закрытие
closer.addEventListener('keydown', function (event) {
  if (isEnter(event) || isEscape(event)) {
    closeInfoWindow(event);
  }
});

// Валидация
formTitle.required = true;
formTitle.minLength = 30;
formTitle.maxLength = 100;

formPrice.required = true;
formPrice.min = 1000;
formPrice.max = 1000000;

formAddress.required = true;

// Синхронизация времени въезда - выезда
formCheckIn.addEventListener('change', function () {
  formCheckOut.selectedIndex = formCheckIn.selectedIndex;
});

formCheckOut.addEventListener('change', function () {
  formCheckIn.selectedIndex = formCheckOut.selectedIndex;
});

// Синхронизация типа жилья и минмальных значений цены
formType.addEventListener('change', function () {
  switch (formType.value) {
    case 'sm':
      formPrice.min = 0;
      break;
    case 'lg':
      formPrice.min = 10000;
      break;
    default:
      formPrice.min = 1000;
  }
});

// Синхронизация количества комнат и гостей
syncRooms();

formGuests.addEventListener('change', function () {
  syncRooms();
});

formRooms.addEventListener('change', function () {
  syncGuests();
});
