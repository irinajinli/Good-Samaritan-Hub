import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./styles.css";
import "../../index.css";

class LoginInput extends React.Component {
  state = {
    username: "",
    password: "",
    wrongCreds: false,
  };

  handleOnChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };

  handleKeyDown = (event) => {
    if (event.keyCode == 13) {
      // if enter key was pressed
      this.checkCredentials();
    }
  };

  goToHome = () => {
    window.location.href = "/home";
  };

  goToAdminHome = () => {
    window.location.href = "/admin/home";
  };

  handleOnClick = () => {
    window.location.href = "/registration";
  };

  checkCredentials = () => {
    if (window.location.pathname === "/login") {
      if (this.state.username === "user" && this.state.password === "user") {
        this.goToHome();
      } else {
        this.setState({ wrongCreds: true });
        // debugger;
      }
    } else if (window.location.pathname === "/admin") {
      if (this.state.username === "admin" && this.state.password === "admin") {
        this.goToAdminHome();
      } else console.log("credentials incorrect");
    }
  };

  render() {
    const wrongCreds = this.state.wrongCreds;
    let wrongCredsMessage;

    if (wrongCreds) {
      wrongCredsMessage = (
        <div className="red smallMarginTop">
          <div>Incorrect credentials.</div>
          <div>Please try again.</div>
        </div>
      );
    }

    return (
      <div>
        <div>
          <TextField
            label="Username"
            name="username"
            variant="outlined"
            onChange={this.handleOnChange}
          />
        </div>
        {/* <div className="marginTop"></div> */}
        <div>
          <TextField
            type="password"
            className="marginTop"
            label="Password"
            name="password"
            variant="outlined"
            onChange={this.handleOnChange}
            onKeyDown={this.handleKeyDown}
          />
        </div>
        <div className="smallMarginTop">
          <span
            className="hover-pointer grey"
            onClick={() => this.handleOnClick()}
          >
            Need to register?
          </span>
        </div>
        <div>
          <Button
            className="smallMarginTop"
            variant="contained"
            color="primary"
            onClick={() => this.checkCredentials()}
          >
            LOG IN
          </Button>
        </div>
        {/* the following only renders if wrong credentials were input */}
        {wrongCredsMessage}
      </div>
    );
  }
}

export default LoginInput;
