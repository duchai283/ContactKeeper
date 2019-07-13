import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import uuid from 'uuid';
import { REMOVE_ALER, SET_ALERT } from '../types';

const AlertState = props => {
  const initalState = [];

  const [state, dispatch] = useReducer(AlertReducer, initalState);

  // Set alert
  const setAlert = (type, msg, timeout = 5000) => {
    const id = uuid.v4();
    dispatch({ type: SET_ALERT, payload: { type, msg, id } });

    setTimeout(() => dispatch({ type: REMOVE_ALER, payload: id }), timeout);
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state,
        setAlert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
