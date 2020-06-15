import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import logo from './logo.svg';
import './App.css';
import TopBar from './components/TopBar';
import Landing from './components/Landing';
import Login from './components/Login';
import Registration from './components/Registration';
import Home from './components/Home';
import AdminLogin from './components/AdminLogin';
import AdminHome from './components/AdminHome';

function App() {
  const theme = createMuiTheme({
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Muli"',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
  });

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch> 
            { /* Shows a different component depending on the exact path in the URL */ }

            <Route exact path='/home' render={() => (<Home />)}/>
            <Route exact path='/admin/home' render={() => (<AdminHome />)}/>

            { /* The pages in this fragment share the same top bar */ }
            <React.Fragment>
              <TopBar />
              <Route exact path='/' render={() => (<Landing />)}/>
              <Route exact path='/login' render={() => (<Login />)}/>
              <Route exact path='/registration' render={() => (<Registration />)}/>
              <Route exact path='/admin' render={() => (<AdminLogin />)}/>
            </React.Fragment>

          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
