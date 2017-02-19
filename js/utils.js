'use strict';

window.utils = (function () {

  var keys = {ENTER: 13, ESCAPE: 27};

  return {
    // Нажали Enter?
    isEnter: function (event) {
      return event.keyCode && event.keyCode === keys.ENTER;
    },
    // Нажали Escape?
    isEscape: function (event) {
      return event.keyCode && event.keyCode === keys.ESCAPE;
    }
  };

})();
