const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    course: {
      type: String,
      trim: true,
      maxlength: 100,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Student', studentSchema);
