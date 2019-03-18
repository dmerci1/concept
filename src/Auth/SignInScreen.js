import React, { Component } from 'react';
import {
      StyleSheet,
      Text,
      StatusBar,
      TextInput,
      View,
      Platform,
      Button,
      KeyboardAvoidingView,
      ActivityIndicator ,
      TouchableOpacity,
      Image,
      Animated,
      LayoutAnimation
    } from 'react-native'

import configureTransition from '../../utils/configureTransition';
import sleep from '../../utils/sleep';
import Toggle from './AuthComponents/Toggle';

import AuthButton from './AuthComponents/AuthButton';
import AuthButton2 from './AuthComponents/AuthButton2';

const State = {
  Launching: 'Launching',
  WillTransitionIn: 'WillTransitionIn',
  WillTransitionOut: 'WillTransitionOut',
}

class SignInScreen extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    loading: false,
    transitionState: State.Launching,
  };
  async componentDidMount() {
      await sleep(500);

      await configureTransition(() => {
        this.setState({ transitionState: State.WillTransitionIn });
      });

      const animation = LayoutAnimation.create(
        750,
        LayoutAnimation.Types.easeInEaseOut,
        LayoutAnimation.Properties.opacity,
      );

      LayoutAnimation.configureNext(animation);

      this.setState({ transitionState: State.WillTransitionIn });
    }
onButtonPress() {
  const { email, password } = this.state;

  this.setState({ error: '', loading: true });
/*
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(this.onLoginSuccess.bind(this))
    .catch(this.onLoginFail.bind(this));



onLoginFail() {
  if (this.state.email === '') {
  this.setState({ error: 'Must enter an E-Mail', loading: false });
} if (this.state.password === '') {
  this.setState({ error: 'Must enter a password', loading: false });
} if (this.state.email === '' && this.state.password === '') {
  this.setState({ error: 'Must enter an E-mail and password', loading: false });
}
}

onLoginSuccess() {
  this.setState({
    email: '',
    password: '',
    loading: false,
    error: ''
  });*/
}

renderButton() {
  if (this.state.loading) {
    <ActivityIndicator
         size={'large'}
       />
     }
  return (
    <AuthButton
          title="Login"
          color='white'
          onPress={this.onButtonPress.bind(this)}
        />

  );
}
  render() {
    const { size, onChangeSize } = this.props;
    const { transitionState } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
           <Text style={[styles.largeText, styles.textStyle]}>AMAZING RACE NYC</Text>
        </View>
        {transitionState !== State.Launching && (
          <View>
            <Toggle
              
              value={size}
              onChange={onChangeSize}
            />
          </View>
        )}
        {transitionState !== State.Launching && (
          <View>
            <Button title={'Start Game'} onPress={() => {}} />
          </View>
        )}
      </View>
    );
  }
}
export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    height: 40,
    width: 300,
    marginTop: 20,
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 2,
    marginHorizontal: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  textInput: {
    flex: 1,
    color: 'white',
    fontSize: 15,
  },
  textStyle: {
    fontFamily:
      Platform.os === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
    //  color: 'white',
      textAlign: 'center',
  },
  largeText: {
    fontSize: 40,
    color: 'white',
},
  smallText: {
    fontSize: 18,
    color: 'white',
  },
});
