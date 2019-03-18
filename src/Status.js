import { Constants } from 'expo';
import {
  StyleSheet,
  NetInfo,
  Platform,
  StatusBar,
  Text,
  View
} from 'react-native';
import React from 'react';

export default class Status extends React.Component {
  state = {
    isConnected: false,
  };

  async componentWillMount() {
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this.handleChange,
    );

    const isConnected = await NetInfo.isConnected.fetch();

    this.setState({ isConnected });
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this.handleChange,
    );
  }

  handleChange = (isConnected) => {
    this.setState({ isConnected });
  }

render() {
  const { isConnected } = this.state;

  const backgroundColor = isConnected ? 'white' : 'red';

  const statusBar = (
    <StatusBar
      backgroundColor={backgroundColor}
      barStyle={isConnected ? 'dark-content' : 'light-content'}
      animated={false}
    />
  );

const messageContainer = (
  <View style={styles.messageContainer} pointerEvents={'none'}>
    {statusBar}
    {!isConnected && (
      <View style={styles.bubble}>
        <Text style={styles.text}>Bitch! You lost the internet</Text>
      </View>
    )}
    </View>

);


  if (Platform === 'ios') {
    return (
      <View style={[styles.status, { backgroundColor }]}>
        {messageContainer}
      </View>
    );
  }

  return messageContainer;
  }
}


const statusHeight =
  (Platform.OS === 'ios' ? Constants.statusBarHeight : 0);

  const styles = StyleSheet.create({
    status: {
      zIndex: 1,
      height: statusHeight,
    },
    messageContainer: {
      zIndex: 1,
      position: 'absolute',
      top: statusHeight + 20,
      right: 0,
      left: 0,
      height: 80,
      alignItems: 'center'
    },
    bubble: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 20,
      backgroundColor: 'red',
    },
    text: {
      color: 'white',
    },
  });
