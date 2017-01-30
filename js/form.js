'use strict';

var pins = document.querySelectorAll('.pin');
var pinsNum = pins.length;
var infoWindow = document.querySelector('.dialog');

// Открытие
for (var i = 0; i < pinsNum; i++) {
  pins[i].addEventListener('click', function (event) {
    clearActive();
    event.currentTarget.classList.add('pin--active');
    infoWindow.style.display = 'block';
  });
}

// Закрытие
var closer = document.querySelector('.dialog__close');

closer.addEventListener('click', function (event) {
  event.preventDefault();
  infoWindow.style.display = 'none';
  clearActive();
});

// Деактивация активного класса
function clearActive() {
  var activePin = document.querySelector('.pin--active');
  if (activePin) {
    activePin.classList.remove('pin--active');
  }
}

// валидация
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
  switch (formType.options[formType.selectedIndex].value) {
    case 'sm':
      formPrice.min = 0;
      break;
    case 'lg':
      formPrice.min = 1000000;
      break;
    default:
      formPrice.min = 1000;
  }
});

// синхронизация количества комнат и гостей
var formRooms = form.querySelector('#room_number');
var formGuests = form.querySelector('#capacity');

formGuests.selectedIndex = 1;

formRooms.addEventListener('change', function () {
  switch (formRooms.options[formRooms.selectedIndex].value) {
    case '1':
      formGuests.selectedIndex = 1;
      break;
    case '2':
    case '100':
      formGuests.selectedIndex = 0;
  }
});
