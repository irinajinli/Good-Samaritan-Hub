import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  topCentre: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
  marginBottom: {
    marginBottom: "20px",
  },
  marginRight: {
    marginRight: "20px",
  },
  loginButton: {
    marginTop: "20px",
    position: "absolute",
    right: "0%",
  },
}));

export default function Registration() {
  const classes = useStyles();

  return (
    <div className={classes.topCentre}>
      <h1>Register for a new account</h1>
      <div className={classes.marginBottom}>
        <TextField
          className={classes.marginRight}
          required
          id="outlined-required"
          label="First name"
          variant="outlined"
        />
        <TextField
          required
          id="outlined-required"
          label="Last name"
          variant="outlined"
        />
      </div>
      <div className={classes.marginBottom}>
        <TextField
          className={classes.marginRight}
          required
          id="outlined-required"
          label="Email address"
          variant="outlined"
        />
        <TextField
          required
          id="outlined-required"
          label="Username"
          variant="outlined"
        />
      </div>
      <div className={classes.marginBottom}>
        <TextField
          className={classes.marginRight}
          required
          id="outlined-required"
          label="Postal code"
          variant="outlined"
        />
        <TextField
          required
          id="outlined-required"
          label="Phone number"
          variant="outlined"
        />
      </div>
      <div>
        <TextField
          required
          className={classes.marginRight}
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
        />
        <TextField
          required
          id="outlined-password-input"
          label="Confirm password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
        />
      </div>
      <div>
        <Link className="link" to={"/login"}>
          Sign in instead
        </Link>
        <Button
          className={classes.loginButton}
          variant="contained"
          color="primary"
        >
          LOG IN
        </Button>
      </div>
    </div>
  );
}
