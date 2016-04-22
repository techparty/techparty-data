'use strict';

const log = require('winston');

module.exports = {

    response : (next, err) => {
        if (err.name !== 'ValidationError') {
            log.error('Internal error (500): ', err);
            let error = new Error('Server error');
            error.status = 500;
            return next(error);
        }

        let errors = [];
        for (let key in err.errors) {
            errors.push(err.errors[key].message);
        }
        log.error('Internal error (400): ', err);
        let error = new Error(errors.join('<br>'));
        error.status = 400;
        return next(error);
    }

};