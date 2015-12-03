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

})(window, document);