import axios from 'axios';
import React, { useReducer } from 'react';
import {
  ADD_EXERCISE,
  CLEAR_EXERCISES,
  CLEAR_CURRENT,
  CLEAR_FILTER,
  EXERCISE_ERROR,
  DELETE_EXERCISE,
  FILTER_EXERCISES,
  GET_EXERCISES,
  SET_CURRENT,
  UPDATE_EXERCISE,
  SET_DATE
} from '../types';
import ExerciseContext from './exerciseContext';
import exerciseReducer from './exerciseReducer';

const ExerciseState = props => {
  const initialState = {
    exercises: null,
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(exerciseReducer, initialState);

  // ACTIONS

  // get exercises
  const getExercises = async () => {
    try {
      const res = await axios.get('/api/exercises');

      dispatch({
        type: GET_EXERCISES,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: EXERCISE_ERROR,
        payload: err.response.msg
      });
    }
  };

  // add exercise
  const addExercise = async exercise => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/exercises', exercise, config);

      dispatch({
        type: ADD_EXERCISE,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: EXERCISE_ERROR,
        payload: err.response.msg
      });
    }
  };

  // delete exercise
  const deleteExercise = async id => {
    try {
      await axios.delete(`/api/exercises/${id}`);

      dispatch({
        type: DELETE_EXERCISE,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: EXERCISE_ERROR,
        payload: err.response.msg
      });
    }
  };

  // update exercise
  const updateExercise = async exercise => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(
        `/api/exercises/${exercise._id}`,
        exercise,
        config
      );

      dispatch({
        type: UPDATE_EXERCISE,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: EXERCISE_ERROR,
        payload: err.response.msg
      });
    }
  };

  // clear exercises
  const clearExercises = () => {
    dispatch({ type: CLEAR_EXERCISES });
  };

  // set current exercise
  const setCurrent = exercise => {
    dispatch({ type: SET_CURRENT, payload: exercise });
  };

  // clear current exercise
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // filter exercises
  const filterExercises = text => {
    dispatch({ type: FILTER_EXERCISES, payload: text });
  };

  // clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ExerciseContext.Provider
      value={{
        exercises: state.exercises,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addExercise,
        deleteExercise,
        setCurrent,
        clearCurrent,
        updateExercise,
        filterExercises,
        clearFilter,
        getExercises,
        clearExercises
      }}
    >
      {props.children}
    </ExerciseContext.Provider>
  );
};

export default ExerciseState;
