import React from "react";
import LoginInput from "../LoginInput";

import './styles.css'

export default function Login() {

  const getTitle = () => {
    if (window.location.pathname === '/admin') {
      return 'Admin Login'
    } else {
      return 'Login'
    }
  }

  return (
    <div className="centre">
      <div className="title">{getTitle()}</div>
      <LoginInput />
    </div>
  );
}
