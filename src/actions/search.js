// Returns the posts in <posts> that contain <searchTerm> in their title
export const getMatchingPosts = (searchTerm, posts) => {
    return posts.filter(post => {
        return post.title.search(new RegExp(searchTerm, 'i')) !== -1;
    });
}


// Returns the users in <users> that contain <searchTerm> in their username or full name
export const getMatchingUsers = (searchTerm, users) => {
    return users.filter(user => {
        const fullName = `${user.firstName} ${user.lastName}`;
        return (user.username.search(new RegExp(searchTerm, 'i')) !== -1 ||
        fullName.search(new RegExp(searchTerm, 'i')) !== -1)
    });
}