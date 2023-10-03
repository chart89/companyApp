const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  client: { type: String, required: true }
});

module.exports = mongoose.model('Product', departmentSchema);