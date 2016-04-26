;(function (window, document, undefined) {

    'use strict';

    var main = (function () {

        var _confirmDelete = function (value) {
            var message = 'Are you sure?';
            if (value) message += ' ' + value;
            return confirm(message);
        };

        var _eventSubmitForm = function () {
          $('.form-submit').on('submit', function (e) {
            e.preventDefault();

            var that = this;
            var url = that.getAttribute('action');
            var method = that.getAttribute('method');

            var data = $(that).serialize();

            $.post(url, data)
                .done(function () {
                    that.reset();
                    alert('Successfully saved');
                })
                .fail(function (err) {
                    alert('Oops... Please try again.');
                    console.log(err.responseJSON);
                });
          });
        };

        return {

            init : function () {
                _eventSubmitForm();
            },

            confirmDelete : _confirmDelete

        }

    })();

    main.init();

    window.main = main;

})(window, document);
