export const createPost = (newPost, appComponent) => {
    const { user, posts } = appComponent.state;

    // Give the post a unique id
    newPost.id = posts.length; // Phase 2: May need a different way to generate this unique id

    // Add new post to a copy of the global post list
    let newPosts = posts.concat(newPost);

    // Clone the user
    const userCopy = { ...user };

    // Add new post id to a copy of the cloned user's post list
    userCopy.posts = user.posts.concat(newPost.id);

    // Update appComponent's state
    appComponent.setState({
        posts: newPosts,
        user: userCopy
    });

    // Phase 2: Make a server call to add the new post
    // ...
}


export const reportPost = (post, appComponent) => {
    console.log('report post');
    const originalPoster = post.poster;
    const posterCopy = { ...post.poster }; // clone poster
    
    // Set the clone's isReported status to true
    posterCopy.isReported = true;

    // Add the reported post's id to the clone's list of reported posts
    posterCopy.reportedPosts = originalPoster.reportedPosts.concat(post.id);

    // Update this user in the global state
    updateUser(originalPoster, posterCopy, appComponent);
}


export const deactivatePost = (post, appComponent) => {
    const { posts } = appComponent.state;

    // Clone post and posts
    const postCopy = { ...post };
    const postsCopy = [ ...posts ];

    // Update clones
    postCopy.status = 'inactive';
    let index = posts.indexOf(post);
    postsCopy[index] = postCopy;

    // Update global state
    appComponent.setState({
        posts: postsCopy,
    });

    // Phase 2: Make a server call to update this post's status
    // ...
}


const updateUser = (originalUser, updatedUser, appComponent) => {
    const usersCopy = [ ...appComponent.state.users ]; // clone users array
    const index = appComponent.state.users.indexOf(originalUser);
    usersCopy[index] = updatedUser;

    console.log(appComponent.state.users);
    appComponent.setState({
        users: usersCopy
    });

    // Phase 2: Make a server call to update this user
    // ...
}

