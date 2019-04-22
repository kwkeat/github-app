import Actions from 'actions';

const getDefaultState = () => ({ isLoading: false, error: null });

function add(state, action) {
  if (typeof state === 'undefined') {
    return getDefaultState();
  }
  switch (action.type) {
    case Actions.ADD_FAVORITE_USER:
      return {
        isLoading: true,
        error: null,
      };
    case Actions.ADD_FAVORITE_USER_SUCCESS:
      return {
        isLoading: false,
        error: null,
      };
    case Actions.ADD_FAVORITE_USER_FAIL:
      return {
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
}

export default add;
