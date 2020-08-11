// note: copied from student_queue example
import React from "react";
import "./styles.css";

/* The Header Component */
class LandingBlurb extends React.Component {
  render() {
    const { titleText, mainText } = this.props;

    return (
      <div>
        <div className="titleText">{titleText}</div>
        <div className="mainText">{mainText}</div>
      </div>
    );
  }
}

export default LandingBlurb;
