;(function (window, document, undefined) {

    'use strict';

    var main = (function () {

        var _tableDelete = function () {
            var links = document.querySelectorAll('.table-delete .delete');
            [].forEach.call(links, function (link) {
                
                link.addEventListener('click', function (e) {
                    e.preventDefault();

                    var that = this;
                    var uri = that.getAttribute('href');

                    $.ajax({
                        url: uri,
                        type: 'DELETE',
                        success: function (data) {
                            alert('Successfully removed');
                            $(that).parents('tr').hide();
                        },
                        error: function (data) {
                            alert('Oops... Please try again.');
                        }
                    });
                });

            });
        };

        return { 

            init : function () {
                _tableDelete();
            }

        }

    })();

    main.init();

})(window, document);