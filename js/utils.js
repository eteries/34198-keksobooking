'use strict';

window.utils = (function () {

  var keys = {ENTER: 13, ESCAPE: 27};

  var declineWords = function (number, case1, case2, case5) {
    number %= 100;
    if (number >= 5 && number <= 20) {
      return case5;
    }
    number %= 10;
    if (number === 1) {
      return case1;
    }
    if (number >= 2 && number <= 4) {
      return case2;
    }
    return case5;
  };

  return {
    // Нажали Enter?
    isEnter: function (event) {
      return event.keyCode && event.keyCode === keys.ENTER;
    },
    // Нажали Escape?
    isEscape: function (event) {
      return event.keyCode && event.keyCode === keys.ESCAPE;
    },
    // Склонять слова
    declineWords: declineWords
  };

})();
