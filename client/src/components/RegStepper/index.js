// based on
// https://github.com/bradtraversy/react_step_form/blob/master/src/components/UserForm.js

import React from "react";
import RegBasicInfo from "../RegBasicInfo";
import RegAccountInfo from "../RegAccountInfo";
import RegBio from "../RegBio";

export class RegStepper extends React.Component {
  state = {
    step: 1,
    firstName: "",
    lastName: "",
    phoneNum: "",
    postCode: "",
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
    window.location.href = "/regsuccess";
  };

  // Handle fields change
  handleChange = (input) => (e) => {
    console.log("here!");
    this.setState({ [input]: e.target.value });
    console.log(this.state);
  };

  render() {
    const { step } = this.state;
    const {
      firstName,
      lastName,
      phoneNum,
      postCode,
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
      postCode,
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
            values={values}
          />
        );
      default:
        console.log("Whoops, this step doesn't exist!");
    }
  }
}

export default RegStepper;
