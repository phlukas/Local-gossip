const mongoose = require('mongoose');

var testSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
});

module.exports = mongoose.model('TestModel', testSchema);
