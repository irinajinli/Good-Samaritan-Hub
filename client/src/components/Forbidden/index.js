import React from "react";
import forbidden from "../../resources/forbidden.gif";
import "../NotFound/styles.css";

class Forbidden extends React.Component {
  render() {
    return (
      <div className="centre">
        <div className="title">ERROR 403</div>
        <div>That resource is forbidden!</div>
        <img src={forbidden} />
      </div>
    );
  }
}

export default Forbidden;
