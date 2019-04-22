const NAME = 'USER';

export const getFavoriteUserList = store => store[NAME].favorite.data;
export const isLoadingFavoriteUserList = store => store[NAME].favorite.isLoading;
