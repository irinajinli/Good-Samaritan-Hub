// based on
// https://github.com/bradtraversy/react_step_form/blob/master/src/components/UserForm.js

import React from "react";
import { withStyles } from "@material-ui/styles";
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
  },
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
    stepComplete1: true,
    stepComplete2: true,
  };

  reset = () => {
    this.setState({ step: 1, reqsSatisfied: true });
  };

  passwordsMatch = () => {
    return this.state.password === this.state.confirmPass;
  };

  // Proceed to next step
  nextStep = () => {
    const {
      step,
      firstName,
      lastName,
      location,
      username,
      password,
      confirmPass,
    } = this.state;
    if (step === 1) {
      if (firstName === "" || lastName === "" || location === "") {
        this.setState({ stepComplete1: false });
        console.log("step 1 incomplete");
        return;
      }
    } else if (step === 2) {
      if (username === "" || password === "" || confirmPass === "") {
        this.setState({ stepComplete2: false });
        console.log("step 2 incomplete");
        return;
      } else {
        this.setState({ stepComplete2: true });
      }
      if (this.passwordsMatch()) {
        const { step } = this.state;
        this.setState({
          passwordsMatch: true,
          step: step + 1,
        });
        return;
      } else {
        this.setState({ passwordsMatch: false });
        return;
      }
    }

    this.setState({ step: step + 1 });
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
              handleKeyDown={this.handleKeyDown}
              values={values}
            />
            {!this.state.stepComplete1 && (
              <div className="red registration--margin-top">Please fill in all required fields.</div>
            )}
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
              <div className="red registration--margin-top">Passwords don't match!</div>
            )}
            {!this.state.stepComplete2 && (
              <div className="red registration--margin-top">Please fill in all required fields.</div>
            )}
          </div>
        );
      case 3:
        return (
          <div className={classes.centre}>
            <div className="title">Registration</div>
            {!this.state.reqsSatisfied && (
              <div>
                Please fill all required fields.
                <div>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={this.reset}
                    className="marginTop"
                  >
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
                handleKeyDown={this.handleKeyDown}
                values={values}
              />
            )}
          </div>
        );
      default:
        return (
          <div className={classes.centre}>
            "Whoops, this step doesn't exist!"
          </div>
        );
    }
  }
}

export default withStyles(styles)(Registration);