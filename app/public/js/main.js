;(function (window, document, undefined) {

    'use strict';

    var main = (function () {

        var _confirmDelete = function () {
            if (confirm('Are you sure?')) {
                return true;
            } else {
                return false;
            }
        };

        return { 

            confirmDelete : _confirmDelete

        }

    })();

    window.main = main;

})(window, document);