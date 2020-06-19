export const getMatchingPosts = (searchTerm, posts) => {
    return posts.filter(post => {
        return post.title.search(new RegExp(searchTerm, 'i')) !== -1;
    });
}

export const getMatchingUsers = (searchTerm, users) => {
    return users.filter(user => {
        const fullName = `${user.firstName} ${user.lastName}`;
        return (user.username.search(new RegExp(searchTerm, 'i')) !== -1 ||
        fullName.search(new RegExp(searchTerm, 'i')) !== -1)
    });
}