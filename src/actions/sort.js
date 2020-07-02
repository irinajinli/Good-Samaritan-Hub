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


// Returns a copy of <posts> that is sorted from latest to earliest date
export const sortByDate = posts => {
    const postsCopy = [ ...posts ]; // clone posts array

    // Sort postsCopy
    postsCopy.sort((post1, post2) => {
        return post2.date - post1.date;
    });
    return postsCopy;
}