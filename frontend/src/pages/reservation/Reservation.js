import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

const Reservations = () => {
  const { state } = useLocation();
  const { id } = useParams(); 
  const [reservations, setReservations] = useState(state || null);
  const { listing } = state || {}; // Destructure listing data from the passed state
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If listing is not available from state, fetch it from the API
    if (!listing) {
      const fetchListing = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/reservations`
          );
          setReservations(response.data);
        } catch (error) {
          console.error("Error fetching listing data:", error);
        }
      };
      fetchListing();
    }
  }, [id, listing]);

  if (!listing) {
    return <p>Loading listing details...</p>;
  }

  return (
    <div>
      <div className="table-content">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <h1>My Reservations</h1>
            <table border={1}>
              <thead>
                <tr>
                  <th>Booked by</th>
                  <th>Property</th>
                  <th>Checkin</th>
                  <th>Checkout</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((reservation) => (
                  <tr key={reservation.id}>
                    <td>{reservation.host.username}</td> {/* Assuming "bookedBy" is a field */}
                    <td>{reservation.listingName}</td> {/* Correct this if the field name is different */}
                    <td>{reservation.checkin}</td> {/* Fix the typo */}
                    <td>{reservation.checkout}</td>
                    <td>
                      <button className="delete">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default Reservations;
 