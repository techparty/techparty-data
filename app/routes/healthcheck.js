/*jslint node: true */

'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    return res.status(200).json({ status : 'OK' })
});

module.exports = router;
