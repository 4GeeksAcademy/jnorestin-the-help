import React, { useState } from "react";

const PopupForm = ({onClose}) => {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  

 

 

  const handleSubmit = (e) => {
    e.preventDefault();

    // Process form data
    console.log("Name:", name);
    console.log("Text Input:", text);
    console.log("Date:", date);
    console.log("Location:", location);
    console.log("Profile Picture:", profilePicture);

    // Reset form fields
    setName("");
    setText("");
    setDate("");
    setLocation("");
    setProfilePicture(null);

    // Close the form
    closeForm();
  };

  return (
    <div>

      
        <div className="overlay">
          <div className="popup-form">
            <h2>Pop-up Form</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <label htmlFor="profile-picture">Profile Picture:</label>
              <input
                type="file"
                id="profile-picture"
                name="profile-picture"
                onChange={(e) => setProfilePicture(e.target.files[0])}
              />

              <label htmlFor="text">Text Input:</label>
              <input
                type="text"
                id="text"
                name="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />

              <label htmlFor="date">Date:</label>
              <input
                type="date"
                id="date"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />

              <label htmlFor="location">Location:</label>
              <input
                type="text"
                id="location"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />

              <input type="submit" value="Submit" />
            </form>
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      
    </div>
  );
};

export default PopupForm;
