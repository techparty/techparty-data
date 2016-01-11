/*jslint node: true */

'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DaySchema = new Schema({
    name : {
        type: Number,
        required: true
    },
    present: {
        type: Boolean,
        default: false
    }
})

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
    cpf: {
        type: String,
        validate: {
          validator: function(v) {
            if (!v) { return true; }
            return /[0-9]{11}/.test(v);
          },
          message: '{VALUE} is not a valid'
        },
        default: ''
    },
    year: {
        type: Number,
        required: true
    },
    days: [DaySchema],
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Participant', Participant);