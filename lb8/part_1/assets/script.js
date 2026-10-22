const ourCoords = {
    latitude: 48.94321,
    longitude: 24.73380
};

let watchId = null;
let map = null;
let userMarker = null;
let infoWindow = null;

document.addEventListener('DOMContentLoaded', getMyLocation);

function getMyLocation() {
    const watchButton = document.getElementById("watch");
    if (watchButton) watchButton.onclick = watchLocation;

    const clearWatchButton = document.getElementById("clearWatch");
    if (clearWatchButton) clearWatchButton.onclick = clearWatch;

    const goToDestBtn = document.getElementById("goToDest");
    if (goToDestBtn) goToDestBtn.onclick = goToDestination;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayLocation, displayError);
    } else {
        alert("Oops, no geolocation support");
    }
}

function displayLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    let div = document.getElementById("location");
    if (div) {
        div.innerHTML = `You are at Latitude: ${latitude}, Longitude: ${longitude} (with ${position.coords.accuracy} meters accuracy)`;
    }

    let km = computeDistance(position.coords, ourCoords);
    let distance = document.getElementById("distance");
    if (distance) {
        distance.innerHTML = `You are ${km.toFixed(2)} km from the College`;
    }

    initMap(latitude, longitude);
}

function initMap(lat, lng) {
    const mapDiv = document.getElementById("map");
    if (!mapDiv) return;

    const pos = { lat: lat, lng: lng };

    if (!map) {
        map = new google.maps.Map(mapDiv, {
            zoom: 15,
            center: pos,
            mapId: "DEMO_MAP_ID"
        });

        infoWindow = new google.maps.InfoWindow();

        userMarker = new google.maps.marker.AdvancedMarkerElement({
            map: map,
            position: pos,
            title: "Ви тут",
            gmpClickable: true
        });

        userMarker.addEventListener("gmp-click", () => {
            infoWindow.setContent(`<b>Ви тут:</b><br>${lat.toFixed(4)}, ${lng.toFixed(4)}`);
            infoWindow.open({
                anchor: userMarker,
                map: map
            });
        });
    } else {
        map.setCenter(pos);
        if (userMarker) {
            userMarker.position = pos;
        }
    }

    addHistoryMarker(lat, lng);
}

function addHistoryMarker(lat, lng) {
    if (!map) return;

    const timeString = new Date().toLocaleTimeString();
    const pos = { lat: lat, lng: lng };

    const histMarker = new google.maps.marker.AdvancedMarkerElement({
        map: map,
        position: pos,
        title: `Час: ${timeString}`,
        gmpClickable: true
    });

    histMarker.addEventListener("gmp-click", () => {
        if (infoWindow) {
            infoWindow.setContent(`<b>Координати:</b> ${lat.toFixed(4)}, ${lng.toFixed(4)}<br><b>Час:</b> ${timeString}`);
            infoWindow.open({
                anchor: histMarker,
                map: map
            });
        }
    });
}

function goToDestination() {
    let lat = parseFloat(document.getElementById("destLat").value);
    let lng = parseFloat(document.getElementById("destLng").value);

    if (!isNaN(lat) && !isNaN(lng) && map) {
        const destPos = { lat: lat, lng: lng };

        map.panTo(destPos);

        const destMarker = new google.maps.marker.AdvancedMarkerElement({
            map: map,
            position: destPos,
            title: "Пункт призначення",
            gmpClickable: true
        });

        destMarker.addEventListener("gmp-click", () => {
            if (infoWindow) {
                infoWindow.setContent(`<b>Пункт призначення:</b><br>${lat.toFixed(4)}, ${lng.toFixed(4)}`);
                infoWindow.open({
                    anchor: destMarker,
                    map: map
                });
            }
        });
    } else {
        alert("Будь ласка, введіть коректні числові координати!");
    }
}

function displayError(error) {
    const errorTypes = {
        0: "Unknown error",
        1: "Permission denied by user",
        2: "Position is not available",
        3: "Request timed out"
    };

    let errorMessage = errorTypes[error.code] || "Unknown error";
    if (error.code == 0 || error.code == 2) {
        errorMessage = errorMessage + " " + error.message;
    }
    let div = document.getElementById("location");
    if (div) {
        div.innerHTML = errorMessage;
    }
}

function computeDistance(startCoords, destCoords) {
    let startLatRads = degreesToRadians(startCoords.latitude);
    let startLongRads = degreesToRadians(startCoords.longitude);
    let destLatRads = degreesToRadians(destCoords.latitude);
    let destLongRads = degreesToRadians(destCoords.longitude);
    let Radius = 6371;

    let distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) +
        Math.cos(startLatRads) * Math.cos(destLatRads) *
        Math.cos(startLongRads - destLongRads)) * Radius;

    return distance;
}

function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
}

function watchLocation() {
    if (navigator.geolocation) {
        if (watchId !== null) {
            navigator.geolocation.clearWatch(watchId);
        }
        watchId = navigator.geolocation.watchPosition(displayLocation, displayError);
    }
}

function clearWatch() {
    if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
    }
}