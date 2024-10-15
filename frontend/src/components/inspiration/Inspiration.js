import React, { useState } from 'react';
import './Inspiration.css';

const Inspiration = () => {
    // State to keep track of the active tab
    const [activeTab, setActiveTab] = useState('Lake');

    // Function to handle tab click
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    // Tab content based on the active tab
    const tabContent = {
        Lake: (
            <>
                <b className="b1-1">Adirondack</b>
                <p className="p1-1">New York</p>
                <b className="b1-2">Balsam Lake</b>
                <p className="p1-2">Wisconsin</p>
                <b className="b1-3">Buckhorn</b>
                <p className="p1-3">Ontario</p>
            </>
        ),
        Mountain: (
            <>
                <b className="b2-1">Algonquin</b>
                <p className="p2-1">Ontario</p>
                <b className="b2-2">Bancroft</b>
                <p className="p2-2">Ontario</p>
                <b className="b2-3">Clear Lake</b>
                <p className="p2-3">Ontario</p>
            </>
        ),
        Coastal: (
            <>
                <b className="b3-1">Austin</b>
                <p className="p3-1">Texas</p>
                <b className="b3-2">Banff</b>
                <p className="p3-2">Alberta</p>
                <b className="b3-3">Cultus Lake</b>
                <p className="p3-3">British Columbia</p>
            </>
        ),
        Island: (
            <>
                <b className="b4-1">Bala</b>
                <p className="p4-1">Ontario</p>
                <b className="b4-2">Bracebridge</b>
                <p className="p4-2">Ontario</p>
                <b>Show more</b>
            </>
        ),
        Outdoor: <p>Outdoor Destinations content...</p>,
        Other: <p>Other Popular Destinations content...</p>,
    };

    return (
        <div className="inspiration">
            <b className="inspiration-title">Inspiration for future getaways</b>
            <div className="inspiration-headers-container">
                <div className="inspiration-headers">
                    <button 
                        className={`inspiration-headers-item ${activeTab === 'Lake' ? 'inspiration-headers-active' : ''}`}
                        onClick={() => handleTabClick('Lake')}
                    >
                        Lake Destinations
                    </button>
                    <button 
                        className={`inspiration-headers-item ${activeTab === 'Mountain' ? 'inspiration-headers-active' : ''}`}
                        onClick={() => handleTabClick('Mountain')}
                    >
                        Mountain Destinations
                    </button>
                    <button 
                        className={`inspiration-headers-item ${activeTab === 'Coastal' ? 'inspiration-headers-active' : ''}`}
                        onClick={() => handleTabClick('Coastal')}
                    >
                        Coastal Destinations
                    </button>
                    <button 
                        className={`inspiration-headers-item ${activeTab === 'Island' ? 'inspiration-headers-active' : ''}`}
                        onClick={() => handleTabClick('Island')}
                    >
                        Island Destinations
                    </button>
                    <button 
                        className={`inspiration-headers-item ${activeTab === 'Outdoor' ? 'inspiration-headers-active' : ''}`}
                        onClick={() => handleTabClick('Outdoor')}
                    >
                        Outdoor Destinations
                    </button>
                    <button 
                        className={`inspiration-headers-item ${activeTab === 'Other' ? 'inspiration-headers-active' : ''}`}
                        onClick={() => handleTabClick('Other')}
                    >
                        Other Popular Destinations
                    </button>
                </div>
            </div>
            <div className="inspiration-line"></div>
            <div className="inspiration-column">
                <div className="inspiration-column-item">
                    {tabContent[activeTab]}
                </div>
            </div>
        </div>
    );
};

export default Inspiration;
