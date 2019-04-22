export const NAME = 'USER';

export const FETCH_FAVORITE_USERS = `${NAME}/FETCH_FAVORITE_USERS`;
export const FETCH_FAVORITE_USERS_SUCCESS = `${NAME}/FETCH_FAVORITE_USERS_SUCCESS`;
export const FETCH_FAVORITE_USERS_FAIL = `${NAME}/FETCH_FAVORITE_USERS_FAIL`;

export const fetchFavoriteUsers = () => ({
  type: FETCH_FAVORITE_USERS,
});

export const fetchFavoriteUsersSuccess = data => ({
  type: FETCH_FAVORITE_USERS_SUCCESS,
  data,
});

export const fetchFavoriteUsersFail = error => ({
  type: FETCH_FAVORITE_USERS_FAIL,
  error,
});
