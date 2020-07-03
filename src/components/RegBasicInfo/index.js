import React from "react";
import TextField from "@material-ui/core/TextField";
import "../RegAccountInfo/styles.css";

export default class RegBasicInfo extends React.Component {
  render() {
    return (
      <form noValidate autoComplete="off">
        <div>
          <TextField
            required
            className="marginRight"
            label="First name"
            variant="outlined"
          />

          <TextField
            required
            className="marginLeft"
            label="Last name"
            variant="outlined"
          />
        </div>

        <div>
          <TextField
            required
            className="marginRight marginTop"
            label="Phone number"
            variant="outlined"
          />

          <TextField
            required
            className="marginLeft marginTop"
            label="Postal code"
            variant="outlined"
          />
        </div>

        <div>
          <TextField
            required
            className="long marginTop"
            label="Email address"
            variant="outlined"
          />
        </div>
      </form>
    );
  }
}
