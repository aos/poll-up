const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const UserSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    trime: true,
    required: 'Please supply an email address'
  },
  name: {
    type: String,
    required: 'Please supply a name',
    trime: true
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date
})
