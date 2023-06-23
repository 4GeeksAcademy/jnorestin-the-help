import React, { useState, useEffect } from 'react';
import './ProfileFinished.css';

export const ProfileFinished = () => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem('profile'));
    setProfile(savedProfile);
  }, []);

  return (
  
    <div>
      <div>
  <h1 className="title">Helper</h1>
</div>
      

      {/* Profile Picture */}
      <div className="center">
        {profile.profilePicture ? 
          <img className="profile-picture1" src={profile.profilePicture} alt="Profile"/> 
          :
          <img className="profile-picture1" src="https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcRvTQO_dj9ha1csLtuiB75ADaS9jfqAzGivEgi4HuV5wbTT6sg3pEVGAC_y0Cfvep9ide0qEmDmPzFhBrw" alt="Placeholder Profile"/>
        }
      </div>

      {/* Skills */}
      <div className="input-group">
        <label htmlFor="skills-display">Skills</label>
        <div id="skills-display" className="display-field">{profile.skills}</div>
      </div>

      {/* Description */}
      <div className="input-group">
        <label htmlFor="description-display">BIO</label>
        <div id="description-display" className="display-field">{profile.description}</div>
      </div>

      {/* Phone Number */}
      <div className="input-group">
        <label htmlFor="phone-display">Phone Number</label>
        <div id="phone-display" className="display-field">{profile.phoneNumber}</div>
      </div>

      {/* Address */}
      <div className="input-group">
        <label htmlFor="address-display">Address</label>
        <div id="address-display" className="display-field">{profile.address}</div>
      </div>
    </div>
  );
};



