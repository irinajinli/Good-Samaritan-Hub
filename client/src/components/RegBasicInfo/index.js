import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";

import "../RegAccountInfo/styles.css";
import "./styles.css";
import { getPostalCodePrefixes } from "../../actions/location";

export default class RegBasicInfo extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    phoneNum: "",
    postCode: "",
    email: "",
    reqsSatisfied: false,
    postalCodePrefixes: [],
  };

  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  componentDidMount() {
    getPostalCodePrefixes()
      .then((postalCodePrefixes) => {
        this.setState({
          postalCodePrefixes,
        });
      })
      .catch((error) => {
        console.log("Could not get postal codes");
        this.setState({
          postalCodePrefixes: [],
        });
      });
  }

  render() {
    const { postalCodePrefixes } = this.state;
    const { handleChange, handleLocationChange } = this.props;
    return (
      <form noValidate autoComplete="off" className="wide">
        <div>
          <TextField
            required
            name="firstName"
            className="marginRight half"
            label="First name"
            variant="outlined"
            onChange={handleChange("firstName")}
          />

          <TextField
            required
            name="lastName"
            className="marginLeft half"
            label="Last name"
            variant="outlined"
            onChange={handleChange("lastName")}
          />
        </div>

        <div className="registration--position-relative">
          <TextField
            required
            name="phoneNum"
            className="marginRight marginTop half"
            label="Phone number"
            variant="outlined"
            onChange={handleChange("phoneNum")}
          />

          <div className="registration__location-selector">
            <Autocomplete
              defaultValue=""
              label="Postal Code"
              options={postalCodePrefixes}
              onChange={handleLocationChange}
              style={{ width: "100%" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  required
                  label="Postal Code"
                  variant="outlined"
                />
              )}
            />
          </div>
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

        <div>
          <Button
            className="marginTop"
            color="primary"
            variant="contained"
            onClick={this.continue}
          >
            Continue
          </Button>
        </div>
      </form>
    );
  }
}
