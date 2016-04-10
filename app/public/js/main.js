;(function (window, document, undefined) {

    'use strict';

    var main = (function () {

        var _confirmDelete = function (value) {
            var message = 'Are you sure?';
            if (value) message += ' ' + value;
            return confirm(message);
        };

        return {

            confirmDelete : _confirmDelete

        }

    })();

    window.main = main;

})(window, document);
