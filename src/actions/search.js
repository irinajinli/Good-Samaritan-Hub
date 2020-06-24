// Replaces escape/special characters in <input> with '' to prevent Regex errors when 
// searching for <input> in a string
const cleanInput = input => input.replace(/[\\/:*?"<>|[]/g, '')


// Returns the posts in <posts> that contain <searchTerm> in their title
export const getMatchingPosts = (searchTerm, posts) => {
    searchTerm = cleanInput(searchTerm).trim();
    return posts.filter(post => {
        return searchTerm != '' && post.title.search(new RegExp(searchTerm, 'i')) !== -1;
    });
}


// Returns the users in <users> that contain <searchTerm> in their username or full name
export const getMatchingUsers = (searchTerm, users) => {
    searchTerm = cleanInput(searchTerm).trim();
    return users.filter(user => {
        const fullName = `${user.firstName} ${user.lastName}`;
        return (searchTerm != '' &&
            (user.username.search(new RegExp(searchTerm, 'i')) !== -1 ||
            fullName.search(new RegExp(searchTerm, 'i')) !== -1))
    });
}