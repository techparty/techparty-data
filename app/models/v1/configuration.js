'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Configuration = new Schema({
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