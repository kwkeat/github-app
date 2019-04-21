import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import ElevatedView from 'react-native-elevated-view';
import { normalize } from 'utils/size';
import * as Colors from 'themes/colors';

const styles = StyleSheet.create({
  elevatedStyle: {
    height: null,
    backgroundColor: Colors.white,
  },
});

class Card extends Component {
  render() {
    const {
      style, elevation, roundedCorner, children,
    } = this.props;
    return (
      <ElevatedView
        elevation={elevation}
        style={[styles.elevatedStyle, { borderRadius: roundedCorner }, style]}
      >
        {children}
      </ElevatedView>
    );
  }
}

Card.propTypes = {
  style: PropTypes.any,
  elevation: PropTypes.number,
  roundedCorner: PropTypes.number,
  children: PropTypes.node,
};

Card.defaultProps = {
  style: null,
  elevation: 5,
  roundedCorner: normalize(5),
  children: null,
};

export default Card;
