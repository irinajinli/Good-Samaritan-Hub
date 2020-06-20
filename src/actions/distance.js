import { getPostalCodes } from '../data/hardCodedData';


// Returns the distance in km between the two given lat, lon coordinates
// From https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-lonitude-points-haversine-formula
const distance = (lat1, lon1, lat2, lon2) => {
    let p = 0.017453292519943295;    // Math.PI / 180
    let c = Math.cos;
    let a = 0.5 - c((lat2 - lat1) * p)/2 + 
            c(lat1 * p) * c(lat2 * p) * 
            (1 - c((lon2 - lon1) * p))/2;
  
    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}


// Returns the distance in km between user1 and user2
export const getDistance = (user1, user2) => {
    const postalCodes = getPostalCodes();
    const lat1 = postalCodes[user1.location].lat;
    const lon1 = postalCodes[user1.location].lon;
    const lat2 = postalCodes[user2.location].lat;
    const lon2 = postalCodes[user2.location].lon;
    return distance(lat1, lon1, lat2, lon2);
}


// Returns a copy of <posts> that is sorted from closed to farthest from <user>
export const sortByDistance = (user, posts) => {
    const postsCopy = [ ...posts ]; // clone posts array

    // Sort postsCopy
    postsCopy.sort((post1, post2) => {
        return getDistance(user, post1.poster) - getDistance(user, post2.poster);
    });
    return postsCopy;
}