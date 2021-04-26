import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
  width: '40%',
  height: '40%'
};



export class DirMapContainer extends Component {
    state = { userLocation: { lat: -33.873001, lng: 151.207001 }, loading: true };
    defaultCentre = { lat: -33.873001, lng: 151.207001 }
    componentDidMount(props) {
        navigator.geolocation.getCurrentPosition(
          position => {
    
            this.setState({
              userLocation: { lat: this.props.toiletInfo["lat"], lng: this.props.toiletInfo["lat"] },
              loading: false
            });
          },
          () => {
            this.setState({ loading: false });
          }
        );
      }
    setMapCenter = (latitude, longitude) => {
        this.setState({
            userLocation: { lat: latitude, lng: longitude },
            loading: false
          });
    }
    setMapCenter(latitude, longitude) {
        console.log(latitude);
        this.setState({
            userLocation: { lat: latitude, lng: longitude },
            loading: false
        });  
    }
    
    render() {
        const { loading, userLocation } = this.state;
        if (loading) {
            return null;
          }
        return (
            <div>
                <div className = "dirmap">
                <Map
                google={this.props.google}
                className="dirmap"
                zoom={16}
                style={mapStyles}
                disableDefaultUI = {true}
                initialCenter={{
                    lat: this.props.toiletInfo["lat"],
                    lng: this.props.toiletInfo["lng"]
                }}
                center={userLocation}
                >
                    <Marker position={{lat:this.props.toiletInfo["lat"], lng:this.props.toiletInfo["lng"]}}/>
                </Map>
                </div>
            </div>
        );
    }
}

export default GoogleApiWrapper({
  apiKey: 'YOUR-API-KEY-HERE'
})(DirMapContainer);
