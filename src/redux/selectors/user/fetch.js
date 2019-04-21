const NAME = 'USER';

export const getUserList = store => store[NAME].fetch.data;
export const isLoadingUserList = store => store[NAME].fetch.isLoading;
