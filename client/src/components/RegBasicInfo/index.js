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

  handleOnChange = (event) => {
    const { values, handleChange } = this.props;
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
    this.updateReqsSatisfied();
  };

  handleLocationChange = (event, values) => {
    this.setState({
      postCode: values,
    });
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
    const { postalCodePrefixes } = this.state;
    const { handleChange } = this.props;
    return (
      <form noValidate autoComplete="off">
        <div>
          <TextField
            required
            name="firstName"
            className="marginRight"
            label="First name"
            variant="outlined"
            onChange={handleChange("firstName")}
          />

          <TextField
            required
            name="lastName"
            className="marginLeft"
            label="Last name"
            variant="outlined"
            onChange={handleChange("lastName")}
          />
        </div>

        <div className="registration--position-relative">
          <TextField
            required
            name="phoneNum"
            className="marginRight marginTop"
            label="Phone number"
            variant="outlined"
            onChange={handleChange("phoneNum")}
          />

          <div className="registration__location-selector">
            <Autocomplete
              defaultValue=""
              label="Postal Code"
              options={postalCodePrefixes}
              onChange={handleChange("postCode")}
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
          <Button color="primary" variant="contained" onClick={this.continue}>
            Continue
          </Button>
        </div>
      </form>
    );
  }
}
