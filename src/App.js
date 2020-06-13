import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import TopBar from './components/TopBar';
import Landing from './components/Landing';
import Login from './components/Login';
import Registration from './components/Registration';
import AdminLogin from './components/AdminLogin';
import Home from './components/Home';

function App() {
  return (
    <React.Fragment>
      <TopBar />
      <BrowserRouter>
        <Switch> 
          { /* Shows a different component depending on the exact path in the URL */ }
          <Route exact path='/' render={() => (<Landing />)}/>
          <Route exact path='/login' render={() => (<Login />)}/>
          <Route exact path='/registration' render={() => (<Registration />)}/>
          <Route exact path='/home' render={() => (<Home />)}/>
          <Route exact path='/adminLogin' render={() => (<AdminLogin />)}/>
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
