export const reportPost = (post, appComponent) => {
    console.log('report post');
    const originalPoster = post.poster;
    const posterCopy = { ...post.poster }; // clone poster
    
    // Set the poster's status to reported
    posterCopy.isReported = true;

    // Add this post to this cloned poster's list of reported posts
    posterCopy.reportedPosts = originalPoster.reportedPosts.concat(post);

    // Update this user in the app component's state
    updateUser(originalPoster, posterCopy, appComponent);
}

const updateUser = (originalUser, updatedUser, appComponent) => {
    console.log('update user');
    const usersCopy = [ ...appComponent.state.users ]; // clone array
    const index = appComponent.state.users.indexOf(originalUser);
    usersCopy[index] = { ...originalUser }; // set usersCopy[index] to a clone of the original user at that index
    usersCopy[index] = updatedUser;

    console.log(appComponent.state.users);
    appComponent.setState({
        users: usersCopy
    })
}