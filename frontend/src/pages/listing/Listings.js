import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Listings.css';
import { toast, ToastContainer } from "react-toastify";
import {useNavigate } from 'react-router-dom';

const Listings = () => {
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();
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


  const handleUpdateAccomodation = async (location) => {
    navigate(`/create-listing`, {state: { listing: location}});
  }

  const handleDeleteAccommodation = async (accommodationId) => {
    try {
      await axios.delete(`http://localhost:5000/api/accommodations/delete/${accommodationId}`);
      setLocations((prevlocation) => prevlocation.filter((location) => location._id !== accommodationId));
    
          toast.success("Reservation deleted successfully!");
    
  }catch (error) {
    console.error("Error deleting accommodation:", error);
    toast.error("Error deleting accommodation");
  }
};

  return (
    <>
    <hr />
    <p className="hotel-list">My Hotel List</p>
    <hr />
    <div className="img-container">
    {locations.length > 0 && (
      locations.map((location, index) => (
        <>
        <div className={`img-content ${index === 2 ? 'single-column' : ''}`} key={location._id}>
          <img
            src={`http://localhost:5000/${location.images[0]}`}
            alt="img"
          />
             
          <div className="img-content-info">
            <p><strong>{location.title}</strong></p>
            <hr />
            <p>{location.guests} guests . {location.bathrooms} bath . {location.beds} beds . {location.bedrooms} bedrooms</p>
            <p>Amenities: {location.amenities.map((amenity) => JSON.parse(amenity)).flat().join(", ")}</p>
            <hr />
            <p>
              Rating: {location.ratings} ⭐ ({location.reviews} reviews) 
            </p>

            <p><strong>${location.price}</strong> /night</p>
          </div>
          
             </div>
             <button className="update" onClick= {() => handleUpdateAccomodation(location)}>Update</button>
             <button className="delete" onClick={() => handleDeleteAccommodation(location._id)}>Delete</button>
             <hr/>

    </>

      ))
    )}

    <ToastContainer autoClose={3000} />
  </div>

  </>
  );
};

export default Listings;
