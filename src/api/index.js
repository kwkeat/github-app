// Example usage here, uncomment the following in actual usage
import api from './helper';

const SUCCESS = 'SUCCESS';
const FAIL = 'FAIL';
const EXIST = 'EXIST';
const Realm = require('realm');

const FavoriteUserSchema = {
  name: 'FavoriteUser',
  properties: {
    avatar_url: 'string',
    id: 'int',
    login: 'string',
    html_url: 'string',
  },
};

// Mock api here, remove it in actual usage
export const signIn = credentials => new Promise((resolve, reject) => {
  if (credentials.username === 'test' && credentials.password === '1234') {
    // mocking api request
    setTimeout(() => {
      const token = 'fake-token';
      resolve(token);
    }, 2000);
  } else {
    reject('Invalid credentials');
  }
});

// User
export const fetchUsers = () => api.get('users');

export const searchUsers = (username, page) => api.get(`search/users?page=${page}&q=${username}+in:login`);

export const addFavoriteUser = data => Realm.open({ schema: [FavoriteUserSchema] })
  .then((realm) => {
    // Create Realm objects and write to local storage
    const favoriteUser = realm.objects('FavoriteUser').filtered(`id == ${data.id}`);
    if (favoriteUser.length === 1) {
      return EXIST;
    }

    if (favoriteUser.length === 0) {
      realm.write(() => {
        const favoriteUser = realm.create('FavoriteUser', {
          avatar_url: data.avatar_url,
          id: data.id,
          login: data.login,
          html_url: data.html_url,
        });
      });
    }

    const addedUser = realm.objects('FavoriteUser').filtered(`id == ${data.id}`);
    if (addedUser.length === 1) {
      return SUCCESS;
    }
  });

export const fetchFavoriteUsers = () => Realm.open({ schema: [FavoriteUserSchema] })
  .then((realm) => {
    const favoriteUser = Array.from(realm.objects('FavoriteUser'));
    return favoriteUser;
  });

export const removeFavoriteUser = id => Realm.open({ schema: [FavoriteUserSchema] })
  .then((realm) => {
    const favoriteUser = realm.objects('FavoriteUser').filtered(`id == ${id}`);

    if (favoriteUser.length === 1) {
      realm.write(() => {
        realm.delete(favoriteUser);
      });
      return SUCCESS;
    }
    if (favoriteUser.length === 0) {
      return EXIST;
    }
  });
