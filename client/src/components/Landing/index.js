// inspired by https://clarkson-demo.squarespace.com/
// to be separated into components soon :)

import React, { Component } from "react";
import LandingBlurb from "./LandingBlurb";
import LandingBottom from "./LandingBottom";
import "./styles.css";

class Landing extends Component {
  render() {
    const {} = this.props;

    return (
      <div>
        <div className="backgroundImage">
          <h1 className="mainTitle">
            <div>Connecting volunteers</div>
            <div className="mainTitle--small">with those in need.</div>
          </h1>
        </div>

        <LandingBlurb
          titleText="Hello there."
          mainText="Welcome to the Good Samaritan Hub.
          Our goal is to assist vulnerable groups, such as the elderly and immunocompromised,
          who do not have someone to help them. On our site, we match
          volunteers with people in need of help—for example, with groceries or pickups.
          Our site currently only supports locations in the GTA, but we plan to expand
          our reach in the near future."
        />

        <div className="bottomBar">
          <LandingBottom
            titleText="Good Samaritan Hub"
            mainText1="999 Yonge St."
            mainText2="Toronto, ON M4W 2L1"
            mainText3="(416) 555-5555"
          />
          <p className="space"></p>
          <LandingBottom
            titleText="Follow Us"
            mainText1="Facebook"
            mainText2="Instagram"
            mainText3="Twitter"
          />
        </div>
      </div>
    );
  }
}

export default Landing;
