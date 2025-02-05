import React from 'react'
import './Card.css'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
const Card = ({ src, title, distance, date, price, rating }) => {
  return (
    <div className="card-container">
      {/* <img className='gallery-item' src={src} alt={title} />
      <div className="card-info">
        <p>{title}</p>
        <h4>{distance}</h4>
      </div> */}

        <div class="card-window">
            <img lassName='gallery-item' src={src} alt={title}/>
            <div class="card-title">{title} 
              <span className='title-icon'><StarOutlinedIcon/> <span>{rating}</span></span>
            </div>
            <div class="card-distance">{distance}</div>
            <div class="card-date">{date}</div>
            <div class="card-price"><b>{price} ZAR</b> night</div>
            </div>
    </div>
  )
}

export default Card;