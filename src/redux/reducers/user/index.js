import { combineReducers } from 'redux';
import fetch from './fetch';
import search from './search';

export default combineReducers({
  fetch,
  search,
});
