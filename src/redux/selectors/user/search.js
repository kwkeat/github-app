const NAME = 'USER';

export const getSearchUserList = store => store[NAME].search.data.items;
export const isLoadingSearchUserList = store => store[NAME].search.isLoading;
