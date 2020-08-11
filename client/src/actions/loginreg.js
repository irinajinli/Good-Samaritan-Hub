// actions for logging in and registering
const bcrypt = require("bcryptjs");

// A function to send a POST request with the user to be logged in
export const login = (loginComp, app, userType) => {
  let reqBody = { username: null, password: null };

  // bcrypt.genSalt(10, (err, salt) => {
  //   bcrypt.hash(loginComp.state.password, salt, (err, hash) => {
  //     reqBody.password = hash;
  //   });

  console.log(reqBody.password);

  const testJson = JSON.stringify({
    username: loginComp.state.username,
    password: loginComp.state.password,
  });

  console.log("actual is", testJson);

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
      // body: {
      //   username: loginComp.state.username,
      //   password: loginComp.state.password,
      // },
      body: testJson,
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
