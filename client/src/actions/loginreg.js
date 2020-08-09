// actions for logging in and registering

// A function to send a POST request with the user to be logged in
export const login = (loginComp, app, userType) => {
  // request depends on userType
  let request;
  if (userType === "Admin Login") {
    request = new Request("/admin/login", {
      method: "post",
      body: JSON.stringify(loginComp.state),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
  } else {
    request = new Request("/users/login", {
      method: "post",
      body: JSON.stringify(loginComp.state),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
  }

  // Send the request with fetch()
  fetch(request)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then((json) => {
      if (json.currUser !== undefined) {
        app.setState({ user: json.currUser });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
