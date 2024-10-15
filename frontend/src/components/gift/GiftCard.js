import React from "react";
import giftCard from '../../assets/images/cards.png'; // Adjust the path as needed
import "./GiftCard.css"; // Import your CSS file if needed

const GiftCard = () => {
  return (
    <div className="gift-card-container">
      <div className="gift-card-info">
        <p>
          Shop Airbnb <br /> gift cards
        </p>
        <button className="btn-learn">Learn more</button>
      </div>
      <div className="gift-card-img">
        <img src={giftCard} alt="Airbnb Gift Cards" />
      </div>
    </div>
  );
};

export default GiftCard;
