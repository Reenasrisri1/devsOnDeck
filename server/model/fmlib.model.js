const mongoose = require('mongoose');


const FrameworkLibSchema = new mongoose.Schema(
  {
    frameworklib: {
      type: String,
    },
    quote: {
      type: String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Fmlib', FrameworkLibSchema);
