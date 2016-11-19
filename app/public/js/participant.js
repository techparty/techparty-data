;(function (window, document, undefined) {

  'use strict';

  const socket = io();

  socket.on('connect', function () {
    socket.on('present', function (data) {
      document.getElementById(data.day).checked = data.present;
    });
  });

  $('.days').find('input').on('change', function (e) {
    const data = this.dataset;
    const cpf = data.cpf;
    const day = data.day;
    const year = data.year;
    const present = this.checked;
    socket.emit('present', { cpf, day, year, present });
  });

  $('#search').on('keyup', function (e) {
    let search = e.target.value.toLowerCase();
    let $rows = $('tbody tr');
    $rows.hide();
    let result = $rows.filter(function(index, tr) {
      let columns = tr.querySelectorAll('td');
      for (let i = 0; i <= 2; i++) {
        if (columns[i].innerHTML.toLowerCase().indexOf(search) !== -1) return true;
      }
    });
    $(result).show();
  });

})(window, document);
