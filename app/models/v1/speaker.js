/*jslint node: true */

'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Speaker = new Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    email: {
        type: String,
        default: ''
    },
    talk: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    minutes: {
        type: Number,
        default: 50
    },
    year: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Speaker', Speaker);