'use strict';

window.showCard = (function () {

  var infoWindow = document.querySelector('.dialog');
  var closer = document.querySelector('.dialog__close');
  var onClose;

  // Закрыть диалог
  var closeInfoWindow = function (event, cb) {
    event.preventDefault();
    infoWindow.style.display = 'none';
    infoWindow.setAttribute('aria-hidden', 'true');
    document.removeEventListener('keydown', infoWindowKeyDownHandler);
    if (typeof onClose === 'function') {
      onClose();
    }
  };

  // Закрывать по Escape
  var infoWindowKeyDownHandler = function (event) {
    if (window.utils.isEscape(event)) {
      closeInfoWindow(event);
    }
  };

  // Заполнить карточку соотвествующими данными
  var fillCard = function (data) {
    infoWindow.querySelector('.lodge__title').innerText = data.offer.title;
    infoWindow.querySelector('.lodge__address').innerText = data.offer.address;
    infoWindow.querySelector('.lodge__price').innerText = data.offer.price + '₽/ночь';
    infoWindow.querySelector('.lodge__description').innerText = data.offer.description;
    infoWindow.querySelector('.dialog__title img').src = data.author.avatar;

    var roomWord = window.utils.declineWords(data.offer.rooms, 'комната', 'комнаты', 'комнат');
    var guestWord = window.utils.declineWords(data.offer.guests, 'гостя', 'гостей', 'гостей');
    var text = 'Не для гостей';
    if (data.offer.guests > 0) {
      text = data.offer.rooms + ' ' + roomWord + ' для ' +
        data.offer.guests + ' ' + guestWord;
    }
    infoWindow.querySelector('.lodge__rooms-and-guests').innerText = text;

    if (data.offer.type === 'flat') {
      infoWindow.querySelector('.lodge__type').innerText = 'Квартира';
    } else if (data.offer.type === 'bungalo') {
      infoWindow.querySelector('.lodge__type').innerText = 'Лачуга';
    } else if (data.offer.type === 'house') {
      infoWindow.querySelector('.lodge__type').innerText = 'Дворец';
    }

    switch (data.offer.type) {
      case 'flat':
        infoWindow.querySelector('.lodge__type').innerText = 'Квартира';
        break;
      case 'bungalo':
        infoWindow.querySelector('.lodge__type').innerText = 'Лачуга';
        break;
      case 'house':
        infoWindow.querySelector('.lodge__type').innerText = 'Дворец';
    }

    infoWindow.querySelector('.lodge__checkin-time').innerText = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;

    var featuresList = '';
    data.offer.features.forEach(function (feature) {
      featuresList += '<span class="feature__image  feature__image--' + feature + '"></span>';
    });
    infoWindow.querySelector('.lodge__features').innerHTML = featuresList;

    var imagesList = '';
    data.offer.photos.forEach(function (image, index) {
      imagesList += '<img src="' + image + '" alt="Фото ' + index + '" width="52" height="42"> ';
    });
    infoWindow.querySelector('.lodge__photos').innerHTML = imagesList;
  };

  // Ожидание клика на закрытие
  closer.addEventListener('click', function (event) {
    closeInfoWindow(event);
  });

  // Ожидание нажатия Enter или Escape на закрытие
  closer.addEventListener('keydown', function (event) {
    if (window.utils.isEnter(event) || window.utils.isEscape(event)) {
      closeInfoWindow(event);
    }
  });

  // Возврат функции для выполнения действий при открытии и приёма колбэка
  return function (data, cb) {
    fillCard(data);
    infoWindow.style.display = 'block';
    infoWindow.setAttribute('aria-hidden', 'false');
    document.addEventListener('keydown', infoWindowKeyDownHandler);
    onClose = cb;
  };

})();
