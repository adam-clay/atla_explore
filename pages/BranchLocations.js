/* global google */

import React, { useEffect } from 'react';

// window.initMap = initMap;  // Make the initMap function globally accessible

const BranchLocations = () => {
    useEffect(() => {
        // Check if the Google Maps script is already loaded
        const script = document.createElement('script');
        script.src = 'https://maps.googleapis.com/maps/api/js?key={KEY}&callback=initMap';
        script.async = true;  // Set the async property
        script.defer = true;
        // script.onerror = function() {
        //     console.error('Failed to load Google Maps script');
        // };
        script.onload = function() {
            initMap();
        }
        document.body.appendChild(script);
    }, []);

    async function initMap() {
        var locations = [
            ['Carlisle', 40.23228, -77.11038],
            ['Chambersburg', 39.95912, -77.57626],
            ['Chestertown', 39.22852, -76.04898],
            ['Clayton', 39.29240, -75.63458],
            ['East New Market', 38.55829, -75.98653],
            ['Hanover', 39.79287, -76.99138],
            ['Hagerstown', 39.6727, -77.7481],
            ['Hunt Valley', 39.49208, -76.6492],
            ['Mechanicsville', 38.44192, -76.73775],
            ['Newark', 39.60317, -75.75629],
            ['Oxford', 39.81701, -75.96475],
            ['Pocomoke', 38.08098, -75.59042],
            ['Queen Anne', 38.92152, -75.95698],
            ['Salisbury', 38.37111, -75.52374],
            ['Upper Marlboro', 38.82438, -76.73343],
            ['Westminster', 39.60421, -76.99768],
            ['Whiteford', 39.70211, -76.3678] 
        ];
    
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 8,
            center: new google.maps.LatLng(39.27027, -76.43377),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
    
        var infowindow = new google.maps.InfoWindow();
    
        var marker, i;
    
        for (i = 0; i < locations.length; i++) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                map: map
                //icon: '../images/map-icon.png?raw=true'
            });
    
            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    infowindow.setContent(locations[i][0]);
                    infowindow.open(map, marker);
                }
            })(marker, i));
        }
    }


    return (
        <div>
            <h3>Branch Locations</h3>
            <div style={{ display: 'grid', placeItems: 'center', height: 'calc(100vh - 200px)' }}>
                <div id="map" style={{ width: '75%', height: '600px', backgroundColor: 'grey' }}></div>
            </div>
        </div>
    );
};

export default BranchLocations;