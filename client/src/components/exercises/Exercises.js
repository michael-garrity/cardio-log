import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ExerciseContext from '../../context/exercise/exerciseContext';
import Spinner from '../layout/Spinner';
import ExerciseItem from './ExerciseItem';

const Exercises = () => {
  const exerciseContext = useContext(ExerciseContext);

  const { exercises, filtered, getExercises, loading } = exerciseContext;

  useEffect(() => {
    getExercises();
    // eslint-disable-next-line
  }, []);

  if (exercises !== null && exercises.length === 0 && !loading) {
    return <h4>Please add a exercise</h4>;
  }

  return (
    <Fragment>
      {exercises !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map(exercise => (
                <CSSTransition
                  key={exercise._id}
                  timeout={500}
                  classNames='item'
                >
                  <ExerciseItem exercise={exercise} />
                </CSSTransition>
              ))
            : exercises.map(exercise => (
                <CSSTransition
                  key={exercise._id}
                  timeout={500}
                  classNames='item'
                >
                  <ExerciseItem exercise={exercise} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Exercises;
