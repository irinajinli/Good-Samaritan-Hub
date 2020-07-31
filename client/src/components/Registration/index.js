import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "../Stepper";

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

export default function Register() {
  const classes = useStyles();

  return (
    <div className={classes.centre}>
      <Stepper />
    </div>
  );
}
