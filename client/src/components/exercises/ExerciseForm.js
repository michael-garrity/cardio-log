import React, { useContext, useEffect, useState } from 'react';
import ExerciseContext from '../../context/exercise/exerciseContext';
import moment from 'moment';

const ExerciseForm = () => {
  const exerciseContext = useContext(ExerciseContext);

  const {
    addExercise,
    updateExercise,
    clearCurrent,
    current
  } = exerciseContext;

  useEffect(() => {
    if (current !== null) {
      setExercise(current);
    } else {
      setExercise({
        description: '',
        distance: '',
        hours: '',
        minutes: '',
        seconds: ''
      });
    }
  }, [exerciseContext, current]);

  const [exercise, setExercise] = useState({
    description: '',
    distance: '',
    hours: '',
    minutes: '',
    seconds: ''
  });

  const { description, distance, hours, minutes, seconds } = exercise;

  const onChange = e =>
    setExercise({ ...exercise, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addExercise(exercise);
    } else {
      updateExercise(exercise);
    }
    setExercise({
      description: '',
      distance: '',
      hours: '',
      minutes: '',
      seconds: ''
    });
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? 'Edit Exercise' : 'Add Exercise'}
      </h2>
      <input
        type='text'
        placeholder='Description'
        name='description'
        value={description}
        onChange={onChange}
        className='description'
      />
      <input
        type='text'
        placeholder='Distance(miles)'
        name='distance'
        value={distance}
        onChange={onChange}
        className='distance'
      />
      <div className='duration-form-group'>
        <input
          type='text'
          placeholder='Hour(s)'
          name='hours'
          value={hours}
          onChange={onChange}
        />
        <input
          type='text'
          placeholder='Minute(s)'
          name='minutes'
          value={minutes}
          onChange={onChange}
        />
        <input
          type='text'
          placeholder='Second(s)'
          name='seconds'
          value={seconds}
          onChange={onChange}
        />
      </div>
      {/* <h5>Contact Type</h5>
      <input
        type='radio'
        name='type'
        value='personal'
        checked={type === 'personal'}
        onChange={onChange}
      />{' '}
      Personal{' '}
      <input
        type='radio'
        name='type'
        value='professional'
        checked={type === 'professional'}
        onChange={onChange}
      />{' '}
      Professional{' '} */}
      <div>
        <input
          type='submit'
          value={current ? 'Update Exercise' : 'Add Exercise'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ExerciseForm;
