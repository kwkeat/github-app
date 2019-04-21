import Actions from 'actions';

const getDefaultState = () => ({ isLoading: false, error: null, data: [] });

function search(state, action) {
  if (typeof state === 'undefined') {
    return getDefaultState();
  }
  switch (action.type) {
    case Actions.SEARCH_USERS:
      return {
        isLoading: true,
        error: null,
        data: [],
      };
    case Actions.SEARCH_USERS_SUCCESS:
      return {
        isLoading: false,
        error: null,
        data: action.data,
      };
    case Actions.SEARCH_USERS_FAIL:
      return {
        isLoading: false,
        error: action.error,
        data: [],
      };
    default:
      return state;
  }
}

export default search;
