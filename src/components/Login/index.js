import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../Header";
import LoginInput from "../LoginInput";

const useStyles = makeStyles((theme) => ({
  centre: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  }
}));

export default function Login(props) {
  const classes = useStyles();

  const getTitle = () => {
    if (window.location.pathname === '/admin') {
      return 'Admin Login'
    } else {
      return 'Login'
    }
  }

  return (
    <div className={classes.centre}>
      <Header title={getTitle()} />
      <LoginInput />
    </div>
  );
}
