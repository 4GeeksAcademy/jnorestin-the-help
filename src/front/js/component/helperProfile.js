import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext'; // Adjust this import to match your file structure

export function HelperProfile() {
  const navigate = useNavigate();
  const { actions } = useContext(Context);

  const [skills, setSkills] = useState("");
  const [bio, setBio] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('skills', skills);
    formData.append('bio', bio);
    formData.append('address', address);
    formData.append('phoneNumber', phoneNumber);
    formData.append('profilePicture', profilePicture);

    await actions.createHelperProfile(formData);
    navigate('/ProfileFinished');
  };

  return (
    <form onSubmit={handleSubmit}>
        <label>
            Skills:
            <input type="text" value={skills} onChange={e => setSkills(e.target.value)} />
        </label>
        <label>
            Bio:
            <textarea value={bio} onChange={e => setBio(e.target.value)} />
        </label>
        <label>
            Address:
            <input type="text" value={address} onChange={e => setAddress(e.target.value)} />
        </label>
        <label>
            Phone number:
            <input type="text" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
        </label>
        <label>
            Profile picture:
            <input type="file" onChange={e => setProfilePicture(e.target.files[0])} />
        </label>
        <button type="submit">Save</button>
    </form>
  );
};

export default HelperProfile;
