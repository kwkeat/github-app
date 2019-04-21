export const NAME = 'USER';

export const FETCH_USERS = `${NAME}/FETCH_USERS`;
export const FETCH_USERS_SUCCESS = `${NAME}/FETCH_USERS_SUCCESS`;
export const FETCH_USERS_FAIL = `${NAME}/FETCH_USERS_FAIL`;

export const fetchUsers = () => ({
  type: FETCH_USERS,
});

export const fetchUsersSuccess = data => ({
  type: FETCH_USERS_SUCCESS,
  data,
});

export const fetchUsersFail = error => ({
  type: FETCH_USERS_FAIL,
  error,
});
