'use strict';

// Пины и диалог
var map = document.querySelector('.tokyo__pin-map');
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
  if (isEscape(event)) {
    closeInfoWindow(event);
  }
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
  if (pin && isEnter(event)) {
    setActive(pin);
  }
});

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
  formCheckOut.value = formCheckIn.value;
});

formCheckOut.addEventListener('change', function () {
  formCheckIn.value = formCheckOut.value;
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
