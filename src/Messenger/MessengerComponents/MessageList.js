import React from 'react';
import { FlatList, StyleSheet, Image, Text, TouchableOpacity, View } from 'react-native';
import { MapView } from 'expo';

import { MessageShape } from '../../../utils/MessageUtils';

const keyExtractor = item => item.id.toString();

export default class MessageList extends React.Component {
  renderMessageItem = ({ item }) => {
    const { onPressMessage } = this.props;

    return (
      <View key={item.id} style={styles.messageRow}>
        <TouchableOpacity onPress={() => onPressMessage(item)}>
          {this.renderMessageBody(item)}
        </TouchableOpacity>
      </View>
    );
  };

  renderMessageBody = ({ type, text, uri, coordinate}) => {
    switch (type) {
      case 'text':
        return (
          <View style={styles.messageBubble}>
            <Image
              style={styles.avatar}
              source={{ uri: 'https://lh3.googleusercontent.com/a-/AAuE7mBFR37zOITnlk-_c_Bl2pv4_zAXjsoDx589Z8oa=s96' }}
            />
            <Text style={styles.text}>{text}</Text>
          </View>
        );
      case 'image':
        return <Image style={styles.image} source={{ uri }} />;
      case 'location':
        return (
          <MapView
            style={styles.map}
            initialRegion={{
              ...coordinate,
              latitudeDelta: 0.08,
              longitudeDelta: 0.04
            }}
          >
          <MapView.Marker coordinate={coordinate} />
        </MapView>
      );
    default:
      return null;
    }
  };
  render() {
    const { messages } = this.props;

    return (
        <FlatList
          style={styles.container}
          inverted
          data={messages}
          renderItem={this.renderMessageItem}
          keyExtractor={keyExtractor}
          keyboardShouldPersistTaps={'handled'}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'visible',
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 4,
    marginRight: 10,
    marginLeft: 60,
  },
  messageBubble: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'black',
    borderRadius: 20,
  },
  avatar: {
    borderRadius: 22,
    flexDirection: 'row',
    width: 44,
    height: 44,
    borderColor: 'white',
    borderWidth: 2,
  },
  text: {
    fontSize: 20,
    color: 'white',
    marginLeft: 5,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 10,
  },
  map: {
    width: 250,
    height: 250,
    borderRadius: 10,
  },
});
