import React, { Component, useState } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import { AutofillAddress, DistSlider } from '.././'
import Fab from '@material-ui/core/Fab';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {ReactComponent as Logo} from '../../assets/toilet.svg';

const mapStyles = {
  width: '100%',
  height: '100%'
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#126e82',
    },
    secondary: {
      main: '#ffffff',
    },
  },
});


export class MapContainer extends Component {
    state = { userLocation: { lat: -33.873001, lng: 151.207001 }, loading: true, distance: 5 };
    defaultCentre = { lat: -33.873001, lng: 151.207001 };
    componentDidMount(props) {
        navigator.geolocation.getCurrentPosition(
          () => {
            this.setState({ loading: false });
          }
        );
    }
    setMapCenter = (latitude, longitude) => {
        this.setState({
            userLocation: { lat: latitude, lng: longitude },
            loading: false,
          });
    }

    setDistance = (event, dist) => {
      this.setState({
        distance: parseInt(dist)
      })
      // this.distance= parseInt(dist)
      console.log(this.state.distance)
    }
    searchToilets = () => {
      const pathname='http://localhost:3000/user/toilets?lat='+this.state.userLocation.lat+'&lng='+this.state.userLocation.lng+'&dist='+this.state.distance
      window.location.href = pathname;
      
    }
    
    render() {
        const { loading, userLocation } = this.state;
        if (loading) {
            return null;
          }
        return (
          <ThemeProvider theme={theme}>
            <div>
                <div className = "map">
                <Map
                google={this.props.google}
                zoom={14}
                style={mapStyles}
                disableDefaultUI = {true}
                initialCenter={          {
                    lat: -33.873001,
                    lng: 151.207001
                }}
                center={userLocation}
                />
                </div>
                <div className = "overlay">
                    <Fab onClick={this.searchToilets} size='medium' style={{backgroundColor: "#126e82", height:'300px', width: '300px', position:'fixed', left:'43%', top:'30%'}}>
                      <Logo fontSize="small" style={{fontSize:'200px', fontColor:'#ffffff'}} color='secondary'/>
                    </Fab>
                    <AutofillAddress updateLocation = {this.setMapCenter}/>
                    
                </div>
                <div className="mapslider">
                  <DistSlider  setDistance = {this.setDistance}/>
                </div>

            </div>
          </ThemeProvider>
        );
    }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDE9Fglhab96KVJOh0xfyr7zGhNaccQO_s'
})(MapContainer);