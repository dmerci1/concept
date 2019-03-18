import React, { Component } from 'react';
import { MapView } from 'expo';

const Marker = MapView.Marker;

class Map extends Component {

  onRegionChange(region) {
    this.setState({ region });
  }

  renderMarkers() {
    return this.props.places.map((place, i) => (
      <Marker key={i} title={place.name} coordinate={place.coords} image={place.photos} />
    ));
  }

  render() {
   const { region } = this.props;

    return (
      <MapView
        style={{ width: '100%', height: '100%' }}
        region={region}
      //onRegionChange={this.onRegionChange}
        showsUserLocation
        showsMyLocationButton
      >
      {this.renderMarkers()}
      </MapView>
    );
  }
}


export default Map;
