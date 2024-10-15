import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import './Admin.css';
const Dashboard = () => {
  return (
    
          <>
            <div className="button-container">
              <Button
                variant="outlined"
                component={Link}
                to="/reservations"
              >
                View Reservation
              </Button>
              <Button
                variant="outlined"
                component={Link}
                to="/listings"
              >
                View Listing
              </Button>
              <Button
                variant="outlined"
                component={Link}
                to="/create-listing"
              >
                Create Listing
              </Button>
            </div>
            <hr />
            <p className="hotel-list">My Hotel List</p>
            <hr />

            
          </>
        
      
  );
};

export default Dashboard;
