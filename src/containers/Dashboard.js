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
} from 'react-native';
import * as Colors from 'themes/colors';
import { normalize } from 'utils/size';
import Card from 'common/card';
import Spinner from 'common/Spinner';

class Dashboard extends Component {
  componentDidMount() {
    const { fetchUsers } = this.props;
    // fetchUsers();
  }

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
    const { userList, isLoadingUserList } = this.props;

    return (
      <View style={styles.contentContainer}>
        <Card style={styles.claimListCard}>
          <FlatList
            data={userList}
            renderItem={this.renderItem}
            ItemSeparatorComponent={this.renderSeparator}
            keyExtractor={userList => userList.id.toString()}
            // ListEmptyComponent={this.renderEmpty}
          />
          {isLoadingUserList && <Spinner style={styles.spinner} />}
        </Card>
      </View>
    );
  }

  render() {
    const { signOut } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Welcome to Dashboard</Text>
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
  itemWrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  itemSeparator: {
    backgroundColor: Colors.gray,
    height: 1,
    marginHorizontal: '5%',
  },
  description: {
    flexDirection: 'column',
    marginHorizontal: normalize(20),
    marginVertical: normalize(5),
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
  isLoadingUserList: PropTypes.bool.isRequired,
};

Dashboard.defaultProps = {
};

const mapStateToProps = store => ({
  userList: Selectors.getUserList(store),
  isLoadingUserList: Selectors.isLoadingUserList(store),
});

const mapDispatchToProps = {
  signOut: Actions.signOut,
  fetchUsers: Actions.fetchUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
