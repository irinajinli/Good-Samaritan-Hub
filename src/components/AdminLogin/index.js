import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Login from "../Login";

const useStyles = makeStyles((theme) => ({
  centre: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
  header: {
    marginTop: "40px",
    marginBottom: "40px",
    textAlign: "center",
  },
}));

export default function AdminLogin() {
  const classes = useStyles();

  return (
    <div>
      <Login></Login>
    </div>
  );
}
