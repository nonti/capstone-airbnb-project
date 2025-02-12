import React, { useRef, useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

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
      }
    };

    fetchLocations();
  }, []);

  const handleSelectChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleSearchClick = () => {
    const formattedCheckInDate = checkInDate ? format(checkInDate, 'yyyy-MM-dd') : null;
    const formattedCheckOutDate = checkOutDate ? format(checkOutDate, 'yyyy-MM-dd') : null;
    navigate('/locations', {
      state: {
        selectedLocation,
        checkInDate: formattedCheckInDate,
        checkOutDate: formattedCheckOutDate,
        guestCount
      }
    });
  };

  return (
    <div className='header-content'>
    <div className="header-bottom">
      <div className="header-search">
        <div className="search-where">
          <div className="search-input">
          <div>Location</div>
            <select
              id="location-select"
              value={selectedLocation}
              onChange={handleSelectChange}
            >
              <option value="">Search </option>
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
            {guestCount > 0 ? `${guestCount} Guest${guestCount > 1 ? 's' : ''}` : 'Add Guest'}
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
    </div>
  );
};

export default HeaderBottom;
