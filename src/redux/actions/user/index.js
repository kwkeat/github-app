import * as favorite from './favorite';
import * as search from './search';
import * as add from './add';
import * as remove from './remove';

export default {
  ...favorite,
  ...search,
  ...add,
  ...remove,
};
