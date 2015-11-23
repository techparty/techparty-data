/*jslint node: true */

'use strict';

exports.response = function (next, err) {
    if (err.name !== 'ValidationError') {
        console.error('Internal error (500): ', err);
        var error = new Error('Server error');
        error.status = 500;
        return next(error);
    }

    var errors = [];
    for (var key in err.errors) {
        errors.push(err.errors[key].message);
    }
    console.error('Internal error (400): ', err);
    var error = new Error(errors.join('<br>'));
    error.status = 400;
    return next(error);
};