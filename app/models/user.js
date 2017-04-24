const crypto = require('crypto');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  hashed_password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

UserSchema
  .virtual('userId')
  .get(function get() {
    return this.id;
  });

UserSchema
  .virtual('password')
  .set(function set(password) {
    this._plain_password = password;
    this.salt = crypto.randomBytes(32).toString('base64');
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function get() {
    return this._plain_password;
  });

UserSchema.methods.encryptPassword = function encryptPassword(password) {
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

UserSchema.methods.verifyPassword = function verifyPassword(password) {
  return this.encryptPassword(password) === this.hashed_password;
};

module.exports = mongoose.model('User', UserSchema);
