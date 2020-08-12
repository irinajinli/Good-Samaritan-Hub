import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "../RegAccountInfo/styles.css";

export default class RegBio extends React.Component {
  finish = (e) => {
    e.preventDefault();
    this.props.finish();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { handleChange } = this.props;
    return (
      <form noValidate autoComplete="off">
        <div>
          <TextField
            multiline
            rows={6}
            className="long tall"
            label="Bio (optional)"
            variant="outlined"
            onChange={handleChange("bio")}
          />
        </div>

        <div>
          <Button color="default" variant="contained" onClick={this.back}>
            Back
          </Button>

          <Button color="primary" variant="contained" onClick={this.finish}>
            Finish
          </Button>
        </div>
      </form>
    );
  }
}
