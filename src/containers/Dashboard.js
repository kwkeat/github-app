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
  Button,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as Colors from 'themes/colors';
import { normalize } from 'utils/size';
import Card from 'common/card';
import Spinner from 'common/Spinner';

class Dashboard extends Component {
  componentDidMount() {
    const { fetchUsers } = this.props;
    // fetchUsers();
  }

  onSearchPress = (values) => {
    const { searchUsers } = this.props;

    searchUsers(values.username);
  }

  renderEmpty = () => (
    <View style={styles.empty}>
      <Text>No user has been searched yet.</Text>
    </View>
  )

  renderSeparator = () => (
    <View style={styles.itemSeparator} />
  )

  renderItem = ({ item }) => (
    <View style={styles.itemWrapper}>
      <Image source={{ uri: item.avatar_url }} style={styles.avatar} />
      <View style={styles.description}>
        <Text>{item.login}</Text>
        <Text>{item.html_url}</Text>
      </View>
    </View>
  )

  renderUserList = () => {
    const {
      userList, isLoadingUserList, searchUserList, isLoadingSearchUserList,
    } = this.props;

    return (
      <View style={styles.contentContainer}>
        <Card style={styles.claimListCard}>
          <FlatList
            data={searchUserList}
            renderItem={this.renderItem}
            ItemSeparatorComponent={this.renderSeparator}
            keyExtractor={searchUserList => searchUserList.id.toString()}
            ListEmptyComponent={this.renderEmpty}
          />
          {isLoadingSearchUserList && <Spinner style={styles.spinner} />}
        </Card>
      </View>
    );
  }

  renderSearchBar = () => (
    <Formik
      initialValues={{ username: '' }}
      onSubmit={values => this.onSearchPress(values)}
    >
      {props => (
        <View style={styles.row}>
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
        <Text style={styles.text}>Welcome to Github API Demo</Text>
        {this.renderSearchBar()}
        {this.renderUserList()}
        <TouchableOpacity style={styles.buttonSignOut} onPress={() => signOut()}><Text style={styles.buttonSignOutText}>View Favorites</Text></TouchableOpacity>
        <TouchableOpacity style={styles.buttonSignOut} onPress={() => signOut()}><Text style={styles.buttonSignOutText}>Sign Out</Text></TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    marginVertical: normalize(30),
    paddingHorizontal: normalize(15),
  },
  avatar: {
    width: normalize(50),
    height: normalize(50),
  },
  text: {
    color: Colors.primary,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  textInput: {
    borderWidth: 1,
    width: '70%',
    borderColor: Colors.primary,
  },
  itemWrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  itemSeparator: {
    backgroundColor: Colors.gray,
    height: 1,
    marginHorizontal: '5%',
  },
  empty: {
    paddingVertical: normalize(20),
    paddingHorizontal: normalize(40),
    alignItems: 'center',
  },
  description: {
    flexDirection: 'column',
    marginHorizontal: normalize(20),
    marginVertical: normalize(5),
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
    margin: normalize(10),
    padding: normalize(10),
    borderWidth: 1,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
    borderRadius: normalize(5),
  },
  buttonSignOutText: {
    color: Colors.primary,
  },
});

Dashboard.propTypes = {
  signOut: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  userList: PropTypes.func.isRequired,
  searchUsers: PropTypes.func.isRequired,
  isLoadingUserList: PropTypes.bool.isRequired,
  searchUserList: PropTypes.func.isRequired,
  isLoadingSearchUserList: PropTypes.bool.isRequired,
};

Dashboard.defaultProps = {
};

const mapStateToProps = store => ({
  userList: Selectors.getUserList(store),
  searchUserList: Selectors.getSearchUserList(store),
  isLoadingUserList: Selectors.isLoadingUserList(store),
  isLoadingSearchUserList: Selectors.isLoadingUserList(store),
});

const mapDispatchToProps = {
  signOut: Actions.signOut,
  fetchUsers: Actions.fetchUsers,
  searchUsers: Actions.searchUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
