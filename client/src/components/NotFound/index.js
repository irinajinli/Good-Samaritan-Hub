import React from "react";
import notFoundImg from "../../resources/404.png";
import "./styles.css";

class NotFound extends React.Component {
  render() {
    return (
      <div className="centre">
        <div className="title">ERROR 404</div>
        <div>The requested URL was not found!</div>
        <img src={notFoundImg} />
      </div>
    );
  }
}

export default NotFound;
