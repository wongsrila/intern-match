const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    study: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    interests: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const account = mongoose.model('account', accountSchema);
module.exports = account;
