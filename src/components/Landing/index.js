import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { Box, withTheme } from "@material-ui/core";
import background from "./toronto.jpg";
import { makeStyles } from "@material-ui/core/styles";

import "./styles.css";

const useStyles = makeStyles({
  fit: {
    width: "100%",
    // height: "60%",
  },
  backgroundImage: {
    height: "800px",
    backgroundImage: `url(${background})`,
  },
  red: {
    color: "white",
    marginTop: "0px",
    paddingTop: "20px",
  },
});

export default function Landing() {
  const classes = useStyles();

  return (
    <div>
      {/* <img className={classes.fit} src={background}></img> */}
      <div className={classes.backgroundImage}>
        <h1 className={classes.red}>
          Connecting volunteers with those in need.
        </h1>
      </div>
    </div>
  );
}
