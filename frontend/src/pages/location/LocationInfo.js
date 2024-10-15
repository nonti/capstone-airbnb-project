import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./LocationInfo.css";

const LocationInfo = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const [location, setLocation] = useState(state?.location || null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedInStatus);
  }, []);

  useEffect(() => {
    // If location is still null, fetch it from the API
    if (!location) {
      const fetchLocation = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/accommodations/${id}`);
          if (response.data) {
            setLocation(response.data);
          } else {
            console.error("No location data found");
          }
        } catch (error) {
          console.error("Error fetching location data:", error);
        }
      };
      fetchLocation();
    }
  }, [id, location]);

  // Check if location data is available
  if (!location) {
    return <h2>Loading location data...</h2>; // Provide a loading state
  }

  // Handle Reserve Button Click
  const handleReserveClick = (location) => {
    if (isLoggedIn) {
      // If logged in, navigate to the listings page
      navigate(`/listing/${location._id}`, { state: {
         id: location._id, title: location.title, 
         price: location.price, images: location.images, 
         description: location.description ,
         reviews: location.reviews, 
         rating: location.rating, 
         cleaningFee: location.cleaningFee,
         serviceFee: location.serviceFee,
         location: location.location,
         host: location.host,
         guests: location.guests,
         bathrooms: location.bathrooms,
         bedrooms: location.bedrooms,
         beds: location.beds,
         checkin: location.checkin,
         checkout: location.checkout,
         occupancyTaxes: location.occupancyTaxes,
         listingName: location.listingName,

        } });
    } else {
      // If not logged in, navigate to sign-in page and pass the current location
      navigate("/signin", { state: { redirectTo: `/listing/${id}` } });
    }
  };

  return (
    <div className="location-details-page">
      <h1>{location.title}</h1>
      <h2>{location.type} in {location.loc}</h2>
      <div className="details-container">
        {location.images && location.images.length > 0 ? (
          <img src={`http://localhost:5000/${location.images[0]}`} alt={location.title} className="main-image" />
        ) : (
          <p>No images available</p>
        )}
        <div className="details">
          <h3>Details</h3>
          <p>{location.description}</p>
          <p>Guests: {location.guests}</p>
          <p>Bedrooms: {location.bedrooms}</p>
          <p>Bathrooms: {location.bathrooms}</p>
          <p>Amenities: {location.amenities.join(', ')}</p>
          <p>Rating: {location.rating} ({location.reviews} reviews)</p>
        </div>
      </div>
      <div className="cost-calculator">
        <h3>Cost Breakdown</h3>
        <p>Price per night: ${location.price}</p>
        <p>Cleaning Fee: ${location.cleaningFee}</p>
        <p>Service Fee: ${location.serviceFee}</p>
        <p>Occupancy Taxes: ${location.occupancyTaxes}</p>
        <h4>Total: ${(location.price + location.cleaningFee + location.serviceFee + location.occupancyTaxes).toFixed(2)}</h4>
        <button className="reserve-button" onClick={() => handleReserveClick(location)}>Reserve Now</button> {/* Updated this line */}
      </div>
    </div>
  );
};

export default LocationInfo;
