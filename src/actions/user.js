import { getUser } from './search';


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

    // Clone users list
    const usersCopy = [ ...appComponent.state.users ];

    // Add new user to cloned users list
    const index = usersCopy.indexOf(user);
    usersCopy[index] = userCopy;

    // Update appComponent's state
    appComponent.setState({
        posts: newPosts,
        user: userCopy,
        users: usersCopy
    });

    // Phase 2: Make a server call to add the new post
    // ...
}


export const reportPost = (post, appComponent) => {
    const originalPoster = getUser(post.posterId, appComponent.state.users);
    const posterCopy = { ...originalPoster }; // clone poster
    
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


export const updateUser = (originalUser, updatedUser, appComponent) => {
    const usersCopy = [ ...appComponent.state.users ]; // clone users array
    const index = appComponent.state.users.indexOf(originalUser);
    usersCopy[index] = updatedUser;

    appComponent.setState({
        users: usersCopy
    });

    if (originalUser.username === appComponent.state.user.username) {
        appComponent.setState({
            user: updatedUser
        });
    }

    // Phase 2: Make a server call to update this user
    // ...
}

