import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = props => {
  const { setAlert } = useContext(AlertContext);
  const { resgister, error, isAuthenticated, clearError } = useContext(
    AuthContext
  );
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  useEffect(() => {
    if (error) {
      setAlert('danger', error);
      clearError();
    }
    if (isAuthenticated) {
      props.history.push('/');
    }
    //eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const { name, email, password, password2 } = user;

  const onChange = ({ target }) =>
    setUser({ ...user, [target.name]: target.value });

  const onSubmit = e => {
    e.preventDefault();
    console.log('onsubmit register');
    if (name === '' || email === '' || password === '') {
      setAlert('danger', 'Please enter all fields');
    } else if (password !== password2) {
      setAlert('danger', 'Password do not match');
    } else {
      resgister(user);
    }
  };

  return (
    <div className="form-container" onSubmit={onSubmit}>
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" value={name} name="name" onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="text" value={email} name="email" onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            name="password"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password </label>
          <input
            type="password"
            value={password2}
            name="password2"
            onChange={onChange}
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Register;
