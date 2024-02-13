import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ClosestBranch() {
    const [closestBranch, setClosestBranch] = useState(null);
    const [location, setLocation] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [coordinates, setCoordinates] = useState(null);
    const [haulingFee, setHaulingFee] = useState(0);

    const locations = [
        ['Carlisle, PA', 40.23228, -77.11038],
        ['Chambersburg, PA', 39.95912, -77.57626],
        ['Chestertown, MD', 39.22852, -76.04898],
        ['Clayton, DE', 39.29240, -75.63458],
        ['East New Market, MD', 38.55829, -75.98653],
        ['Hanover, PA', 39.79287, -76.99138],
        ['Hagerstown, MD', 39.6727, -77.7481],
        ['Hunt Valley, MD', 39.49208, -76.6492],
        ['Mechanicsville, MD', 38.44192, -76.73775],
        ['Newark, DE', 39.60317, -75.75629],
        ['Oxford, PA', 39.81701, -75.96475],
        ['Pocomoke, MD', 38.08098, -75.59042],
        ['Queen Anne, MD', 38.92152, -75.95698],
        ['Salisbury, MD', 38.37111, -75.52374],
        ['Upper Marlboro, MD', 38.82438, -76.73343],
        ['Westminster, MD', 39.60421, -76.99768],
        ['Whiteford, MD', 39.70211, -76.3678] 
    ];

    const handleChange = (e) => {
        setLocation(e.target.value);
        setErrorMessage('');
    };

    const geocodeZipCode = async (zipCode) => {
        try {
            const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=AIzaSyCWLJ3Ho51NIeT6pJn7az-yz0H2-eeTaFI`);
            // Check for the ZERO_RESULTS status
            if (response.data.status === 'ZERO_RESULTS') {
                setErrorMessage('Invalid zip code. Please try again.');
                return null;
            } else if (response.data.status === 'OK') {
                const { lat, lng } = response.data.results[0].geometry.location;
                const state = response.data.results[0].address_components.find(component => component.types.includes('administrative_area_level_1')).short_name;
                return { lat, lng, state };
            } else {
                // Handle other possible statuses
                setErrorMessage('An error occurred. Please try again.');
                return null;
            }
        } catch (error) {
            console.error('Error geocoding zip code:', error);
            setErrorMessage('An error occurred. Please try again later.');
            return null;
        }
    };

    // Haversine formula to calculate distance between two coordinates
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the earth in km
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a = 
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c * 0.621; // Distance in miles
        return distance;
    };

    const findClosestBranch = (userCoordinates) => {
        let closest = null;
        let shortestDistance = Infinity;
        locations.forEach(([name, lat, lng]) => {
            const distance = calculateDistance(userCoordinates.lat, userCoordinates.lng, lat, lng);
            if (distance < shortestDistance) {
                shortestDistance = distance;
                closest = { name, lat, lng, distance: distance.toFixed(1)};
            }
        });
        // calculateHauling(shortestDistance);
        setClosestBranch(closest);
    };

    // const calculateHauling = (distance) => {
    //     const ratePerMile = 2; // Set your rate per mile here
    //     if (distance <= 21) {
    //         setHaulingFee(0);
    //     } else {
    //         const fee = (distance - 21) * ratePerMile;
    //         setHaulingFee(fee);
    //     }
    // };


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted:', location);
        const coordinates = await geocodeZipCode(location);
        if (coordinates) {
            setCoordinates(coordinates);
            findClosestBranch(coordinates);
        }
    };

    return (
        <form className="service-form" onSubmit={handleSubmit}>
            <div className="form-section">
                <div className="form-header">Find Closest Branch</div>
                <br /><br />
                <input type="text" name="location" value={location} onChange={handleChange} placeholder="Enter Your Zip Code" />
                <button type="submit" className="button">Find</button>
            </div>
            {closestBranch && (
                <div className="closest-branch">
                    <p>Closest Branch: {closestBranch.name}</p>
                    <p>Distance: {closestBranch.distance} miles</p>
                    {/* <p>Estimated Hauling Fee: ${haulingFee.toFixed(0)}</p> */}
                </div>
            )}
            {coordinates && closestBranch && (
                <Link 
                    to={`/service_quoter?zip=${location}&state=${coordinates.state}&branch=${closestBranch.name.split(',')[0]}&distance=${closestBranch.distance}`}
                    style={{ textDecoration: 'none'}} 
                >
                    <button>Schedule Maintenance</button>
                </Link>
            )}
        </form>
    );
}

export default ClosestBranch;