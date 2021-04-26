import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { GoogleApiWrapper } from 'google-maps-react';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import '../style.css';
import { RegisterMessage } from '..';
import AutofillAddress from './ToiletRegisterAutofillAddress'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Loocator
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
    box: {
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
    },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export function RegisterToilet() {
  const classes = useStyles();
  const [name, setName] = useState("")
  const [opening, setOpening] = useState("")
  const [address, setAddress] = useState("")
  const [additional, setAdditional] = useState("")
  const [town, setTown] = useState("")
  const [state, setTState] = useState("")
  const [accessible, setAccessible] = useState(false)
  const [ambulant, setAmbulant] = useState(false)
  const [babychange, setBabyChange] = useState(false)
  const [changeroom, setChangeRoom] = useState(false)
  const [inclusive, setInclusive] = useState(false)
  const [parking, setParking] = useState(false)
  const [payment, setPayment] = useState(false)
  const [shower, setShower] = useState(false)
  const [unisex, setUnisex] = useState(false)
  const [coords, setCoords] = useState({ lat: -33.873001, lng: 151.207001 })
  
  const setCoordsfromChild = (latitude, longitude) => {
    setCoords({
      lat:latitude,
      lng:longitude
    })
}

  const [response, setResponse] = useState({
      "response": ""
  })
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  function handleSubmit() {
    const pathname = 'http://localhost:3000/est/registertoilet'
    setOpen(true);
    var token = sessionStorage.getItem('esttoken')
    token = JSON.parse(token)
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "name": name,
            "address": address,
            "owner": token["id"],
            "openinghours": opening,
            "additional": additional,
            "ambulant": ambulant,
            "accessible": accessible,
            "babychange": babychange,
            "changeroom": changeroom,
            "inclusive": inclusive,
            "parking": parking,
            "payment": payment,
            "shower": shower,
            "unisex": unisex,
            "latitude": coords.lat,
            "longitude": coords.lng,
            "town": town,
            "state": state
        }),
    }
    console.log(options)
    fetch(pathname, options)
        .then(res => res.json())
            .then(
                (result) => {
                  console.log(result)
                setResponse(result)
                // if (result == "1") {
                //   window.location.href = 'http://localhost:3000/est/dashboard'
                // }
            },
            (error) => {
                console.log(error)
            }
            )
        window.location.href="/est/dashboard"
        return false
    }

  return (
    <div>
    <Container className={classes.box} style={{backgroundColor:"#ffffff"}} component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon color="primary"/>
        </Avatar>
        <Typography color='primary' component="h1" variant="h5">
            Establishment Register Toilet
        </Typography>
        <form id="form" className={classes.form} noValidate>
          <Grid container spacing={2}>
          <Grid item xs={12}>
          <Typography style={{marginTop:'20px'}} color='primary' variant="body1">
                Toilet Name
              </Typography>
              <Divider style={{marginTop:'5px', marginBottom:'20px'}}/>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Toilet Name"
                name="name"
                autoComplete="name"
                onChange={(e) => setName(e.target.value)}
              />
              <Typography style={{marginTop:'20px'}} color='primary' variant="body1">
                Toilet Details (Check if applies.)
              </Typography>
              <Divider style={{marginTop:'5px'}}/>
            </Grid>
            <Grid item xs={12} sm={6}>
            <FormGroup>
              <FormControlLabel
                control={<Switch onChange={(e)=>setAccessible(e.target.checked)} color='primary'/>}
                label="Accessible"
              />
              <FormControlLabel
                control={<Switch onChange={(e)=>setAmbulant(e.target.checked)} color='primary'/>}
                label="Ambulant"
              />
              <FormControlLabel
                control={<Switch onChange={(e)=>setBabyChange(e.target.checked)} color='primary'/>}
                label="Baby Change"
              />
              <FormControlLabel
                control={<Switch onChange={(e)=>setChangeRoom(e.target.checked)} color='primary'/>}
                label="Change Room"
              />
               <FormControlLabel
                control={<Switch onChange={(e)=>setInclusive(e.target.checked)} color='primary'/>}
                label="Inclusive"
              />                                        
            </FormGroup>
            </Grid>
            <Grid item xs={12} sm={6}>
            <FormGroup>
              <FormControlLabel
                control={<Switch onChange={(e)=>setParking(e.target.checked)} color='primary'/>}
                label="Parking"
              />
              <FormControlLabel
                control={<Switch onChange={(e)=>setPayment(e.target.checked)} color='primary'/>}
                label="Payment"
              />
              <FormControlLabel
                control={<Switch onChange={(e)=>setShower(e.target.checked)} color='primary'/>}
                label="Shower"
              />
               <FormControlLabel
                control={<Switch onChange={(e)=>setUnisex(e.target.checked)} color='primary'/>}
                label="Unisex"
              />                                        
            </FormGroup>
            </Grid>
            <Grid item xs={12}>
              <Divider style={{marginBottom: '20px'}}/>
              <TextField
                autoComplete="opening"
                name="opening"
                variant="outlined"
                required
                fullWidth
                id="opening"
                label="Opening Hours"
                autoFocus
                onChange={(e) => setOpening(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography style={{marginTop:'20px'}} color='primary' variant="body1">
                Toilet Address
              </Typography>
              <Divider style={{marginTop:'5px', marginBottom:'20px'}}/>
              <AutofillAddress  updateLocation={setCoordsfromChild} setAddress={setAddress}/>
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                autoComplete="opening"
                name="opening"
                variant="outlined"
                required
                fullWidth
                id="opening"
                label="State"
                autoFocus
                onChange={(e) => setTState(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                autoComplete="opening"
                name="opening"
                variant="outlined"
                required
                fullWidth
                id="opening"
                label="Suburb"
                autoFocus
                onChange={(e) => setTown(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography style={{marginTop:'20px'}} color='primary' variant="body1">
                Toilet Description
              </Typography>
              <Divider style={{marginTop:'5px', marginBottom:'20px'}}/>
              <TextField
                variant="outlined"
                fullWidth
                multiline
                rows={5}
                id="description"
                label="Description"
                name="description"
                autoComplete="desc"
                onChange={(e) => setAdditional(e.target.value)}
              />
            </Grid>


          </Grid>
          <Button
            onClick={handleSubmit}
            fullWidth
            id="butt"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Register toilet
          </Button>
          <Grid container justify="flex-start">
            <Grid item>
              <Link href="/est/dashboard" variant="body2">
                Cancel
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
      <br/>
    </Container>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDE9Fglhab96KVJOh0xfyr7zGhNaccQO_s'
})(RegisterToilet);