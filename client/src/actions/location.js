export const getPostalCodes = async () => {

    const url = `/locations`;
    const res = await fetch(url);
    const locations = await res.json();

    const postalCodes = {};
    locations.forEach(location => {
        if (postalCodes[location.postalCode] === undefined) {
            postalCodes[location.postalCode] = {};
        }
        postalCodes[location.postalCode].lat = location.lat;
        postalCodes[location.postalCode].lon = location.lon;
    });

    return postalCodes;

}

export const getPostalCodePrefixes = async () => {

    const postalCodes = await getPostalCodes();
    return Object.keys(postalCodes);

}
