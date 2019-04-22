import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
  WebView,
  ScrollView,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import Actions from 'actions';
import Selectors from 'selectors';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { normalize } from 'utils/size';
import * as Colors from 'themes/colors';

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

class UserDetail extends Component {
  onFavoritePress = (item) => {
    const { addFavoriteUser } = this.props;
    addFavoriteUser(item);
  }

  onRemovePress = (id) => {
    const { removeFavoriteUser } = this.props;
    removeFavoriteUser(id);
  }

  render() {
    const { navigation } = this.props;
    const item = navigation.getParam('item');

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.iconLeft} onPress={() => navigation.navigate('Dashboard')}>
          <Icon name="chevron-left" size={normalize(30)} style={styles.icon} />
        </TouchableOpacity>
        <View style={styles.contentContainer}>
          <Image source={{ uri: item.avatar_url }} style={styles.avatar} />
          <View style={styles.button}>
            <Button
              onPress={() => this.onFavoritePress(item)}
              title="Favorite"
              color={Colors.primary}
            />
            <View style={{ paddingHorizontal: normalize(10) }} />
            <Button
              onPress={() => this.onRemovePress(item.id)}
              title="Remove"
              color={Colors.red}
            />
          </View>
          <Text style={styles.description}>{`Username: ${item.login}`}</Text>
          <Text style={styles.description}>{`Type: ${item.type}`}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  iconLeft: {
    paddingVertical: normalize(15),
    paddingHorizontal: normalize(15),
  },
  button: {
    paddingVertical: normalize(20),
    flexDirection: 'row',
  },
  avatar: {
    width: normalize(100),
    height: normalize(100),
    paddingVertical: normalize(20),
  },
  description: {
    fontSize: normalize(16),
    color: Colors.black,
    paddingVertical: normalize(5),
  },
});

UserDetail.propTypes = {
  addFavoriteUser: PropTypes.func.isRequired,
  removeFavoriteUser: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
});

const mapDispatchToProps = {
  addFavoriteUser: Actions.addFavoriteUser,
  removeFavoriteUser: Actions.removeFavoriteUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);
