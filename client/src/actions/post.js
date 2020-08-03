export const getPostsByLocation = async (location) => {

    const url = `/post/location/${location}`;
    const res = await fetch(url);
    const posts = await res.json();
    
    posts.forEach(post => {
        post.date = new Date(post.date)
    });
    console.log('getPostsByLocation', location, posts);
    return posts;

}


export const getPostsByUser = async (user) => {

    const url = `/post/posterUsername/${user.username}`;
    const res = await fetch(url);
    const posts = await res.json();
    
    posts.forEach(post => {
        post.date = new Date(post.date)
    });
    console.log('getPostsByUser', user.username, posts);
    return posts;

};


export const createPost = async (newPost) => {

    const url = `/post/${newPost.posterUsername}`;

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: 'post',
        body: JSON.stringify(newPost),
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    });

    const res = await fetch(request);
    const addedStudent = await res.json();
    return addedStudent;

}


export const reportPost = async (post) => {

    const url = `/post/${post._id}`;

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: 'PATCH',
        body: JSON.stringify([{ 'op': 'replace', 'path': '/isReported', 'value': true }]),
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    });

    const res = await fetch(request);
    const reportedPost = await res.json();
    return reportedPost;

}


export const deactivatePost = async (post) => {

    const url = `/post/${post._id}`;

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: 'PATCH',
        body: JSON.stringify([{ 'op': 'replace', 'path': '/status', 'value': 'inactive' }]),
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    });

    const res = await fetch(request);
    const deactivatedPost = await res.json();
    return deactivatedPost;

}