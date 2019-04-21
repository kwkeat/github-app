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

class UserDetail extends Component {
  onFavoritePress = () => {
    console.log('favorite pressed');
  }

  render() {
    const { navigation } = this.props;
    const item = navigation.getParam('item');

    console.log(item);
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.iconLeft} onPress={() => navigation.navigate('Dashboard')}>
          <Icon name="chevron-left" size={normalize(30)} style={styles.icon} />
        </TouchableOpacity>
        <View style={styles.contentContainer}>
          <Image source={{ uri: item.avatar_url }} style={styles.avatar} />
          <View style={styles.button}>
            <Button
              onPress={this.onFavoritePress}
              title="Favorite"
              color={Colors.primary}
            />
            <View style={{ paddingHorizontal: normalize(10) }} />
            <Button
              onPress={this.onFavoritePress}
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

const mapStateToProps = store => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapStateToProps)(UserDetail);
