import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Actions from 'actions';
import Selectors from 'selectors';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
} from 'react-native';
import Swiper from 'react-native-swiper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as Colors from 'themes/colors';
import { normalize } from 'utils/size';
import Spinner from 'common/Spinner';

const Realm = require('realm');

const FavoriteUserSchema = {
  name: 'FavoriteUser',
  properties: {
    avatarUrl: 'string',
    id: 'int',
    login: 'string',
    htmlUrl: 'string',
  },
};

const githubUser = [
  {
    avatar_url: 'https://avatars3.githubusercontent.com/u/193408?v=4',
    events_url: 'https://api.github.com/users/kwk/events{/privacy}',
    followers_url: 'https://api.github.com/users/kwk/followers',
    following_url: 'https://api.github.com/users/kwk/following{/other_user}',
    gists_url: 'https://api.github.com/users/kwk/gists{/gist_id}',
    gravatar_id: '',
    html_url: 'https://github.com/kwk',
    id: 193408,
    login: 'kwk',
    node_id: 'MDQ6VXNlcjE5MzQwOA==',
    organizations_url: 'https://api.github.com/users/kwk/orgs',
    received_events_url: 'https://api.github.com/users/kwk/received_events',
    repos_url: 'https://api.github.com/users/kwk/repos',
    score: 138.93407,
    site_admin: false,
    starred_url: 'https://api.github.com/users/kwk/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/kwk/subscriptions',
    type: 'User',
    url: 'https://api.github.com/users/kwk',
  },
  {
    avatar_url: 'https://avatars3.githubusercontent.com/u/193408?v=4',
    html_url: 'https://github.com/kwk',
    id: 193409,
    login: 'kwk',
  },
  {
    avatar_url: 'https://avatars3.githubusercontent.com/u/193408?v=4',
    html_url: 'https://github.com/kwk',
    id: 1931408,
    login: 'kwk',
  },
  {
    avatar_url: 'https://avatars3.githubusercontent.com/u/193408?v=4',
    html_url: 'https://github.com/kwk',
    id: 1934408,
    login: 'kwk',
  },
  {
    avatar_url: 'https://avatars3.githubusercontent.com/u/193408?v=4',
    html_url: 'https://github.com/kwk',
    id: 1935408,
    login: 'kwk',
  },
];

class Dashboard extends Component {
  state = {
    tabIndex: 0,
    favoriteUsers: [],
  }

  componentDidMount() {
    const { fetchFavoriteUsers } = this.props;
    fetchFavoriteUsers();

    // Realm.open({ schema: [FavoriteUserSchema] })
    //   .then((realm) => {
    //     const favoriteUser = realm.objects('FavoriteUser');
    //     this.setState({ favoriteUsers: JSON.stringify(favoriteUser) });
    //   });
  }

  onSearchPress = (values) => {
    const { searchUsers } = this.props;

    searchUsers(values.username);
  }

  onIndexChanged = (index) => {
    this.setState({ tabIndex: index });
  }

  onTabChangePress = (selected) => {
    const { tabIndex } = this.state;
    if (selected !== tabIndex && selected === 1) {
      this.setState({ tabIndex: selected });
      this.swiper.scrollBy(1);
    } else if (selected !== tabIndex && selected === 0) {
      this.setState({ tabIndex: selected });
      this.swiper.scrollBy(-1);
    }
  }

  renderEmpty = () => (
    <View style={styles.empty}>
      <Text>No user data available.</Text>
    </View>
  )

  renderSeparator = () => (
    <View style={styles.itemSeparator} />
  )

