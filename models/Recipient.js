const { Schema } = require('mongoose');

const recipientSchema = Schema({
  email: String,
  responded: {
    type: Boolean,
    default: false,
  },
});

module.exports = recipientSchema;
