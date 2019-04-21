import Actions from 'actions';

const getDefaultState = () => ({ isLoading: false, error: null, data: [] });

function fetch(state, action) {
  if (typeof state === 'undefined') {
    return getDefaultState();
  }
  switch (action.type) {
    case Actions.FETCH_USERS:
      return {
        isLoading: true,
        error: null,
        data: [],
      };
    case Actions.FETCH_USERS_SUCCESS:
      return {
        isLoading: false,
        error: null,
        data: action.data,
      };
    case Actions.FETCH_USERS_FAIL:
      return {
        isLoading: false,
        error: action.error,
        data: [],
      };
    default:
      return state;
  }
}

export default fetch;
