const mongoose = require('mongoose');
const randomToken = require('random-token');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, index: true },
  email: { type: String, required: true },
  displayName: { type: String, required: true, default: this.username },
  authToken: { type: String, required: true, default: randomToken(16) },
});

module.exports = mongoose.model('User', userSchema);
