import React from 'react';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

const useStyles = makeStyles((theme) => ({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 350,
      height: 40
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }));

export default function AutofillAddress(props) {
    const classes = useStyles();
    const [address, setAddress] = React.useState("");
    const [coordinates, setCoordinates] = React.useState({
        lat: null,
        lng: null
    });

    const searchToilets = () => {
        const pathname='http://localhost:3000/user/toilets?lat='+coordinates.lat+'&lng='+coordinates.lng
        window.location.href = pathname;
        
    }


    const handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setAddress(value);
        setCoordinates(latLng);
        props.updateLocation(latLng.lat, latLng.lng);
        props.setAddress(value)
    };


    

    return (
        <div className="autofill">
        <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
                <TextField variant='outlined' style={{width:'396.02px'}} {...getInputProps({ placeholder: "Begin typing address" })}  > </TextField>
                {/* <input className='addressfield' {...getInputProps({ placeholder: "Type address" })} /> */}

                <div className='dropdown'>
                {loading ? <div>...loading</div> : null}

                {suggestions.map(suggestion => {
                    const style = {
                    backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                    };

                    return (
                    <div {...getSuggestionItemProps(suggestion, { style })}>
                        {suggestion.description}
                        <Divider/>
                    </div>
                    );
                })}
                </div>
            </div>
            )}
        </PlacesAutocomplete>

        </div>
    );
}