import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  marginRight: {
    marginRight: "4px",
  },
  marginLeft: {
    marginLeft: "4px",
  },
  marginTop: {
    marginTop: "30px",
  },
  long: {
    width: "431.2px",
  },
}));

export default function RegAccountInfo() {
  const classes = useStyles();

  return (
    <form noValidate autoComplete="off">
      <div>
        <TextField
          required
          className={classes.long}
          label="Username"
          variant="outlined"
        />
      </div>

      <div>
        <TextField
          required
          className={`${classes.marginRight} ${classes.marginTop}`}
          label="Password"
          variant="outlined"
        />

        <TextField
          required
          className={`${classes.marginLeft} ${classes.marginTop}`}
          label="Confirm password"
          variant="outlined"
        />
      </div>
    </form>
  );
}
