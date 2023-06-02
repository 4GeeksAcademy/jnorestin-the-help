import React from 'react';
import './FrontHelpCard.css';

const FrontHelpCard = ({ profilePic, dataText }) => {
  return (
    <div className="front-help-card">
      <img className="profile-pic" src={profilePic} alt="Profile" />
      <p className="data-text">{dataText}</p>
    </div>
  );
};

export default FrontHelpCard;
