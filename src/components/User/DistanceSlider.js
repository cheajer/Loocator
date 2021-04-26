import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 300 + theme.spacing(3) * 2,
    width: 30,
    marginTop: '50px'
  },
  margin: {
    height: theme.spacing(3),
  },
}));

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <div>
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
    </div>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
};


export default function CustomizedSlider(props) {
    const classes = useStyles();


    function handleChange(event, value) {
        props.setDistance(event, value)
    }


  return (
    <div className={classes.root}>
      <Slider
        orientation = 'vertical'
        valueLabelDisplay="on"
        defaultValue={5}
        max={20}
        onChange={handleChange}
      />
    </div>
  );
}
