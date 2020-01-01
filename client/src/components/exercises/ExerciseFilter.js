import React, { useContext, useEffect, useRef } from 'react';
import ExerciseContext from '../../context/exercise/exerciseContext';

const ExerciseFilter = () => {
  const exerciseContext = useContext(ExerciseContext);
  const text = useRef('');

  const { filterExercises, clearFilter, filtered } = exerciseContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = e => {
    if (text.current.value !== '') {
      filterExercises(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type='text'
        placeholder='Filter Exercises...'
        onChange={onChange}
      />
    </form>
  );
};

export default ExerciseFilter;
