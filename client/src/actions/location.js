export const getPostalCodes = async (component) => {

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

    console.log('getPostalCodes', postalCodes);
    return postalCodes;

}

export const getPostalCodePrefixes = async () => {

    const postalCodes = await getPostalCodes();
    console.log('getPostalCodePrefixes', Object.keys(postalCodes));
    return Object.keys(postalCodes);

}
