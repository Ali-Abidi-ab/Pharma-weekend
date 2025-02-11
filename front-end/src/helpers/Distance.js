function Distance(coord1, coord2) {
    // Convert latitude and longitude from degrees to radians
    const toRadians = (angle) => angle * (Math.PI / 180);
    const dLat = toRadians(coord2.lat - coord1.lat);
    const dLon = toRadians(coord2.lon - coord1.lon);

    // Haversine formula
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(coord1.lat)) * Math.cos(toRadians(coord2.lat)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Earth radius in kilometers
    const R = 6371;

    // Calculate the distance in kilometers
    const distance = R * c;
    let  disObject = {};
    if(distance < 1){
        disObject = {value:(distance*1000).toFixed(2), unity:"Meters" };
    }else{
        disObject = {value:distance.toFixed(2), unity:"Kilometers" };
    }

    return disObject;
}

export default Distance;
