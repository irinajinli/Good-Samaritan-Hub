import React from "react";
import TextField from "@material-ui/core/TextField";
import "./styles.css";

export default class RegAccountInfo extends React.Component {
  state = {
    reqsSatisfied: false,
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
    return (
      <form noValidate autoComplete="off">
        <div>
          <TextField
            required
            name="username"
            className="long"
            label="Username"
            variant="outlined"
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
          />

          <TextField
            required
            name="confirmPassword"
            className="marginLeft marginTop"
            label="Confirm password"
            type="password"
            variant="outlined"
          />
        </div>
      </form>
    );
  }
}
