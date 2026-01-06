document.addEventListener('DOMContentLoaded', () => {
    const trackBtn = document.getElementById('track-btn');
    const statusEl = document.getElementById('status');
    const coordsEl = document.getElementById('coordinates');
    const mapEl = document.getElementById('map');

    let map;
    let marker;

    // Initialize the map (centered on a default location)
    map = L.map(mapEl).setView([51.505, -0.09], 13); // Default to London
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    trackBtn.addEventListener('click', () => {
        if (navigator.geolocation) {
            statusEl.textContent = 'Requesting location...';
            navigator.geolocation.getCurrentPosition(success, error, {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            });
        } else {
            statusEl.textContent = 'Geolocation is not supported by this browser.';
        }
    });

    function success(position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const accuracy = position.coords.accuracy;

        statusEl.textContent = `Location tracked successfully! Accuracy: ${accuracy} meters.`;
        coordsEl.textContent = `Latitude: ${lat}, Longitude: ${lng}`;

        // Update map view and add/update marker
        map.setView([lat, lng], 15);
        if (marker) {
            marker.setLatLng([lat, lng]);
        } else {
            marker = L.marker([lat, lng]).addTo(map);
        }
    }

    function error(err) {
        console.error('Geolocation error:', err); // Added for debugging
        statusEl.textContent = `Error: ${err.message} (Code: ${err.code})`;
        if (err.code === 1) {
            statusEl.textContent += ' - Please allow location permissions in your browser.';
        }
    }
});
