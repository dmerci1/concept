import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, SafeAreaView, ActivityIndicator, StatusBar, Button } from 'react-native';
import { Location, Permissions } from 'expo';
import Modal from 'react-native-modal';
import { Card } from 'react-native-elements';
import Map from './ChallengeComponents/Map';
import YelpService from '../../utils//Yelp';
import Status from '../Status';


const deltas = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
 isModalVisible: false,
};

 class ChallengesScreen extends Component {
     state = {
       mapLoaded: false,
       region: null,
       bars: [],
       isModalVisible: false,
     }

     componentDidMount() {
       this.setState({ mapLoaded: true });
       this.getLocationAsync();
     }
     renderMessageList() {
       return (
         <View style={styles.content}></View>
       );
     }

     renderInputMethodEditor() {
       return(
         <View style={styles.inputMethodEditor}></View>
       )
     }

     renderToolbar() {
       return (
         <View style={styles.toolbar}></View>
       );
     }
     onRegionChangeComplete = (region) => {
       this.setState({ region });
     }
     onButtonPress = () => {
    console.log(user);

  }
  onShowBarLocationsButtonPress = () => {
    this.getLocalBars();
  }
  getLocationAsync = async () => {
     let { status } = await Permissions.askAsync(Permissions.LOCATION);
     if (status !== 'granted') {
       this.setState({
         errorMessage: 'Permission to access location was denied'
       });
     }

     let location = await Location.getCurrentPositionAsync({});
     const region = {
       latitude: location.coords.latitude,
       longitude: location.coords.longitude,
       ...deltas
     };
      this.setState({ region });
      //await this.getLocalBars();
   }

   getLocalBars = async (visible) => {
     const { latitude, longitude } = this.state.region;
     const userLocation = { latitude, longitude };
     const bars = await YelpService.getLocalBars(userLocation);
     this.setState({ bars, isModalVisible: !this.state.isModalVisible });
     this.props.barCreate({ bars });
     console.log(bars.length);

   };
   setModalVisible(visible) {
     this.setState({ modalVisible: visible, numberOfBars: 'yayyyyy' });
   }
   _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

    goToBarsList = () => {
      this.props.navigation.navigate('list');
      this.setState({ isModalVisible: !this.state.isModalVisible })
    }


    render() {
      const { region, bars } = this.state;
       if (!this.state.mapLoaded) {
         return (
           <View style={{ flex: 1, justifyContent: 'center' }}>
             <ActivityIndicator size="large" />
           </View>
         );
       }
         return (

   <SafeAreaView style={styles.container}>
   <Modal isVisible={this.state.isModalVisible}>
  <Card style={{ height: 400 }}>
    <Text>Your mission, should you choose to accept it, is to BLACK THE FUCK OUT!!!</Text>
    <Button
      style={{ flex: 1, backgroundColor: 'black' }}
      onPress={this._toggleModal}
      title="start challenge"
    />
  </Card>
</Modal>
     <Map
       region={region}
       places={bars}
     />
     <View style={styles.buttonContainer}>
       <Button
        color="black"
        style={{ borderRadius: 10 }}
        title="Start Challenge"
        onPress={this.onShowBarLocationsButtonPress}
       />
      </View>
   </SafeAreaView>

);
}
}

const styles = {
    container: {
      flex: 1,
      alignItems: 'center',
    },
    buttonContainer: {
      position: 'absolute',
      bottom: 10,
      width: 300,
      borderRadius: 10,
    },
    challengeButton: {
      flex: 1,
      borderRadius: 10,
      height: 100,
      backgroundColor: 'black',
    },
  };

export default ChallengesScreen;
