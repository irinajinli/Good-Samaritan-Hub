import React from "react";
import TextField from "@material-ui/core/TextField";
import "../RegAccountInfo/styles.css";

export default class RegBasicInfo extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    phoneNum: "",
    postCode: "",
    email: "",
    reqsSatisfied: false,
  };

  handleOnChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
    this.updateReqsSatisfied();
  };

  updateReqsSatisfied = () => {
    if (
      // check if any required fields are empty
      !this.state.firstName ||
      !this.state.lastName ||
      !this.state.phoneNum ||
      !this.state.postCode ||
      !this.state.email
    ) {
      console.log("something is not filled");
      this.setState({ reqsSatisfied: false });
    } else {
      this.setState({ reqsSatisfied: true });
      console.log("everything filled");
    }
  };

  render() {
    return (
      <form noValidate autoComplete="off">
        <div>
          <TextField
            required
            name="firstName"
            className="marginRight"
            label="First name"
            variant="outlined"
            onChange={this.handleOnChange}
          />

          <TextField
            required
            name="lastName"
            className="marginLeft"
            label="Last name"
            variant="outlined"
            onChange={this.handleOnChange}
          />
        </div>

        <div>
          <TextField
            required
            name="phoneNum"
            className="marginRight marginTop"
            label="Phone number"
            variant="outlined"
            onChange={this.handleOnChange}
          />

          <TextField
            required
            name="postCode"
            className="marginLeft marginTop"
            label="Postal code"
            variant="outlined"
            onChange={this.handleOnChange}
          />
        </div>

        <div>
          <TextField
            required
            name="email"
            className="long marginTop"
            label="Email address"
            variant="outlined"
            onChange={this.handleOnChange}
          />
        </div>
      </form>
    );
  }
}
