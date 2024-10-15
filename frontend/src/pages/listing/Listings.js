import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Listings.css';
const Listings = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/accommodations"
        );
        setLocations(response.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="img-container">
      {locations.length > 0 && (
        locations.map((location) => (
          <div className="img-content" key={location._id}>
            <img
              src={`http://localhost:5000/${location.images[0]}`}
              alt="img"
            />
        
            <div className="img-content-info">
              <p> <strong>{location.title}</strong></p>
              <hr />
              <p>{location.guests} guests . {location.bathrooms} bath . {location.beds} beds. {location.bedrooms} . </p>
              <p>Amenities {location.amenities
                          .map((amenity) => JSON.parse(amenity))
                          .flat()
                          .join(", ")}</p>
              <hr />
              <p>
                Rating: {location.ratings} ⭐ ({location.reviews} reviews) <strong>${location.price}</strong> /night
              </p>
            </div>
            <button className="update">Update</button>
            <button className="delete">Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Listings;
