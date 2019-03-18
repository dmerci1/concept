import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from 'react-native-elements';

import MembersScreen from './src/Members/MembersScreen'
import MessengerScreen from './src/Messenger/MessengerScreen';
import AppNavigator from './src/Navigation/AppNavigator';

 class App extends Component {
  render() {
    return (
      <AppNavigator />
    );
  }
}

export default App;
