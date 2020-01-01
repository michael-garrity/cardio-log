const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Exercise = require('../models/Exercise');

// @route     GET api/exercise
// @desc      Get all users exercises
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const exercises = await Exercise.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(exercises);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/exercises
// @desc      Add new exercise
// @access    Private
router.post(
  '/',
  [
    auth,
    [
      check('description', 'Description is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { description, distance, hours, minutes, seconds } = req.body;

    try {
      const newExercise = new Exercise({
        description,
        distance,
        hours,
        minutes,
        seconds,
        user: req.user.id
      });

      const exercise = await newExercise.save();

      res.json(exercise);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route     PUT api/exercises/:id
// @desc      Update exercise
// @access    Private
router.put('/:id', auth, async (req, res) => {
  const { description, distance, hours, minutes, seconds } = req.body;

  // build exercise object
  const exerciseFields = {};
  if (description) exerciseFields.description = description;
  if (distance) exerciseFields.distance = distance;
  if (hours) exerciseFields.hours = hours;
  if (minutes) exerciseFields.minutes = minutes;
  if (seconds) exerciseFields.seconds = seconds;

  try {
    let exercise = await Exercise.findById(req.params.id);

    if (!exercise) return res.status(404).json({ msg: 'Exercise not found' });

    // make sure user owns exercise
    if (exercise.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    exercise = await Exercise.findByIdAndUpdate(
      req.params.id,
      { $set: exerciseFields },
      { new: true }
    );

    res.json(exercise);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     DELETE api/exercises/:id
// @desc      Delete exercise
// @access    Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let exercise = await Exercise.findById(req.params.id);

    if (!exercise) return res.status(404).json({ msg: 'Exercise not found' });

    // make sure user owns exercise
    if (exercise.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Exercise.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Exercise removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
