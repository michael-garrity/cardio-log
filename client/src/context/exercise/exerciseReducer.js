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

export default (state, action) => {
  switch (action.type) {
    case GET_EXERCISES:
      return {
        ...state,
        exercises: action.payload,
        loading: false
      };
    case ADD_EXERCISE:
      return {
        ...state,
        exercises: [action.payload, ...state.exercises],
        loading: false
      };
    case UPDATE_EXERCISE:
      return {
        ...state,
        exercises: state.exercises.map(exercise =>
          exercise._id === action.payload._id ? action.payload : exercise
        ),
        loading: false
      };
    case DELETE_EXERCISE:
      return {
        ...state,
        exercises: state.exercises.filter(
          exercise => exercise._id !== action.payload
        ),
        loading: false
      };
    case CLEAR_EXERCISES:
      return {
        ...state,
        exercises: null,
        filtered: null,
        error: null,
        current: null
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case FILTER_EXERCISES:
      return {
        ...state,
        filtered: state.exercises.filter(exercise => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return exercise.description.match(regex);
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    case EXERCISE_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
