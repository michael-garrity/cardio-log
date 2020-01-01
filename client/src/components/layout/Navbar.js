import PropTypes from 'prop-types';
import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ExerciseContext from '../../context/exercise/exerciseContext';

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const exerciseContext = useContext(ExerciseContext);

  const { isAuthenticated, logout, user } = authContext;
  const { clearExercises } = exerciseContext;

  const onLogout = () => {
    logout();
    clearExercises();
  };

  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <li>
        <a onClick={onLogout} href='#!'>
          <i className='fas fa-sign-out-alt'></i>
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div className='navbar bg-primary'>
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};

Navbar.defaultProps = {
  title: 'Cardio Log',
  icon: 'fas fa-running'
};

export default Navbar;
