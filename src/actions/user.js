import { sortByDistance } from './distance';


export const createPost = (newPost, appComponent) => {
    // Add new post to a copy of the global post list
    let newPosts = appComponent.state.posts.concat(newPost);
    newPosts = sortByDistance(appComponent.state.user, newPosts);

    // Add new post to a copy of the cloned user's post list
    const userCopy = { ...appComponent.state.user };
    const userPosts = userCopy.posts.concat(newPost);
    userCopy.posts = userPosts;

    // console.log(posts)
    // console.log(user)
    // Update appComponent's state
    appComponent.setState({
        posts: newPosts,
        user: userCopy
    });
}


export const reportPost = (post, appComponent) => {
    console.log('report post');
    const originalPoster = post.poster;
    const posterCopy = { ...post.poster }; // clone poster
    
    // Set the cloned poster's isReported status to true
    posterCopy.isReported = true;

    // Add the reported post to the cloned poster's list of reported posts
    posterCopy.reportedPosts = originalPoster.reportedPosts.concat(post);

    // Update this user in the global state
    updateUser(originalPoster, posterCopy, appComponent);
}


export const deactivatePost = (post, appComponent) => {
    const { posts, user } = appComponent.state;

    // Clone post, posts, user, and user's posts
    const postCopy = { ...post };
    const postsCopy = [ ...posts ];

    const userCopy = { ...user };
    const userPostsCopy = [ ...user.posts ];

    // Update clones
    postCopy.status = 'inactive';

    let index = posts.indexOf(post);
    postsCopy[index] = postCopy;

    index = user.posts.indexOf(post);
    userPostsCopy[index] = postCopy;
    userCopy.posts = userPostsCopy;

    console.log('deactivate post');
    console.log(posts);
    console.log(user);
    // Update global state
    appComponent.setState({
        posts: postsCopy,
        user: userCopy
    });
}


const updateUser = (originalUser, updatedUser, appComponent) => {
    console.log('update user');
    const usersCopy = [ ...appComponent.state.users ]; // clone users array
    const index = appComponent.state.users.indexOf(originalUser);
    usersCopy[index] = updatedUser;

    console.log(appComponent.state.users);
    appComponent.setState({
        users: usersCopy
    });
}

