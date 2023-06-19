import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../front/styles/login&signup.css";

export const SignUp = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDateOfBirthChange = (e) => {
    setDateOfBirth(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleZipCodeChange = (e) => {
    setZipCode(e.target.value);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const currentDate = new Date();
    const selectedDate = new Date(dateOfBirth);
    const ageDiffMs = currentDate - selectedDate;
    const ageDate = new Date(ageDiffMs);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);

    const ageThreshold = 18;
    if (age < ageThreshold) {
      console.log("You must be at least 18 years old to sign up.");
      return;
    }

    try {
      const response = await fetch("/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          name,
          date_of_birth: dateOfBirth,
          city,
          location,
          zip_code: zipCode,
        }),
      });

      if (response.ok) {
        const userData = await response.json();
        console.log("User created:", userData);

        setEmail("");
        setPassword("");
        setName("");
        setDateOfBirth("");
        setZipCode("");
        setCity("");
        setLocation("");
        setSignupSuccess(true);
        onClose();

        // Redirect to help page after successful signup
        navigate("/help");
      } else {
        console.log("Failed to create user.");
        const errorData = await response.json();
        console.log("Error:", errorData);
      }
    } catch (error) {
      console.log("An error occurred:", error);
    }
  };

  return (
    <div className="signup-form-wrapper">
      {signupSuccess ? (
        <p>Sign up successful. Redirecting...</p>
      ) : (
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={handleEmailChange} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={handlePasswordChange} required />
          </div>
          <div className="form-group">
            <label>Name</label>
            <input type="text" value={name} onChange={handleNameChange} required />
          </div>
          <div className="form-group">
            <label>Date of Birth</label>
            <input type="date" value={dateOfBirth} onChange={handleDateOfBirthChange} required />
          </div>
          <div className="form-group">
            <label>City</label>
            <input type="text" value={city} onChange={handleCityChange} required />
          </div>
          <div className="form-group">
            <label>State</label>
            <input type="text" value={location} onChange={handleLocationChange} required />
          </div>
          <div className="form-group">
            <label>Zip code</label>
            <input type="text" value={zipCode} onChange={handleZipCodeChange} required />
          </div>
          <button type="submit" className="navbar-button">
            Sign Up
          </button>
        </form>
      )}
    </div>
  );


};
