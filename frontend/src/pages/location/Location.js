import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import "./Location.css";
import { Button } from '@mui/material';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';

const Location = () => {
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();
  const {id} = useParams()
  // Use useLocation to get the passed state
  const { state } = useLocation();
  const selectedLocation = state?.selectedLocation || '';
  const checkInDate = state?.checkInDate;
  const checkOutDate = state?.checkOutDate;
  const guestCount = state?.guestCount || 1; // Default to 1 if not provided

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/accommodations"
        );
        setLocations(response.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  const handleImageClick = (location) => {
    navigate(`/locationInfo/${location._id}`, { state: { id: location._id, title: location.title, price: location.price } });
  };

  // Format the date to a readable string
  const formatDate = (date) => {
    if (date instanceof Date && !isNaN(date)) {
      return date.toLocaleDateString();
    }
    return ""; // Return an empty string for invalid dates
  };

  return (
    <div className="location">
      {/* Conditionally render the search-page-info-lux */}
      {selectedLocation.toLowerCase().includes("lux") && (
        <div className='search-page-info-lux'>
          <div className='search-page-info'>
            <p>62 stays . {formatDate(checkInDate)} to {formatDate(checkOutDate)} . {guestCount} guest{guestCount > 1 ? 's' : ''}</p>
            <h1>Stays nearby {selectedLocation}</h1>
            <Button variant='outlined'>Cancellation Flexibility</Button>
            <Button variant='outlined'>Type of Place</Button>
            <Button variant='outlined'>Price</Button>
            <Button variant='outlined'>Rooms and Beds</Button>
            <Button variant='outlined'>More filters</Button>
          </div>
        </div>
      )}

      {/* Display the standard search page info regardless of location */}
      <div className='search-page-results-text'>200+ stays in {selectedLocation}</div>

      <div className='search-page-info-standard'>
        <div className='search-page-info'>
          <Button variant="outlined">Price <KeyboardArrowDownOutlinedIcon /></Button>
          <Button variant='outlined'>Type of place <KeyboardArrowDownOutlinedIcon /></Button>
          <Button variant='outlined'>Free cancellation</Button>
          <Button variant='outlined'>Wifi</Button>
          <Button variant='outlined'>Kitchen</Button>
          <Button variant='outlined'>Air conditioning</Button>
          <Button variant='outlined'>Washer</Button>
          <Button variant='outlined'>Iron</Button>
          <Button variant='outlined'>Dedicated workspace</Button>
          <Button variant='outlined'>Free parking</Button>
          <Button variant='outlined'>Dryer</Button>
          <Button variant='outlined'><TuneOutlinedIcon />Filter</Button>
        </div>
      </div>
          
      <div className="location-list">
        {locations.length > 0 ? (
          locations
            .filter(location => selectedLocation === 'all' || location.location === selectedLocation) // Show all if "All" selected
            .map((location) => (
              <div key={location._id} className="location-card">
                <img
                  src={`http://localhost:5000/${location.images[0]}`}
                  alt={location.title}
                  className="location-image"
                  onClick={() => handleImageClick(location)} 
                  style={{ cursor: 'pointer' }}
                />
                <div className="location-card-content">
                  <h2>{location.location}</h2>
                  <div className="location-details">
                    <ul className="location-description">
                      <li>
                        <span>Type:</span> {location.title}
                      </li>
                      <li>
                        <span>Amenities:</span>{" "}
                        {location.amenities
                          .map((amenity) => JSON.parse(amenity))
                          .flat()
                          .join(", ")}
                      </li>
                      <li>
                        <span>Price per night:</span> ${location.price}
                      </li>
                    </ul>
                    <span className="star-rating">
                      5 <span className="stars">★★★★★</span>{" "}
                      <span className="review-text">(150 reviews)</span>
                    </span>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <p>Loading locations...</p>
        )}
      </div>
    </div>
  );
}

export default Location;
