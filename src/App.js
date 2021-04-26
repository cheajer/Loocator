import './App.css';
import { Header, Map, ToiletSearch, EstLogin, EstRegister, EstDashboard, Footer, ToiletPage, RegisterToilet, UserRegister, UserLogin, EstHeader } from './components'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { useState } from 'react';

function setUserToken(userToken) {
  sessionStorage.setItem('usertoken', JSON.stringify(userToken));
}
function getUserToken() {
  const tokenString = sessionStorage.getItem('usertoken');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}
function setEstToken(userToken) {
  sessionStorage.setItem('esttoken', JSON.stringify(userToken));
}
function getEstToken() {
  const tokenString = sessionStorage.getItem('esttoken');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}

function App() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#126e82',
      },
      secondary: {
        main: '#ffffff',
      },
      text: {
        main: '#132c33'
      }
    },
  });


  return (
    <ThemeProvider theme={theme}>
      <Router className="body">
          <Switch>
            <Route path="/user/dashboard">
              <Header/>
              <Map />
            </Route>
            <Route path="/user/toilets">
              <Header/>
              <ToiletSearch />
            </Route>
            <Route path="/user/toilet/info">
              <Header/>
              <ToiletPage />
            </Route>
            <Route path="/user/register">
              <Header/>
              <UserRegister/>
            </Route>
            <Route path="/user/login">
              <UserLogin setToken={setUserToken}/>
            </Route>
            <Route path="/est/register">
              <Header/>
              <EstRegister/>
            </Route> 
            <Route path="/est/login">
              <EstLogin setToken={setEstToken}/>
            </Route> 
            <Route path="/est/dashboard">
              <EstHeader/>
              <EstDashboard />
            </Route>                           
            <Route path="/est/registertoilet">
              <RegisterToilet />
            </Route>
          </Switch>
          <Footer/>
      </Router>
    </ThemeProvider>
      
    );
}

export default App;
