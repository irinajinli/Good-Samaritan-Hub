// A function to check if a user is logged in on the session cookie
export const readCookie = (app) => {
  const url = "/users/check-session";

  fetch(url)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then((json) => {
      if (json && json.user) {
        app.setState({ user: json.user });
      }
    })
    .catch((error) => {
      console.log("error", error);
    });
};

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
      // body: testJson,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
  }

  // Send the request with fetch()
  return fetch(request)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then((json) => {
      if (json.currUser !== undefined) {
        if (json.currUser.isBanned) {
          alert(`Your account is banned.\nReason: ${json.currUser.banReason}`);
        } else {
          app.setState({ user: json.currUser });
        }
      }
      return json;
    })
    .catch((error) => {
      if (!(error instanceof TypeError)) {
        console.log(error);
      }
    });
};

export const logoutUser = async () => {
  const url = `/users/logout`;
  await fetch(url);
};

export const getUserByUsername = async (username) => {
  const url = `/user/username/${username}`;
  const res = await fetch(url);
  const user = await res.json();
  return user;
};

export const getAllUsers = async () => {
  const url = `/users`;
  const res = await fetch(url);
  const users = await res.json();
  return users;
};

export const updateUserStatus = async (originalUser, updatedUser) => {
  const request = new Request(`/user/username/${originalUser.username}`, {
    method: "PATCH",
    body: JSON.stringify([
      { op: "replace", path: "/isReported", value: updatedUser.isReported },
      { op: "replace", path: "/isBanned", value: updatedUser.isBanned },
      { op: "replace", path: "/banReason", value: updatedUser.banReason },
    ]),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });

  // Send the request with fetch()
  const res = await fetch(request);
  const ok = await res.json();
  return ok;
};

export const updateProfileInfo = async (originalUser, updatedUser) => {
  const request = new Request(`/user/username/${originalUser.username}`, {
    method: "PATCH",
    body: JSON.stringify([
      { op: "replace", path: "/firstName", value: updatedUser.firstName },
      { op: "replace", path: "/lastName", value: updatedUser.lastName },
      { op: "replace", path: "/location", value: updatedUser.location },
      { op: "replace", path: "/bio", value: updatedUser.bio },
    ]),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });

  // Send the request with fetch()
  const res = await fetch(request);
  const ok = await res.json();
  return ok;
};

export const updatePassword = async (username, oldPassword, newPassword) => {
  const url = `/user/username/${username}/${oldPassword}`;

  // Create our request constructor with all the parameters we need
  const request = new Request(url, {
    method: "PATCH",
    body: JSON.stringify([
      { op: "replace", path: "/password", value: newPassword },
    ]),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });

  const res = await fetch(request);
  return await res.status;
};

export const reportUser = async (username) => {
  const url = `/user/username/${username}`;

  // Create our request constructor with all the parameters we need
  const request = new Request(url, {
    method: "PATCH",
    body: JSON.stringify([{ op: "replace", path: "/isReported", value: true }]),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });

  const res = await fetch(request);
  const reportedUser = await res.json();
  return reportedUser;
};

// Hides <post> from the current user
export const hidePostFromUser = async (post, appComponent) => {
  const user = appComponent.state.user;
  user.postsHiddenFromUser.push(post._id);

  const url = `/user/username/${user.username}`;

  // Create our request constructor with all the parameters we need
  const request = new Request(url, {
    method: "PATCH",
    body: JSON.stringify([
      {
        op: "replace",
        path: "/postsHiddenFromUser",
        value: user.postsHiddenFromUser,
      },
    ]),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });

  const res = await fetch(request);
  const updatedUser = await res.json();

  appComponent.setState({
    user: updatedUser,
  });

  return updatedUser;
};
