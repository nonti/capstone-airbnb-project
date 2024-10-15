import React, { useRef, useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HeaderBottom = () => {
  const [guestCount, setGuestCount] = useState(1);
  const [showGuestPopup, setShowGuestPopup] = useState(false);
  const popupRef = useRef(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const navigate = useNavigate();

  const handleOnGuestChange = (operation) => {
    setGuestCount((prevCount) => {
      const newCount = operation === "increment" ? prevCount + 1 : prevCount - 1;
      return Math.max(0, Math.min(10, newCount));
    });
  };

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/accommodations');
        setLocations(response.data);
      } catch (error) {
        console.error('Error fetching locations:', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        } else if (error.request) {
          console.error('Request data:', error.request);
        } else {
          console.error('Error message:', error.message);
        }
      }
    };

    fetchLocations();
  }, []);

  const handleSelectChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleSearchClick = () => {
    navigate('/locations', {
      state: {
        selectedLocation,
        checkInDate,
        checkOutDate,
        guestCount
      }
    });
  };

  return (
    <div className="header-bottom">
      <div className="header-search">
        <div className="search-where">
          <div>Location</div>
          <div className="search-input">
            <select
              id="location-select"
              value={selectedLocation}
              onChange={handleSelectChange}
            >
              <option value="">Select location</option>
              <option value="all">All</option>
              {locations.map((location) => (
                <option key={location._id} value={location.location}>
                  {location.location}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="border-divider"></div>
        <div className="search-checkin">
          <div>Check In</div>
          <div className="search-button">
            <DatePicker
              selected={checkInDate}
              onChange={(date) => setCheckInDate(date)}
              placeholderText="Add dates"
              className="date-picker"
            />
          </div>
        </div>
        <div className="border-divider"></div>
        <div className="search-checkout">
          <div>Check Out</div>
          <div className="search-button">
            <DatePicker
              selected={checkOutDate}
              onChange={(date) => setCheckOutDate(date)}
              placeholderText="Add dates"
              className="date-picker"
            />
          </div>
        </div>
        <div className="border-divider"></div>
        <div className="search-who">
          <span>Guests </span>
          <button
            className="search-button"
            onClick={() => setShowGuestPopup(true)}
          >
            {guestCount > 0 ? `Add Guest` : `${guestCount} Guest`}
          </button>
        </div>
        {showGuestPopup && (
          <div className="guest-popup" ref={popupRef}>
            <div className="guest-selector">
              <button
                className="guest-button"
                onClick={() => handleOnGuestChange("decrement")}
              >
                <RemoveIcon />
              </button>
              <input
                type="number"
                value={guestCount}
                readOnly
                className="guest-input"
              />
              <button
                className="guest-button"
                onClick={() => handleOnGuestChange("increment")}
              >
                <AddIcon />
              </button>
            </div>
          </div>
        )}
        <button className="search" onClick={handleSearchClick}>
          <SearchIcon className="search-icon" />
        </button>
      </div>
    </div>
  );
};

export default HeaderBottom;
