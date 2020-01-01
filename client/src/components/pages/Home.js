import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import ExerciseFilter from '../exercises/ExerciseFilter';
import ExerciseForm from '../exercises/ExerciseForm';
import Exercises from '../exercises/Exercises';

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div>
        <ExerciseForm />
      </div>
      <div>
        <ExerciseFilter />
        <Exercises />
      </div>
    </div>
  );
};

export default Home;
