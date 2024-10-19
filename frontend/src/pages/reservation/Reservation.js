import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import './Reservation.css';

const Reservation = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem('user')); 
  const userRole = userInfo?.role; 
  const userId = userInfo?._id;
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      try {
        let response;
        if (userRole === 'host') {
          // If logged in as a host, fetch reservations for the host
          response = await axios.get(`http://localhost:5000/api/reservations/host/${userId}`);
        } else if (userRole === 'user') {
          // If logged in as a user, fetch reservations made by the user
          response = await axios.get(`http://localhost:5000/api/reservations/user/${userId}`);
        }

        if (response && response.data) {
          setReservations(response.data); 
        } else {
          toast.error("Invalid response format");
        }
      } catch (error) {
        toast.error("Error fetching reservations: " + (error.response?.data || error.message));
        setError("Failed to load reservations.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchReservations(); 
    }
  }, [userRole, userId]);

  return (
    <div>
      {loading ? (
        <p>Loading reservations...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="reservation-content">
          <h1>My Reservations</h1>
          {reservations.length > 0 ? (
            
            <table className="reservation-table">
  <thead>
    <tr>
      <th>Booked by</th>
      <th>Property</th>
      <th>Check-in</th>
      <th>Check-out</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {reservations.map((reservation) => (
      <tr key={reservation._id}>
        <td>{reservation?.bookedBy}</td>
        <td>{reservation.accommodationId?.property}</td>
        <td>{new Date(reservation.checkInDate).toLocaleDateString()}</td>
        <td>{new Date(reservation.checkOutDate).toLocaleDateString()}</td>
        <td>
          <button className="delete">Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

          ) : (
            <p>No reservations found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Reservation;
