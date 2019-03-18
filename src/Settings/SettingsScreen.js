import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import MemberDetailsListItem from '../Members/MembersComponents/MemberDetailsListItem';
import colors from '../../utils/colors';

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MemberDetailsListItem title="Update Profile" />
        <MemberDetailsListItem title="Change Language" />
        <MemberDetailsListItem title="Sign Out" />
      </View>
    );
  }
}

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
