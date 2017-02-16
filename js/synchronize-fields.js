'use strict';

window.synchronizeFields = (function () {
  return function (elementFrom, elementTo, arrayFrom, arrayTo, attr) {
    var selectedIndex = arrayFrom.indexOf(elementFrom.value);
    elementTo[attr] = arrayTo[selectedIndex];
  };
})();
