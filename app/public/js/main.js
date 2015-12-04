;(function (window, document, undefined) {

    'use strict';

    var main = (function () {

        var _confirmDelete = function () {
            return confirm('Are you sure?');
        };

        return { 

            confirmDelete : _confirmDelete

        }

    })();

    window.main = main;

})(window, document);