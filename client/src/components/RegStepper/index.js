// based on
// https://github.com/bradtraversy/react_step_form/blob/master/src/components/UserForm.js

import React from "react";
import Button from "@material-ui/core/Button";
import RegBasicInfo from "../RegBasicInfo";
import RegAccountInfo from "../RegAccountInfo";
import RegBio from "../RegBio";
import "./styles.css";

export class RegStepper extends React.Component {
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
    const { step } = this.state;
    const {
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

    switch (step) {
      case 1:
        return (
          <div>
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
          <div>
            <div className="title">Registration</div>
            <RegAccountInfo
              nextStep={this.nextStep}
              prevStep={this.prevStep}
              handleChange={this.handleChange}
              values={values}
            />
            {!this.state.passwordsMatch && (
              <div className="red">Passwords don't match!</div>
            )}
          </div>
        );
      case 3:
        return (
          <div>
            <div className="title">Registration</div>
            {!this.state.reqsSatisfied && (
              <div>
                Please fill all required fields.
                <Button color="primary" onClick={this.reset}>
                  Try again
                </Button>
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
        console.log("Whoops, this step doesn't exist!");
    }
  }
}

export default RegStepper;
