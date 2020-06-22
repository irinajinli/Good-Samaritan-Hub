import React, { Component } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import "./App.css";
import TopBar from "./components/TopBar";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Registration from "./components/Registration";
import LoggedInWrapper from "./components/LoggedInWrapper";
import AdminLogin from "./components/AdminLogin";
import AdminHome from "./components/AdminHome";

import { getUsers, getPosts } from './data/hardCodedData';
import { reportPost, deactivatePost } from './actions/user';

class App extends Component {
  // Global theme
  theme = createMuiTheme({
    typography: {
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Muli"',
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
    },
  });

  // Initial global state
  state = {
    user: getUsers()[0], // Current user that is logged in. TODO: Init to {}/undefined and change this based on which user is logged in
    users: getUsers(),
    posts: getPosts(),
  };

  render() {
    const { user, users, posts } = this.state;

    return (
      <React.Fragment>
        <ThemeProvider theme={this.theme}>
          <BrowserRouter>
            <Switch>
              {/* Shows a different component depending on the exact path in the URL */}
              
              <Route
                exact
                path={["/home", "/profile", "/inbox"]}
                render={() => (
                  <LoggedInWrapper
                    appComponent={this}
                    user={user}
                    posts={posts}
                    reportPost={reportPost}
                    deactivatePost={deactivatePost}
                  />
                )}
              />
              <Route
                exact
                path="/admin/home"
                render={() => <AdminHome users={users} />}
              />

              {/* The pages in this fragment share the same top bar */}
              <React.Fragment>
                <TopBar />
                <Route exact path="/" render={() => <Landing />} />
                <Route
                  exact
                  path="/login"
                  render={() => <Login title="User Login" />}
                />
                <Route
                  exact
                  path="/registration"
                  render={() => <Registration />}
                />
                <Route exact path="/admin" render={() => <AdminLogin />} />
              </React.Fragment>
            </Switch>
          </BrowserRouter>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

export default App;
