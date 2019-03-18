import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import MembersListItem from './MembersComponents//MembersListItem';

import colors from '../../utils/colors';
import { fetchContacts } from '../../utils/api';
import getURLParams from '../../utils/getURLParams';

import store from '../../Store';
const keyExtractor = ({ phone }) => phone;

class MembersScreen extends Component {
  static navigationOptions = ({ navigation: { toggleDrawer, navigate } }) => ({
    title: 'Contestants',
    headerRight: (
      <MaterialIcons
        name="settings"
        size={24}
        style={{ color: colors.black, marginRight: 10 }}
        onPress={() => navigate('Options')}
      />
    ),
  });

  state = {
    contacts: store.getState().contacts,
    loading: store.getState().isFetchingContacts,
    error: store.getState().error,
  };

  async componentDidMount() {
    this.unsubscribe = store.onChange(() =>
    this.setState({
      contacts: store.getState().contacts,
      loading: store.getState().isFetchingContacts,
      error: store.getState().error,
    }),
  );
      const contacts = await fetchContacts();

      store.setState({ contacts, isFetchingContacts: false });

      Linking.addEventListener('url', this.handleOpenUrl);

      const url = await Linking.getInitialURL();
      this.handleOpenUrl({ url });

}

componentWillUnmount() {
  this.unsubscribe();
  Linking.removeEventListener('url', this.handleOpenUrl);
}

handleOpenUrl(event) {
  const { navigation: { navigate } } = this.propTypes
  const { url } = event;
  const params = getURLParams(url);

  if(params.name) {
    const queriedContact = store
      .getState()
      .contacts.find(
        contact =>
          contact.name.split(' ')[0].toLowerCase() ===
          params.name.toLowerCase(),
      );
      if(queriedContact) {
        navigate('MemberProfile', { id: queriedContact.id });
      }
  }
}
renderContact = ({ item }) => {
  const { navigation: { navigate }} = this.props;
  const { id, name, avatar, phone } = item;

  return (
    <MembersListItem
      name={name}
      avatar={avatar}
      phone={phone}
      onPress={() => navigate('MemberProfile', { contact: item })}
    />
  );
};

render() {
const { loading, contacts, error } = this.state;
const contactsSorted = contacts.sort((a, b) =>
a.name.localeCompare(b.name),
);


return (
  <View style={styles.container}>
    {loading && <ActivityIndicator size="large" />}
    {error && <Text>Error...</Text>}
    {!loading &&
    !error && (
      <FlatList
        data={contactsSorted}
        keyExtractor={keyExtractor}
        renderItem={this.renderContact}
      />
    )}
    </View>
  );
}
}

export default MembersScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    flex: 1,
  },
});
