/*
 
 * This script is the user model
 * It creates database model for the user information

*/

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); // so that you can use email only once

const userSchema = mongoose.Schema({
  userId: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator); //will check above before validating to database

module.exports = mongoose.model('User', userSchema);