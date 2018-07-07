const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emailContainsExactlyOneAtSign = email =>
  email.split('').reduce((acc, curr) => (curr === '@' ? ++acc : acc), 0) === 1;

const emailValidator = {
  validator: emailContainsExactlyOneAtSign,
  message: 'Email address must contain exactly one @ character',
};

const UserSchema = Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: emailValidator,
  },
  password: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: new Date(),
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('User', UserSchema);
