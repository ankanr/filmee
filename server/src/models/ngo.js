const mongoose = require('mongoose');

const ngoSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cause: {
    type: [String],
  },
  beneficaries: {
    type: [String],
  },
  location: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
});

const NGO = mongoose.model('NGO', ngoSchema);

module.exports = NGO;
