const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  googleId: String,
});

model('User', userSchema);
