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


// Returns a list of the given user's reported posts
// Phase 2: Make a server call to get the posts instead of searching in the <posts> list and move to /actions/user
export const getReportedPosts = (user, posts) => posts.filter(post => post.posterUsername === user.username && post.isReported);