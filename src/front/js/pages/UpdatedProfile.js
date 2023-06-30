import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import "./UpdatedProfile.css";
import "../../../front/styles/UpdatedProfile.css";

const UpdatedProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("token");
  const authorizationHeader = `Bearer ${token.replace(/^"(.*)"$/, "$1")}`;
  useEffect(() => {
    fetch(process.env.BACKEND_URL +"/api/user-by-token", {
      headers: {
        Authorization: authorizationHeader,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.text().then((text) => {
            throw new Error(`Error fetching user profile: ${text}`);
          });
        }
      })
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const dob = new Date(dateOfBirth);
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  };

  const dummyProfilePictureUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/800px-Elon_Musk_Royal_Society_%28crop2%29.jpg";

  return (
    <div className="profile-container">
      <h3 className="custom-helper-title">Helper Profile</h3>
      <div className="profile-picture-container">
        <img
          src={dummyProfilePictureUrl}
          alt="Profile"
          className="profile-picture"
        />
      </div> 
      <div className="custom-profile-text">
      <p>Name: {user.name}</p>
      <p>Age: {calculateAge(user.date_of_birth)}</p>
      <p>City: {user.city}</p>
      <p>State: {user.location}</p>
      <p>Skills: {user.skills}</p>
      <p>Description: {user.description}</p>
      <p>Phone: {user.phone_number}</p>
      <p>Address: {user.address}</p>
      </div>
      <button className="custom-button" onClick={() => navigate("/")}>Back</button>
    </div>
  );
};

export default UpdatedProfile;
