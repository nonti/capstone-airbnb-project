import React from 'react'
import "./Card.css";
import Card from './Card';
const CardTiles = () => {
  return (
    <div>
      <div className="home-section">
        <Card
          src="https://images.trvl-media.com/lodging/5000000/4290000/4280200/4280116/ad593e09.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill"
          title="Sandton City Hotel"
          distance="53 km away"
        />
        <Card
          src="https://images.trvl-media.com/lodging/35000000/34160000/34157500/34157423/bae5f433.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill"
          title="Joburg City Hotel"
          distance="168 km away"
        />
        <Card
          src="https://images.trvl-media.com/lodging/72000000/71560000/71557200/71557111/743acf6c.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill"
          title="Woodmead Hotel"
          distance="30 miles away"
        />
        <Card
          src="https://images.trvl-media.com/lodging/4000000/3970000/3968600/3968501/ca65e071.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill"
          title="Hyde Park Hotel"
          distance="34 km away"
        />
        <Card
          src="https://images.trvl-media.com/lodging/6000000/5330000/5329300/5329286/565d0b86.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill"
          title="Port  Hotel"
          distance="45 km away"
        />
      </div>    
    </div>
  )
}

export default CardTiles