  renderItem = ({ item }) => {
    const { navigation } = this.props;

    return (
      <TouchableOpacity onPress={() => navigation.navigate('UserDetail', { item })}>
        <View style={styles.itemWrapper}>
          <Image source={{ uri: item.avatar_url }} style={styles.avatar} />
          <View style={styles.description}>
            <Text style={styles.descriptionText}>{item.login}</Text>
            <Text style={styles.descriptionText}>{item.html_url}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  renderSearchedUserList = () => {
    const {
      searchUserList, isLoadingSearchUserList,
    } = this.props;

    return (
      <View style={styles.swiper}>
        <FlatList
          data={githubUser}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={githubUser => githubUser.id.toString()}
          ListEmptyComponent={this.renderEmpty}
        />
        {isLoadingSearchUserList && <Spinner style={styles.spinner} />}
      </View>
    );
  }

  renderFavoriteUserList = () => {
    const { favoriteUserList } = this.props;

    return (
      <View style={styles.swiper}>
        <FlatList
          data={favoriteUserList}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={favoriteUserList => favoriteUserList.id.toString()}
          ListEmptyComponent={this.renderEmpty}
        />
      </View>
    );
  }

  renderUserList = () => {
    const { tabIndex } = this.state;

    return (
      <View style={styles.contentContainer}>
        <View style={styles.tabMenu}>
          <TouchableOpacity onPress={() => this.onTabChangePress(0)}>
            <Text style={tabIndex === 0 ? styles.tabSelected : styles.tabTitle}>Searched</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity onPress={() => this.onTabChangePress(1)}>
            <Text style={tabIndex === 1 ? styles.tabSelected : styles.tabTitle}>Favorites</Text>
          </TouchableOpacity>
        </View>
        <Swiper
          style={styles.swiper}
          loop={false}
          showsPagination={false}
          ref={(ref) => { this.swiper = ref; }}
          onIndexChanged={index => this.onIndexChanged(index)}
        >
          {this.renderSearchedUserList()}
          {this.renderFavoriteUserList()}
        </Swiper>
      </View>
    );
  }

  renderSearchBar = () => (
    <Formik
      initialValues={{ username: '' }}
      onSubmit={values => this.onSearchPress(values)}
    >
      {props => (
        <View style={styles.header}>
          <View style={styles.textInput}>
            <TextInput
              onChangeText={props.handleChange('username')}
              onBlur={props.handleBlur('username')}
              value={props.values.username}
              placeholder="Username"
            />
          </View>
          <TouchableOpacity
            style={styles.buttonSearch}
            onPress={props.handleSubmit}
          >
            <Text style={styles.buttonSearchText}>Search</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  )

  render() {
    const { signOut } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Github API Demo</Text>
        {this.renderSearchBar()}
        {this.renderUserList()}
        <TouchableOpacity style={styles.buttonSignOut} onPress={() => signOut()}><Text style={styles.buttonSignOutText}>Sign Out</Text></TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    marginVertical: normalize(30),
    marginHorizontal: normalize(15),
    borderWidth: normalize(2),
    borderRadius: normalize(5),
    borderColor: Colors.primary,
  },
  avatar: {
    width: normalize(60),
    height: normalize(60),
  },
  title: {
    color: Colors.primary,
    alignSelf: 'center',
    fontSize: normalize(16),
    fontWeight: 'bold',
    padding: normalize(10),
  },
  swiper: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  tabMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.primary,
    borderWidth: normalize(2),
    borderColor: Colors.tabMenu,
    paddingVertical: normalize(10),
    borderRadius: normalize(5),
  },
  tabTitle: {
    fontWeight: '400',
    fontSize: normalize(16),
    color: Colors.white,
  },
  tabSelected: {
    fontWeight: '500',
    fontSize: normalize(18),
    color: Colors.white,
  },
  divider: {
    borderWidth: StyleSheet.hairlineWidth,
    paddingVertical: normalize(10),
    borderColor: Colors.tabMenu,
  },
  textInput: {
    borderWidth: normalize(2),
    width: '70%',
    borderColor: Colors.primary,
  },
  itemWrapper: {
    paddingHorizontal: normalize(20),
    flex: 1,
    flexDirection: 'row',
  },
  itemSeparator: {
    backgroundColor: Colors.gray,
    height: 1,
    marginHorizontal: '5%',
  },
  empty: {
    flex: 1,
    paddingVertical: normalize(20),
    paddingHorizontal: normalize(70),
    alignItems: 'center',
  },
  description: {
    flexDirection: 'column',
    marginHorizontal: normalize(20),
    justifyContent: 'center',
  },
  descriptionText: {
    fontSize: normalize(14),
    color: Colors.black,
  },
  buttonSearch: {
    backgroundColor: Colors.primary,
  },
  buttonSearchText: {
    paddingVertical: normalize(16),
    paddingHorizontal: normalize(10),
    color: Colors.white,
    fontWeight: 'bold',
  },
  buttonSignOut: {
    padding: normalize(10),
    backgroundColor: Colors.white,
  },
  buttonSignOutText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.primary,
  },
});

Dashboard.propTypes = {
  signOut: PropTypes.func.isRequired,
  fetchFavoriteUsers: PropTypes.func.isRequired,
  favoriteUserList: PropTypes.func.isRequired,
  searchUsers: PropTypes.func.isRequired,
  isLoadingFavoriteUserList: PropTypes.bool.isRequired,
  searchUserList: PropTypes.func.isRequired,
  isLoadingSearchUserList: PropTypes.bool.isRequired,
};

Dashboard.defaultProps = {
};

const mapStateToProps = store => ({
  favoriteUserList: Selectors.getFavoriteUserList(store),
  searchUserList: Selectors.getSearchUserList(store),
  isLoadingFavoriteUserList: Selectors.isLoadingFavoriteUserList(store),
  isLoadingSearchUserList: Selectors.isLoadingSearchUserList(store),
});

const mapDispatchToProps = {
  signOut: Actions.signOut,
  fetchFavoriteUsers: Actions.fetchFavoriteUsers,
  searchUsers: Actions.searchUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
