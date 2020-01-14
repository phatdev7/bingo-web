import { combineReducers } from 'redux';

import access_token from './tokenReducer';
import room from './roomReducer';
import card from './cardReducer';

export default combineReducers({
  access_token,
  room,
  card,
});
