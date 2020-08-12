import React from "react";
import Button from "@material-ui/core/Button";

import "./styles.css";

class RegSuccess extends React.Component {
  goToLogin = () => {
    window.location.href = "/login";
  };

  render() {
    return (
      <div className="centre">
        <div className="title">Registration successful!</div>
        <div>
          <Button color="primary" onClick={this.goToLogin}>
            Log in
          </Button>
        </div>
      </div>
    );
  }
}

export default RegSuccess;
