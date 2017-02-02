'use strict';

var pins = document.querySelectorAll('.pin');
var pinsNum = pins.length;
var infoWindow = document.querySelector('.dialog');


// Открытие
for (var i = 0; i < pinsNum; i++) {
  pinClickHandler(pins[i]);
}

function pinClickHandler(pin) {
  pin.addEventListener('click', function () {
    var activePin = document.querySelector('.pin--active');
    clearActive(activePin);
    pin.classList.add('pin--active');
    infoWindow.style.display = 'block';
  });
}

// Закрытие
var closer = document.querySelector('.dialog__close');

closer.addEventListener('click', function (event) {
  event.preventDefault();
  infoWindow.style.display = 'none';
  var activePin = document.querySelector('.pin--active');
  clearActive(activePin);
});

// Деактивация активного класса
function clearActive(pin) {
  if (pin) {
    pin.classList.remove('pin--active');
  }
}


// Валидация
var form = document.querySelector('.notice__form');
var formTitle = form.querySelector('#title');
var formPrice = form.querySelector('#price');
var formAddress = form.querySelector('#address');

formTitle.required = true;
formTitle.minLength = 30;
formTitle.maxLength = 100;

formPrice.required = true;
formPrice.min = 1000;
formPrice.max = 1000000;

formAddress.required = true;

// синхронизация времени въезда - выезда
var formCheckIn = form.querySelector('#time');
var formCheckOut = form.querySelector('#timeout');

formCheckIn.addEventListener('change', function () {
  formCheckOut.selectedIndex = formCheckIn.selectedIndex;
});

formCheckOut.addEventListener('change', function () {
  formCheckIn.selectedIndex = formCheckOut.selectedIndex;
});

// синхронизация типа жилья и минмальных значений цены
var formType = form.querySelector('#type');

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

// синхронизация количества комнат и гостей
var formRooms = form.querySelector('#room_number');
var formGuests = form.querySelector('#capacity');

syncGuests();

formGuests.addEventListener('change', function () {
  syncGuests();
});

formRooms.addEventListener('change', function () {
  syncRooms();
});

function syncGuests() {
  formRooms.selectedIndex = (formGuests.selectedIndex === 0) ? 1 : 0;
}

function syncRooms() {
  formGuests.selectedIndex = (formRooms.value === '1') ? 1 : 0;
}
