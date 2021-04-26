import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
export default function Title(props) {
  return (
    <div>
      <Typography style={{padding:'15px'}} component="h2" variant="h6" color="primary" gutterBottom>
        {props.children}
      </Typography>
      <Divider/>
    </div>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};