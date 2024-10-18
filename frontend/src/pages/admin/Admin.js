import React,{useState} from "react";
import { Button } from "@mui/material";
import Reservations from "../reservation/Reservation";
import CreateListingForm from "../listing/CreateListing";
import Listings from "../listing/Listings";
import './Admin.css';
import PropTypes from "prop-types";
const Dashboard = ({selected, onChange}) => {
    
  const [showReservation, setShowReservation] = useState(false);
  const [showListing, setShowListing] = useState(false);
  const [showAddListing, setShowAddListing] = useState(false);
  
  const handleShowReservations = () => {
    setShowReservation(true);
    setShowListing(false);
    setShowAddListing(false);
  };

  const handleShowListings = () => {
    setShowListing(true);
    setShowReservation(false);
    setShowAddListing(false);
  };

  const handleShowAddListing = () => {
    setShowAddListing(true);
    setShowReservation(false);
    setShowListing(false);
  };

   return (
    <>
  
      
      <div className="button-container">
        <Button variant="outlined" onClick={handleShowReservations}>
          View Reservation
        </Button>
        <Button variant="outlined" onClick={handleShowListings}>
          View Listing
        </Button>
        <Button variant="outlined" onClick={handleShowAddListing}>
          Create Listing
        </Button>
      </div>
     

      {/* Conditionally render based on the state */}
      {showListing && (<Listings/>)}

      {showReservation && (<Reservations /> )}

      {showAddListing && (<CreateListingForm /> )}
    </>
  );
};

Dashboard.propTypes = {
  selected: PropTypes.arrayOf(PropTypes.string).isRequired, // This will throw a warning if not provided
  onChange: PropTypes.func.isRequired,
};

export default Dashboard;
