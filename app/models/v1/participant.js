/*jslint node: true */

'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Participant = new Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    email: {
        type: String,
        default: ''
    },
    year: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Participant', Participant);