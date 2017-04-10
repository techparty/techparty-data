const mongoose = require('mongoose');
const cpf = require('cpf');

const Schema = mongoose.Schema;

const DaySchema = new Schema({
  name: {
    type: Number,
    required: true,
  },
  present: {
    type: Boolean,
    default: false,
  },
});

const ParticipantSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  days: [DaySchema],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

ParticipantSchema
  .path('cpf')
  .set(value => value.replace(/\D+/g, ''))
  .validate(value => cpf.validate(value), 'Invalid CPF');

module.exports = mongoose.model('Participant', ParticipantSchema);
