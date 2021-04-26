import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Rating from '@material-ui/lab/Rating';
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { DirMap, DisplayReviews, MakeReview } from '.././'


import HomeIcon from '@material-ui/icons/Home';
import MapIcon from '@material-ui/icons/Map';
import RateReviewIcon from '@material-ui/icons/RateReview';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import AccessibleIcon from '@material-ui/icons/Accessible';
import BathtubIcon from '@material-ui/icons/Bathtub';
import WcIcon from '@material-ui/icons/Wc';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import ChildFriendlyIcon from '@material-ui/icons/ChildFriendly';
import PaymentIcon from '@material-ui/icons/Payment';
import AccessibleForwardIcon from '@material-ui/icons/AccessibleForward';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import DirectionsIcon from '@material-ui/icons/Directions';

function getHomeIcon() {
  return <HomeIcon/>
}

function getNavIcon() {
  return <MapIcon/>
}

function getReviewIcon() {
  return <RateReviewIcon/>
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
          
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function getGoogleMapsLink(lat, lng) {
  return 'https://www.google.com/maps/search/'+lat+',+'+lng+'/@'+lat+','+lng+',17z'
}


export default function FullWidthTabs(props) {
    const theme = createMuiTheme({
        palette: {
          primary: {
            main: '#126e82',
          },
          secondary: {
            main: '#ffffff',
          },
          off: {
            main: '#696969',
          },
        },
      });
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  function getColour(param) {
    console.log(props.toiletInfo[param])
    if (props.toiletInfo[param] === "True" || props.toiletInfo[param] == true) {
      return "primary"
    }
    else {
      return "off"
    }
  }
  function getReviewRating(reviews) {
    var sum = 0;
    console.log(reviews)
    for (var i=0; i < reviews.length; i++) {
      sum=sum+parseFloat(reviews[i]["review_score"])
    }

    return sum/reviews.length
  }


  return (
    <div className="">
        <ThemeProvider theme={theme}>
            <AppBar position="static" color="white" elevation={0}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label={getHomeIcon()} {...a11yProps(0)} ><HomeIcon color='primary'/></Tab>
                    <Tab label={getNavIcon()} {...a11yProps(1)} />
                    <Tab label={getReviewIcon()} {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
              className="swipeableview"
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <Typography variant="h5" gutterBottom align='left'>{props.toiletInfo["name"]}</Typography>
                    <Divider></Divider>
                    <div className='toiletoverview'>
                        <div >
                          <Rating name="simple-controlled" value={getReviewRating(props.toiletInfo["reviews"])} precision={0.1} readOnly align='left'/>
                          <Typography variant="p" style={{top:''}}>
                            <IconButton size = "small">
                              <AddIcon/>
                            </IconButton> 
                            {props.toiletInfo["review_count"]} Reviews
                          </Typography>
                        </div>
                        <div>
                          <Chip className="toiletchips" variant="outlined" size="small" label="Shower" icon={<BathtubIcon/>} color= {getColour("shower")}/>
                          <Chip className="toiletchips" variant="outlined" size="small" label="Unisex" icon={<WcIcon/>} color= {getColour("unisex")}/>
                          <Chip className="toiletchips" variant="outlined" size="small" label="Change Room" icon={<MeetingRoomIcon/>} color= {getColour("changeroom")}/>
                          <Chip className="toiletchips" variant="outlined" size="small" label="Inclusive" icon={<AllInclusiveIcon/>} color= {getColour("inclusive")}/>
                          <Chip className="toiletchips" variant="outlined" size="small" label="Accessible" icon={<AccessibleForwardIcon/>} color= {getColour("accessible")}/>
                          <Chip className="toiletchips" variant="outlined" size="small" label="Ambulant" icon={<AccessibleIcon/>} color= {getColour("ambulant")}/>
                          <Chip className="toiletchips" variant="outlined" size="small" label="Baby Change" icon={<ChildFriendlyIcon/>} color= {getColour("babychange")}/>
                          <Chip className="toiletchips" variant="outlined" size="small" label="Payment" icon={<PaymentIcon/>} color= {getColour("payment")}/>
                          <Chip className="toiletchips" variant="outlined" size="small" label="Parking" icon={<DirectionsCarIcon/>} color= {getColour("parking")}/>
                        </div>
                        <div style={{marginTop:"10px"}}>
                          <List className="">
                            <ListItem>
                              <ListItemAvatar>
                                <Avatar>
                                  <AccessTimeIcon />
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText primary="Opening Hours" secondary={props.toiletInfo["openinghours"]} />
                            </ListItem>
                            <ListItem>
                              <ListItemAvatar>
                                <Avatar>
                                  <LocationOnIcon />
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText primary="Address" secondary={props.toiletInfo["address"]} />
                            </ListItem>
                            <ListItem>
                              <ListItemAvatar>
                                <Avatar>
                                  <SpeakerNotesIcon />
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText primary="Additional Notes" secondary={props.toiletInfo["note"]} />
                            </ListItem>
                          </List>
                        </div>
                        
                    </div>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                  <Typography variant="h5" gutterBottom align='left'>Directions to {props.toiletInfo["name"]}</Typography>
                  <Divider></Divider>
                  <div className='toiletoverview'>
                    <DirMap toiletInfo={props.toiletInfo}/>
                    <List className="dirlist">
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <LocationOnIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Address" secondary={props.toiletInfo["address"]} />
                      </ListItem>
                      <ListItem>
                        <Button href={getGoogleMapsLink(props.toiletInfo["lat"],props.toiletInfo["lng"])} color="primary" variant="contained" startIcon={<DirectionsIcon/>}>To Google Maps</Button>
                      </ListItem>
                    </List>
                  </div>
                  
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                  <Typography variant="h5" gutterBottom align='left'>What {props.toiletInfo["review_count"]} People Are Saying</Typography>
                  <Divider></Divider>
                  <MakeReview/>
                  <DisplayReviews reviews={props.toiletInfo["reviews"]}/>
                </TabPanel>
            </SwipeableViews>
        </ThemeProvider>
    </div>
  );
}