import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const { state } = useLocation();
  const { listing } = state || {}; // Destructure listing data from the passed state
  // const [reservationData, setReservationData] = useState({
  //   listingName: listing ? listing.name : '',
  //   checkin: '',
  //   checkout: ''
  // });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/api/reservations")
      .then((response) => response.json())
      .then((json) => setReservations(json))
      .finally(() => {
        setLoading(false);
      });
  }, []);
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
                      <td>{reservation.listingName}</td>
                      <td>{reservation.cehckin}</td>
                      <td>{reservation.checkout}</td>
                      <td><button>Delete</button></td>
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
  )
}

export default Reservations;