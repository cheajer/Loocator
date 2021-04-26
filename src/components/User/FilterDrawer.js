import React from 'react';
import clsx from 'clsx';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FilterListIcon from '@material-ui/icons/FilterList';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CheckBox from '@material-ui/core/CheckBox';
import AccessibleIcon from '@material-ui/icons/Accessible';
import BathtubIcon from '@material-ui/icons/Bathtub';
import WcIcon from '@material-ui/icons/Wc';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import ChildFriendlyIcon from '@material-ui/icons/ChildFriendly';
import PaymentIcon from '@material-ui/icons/Payment';
import AccessibleForwardIcon from '@material-ui/icons/AccessibleForward';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import DirectionsIcon from '@material-ui/icons/Directions';


const theme = createMuiTheme({
    overrides:{
        MuiDrawer :{
            paper: {
                backgroundColor: "#fafafa"
            },
            root: {
                backgroundColor: '#fafafa'
            }
        }
    },
    palette: {
        primary:{
            main:'#126E82'
        }
    }
})

const useStyles = makeStyles({
  list: {
    width: 250,
    height: '100%',
    backgroundColor: '#fafafa'
  },
  fullList: {
    width: 'auto',
    backgroundColor: '#fafafa'
  },
});

export default function SwipeableTemporaryDrawer(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
    <ThemeProvider theme={theme}>
      <Typography style = {{marginTop:'50%', textAlign:'right', paddingRight:'5px'}} variant='h5'>Filter Options</Typography>
        
      <List>
        <Divider />
          <ListItem>
            <CheckBox checked={props.unisex} onChange={props.handleFilter} name="unisex" color="primary"></CheckBox>
            <ListItemIcon><WcIcon/></ListItemIcon>
            <ListItemText primary="Unisex" />
          </ListItem>
          <Divider />
          <ListItem>
            <CheckBox checked={props.ambulant} onChange={props.handleFilter} name="ambulant" color="primary"></CheckBox>
            <ListItemIcon><AccessibleIcon/></ListItemIcon>
            <ListItemText primary="Ambulant" />
          </ListItem>
          <Divider />
          <ListItem>
            <CheckBox checked={props.accessible} onChange={props.handleFilter} name="accessible" color="primary"></CheckBox>
            <ListItemIcon><AccessibleForwardIcon/></ListItemIcon>
            <ListItemText primary="Accessible" />
          </ListItem>
          <Divider />
          <ListItem>
            <CheckBox checked={props.babychange} onChange={props.handleFilter} name="babychange" color="primary"></CheckBox>
            <ListItemIcon><ChildFriendlyIcon/></ListItemIcon>
            <ListItemText primary="Baby Change" />
          </ListItem>
          <Divider />
          <ListItem>
            <CheckBox checked={props.shower} onChange={props.handleFilter} name="shower" color="primary"></CheckBox>
            <ListItemIcon><BathtubIcon/></ListItemIcon>
            <ListItemText primary="Shower" />
          </ListItem>
          <Divider />
          <ListItem>
            <CheckBox checked={props.changeroom} onChange={props.handleFilter} name="changeroom" color="primary"></CheckBox>
            <ListItemIcon><MeetingRoomIcon/></ListItemIcon>
            <ListItemText primary="Changeroom" />
          </ListItem>
          <Divider />
          <ListItem>
            <CheckBox checked={props.parking} onChange={props.handleFilter} name="parking" color="primary"></CheckBox>
            <ListItemIcon><DirectionsCarIcon/></ListItemIcon>
            <ListItemText primary="Parking" />
          </ListItem>
          <Divider />
          <ListItem>
            <CheckBox checked={props.inclusive} onChange={props.handleFilter} name="inclusive" color="primary"></CheckBox>
            <ListItemIcon><AllInclusiveIcon/></ListItemIcon>
            <ListItemText primary="Inclusive" />
          </ListItem>
          <Divider />
      </List>
      </ThemeProvider>
    </div>
  );

  return (
    <div>
        <IconButton onClick={toggleDrawer("right", true)} style={{marginTop:'0px', left:'150px'}}>
            <FilterListIcon/>
        </IconButton>
        <SwipeableDrawer PaperProps={{backgroundColor:'green'}} className="drawer"
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
        onOpen={toggleDrawer("right", true)}
        >
        {list("right")}
        </SwipeableDrawer>
    </div>
  );
}
