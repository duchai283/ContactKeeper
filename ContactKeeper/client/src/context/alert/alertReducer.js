import { SET_ALERT, REMOVE_ALER } from '../types';

export default (state, action) => {
  switch (action.type) {
    case SET_ALERT:
      return [...state, action.payload];
    case REMOVE_ALER:
      return state.filter(alert => alert.id !== action.payload);
    default:
      return state;
  }
};
