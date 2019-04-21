const NAME = 'USER';

export const getUserList = store => store[NAME].user.data;
export const isLoadingClaimsInfo = store => store[NAME].user.isLoading;
