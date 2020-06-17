import React, { Component } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import logo from "./logo.svg";
import "./App.css";
import TopBar from "./components/TopBar";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Home from "./components/Home";
import AdminLogin from "./components/AdminLogin";
import AdminHome from "./components/AdminHome";

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

  // Hard-coded users
  users = [
    {
      username: 'user',
      password: 'user',
      firstName: 'John',
      lastName: 'Smith',
      location: '', // TODO
      bio: 'Hello world, I am John Smith!',
      posts: [],
      messagesSent: [],
      messagesRecieved: [],
      isReported: false,
      isBanned: false,
      reportedMessages: [],
      reportedPosts: [],
      banReason: ''
    },
    {
      username: 'user2',
      password: 'user2',
      firstName: 'Bobsy',
      lastName: 'Bob',
      location: '', // TODO
      bio: 'Hello world, I am Bobsy Bob!',
      posts: [],
      messagesSent: [],
      messagesRecieved: [],
      isReported: false,
      isBanned: false,
      reportedMessages: [],
      reportedPosts: [],
      banReason: ''
    },
    {
      username: 'user3',
      password: 'user3',
      firstName: 'Diane',
      lastName: 'Doe',
      location: '', // TODO
      bio: 'Hello world, I am Diane Doe!',
      posts: [],
      messagesSent: [],
      messagesRecieved: [],
      isReported: false,
      isBanned: false,
      reportedMessages: [],
      reportedPosts: [],
      banReason: ''
    },
    {
      username: 'user4',
      password: 'user4',
      firstName: 'Jack',
      lastName: 'Scott',
      location: '', // TODO
      bio: 'I am!',
      posts: [],
      messagesSent: [],
      messagesRecieved: [],
      isReported: false,
      isBanned: false,
      reportedMessages: [],
      reportedPosts: [],
      banReason: ''
    },
    {
      username: 'user5',
      password: 'user5',
      firstName: 'Sally',
      lastName: 'Sue',
      location: '', // TODO
      bio: 'Hello world, I am a scammer!',
      posts: [],
      messagesSent: [],
      messagesRecieved: [],
      isReported: false,
      isBanned: false,
      reportedMessages: [],
      reportedPosts: [],
      banReason: ''
    },
  ] ;

  // Hard-coded posts
  posts = [
    {
      title: 'Grocery Pickup',
      body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
        tempor incididunt ut labore et dolore magna aliqua. Odio pellentesque diam volutpat 
        commodo sed egestas. Faucibus purus in massa tempor nec feugiat nisl. Vitae justo 
        eget magna fermentum. Et leo duis ut diam quam nulla porttitor. Lectus proin nibh 
        nisl condimentum id venenatis. Quis commodo odio aenean sed adipiscing diam donec 
        adipiscing. Laoreet non curabitur gravida arcu ac tortor. Thanks!`,
      poster: this.users[1],
      type: 'Request',
      date: new Date(2020, 6, 12),
      status: 'active'
    },
    {
      title: 'Any pickup in Etobicoke Area',
      body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
        tempor incididunt ut labore et dolore magna aliqua. Odio pellentesque diam volutpat 
        commodo sed egestas. Faucibus purus in massa tempor nec feugiat nisl. Vitae justo 
        eget magna fermentum. Et leo duis ut diam quam nulla porttitor. Lectus proin nibh 
        nisl condimentum id venenatis. Quis commodo odio aenean sed adipiscing diam donec 
        adipiscing. Laoreet non curabitur gravida arcu ac tortor.`,
      poster: this.users[2],
      type: 'Offer',
      date: new Date(2020, 6, 5),
      status: 'active'
    }
  ];

  // Initial global state
  state = {  
    user: this.users[0], // Current user that is logged in. TODO: Init to {}/undefined and change this based on which user is logged in
    users: this.users,
    posts: this.posts,
  }
  
  componentDidMount() {
    // Temporary solution to add hard-coded posts to the hard-coded users's post lists
    this.users[1].posts.push(this.posts[0]);
    this.users[2].posts.push(this.posts[1]);
  }

  render() { 
    const { user, users, posts } = this.state;

    return (  
      <React.Fragment>
        <ThemeProvider theme={this.theme}>
          <BrowserRouter>
            <Switch>
              {/* Shows a different component depending on the exact path in the URL */}

              <Route exact path="/home" render={() => <Home
                                                        appComponent={this}
                                                        user={user}
                                                        users={users}
                                                        posts={posts}
                                                      />} />
              <Route exact path="/admin/home" render={() => <AdminHome users={users}/>} />

              {/* The pages in this fragment share the same top bar */}
              <React.Fragment>
                <TopBar />
                <Route exact path="/" render={() => <Landing />} />
                <Route exact path="/login" render={() => <Login />} />
                <Route exact path="/registration" render={() => <Registration />} />
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