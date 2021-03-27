const mongoose = require('mongoose');

const PositionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Position name is required'],
      minlength: [3, 'Position name must be atleast 3 characters or longer'],
    },
    description: {
      type: String,
      required: [true, 'Position description is required'],
      minlength: [2, 'Position description must be atleast 2 characters or longer'],
    },
    skills: {
      type: Array,
      default: [],
    },
    org_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: [true, 'org id is required']
    }
  },
  { timestamps: true }
);
  
module.exports = mongoose.model('Position', PositionSchema);
