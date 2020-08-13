// based on
// https://github.com/bradtraversy/react_step_form/blob/master/src/components/UserForm.js

import React from "react";
import { withStyles } from '@material-ui/styles';
import Button from "@material-ui/core/Button";

import RegBasicInfo from "../RegBasicInfo";
import RegAccountInfo from "../RegAccountInfo";
import RegBio from "../RegBio";
import "./styles.css";

const styles = () => ({
  centre: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  }
});

export class Registration extends React.Component {
  state = {
    step: 1,
    firstName: "",
    lastName: "",
    phoneNum: "",
    location: "",
    email: "",
    username: "",
    password: "",
    confirmPass: "",
    bio: "",
    reqsSatisfied: true,
    passwordsMatch: true,
  };

  reset = () => {
    this.setState({ step: 1, reqsSatisfied: true });
  };

  passwordsMatch = () => {
    return this.state.password === this.state.confirmPass;
  };

  // Proceed to next step
  nextStep = () => {
    if (this.passwordsMatch()) {
      const { step } = this.state;
      this.setState({
        passwordsMatch: true,
        step: step + 1,
      });
    } else {
      this.setState({ passwordsMatch: false });
    }
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1,
    });
  };

  reqsSatisfied = () => {
    if (
      this.state.username === "" ||
      this.state.password === "" ||
      this.state.firstName === "" ||
      this.state.lastName === "" ||
      this.state.location === ""
    ) {
      this.setState({ reqsSatisfied: false });
      return false;
    } else return true;
  };

  finish = () => {
    if (this.reqsSatisfied()) {
      const reqBody = JSON.stringify(this.state);
      const request = new Request("/user", {
        method: "post",
        body: reqBody,
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      });

      fetch(request)
        .then((res) => {
          if (res.status === 200) {
            window.location.href = "/regsuccess";
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  handleKeyDown = (event) => {
    if (event.keyCode == 13) {
      this.nextStep();
    }
  };

  // Handle fields change
  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  handleLocationChange = (e, values) => {
    this.setState({
      location: values,
    });
    console.log(this.state);
  };

  render() {
    const {
      step,
      firstName,
      lastName,
      phoneNum,
      location,
      email,
      username,
      password,
      confirmPass,
      bio,
    } = this.state;
    
    const values = {
      firstName,
      lastName,
      phoneNum,
      location,
      email,
      username,
      password,
      confirmPass,
      bio,
    };

    const { classes } = this.props;

    switch (step) {
      case 1:
        return (
          <div className={classes.centre}>
            <div className="title">Registration</div>
            <RegBasicInfo
              nextStep={this.nextStep}
              handleChange={this.handleChange}
              handleLocationChange={this.handleLocationChange}
              values={values}
            />
          </div>
        );
      case 2:
        return (
          <div className={classes.centre}>
            <div className="title">Registration</div>
            <RegAccountInfo
              nextStep={this.nextStep}
              prevStep={this.prevStep}
              handleChange={this.handleChange}
              handleKeyDown={this.handleKeyDown}
              values={values}
            />
            {!this.state.passwordsMatch && (
              <div className="red">Passwords don't match!</div>
            )}
          </div>
        );
      case 3:
        return (
          <div className={classes.centre}>
            <div className="title">Registration</div>
            {!this.state.reqsSatisfied && (
              <div >
                Please fill all required fields.
                <div>
                  <Button color="primary" variant="contained" onClick={this.reset} className="marginTop">
                    Try again
                  </Button>
                </div>
              </div>
            )}
            {this.state.reqsSatisfied && (
              <RegBio
                finish={this.finish}
                prevStep={this.prevStep}
                handleChange={this.handleChange}
                values={values}
              />
            )}
          </div>
        );
      default:
        return <div className={classes.centre}>"Whoops, this step doesn't exist!"</div>
    }
  }
}

export default withStyles(styles)(Registration);
