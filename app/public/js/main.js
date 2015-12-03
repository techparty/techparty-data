;(function (window, document, undefined) {

    'use strict';

    var main = (function () {

        var _tableDelete = function () {
            var links = document.querySelectorAll('.ajax');
            [].forEach.call(links, function (link) {
                link.addEventListener('click', function (e) {
                    e.preventDefault();

                    var that = this;
                    var url = that.getAttribute('action') || that.getAttribute('href');
                    var type = (that.getAttribute('method') || that.dataset.method || 'GET').toUpperCase();

                    $.ajax({
                        url: url,
                        type: type,
                        success: function (data) {
                            switch (type) {
                                case 'POST':
                                    alert('Successfully created');
                                    break;
                                case 'PUT':
                                    alert('Successfully updated');
                                    break;
                                case 'DELETE':
                                    alert('Successfully removed');
                                    $(that).parents('tr').hide();
                                    break;
                            }
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