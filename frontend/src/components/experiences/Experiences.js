import React from 'react';
import './Experiences.css'
const Experiences = () => {
    return (
        <div>
            <b className="explore">Discover Airbnb Experiences</b>
            <br /><br />
            <div className="experiences">
                <div className="experience-left-image">
                    <p className="experience-image-top-p">Things to do <br/>on your trip</p>
                    <button>Experiences</button>
                </div>

                <div className="experience-right-image">
                    <p className="experience-image-top-p">Things to do<br/>from home</p>
                    <button>Online Experiences</button>
                </div>
            </div>
        </div>
    );
};

export default Experiences;
