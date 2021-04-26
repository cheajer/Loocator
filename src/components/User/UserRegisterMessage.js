import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import '../style.css';
import shadows from '@material-ui/core/styles/shadows';

const theme = createMuiTheme({
    overrides: {
        MuiPaper: {
            root : {
                boxShadow:'0px'
            },
            elevation6 : {
                boxShadow: '0px!important'
            }
        },
        MuiSnackbar: {
            root: {
                // Some CSS
                padding:'0px!important',
                backgroundColor:'none',
                color: 'transparent',
                boxShadow: '0',
                elevation:'0',
                transition:'0'
              },
        },
        MuiSnackbarContent: {
            root: {
                // Some CSS
                padding:'1px!important',
                backgroundColor:'#fafafa'
              },   
        }
    },
    palette: {
        primary: {
            main: '#126e82',
        },
        secondary: {
            main: '#ffffff',
        },
        text: {
            main: '#132c33',
        }
    },
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomizedSnackbars(props) {
  const classes = useStyles();

  function getPopUpMessage() {
    if (props.response == "Register Success. You may now log in.") {
      return "success"
    }
    else {
      return "error"
    }
  }

  return (
    <ThemeProvider theme = {theme}>
    <div className={classes.root}>
      <Snackbar className={"snackbar"} style={{padding:0}} open={props.open} autoHideDuration={50000} onClose={props.handleClose} action={
          <Alert severity={getPopUpMessage()}>{props.response}</Alert>
      }>
        
      </Snackbar>
      {/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
    </div>
    </ThemeProvider>
  );
}