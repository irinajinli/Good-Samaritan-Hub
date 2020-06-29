// inspired by https://clarkson-demo.squarespace.com/
// to be separated into components soon :)

import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { Box, withTheme } from "@material-ui/core";
import background from "../../resources/toronto.jpg";
import { makeStyles } from "@material-ui/core/styles";
import LandingBlurb from "../LandingBlurb";
import "./styles.css";

class Landing extends Component {
  render() {
    const {} = this.props;

    return (
      <div>
        <div className="backgroundImage">
          <h1 className="mainTitle">
            Connecting volunteers with those in need.
          </h1>
        </div>

        <LandingBlurb
          titleText="Title."
          mainText="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum."
        />
        <LandingBlurb
          titleText="Another title."
          mainText="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum."
        />
      </div>
    );
  }
}

export default Landing;
