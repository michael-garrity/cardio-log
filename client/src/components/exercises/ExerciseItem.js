import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import ExerciseContext from '../../context/exercise/exerciseContext';
import moment from 'moment';

const ExerciseItem = ({ exercise }) => {
  const exerciseContext = useContext(ExerciseContext);
  const { deleteExercise, setCurrent, clearCurrent } = exerciseContext;

  const {
    _id,
    description,
    distance,
    hours,
    minutes,
    seconds,
    date
  } = exercise;

  const onDelete = () => {
    deleteExercise(_id);
    clearCurrent();
  };

  var totalMinutes = hours * 60 + minutes + seconds / 60,
    pace = totalMinutes / distance,
    paceMinutes = Math.floor(pace),
    paceSeconds = Math.round((pace - paceMinutes) * 60);

  if (paceSeconds < 10) {
    paceSeconds = '0' + paceSeconds;
  }

  return (
    <div className='card bg-item'>
      <h3 className='text-primary text-left'>{description} </h3>
      <span>Date Posted: </span> {moment(date).format('MMMM Do YYYY, h:mm a')}
      <div className='card-2'>
        <ul className='list'>
          {distance && (
            <li>
              <i className='fas fa-road' />
              <span> Distance: </span> {distance}mi
            </li>
          )}
          {
            <li>
              <i className='far fa-clock' />
              <span> Duration: </span>
              {hours && <span>{hours}hr </span>}{' '}
              {minutes && <span>{minutes}min </span>}{' '}
              {seconds && <span>{seconds}sec</span>}
            </li>
          }
          <li>
            <i className='fas fa-stopwatch' />
            <span>
              {' '}
              Pace: {paceMinutes}:{paceSeconds} min/mi
            </span>
          </li>
        </ul>
      </div>
      <p>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => setCurrent(exercise)}
        >
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

ExerciseItem.propTypes = {
  exercise: PropTypes.object.isRequired
};

export default ExerciseItem;
