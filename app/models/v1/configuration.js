/*jslint node: true */

'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Configuration = new Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    value: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Configuration', Configuration);