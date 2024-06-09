import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import axios from '../api/axios';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const { user, authTokens } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    phone_number: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${authTokens.access}`
            }
          };
          const response = await axios.get('/profile/', config);
          if (response.data) {
            setProfile({
              username: response.data.username,
              email: response.data.email,
              phone_number: response.data.profile ? response.data.profile.phone_number : ''
            });
          } else {
            setError('No profile data found');
          }
        } catch (error) {
          console.error('Error fetching profile:', error.response?.data || error.message);
          setError('Error fetching profile data');
        }
      };
      fetchProfile();
    }
  }, [user, authTokens]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${authTokens.access}`
        }
      };

      const profileData = {
        username: profile.username,
        email: profile.email,
        profile: {
          phone_number: profile.phone_number,
        },
      };

      const response = await axios.put('/profile/', profileData, config);
      alert('Profile updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating profile:', error.response?.data || error.message);
    }
  };

  return (
    <div className='container'>
      <div className='box'>
        <h1 className='title'>Profile Page</h1>
        {error && <p className="notification is-danger">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className='field'>
            <label className='label'>Username:</label>
            <div className='control'>
              <input className='input' type="text" name="username" value={profile.username} readOnly />
            </div>
          </div>
          <div className='field'>
            <label className='label'>Email:</label>
            <div className='control'>
              <input className='input' type="email" name="email" value={profile.email} readOnly />
            </div>
          </div>
          <div className='field'>
            <label className='label'>Phone Number:</label>
            <div className='control'>
              <input className='input' type="text" name="phone_number" value={profile.phone_number} onChange={handleChange} />
            </div>
          </div>
          <div className='field'>
            <div className='control'>
              <button type="submit" className='button is-link'>Update Profile</button>
            </div>
          </div>
        </form>
        <Link to="/password-reset" className='button is-text'>Forgot Password? Reset Here</Link>
      </div>
    </div>
  );
};

export default ProfilePage;
