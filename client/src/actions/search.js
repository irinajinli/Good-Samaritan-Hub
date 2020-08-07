// Replaces escape/special characters in <input> with '' to prevent Regex errors when 
// searching for <input> in a string
const cleanInput = input => input.replace(/[\\/:*?"<>|[]/g, '');


// Returns the posts in <posts> that contain <searchTerm> in their title
export const getMatchingPosts = (searchTerm, posts) => {
    searchTerm = cleanInput(searchTerm).trim();
    return posts.filter(post => {
        return searchTerm.length !== 0 && post.title.search(new RegExp(searchTerm, 'i')) !== -1;
    });
}


// Returns users that contain <searchTerm> in their username or full name
export const getMatchingUsers = async (searchTerm) => {
    searchTerm = cleanInput(searchTerm).trim();
    const url = `/user/searchTerm/${searchTerm}`;
    const res = await fetch(url);
    const matchingUsers = await res.json();
    return matchingUsers;
}


// Returns a list of the given user's reported posts
export const getReportedPosts = (user, posts) => posts.filter(post => post.posterUsername === user.username && post.isReported);