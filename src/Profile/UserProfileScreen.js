import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native';
import store from '../../Store';

import { MaterialIcons } from '@expo/vector-icons';

import { fetchUserContact } from '../../utils/api';
import colors from '../../utils/colors';

import MemberThumbnail from '../Members/MembersComponents/MemberThumbnail';

class UserProfileScreen extends Component {
  state = {
    user: store.getState().user,
    loading: store.getState().isFetchingUser,
    error: store.getState().error,
  };

  async componentDidMount() {
    this.unsubscribe = store.onChange(() =>
    this.setState({
      user: store.getState().user,
      loading: store.getState().isFetchingUser,
      error: store.getState().error,
    }),
  );

    const user = await fetchUserContact();

    store.setState({
      user,
      isFetchingUser: false
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
    render() {
      const { loading, user, error } = this.state;
      const { avatar, name, phone } = user;

      return (
        <View style={styles.container}>
          {loading && <ActivityIndicator size="large" />}
          {error && <Text>Error...</Text>}

          {!loading &&
             (
              <MemberThumbnail
                avatar={avatar}
                name={name}
                phone={phone}
              />
          )}
          </View>
      );
    }
  }

  export default UserProfileScreen;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'black',
      justifyContent: 'center',
      flex: 1,
    },
  });
