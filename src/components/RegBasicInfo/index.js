import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
      display: "flex",
      // alignItems: "center",
      justifyContent: "center",
      // position: "absolute",
      // left: "50%",
    },
  },
  marginRight: {
    marginRight: "4px",
  },
  marginLeft: {
    marginLeft: "4px",
  },
  longRow: {
    marginTop: "30px",
    width: "431.2px",
  },
}));

export default function RegBasicInfo() {
  const classes = useStyles();

  return (
    <form noValidate autoComplete="off">
      <div>
        <TextField
          className={classes.marginRight}
          label="First name"
          variant="outlined"
        />

        <TextField
          className={classes.marginLeft}
          label="Last name"
          variant="outlined"
        />
      </div>

      <div>
        <TextField
          className={classes.longRow}
          label="Email address"
          variant="outlined"
        />

        {/* <TextField
          className={classes.marginLeft}
          label="Confirm email address"
          variant="outlined"
        /> */}
      </div>
    </form>
  );
}
