export const getMatchingPosts = (searchTerm, posts) => {
    return posts.filter(post => {
        return post.title.search(new RegExp(searchTerm, 'i')) !== -1;
    });
}

export const getMatchingUsers = (searchTerm, users) => {
    return users.filter(user => {
        return (user.username.search(new RegExp(searchTerm, 'i')) !== -1 ||
        user.firstName.search(new RegExp(searchTerm, 'i')) !== -1 ||
        user.lastName.search(new RegExp(searchTerm, 'i')) !== -1);
    });
}