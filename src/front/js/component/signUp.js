import React, { useState } from "react";

export const SignUp = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");

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

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleSignup = (e) => {
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

    // Perform signup logic here, e.g., make an API request to create a new user

    setEmail("");
    setPassword("");
    setName("");
    setDateOfBirth("");
    setPhone("");
    setAddress("");
    setGender("");
    onClose();
  };

  return (
    <div className="signup-form-wrapper">
      <h3>Sign Up</h3>
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
          <label>Phone</label>
          <input type="tel" value={phone} onChange={handlePhoneChange} />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input type="text" value={address} onChange={handleAddressChange} />
        </div>
        <div className="form-group">
          <label>Gender</label>
          <select value={gender} onChange={handleGenderChange}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
};


