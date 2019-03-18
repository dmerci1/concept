import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

 class MembersProfileScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Members Screen</Text>
      </View>
    );
  }
}

export default MembersProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
