// Replaces escape/special characters in <input> with '' to prevent Regex errors when 
// searching for <input> in a string
const cleanInput = input => input.replace(/[\\/:*?"<>|[]/g, '')


// Returns the posts in <posts> that contain <searchTerm> in their title
export const getMatchingPosts = (searchTerm, posts) => {
    searchTerm = cleanInput(searchTerm).trim();
    return posts.filter(post => {
        return searchTerm.length !== 0 && post.title.search(new RegExp(searchTerm, 'i')) !== -1;
    });
}


// Returns the users in <users> that contain <searchTerm> in their username or full name
export const getMatchingUsers = (searchTerm, users) => {
    searchTerm = cleanInput(searchTerm).trim();
    return users.filter(user => {
        const fullName = `${user.firstName} ${user.lastName}`;
        return (searchTerm.length !== 0 &&
            (user.username.search(new RegExp(searchTerm, 'i')) !== -1 ||
            fullName.search(new RegExp(searchTerm, 'i')) !== -1))
    });
}


// Returns a list of the posts at the given location
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

// Returns a list of the given user's posts
// Phase 2: Make a server call to get the posts instead of searching in the <posts> list
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


// Returns a list of the given user's reported posts
// Phase 2: Make a server call to get the posts instead of searching in the <posts> list
export const getReportedPosts = (user, posts) => posts.filter(post => post.posterUsername === user.username && post.isReported);


// Returns the post with the given id
// Phase 2: Make a server call to get the post instead of searching in the <posts> list
export const getPost = (id, posts) => posts.find(post => post.id === id);


// Returns the user with the given username
// Phase 2: Make a server call to get the user instead of searching in the <users> list
export const getUser = (username, users) => users.find(user => user.username === username);