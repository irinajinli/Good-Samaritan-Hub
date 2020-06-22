// note: copied from student_queue example
import React from "react";

import "./styles.css";

/* The Header Component */
class Header extends React.Component {
  render() {
    const { title, subtitle } = this.props;

    return (
      <div>
        <h1>{title}</h1>
        <h3>{subtitle}</h3>
      </div>
    );
  }
}

export default Header;
