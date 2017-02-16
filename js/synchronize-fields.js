'use strict';

window.synchronizeFields = (function () {
  return function (elementFrom, arrayFrom, arrayTo, cb) {
    var selectedIndex = arrayFrom.indexOf(elementFrom.value);
    var setField = cb;
    var newValue = arrayTo[selectedIndex];
    if (typeof setField === 'function') {
      setField(newValue);
    }
  };
})();
