import { combineReducers } from 'redux';

import user from './userReducer';
import room from './roomReducer';
import card from './cardReducer';

export default combineReducers({
  user,
  room,
  card,
});
