// based on
// https://github.com/bradtraversy/react_step_form/blob/master/src/components/UserForm.js

import React from "react";
import RegBasicInfo from "../RegBasicInfo";
import RegAccountInfo from "../RegAccountInfo";
import RegBio from "../RegBio";

const bcrypt = require("bcryptjs");

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
  };

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1,
    });
  };

  finish = () => {
    this.state.location = "PLACEHOLDER";

    // BCRYPT HASHING
    // const password = this.state.password;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.state.password, salt);
    console.log(hash);
    this.state.password = hash;

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
  };

  // Handle fields change
  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
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
          <RegBasicInfo
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 2:
        return (
          <RegAccountInfo
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 3:
        return (
          <RegBio
            finish={this.finish}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      default:
        console.log("Whoops, this step doesn't exist!");
    }
  }
}

export default RegStepper;
