;(function (window, document, undefined) {

    'use strict';

    var participant = io();

    participant.on('connect', function () {

        participant.on('present', function (data) {
            document.querySelector('input[data-day="' + data.day + '"]').checked = data.present;
        });

    });

    $('.days').find('input').on('change', function (e) {
        var email = this.dataset.participant;
        var day = this.dataset.day;
        var present = this.checked;

        participant.emit('present', {
            email: email,
            day: day,
            present: present
        });
    });

    $('#search').on('keyup', function (e) {
        var search = e.target.value.toLowerCase();
        var $rows = $('tbody tr');
        $rows.hide();
        var result = $rows.filter(function(index, tr) {
            var columns = tr.querySelectorAll('td');
            for (var i = 0; i <= 2; i++) {
                if (columns[i].innerHTML.toLowerCase().indexOf(search) !== -1) return true;
            }
        });
        $(result).show();
    });

})(window, document);
