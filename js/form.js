'use strict';

(function () {

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
    window.synchronizeFields(formCheckIn, ['12', '13', '14'], ['12', '13', '14'], function (newValue) {
      formCheckOut.value = newValue;
    });
  });

  formCheckOut.addEventListener('change', function () {
    window.synchronizeFields(formCheckOut, ['12', '13', '14'], ['12', '13', '14'], function (newValue) {
      formCheckIn.value = newValue;
    });
  });

  // Синхронизация типа жилья и минимальных значений цены
  formType.addEventListener('change', function () {
    window.synchronizeFields(formType, ['sm', 'md', 'lg'], ['0', '1000', '10000'], function (newValue) {
      formPrice.min = newValue;
    });
  });

  // Синхронизация количества комнат и гостей
  window.synchronizeFields(formGuests, ['3', '0'], ['2', '1'], function (newValue) {
    formRooms.value = newValue;
  });

  formGuests.addEventListener('change', function () {
    window.synchronizeFields(formGuests, ['3', '0'], ['2', '1'], function (newValue) {
      formRooms.value = newValue;
    });
  });

  formRooms.addEventListener('change', function () {
    window.synchronizeFields(formRooms, ['1', '2', '100'], ['0', '3', '3'], function (newValue) {
      formGuests.value = newValue;
    });
  });

})();
