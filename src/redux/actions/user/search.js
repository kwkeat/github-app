export const NAME = 'USER';

export const SEARCH_USERS = `${NAME}/SEARCH_USERS`;
export const SEARCH_USERS_SUCCESS = `${NAME}/SEARCH_USERS_SUCCESS`;
export const SEARCH_USERS_FAIL = `${NAME}/SEARCH_USERS_FAIL`;

export const searchUsers = username => ({
  type: SEARCH_USERS,
  username,
});

export const searchUsersSuccess = data => ({
  type: SEARCH_USERS_SUCCESS,
  data,
});

export const searchUsersFail = error => ({
  type: SEARCH_USERS_FAIL,
  error,
});
