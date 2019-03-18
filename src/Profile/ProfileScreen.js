import React from 'react';
import { StyleSheet, View } from 'react-native';

import MemberThumbnail from '../Members/MembersComponents/MemberThumbnail';
import MemberDetailsListItem from '../Members/MembersComponents/MemberDetailsListItem';

class ProfileScreen extends React.Component {
  static navigationOptions = ({ navigation: { state: { params } } }) => {
    const { contact: { name } } = params;
    return {
      title: name.split(' ')[0],
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'black',
      },
    };
  };
  render() {
      const { navigation: { state: { params } } } = this.props;
      const { contact } = params;
      const { avatar, name, email, phone, cell } = contact;

      return (
        <View style={styles.container}>
          <View style={styles.avatarSection}>
            <MemberThumbnail
              avatar={avatar}
              name={name}
              phone={phone}
            />
          </View>
          <View style={styles.detailsSection}>
            <MemberDetailsListItem
              icon="mail"
              title="Email"
              subtitle={email}
            />
            <MemberDetailsListItem
              icon="phone"
              title="Work"
              subtitle={phone}
            />
            <MemberDetailsListItem
              icon="smartphone"
              title="Personal"
              subtitle={cell}
            />
          </View>
        </View>
      );
  }
}

export default ProfileScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  detailsSection: {
    flex: 1,
    backgroundColor: 'white',
  },
});
