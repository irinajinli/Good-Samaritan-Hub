// actions for logging in and registering

// A function to send a POST request with the user to be logged in
export const login = (loginComp, app) => {
  // Create our request constructor with all the parameters we need
  const request = new Request("/users/login", {
    method: "post",
    body: JSON.stringify(loginComp.state),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });

  // Send the request with fetch()
  fetch(request)
    .then((res) => {
      if (res.status === 200) {
        app.setState({ user: res });
        console.log(app.state);
        // return res.json();
      }
    })
    // .then((json) => {
    //   // if (json.currentUser !== undefined) {
    //   //   app.setState({ currentUser: json.currentUser });
    //   // }
    // })
    .catch((error) => {
      console.log(error);
    });
};
