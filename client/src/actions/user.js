export const getUserByUsername = async (username) => {
    const url =  `/user/username/${username}`;
    const res = await fetch(url);
    const user = await res.json();
    console.log('getUserByUsername', user);
    return user;
}

export const getAllUsers = async () => {
    const url = `/users`;
    const res = await fetch(url);
    const users = await res.json();
    return users;
}

export const updateUser = (originalUser, updatedUser, appComponent) => {
    const usersCopy = [ ...appComponent.state.users ]; // clone users array
    const index = appComponent.state.users.indexOf(originalUser);
    usersCopy[index] = updatedUser;

    appComponent.setState({
        users: usersCopy
    });

    if (originalUser.username !== appComponent.state.user.username) {
        return;
    }

    const request = new Request(`/user/${originalUser._id}`, {
        method: "put",
        body: JSON.stringify(updatedUser.state),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request).then(res => {
        if (res.status === 200) {
            return res.json();
        }
    })
    .then(json => {
        if (json !== undefined) {
            appComponent.setState({
                user: json
            });
        }
    })
    .catch(error => {
        console.log(error);
    });
}