import React, { useEffect, useState } from 'react';


  const HelpSlider = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    // This is where I fetch the datat from the back end 
    fetch('https://ronaldinep-congenial-fishstick-r9w4pjjq4xxfx554-3001.preview.app.github.dev/api/posts')
      .then((response) => response.json())
      .then((data) => {
        setProfiles(data); // the data should appear as a list of object posts.
      })
      .catch((error) => {
        console.log('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="helpslider-container">
      {profiles.map((profile, index) => (
        <div className="helpslider-card" key={index}>
          <img src={profile.profilePicture} alt="Profile" className="helpslider-picture" />
          <div className="card">
            <div className="card-body">
              <p className="card-text">{profile.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HelpSlider;
