import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import "./UpdateProfile.css";
import styles from './UpdateProfile.css';

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState("");
  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const handleUpdateProfile = () => {
    const userData = {
      skills: skills,
      description: description,
      phone_number: phoneNumber,
      address: address,
      is_helper: true
    };

    const token = localStorage.getItem("token");
    const authorizationHeader = `Bearer ${token.replace(/^"(.*)"$/, "$1")}`;

    fetch("https://donducci-cautious-spork-446gqv6x6pp35r9p-3001.preview.app.github.dev/api/update-user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: authorizationHeader,
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error updating profile");
        }
      })
      .then((data) => {
        navigate("/updated-profile");
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  return (
    <div className="custom-update-profile-container">
      <h4>Hi, we need a bit more info from you!</h4>
      <div className="custom-input-group">
        <label htmlFor="skills">What are your skills?:</label>
        <input
          type="text"
          id="skills"
          name="skills"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="custom-input"
        />
      </div>
      <div className="custom-input-group">
        <label htmlFor="description">Tell us about yourself:</label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="custom-textarea"
        ></textarea>
      </div>
      <div className="custom-input-group">
        <label htmlFor="phone-number">Phone Number:</label>
        <input
          type="text"
          id="phone-number"
          name="phone-number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="custom-input"
        />
      </div>
      <div className="custom-input-group">
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="custom-input"
        />
      </div>
      <button onClick={handleUpdateProfile} className="custom-button">Update Profile</button>
    </div>
  );
};

export default UpdateProfile;
