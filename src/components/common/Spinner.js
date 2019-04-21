import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ActivityIndicator,
} from 'react-native';
import * as Colors from 'themes/colors';

class Loader extends Component {
  render() {
    const { style, size, color } = this.props;
    return (
      <View style={style}>
        <ActivityIndicator
          size={size}
          color={color}
          animating
        />
      </View>
    );
  }
}

Loader.propTypes = {
  style: PropTypes.any,
  size: PropTypes.string,
  color: PropTypes.any,
};

Loader.defaultProps = {
  style: null,
  size: 'small',
  color: Colors.tundora,
};


export default Loader;
