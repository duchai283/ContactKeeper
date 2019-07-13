import React, { useState, useEffect, useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Login = props => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const { setAlert } = useContext(AlertContext);
  const { login, error, isAuthenticated, clearError } = useContext(AuthContext);

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

  const onChange = ({ target }) =>
    setUser({ ...user, [target.name]: target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('danger', 'Please enter all fields');
    } else {
      login(user);
    }
  };

  const { email, password } = user;

  return (
    <div className="form-container" onSubmit={onSubmit}>
      <h1>
        Account <span className="text-secondary">Login</span>
      </h1>
      <form>
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
        <input
          type="submit"
          value="Login"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Login;
