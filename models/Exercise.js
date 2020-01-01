const mongoose = require('mongoose');

const ExerciseSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  description: {
    type: String,
    required: true
  },
  distance: {
    type: Number,
    required: true
  },
  hours: {
    type: Number
    // required: true
  },
  minutes: {
    type: Number
    // required: true
  },
  seconds: {
    type: Number
    // required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('exercise', ExerciseSchema);
