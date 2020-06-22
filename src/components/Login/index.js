import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Box } from "@material-ui/core";
import { Link } from "react-router-dom";
import Header from "../Header";
import LoginInput from "../LoginInput";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  centre: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
  marginBottom: {
    marginBottom: "20px",
  },
  loginButton: {
    marginTop: "20px",
  },
  noLeftMargin: {
    marginLeft: "0px",
  },
}));

export default function Login() {
  const classes = useStyles();

  return (
    <div className={classes.centre}>
      <Header title="Login" />
      <LoginInput />
    </div>
  );
}
