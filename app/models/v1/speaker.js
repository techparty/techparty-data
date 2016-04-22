'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Speaker = new Schema({
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