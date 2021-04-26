import React from 'react';
import {NavLink, withRouter} from 'react-router-dom'
import {ReactComponent as Logo} from '../assets/toilet.svg';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './style.css';
const Header = ({history}) =>{
    const theme = createMuiTheme({
        overrides: {
            MuiButton: {
                text: {
                    // Some CSS
                    borderRadius: '3px',
                    borderColor: 'white',
                    color: 'white',
                    textDecoration:'underline',
                    height: 30,
                    padding: '0 30px',
                    marginRight: '10px',
                    fontWeight:'bold'

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
    const handleClick=() =>{
        window.location.href = 'http://localhost:3000/user/register'
    }

    var token = sessionStorage.getItem("usertoken")
    if (token) {
        token = token["flag"]
    }
    const handleLogOut=() => {
        sessionStorage.setItem("usertoken", "{flag : 0}")
        window.location.href = '/user/dashboard'
    }
    if (sessionStorage.getItem("usertoken") ===null) {
        sessionStorage.setItem("usertoken", "{flag : 0}")
    }

    return(
        <ThemeProvider theme = {theme}>
        <nav className='nav-header'>
            <div className='div-header'>
                <div className='div-svg' onClick={() => history.push('/')}>
                    <Logo>Loocator</Logo>
                </div>
                <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                    {Object.values(sessionStorage.getItem("usertoken")[9])==1 
                    ? <Typography color='secondary' variant='button' style={{fontWeight:'bold'}}>Hi {JSON.parse(sessionStorage.getItem("usertoken"))["username"]},</Typography>
                    : <div/>
                    }

                    {Object.values(sessionStorage.getItem("usertoken")[9])==1 ? <Button onClick={handleLogOut}>Logout</Button>: <Button onClick={handleClick}>Register Now</Button>}
                    <NavLink exact to='/user/dashboard' activeClassName='active'><AccountBoxIcon className='div-svg' color ="secondary"/></NavLink>
                    <NavLink exact to='/est/login' activeClassName='active'><AccountBalanceIcon className='div-svg'  color ="secondary"/></NavLink>
                </div>
            </div>
        </nav>
        </ThemeProvider>
    )
}

export default withRouter(Header);
