import { getDistance } from './distance';


// Returns a copy of <posts> that is sorted from closed to farthest from <postalCode>
export const sortByDistance = (postalCode, posts) => {
    const postsCopy = [ ...posts ]; // clone posts array

    // Sort postsCopy
    postsCopy.sort((post1, post2) => {
        return getDistance(postalCode, post1.location) - getDistance(postalCode, post2.location);
    });
    return postsCopy;
}


// Returns a copy of <posts> that is sorted from newest to olded date
// <newestOrOldestFirst> = 'newest first" or "latest first"
export const sortByDate = (posts, newestOrOldestFirst) => {
    const postsCopy = [ ...posts ]; // clone posts array

    // Sort postsCopy
    postsCopy.sort((post1, post2) => {
        if (newestOrOldestFirst === 'newest first') {
            return post2.date - post1.date;
        } else { // 'oldest first'
            return post1.date - post2.date;
        }
    });
    return postsCopy;
}