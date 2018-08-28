let mongoose = require('../db');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
  email: String,
  password_hash: String,
  api_token: String
});

module.exports = mongoose.model('User', UserSchema);