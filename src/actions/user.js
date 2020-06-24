import { sortByDistance } from './distance';


export const createPost = (newPost, appComponent) => {
    const { user, posts } = appComponent.state;

    // Give the post a unique id
    newPost.id = posts.length;

    // Add new post to a copy of the global post list
    let newPosts = posts.concat(newPost);
    newPosts = sortByDistance(user, newPosts);

    // Add new post id to copy of the cloned user's post list
    const userCopy = { ...user };
    userCopy.posts = user.posts.concat(newPost.id);

    console.log(posts)
    console.log(user)
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

    // Add the reported post's id to the cloned poster's list of reported posts
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

    console.log('deactivate post');
    console.log(posts);
    // Update global state
    appComponent.setState({
        posts: postsCopy,
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

