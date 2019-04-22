import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import AppNavigator from 'navigator/app';
import DropDownAlert from 'common/modal/DropDownAlert';
import DropDownService from 'utils/dropdown';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <AppNavigator />
        <DropDownAlert
          reference={(ref) => {
            DropDownService.setTopLevelDropDown(ref); // for overall app
          }}
        />
      </View>
    );
  }
}

export default App;
