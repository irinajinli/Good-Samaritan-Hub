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

    if (component) {
        component.setState({
            postalCodes
        });
    }

    return postalCodes;
}

export const getPostalCodePrefixes = async (component) => {
    const postalCodes = await getPostalCodes();
    component.setState({
        postalCodePrefixes: Object.keys(postalCodes)
    });
}
