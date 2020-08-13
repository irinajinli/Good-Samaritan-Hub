// actions for logging in and registering

// A function to send a POST request with the user to be logged in
export const login = (loginComp, app, userType) => {
  // let reqBody = { username: loginComp.state.username, password: null };

  // const salt = bcrypt.genSaltSync(10);
  // const hash = bcrypt.hashSync(loginComp.state.password, salt);
  // reqBody.password = hash;

  console.log(loginComp.state);

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
      // body: testJson,
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
        if (json.currUser.isBanned) {
          alert("Your account is banned.");
        } else {
          app.setState({ user: json.currUser });
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
