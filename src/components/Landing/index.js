// inspired by https://clarkson-demo.squarespace.com/
// to be separated into components soon :)

import React, { Component } from "react";
import LandingBlurb from "../LandingBlurb";
import LandingBottom from "../LandingBottom";
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

        <div className="bottomBar">
          <LandingBottom
            className="floatLeft"
            titleText="Good Samaritan Hub"
            mainText1="999 Yonge St."
            mainText2="Toronto, ON M4W 2L1"
            mainText3="(416) 555-5555"
          />
        </div>
      </div>
    );
  }
}

export default Landing;
