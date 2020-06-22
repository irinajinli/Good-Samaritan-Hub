// inspired by https://clarkson-demo.squarespace.com/
// to be separated into components soon :)

import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { Box, withTheme } from "@material-ui/core";
import background from "./toronto.jpg";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  fit: {
    width: "100%",
    // height: "60%",
  },
  backgroundImage: {
    height: "550px",
    backgroundImage: `url(${background})`,
  },
  mainTitle: {
    color: "white",
    marginTop: "0px",
    marginLeft: "75px",
    marginRight: "75px",
    paddingTop: "130px",
    fontSize: "40px",
  },
  subtitle: {
    marginLeft: "75px",
    marginRight: "75px",
    marginTop: "40px",
    fontSize: "28px",
  },
  mainText: {
    marginLeft: "75px",
    marginRight: "75px",
    marginTop: "20px",
    marginBottom: "40px",
    fontSize: "24px",
  },
  bottomBar: {
    paddingLeft: "55px",
    paddingRight: "75px",
    paddingBottom: "50px",
    marginTop: "20px",
    color: "white",
    backgroundColor: "#343232",
  },
  paddingTop: {
    paddingTop: "40px",
  },
  floatLeft: {
    float: "left",
  },
});

export default function Landing() {
  const classes = useStyles();

  return (
    <div>
      {/* <img className={classes.fit} src={background}></img> */}
      <div className={classes.backgroundImage}>
        <h1 className={classes.mainTitle}>
          Connecting volunteers with those in need.
        </h1>
      </div>
      <h1 className={classes.subtitle}>Title.</h1>
      <div className={classes.mainText}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </div>
      <h1 className={classes.subtitle}>Another title.</h1>
      <div className={classes.mainText}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </div>
      <div className={classes.bottomBar}>
        <div>
          <h1 className={classes.paddingTop}>GOOD SAMARITAN HUB</h1>
          <p>
            999 Yonge St.
            <br />
            Toronto, ON M4W 2L1
            <br />
            (416) 555-5555
          </p>
        </div>
        <div>
          <h1 className={classes.paddingTop}>FOLLOW US</h1>
        </div>
      </div>
    </div>
  );
}
