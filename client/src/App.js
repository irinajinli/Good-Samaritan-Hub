import React, { Component } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import "./App.css";
import TopBar from "./components/TopBar";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Registration from "./components/Registration";
import UserView from "./components/UserView";
import AdminHome from "./components/AdminHome";

import { readCookie, logoutUser } from "./actions/user";

class App extends Component {
  constructor(props) {
    super(props);
    readCookie(this); // sees if a user is logged in.
  }

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
    palette: {
      primary: {
        light: "#4f5b62",
        main: "#263238",
        dark: "#000a12",
        contrastText: "#fff",
      },
    },
  });

  // Initial global state
  state = {
    user: null
  };

  handleLogout = () => {
    this.setState({ user: null });
    logoutUser();
  };

  render() {
    const { user, users, messages } = this.state;

    return (
      <React.Fragment>
        <ThemeProvider theme={this.theme}>
          <BrowserRouter>
            <Switch>
              {/* Shows a different component depending on the exact path in the URL */}

              {/* User views */}
              <Route
                exact
                path={["/login", "/home", "/profile", "/inbox", "/setting"]}
                render={() => (
                  // check if someone is logged in
                  <div className="app">
                    {!user ? (
                      <div>
                        <TopBar />
                        <Login appComponent={this} />
                      </div>
                    ) : !user.admin ? (
                      <UserView
                        appComponent={this}
                        user={user}
                        users={users}
                        handleLogout={this.handleLogout}
                      />
                    ) : (
                      <AdminHome
                        handleLogout={this.handleLogout}
                      />
                    )}
                  </div>
                )}
              />

              {/* Admin homepage */}
              <Route
                exact
                path="/admin/home"
                render={() => (
                  <AdminHome
                    handleLogout={this.handleLogout}
                  />
                )}
              />

              {/* User login and registration. */}
              <Route
                exact
                // OLD
                // path={["/", "/login", "/registration"]}
                path={["/", "/registration"]}
                render={() => (
                  <React.Fragment>
                    <TopBar />
                    <Route exact path="/" render={() => <Landing />} />
                    <Route exact path="/login" render={() => <Login />} />
                    <Route
                      exact
                      path="/registration"
                      render={() => <Registration />}
                    />
                  </React.Fragment>
                )}
              />

              {/* Admin login */}
              <Route
                exact
                path="/admin"
                render={() => (
                  <React.Fragment>
                    {!user ? (
                      <div>
                        <TopBar />
                        <Login appComponent={this} />
                      </div>
                    ) : !user.admin ? (
                      <div>Forbidden</div>
                    ) : (
                      <AdminHome
                        messages={messages}
                        handleLogout={this.handleLogout}
                      />
                    )}
                    {/* <TopBar />
                    <Login appComponent={this} /> */}
                  </React.Fragment>
                )}
              />
            </Switch>
          </BrowserRouter>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

export default App;
