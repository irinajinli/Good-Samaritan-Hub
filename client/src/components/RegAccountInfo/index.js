import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./styles.css";

export default class RegAccountInfo extends React.Component {
  state = {
    reqsSatisfied: false,
  };

  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  handleOnChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { handleChange } = this.props;
    return (
      <form noValidate autoComplete="off">
        <div>
          <TextField
            required
            name="username"
            className="long"
            label="Username"
            variant="outlined"
            onChange={handleChange("username")}
          />
        </div>

        <div>
          <TextField
            required
            name="password"
            className="marginRight marginTop"
            label="Password"
            type="password"
            variant="outlined"
            onChange={handleChange("password")}
          />

          <TextField
            required
            name="confirmPassword"
            className="marginLeft marginTop"
            label="Confirm password"
            type="password"
            variant="outlined"
            onChange={handleChange("confirmPass")}
          />
        </div>

        <div>
          <Button color="default" variant="contained" onClick={this.back}>
            Back
          </Button>

          <Button color="primary" variant="contained" onClick={this.continue}>
            Continue
          </Button>
        </div>
      </form>
    );
  }
}
