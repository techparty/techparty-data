;(function () {

  'use strict';

  var SignIn = (function () {

    var _enableForm = function () {
      document.querySelector('#reset').style.display = 'block';
    };

    var _eventClickOpenReset = function () {
      var link = document.querySelector('#open-reset');
      link.addEventListener('click', function (e) {
        e.preventDefault();
        _enableForm();
      });
    };

    return {
      init: function () {
        _eventClickOpenReset();
      },
    }

  })();

  SignIn.init();

})();
