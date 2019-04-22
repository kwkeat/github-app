import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import * as Colors from 'themes/colors';
import DropdownAlert from 'react-native-dropdownalert';

const styles = {
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
  },
  defaultContainer: {
    padding: 8,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    paddingLeft: 20,
    flexDirection: 'row',
  },
};

class DropDownAlert extends Component {
  onClose = () => this.props.dismiss()

  render() {
    const {
      reference,
      style,
      closeInterval,
    } = this.props;
    const additionalStyles = { ...styles.container, ...style };
    return (
      <DropdownAlert
        ref={reference}
        containerStyle={additionalStyles}
        onClose={this.onClose}
        successColor={Colors.success}
        errorColor={Colors.fail}
        defaultContainer={styles.defaultContainer}
        closeInterval={closeInterval}
      />
    );
  }
}

DropDownAlert.propTypes = {
  dismiss: PropTypes.func,
  reference: PropTypes.func.isRequired, // (ref) => { ANYNAME = ref; }
  style: PropTypes.any,
  closeInterval: PropTypes.number,
};

DropDownAlert.defaultProps = {
  dismiss: () => null,
  style: {},
  closeInterval: 4000,
};

export default DropDownAlert;
