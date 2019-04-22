export const NAME = 'USER';

export const REMOVE_FAVORITE_USER = `${NAME}/REMOVE_FAVORITE_USER`;
export const REMOVE_FAVORITE_USER_SUCCESS = `${NAME}/REMOVE_FAVORITE_USER_SUCCESS`;
export const REMOVE_FAVORITE_USER_FAIL = `${NAME}/REMOVE_FAVORITE_USER_FAIL`;

export const removeFavoriteUser = id => ({
  type: REMOVE_FAVORITE_USER,
  id,
});

export const removeFavoriteUserSuccess = () => ({
  type: REMOVE_FAVORITE_USER_SUCCESS,
});

export const removeFavoriteUserFail = error => ({
  type: REMOVE_FAVORITE_USER_FAIL,
  error,
});
