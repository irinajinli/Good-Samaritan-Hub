import React from "react";
import LoginInput from "../LoginInput";

import "./styles.css";

class Login extends React.Component {
  getTitle = () => {
    if (
      window.location.pathname === "/adminLogin" ||
      window.location.pathname === "/adminHome"
    ) {
      return "Admin Login";
    } else {
      return "Login";
    }
  };

  render() {
    return (
      <div className="centre">
        <div className="title">{this.getTitle()}</div>
        <LoginInput
          userType={this.getTitle()}
          appComponent={this.props.appComponent}
        />
      </div>
    );
  }
}

export default Login;
