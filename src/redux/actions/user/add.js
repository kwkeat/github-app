export const NAME = 'USER';

export const ADD_FAVORITE_USER = `${NAME}/ADD_FAVORITE_USER`;
export const ADD_FAVORITE_USER_SUCCESS = `${NAME}/ADD_FAVORITE_USER_SUCCESS`;
export const ADD_FAVORITE_USER_FAIL = `${NAME}/ADD_FAVORITE_USER_FAIL`;

export const addFavoriteUser = data => ({
  type: ADD_FAVORITE_USER,
  data,
});

export const addFavoriteUserSuccess = () => ({
  type: ADD_FAVORITE_USER_SUCCESS,
});

export const addFavoriteUserFail = error => ({
  type: ADD_FAVORITE_USER_FAIL,
  error,
});
