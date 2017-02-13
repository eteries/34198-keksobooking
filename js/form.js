'use strict';


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

// Нажали Enter?
window.isEnter = function (event) {
  return event.keyCode && event.keyCode === keys.ENTER;
};

// Нажали Escape?
window.isEscape = function (event) {
  return event.keyCode && event.keyCode === keys.ESCAPE;
};

// Валидация
formTitle.required = true;
formTitle.minLength = 30;
formTitle.maxLength = 100;

formPrice.required = true;
formPrice.min = 1000;
formPrice.max = 1000000;

formAddress.required = true;

// Синхронизировать комнаты по гостям
var syncRooms = window.synchronizeFields(formGuests, formRooms, ['3', '0'], ['2', '1'], 'value');
// Синхронизировать гостей по комнатам
var syncGuests = window.synchronizeFields(formRooms, formGuests, ['1', '2', '100'], ['0', '3', '3'], 'value');

// Синхронизация времени въезда - выезда
formCheckIn.addEventListener('change', function () {
  window.synchronizeFields(formCheckIn, formCheckOut, ['12', '13', '14'], ['12', '13', '14'], 'value')();
});

formCheckOut.addEventListener('change', function () {
  window.synchronizeFields(formCheckOut, formCheckIn, ['12', '13', '14'], ['12', '13', '14'], 'value')();
});

// Синхронизация типа жилья и минмальных значений цены
formType.addEventListener('change', function () {
  window.synchronizeFields(formType, formPrice, ['sm', 'md', 'lg'], ['0', '1000', '10000'], 'min')();
});

// Синхронизация количества комнат и гостей
syncRooms();

formGuests.addEventListener('change', function () {
  syncRooms();
});

formRooms.addEventListener('change', function () {
  syncGuests();
});
