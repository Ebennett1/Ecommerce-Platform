import React, { useState } from 'react';
import axiosInstance from '../api/axios';


const PasswordResetForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/password/reset/', { email });
      setMessage('Password reset email sent!');
    } catch (error) {
      setMessage('Error sending password reset email');
    }
  };

  return (
    <div className="password-reset-container">
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Send Reset Email</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default PasswordResetForm;
