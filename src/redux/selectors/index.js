import auth from './auth';
import common from './common';
import persist from './persist';
import user from './user';

export default {
  ...auth,
  ...common,
  ...persist,
  ...user,
};
