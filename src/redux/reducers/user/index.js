import { combineReducers } from 'redux';
import favorite from './favorite';
import search from './search';
import remove from './remove';

export default combineReducers({
  favorite,
  search,
  remove,
});
