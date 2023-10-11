import React, { useState, useEffect } from 'react';
import './popout.css'; // Import your CSS file for styling

const Popout = ({ message }) => {
    const [isOpen, setIsOpen] = useState(!!message);

    const closePopout = () => {
        setIsOpen(false);
    };


    return (
        <div className={`popout ${isOpen ? 'open' : ''}`}>
            {isOpen && (
                <div className="popout-content">
                    <p>{message}</p>
                    <button className="close-button" onClick={closePopout}>X</button>
                </div>
            )}
        </div>
    );
};

export default Popout;
