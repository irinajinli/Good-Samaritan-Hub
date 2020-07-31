import React from "react";
import TextField from "@material-ui/core/TextField";
import "../RegAccountInfo/styles.css";

export default class RegBio extends React.Component {
  render() {
    return (
      <form noValidate autoComplete="off">
        <div>
          <TextField
            multiline
            rows={6}
            className="long tall"
            label="Bio (optional)"
            variant="outlined"
          />
        </div>
      </form>
    );
  }
}
