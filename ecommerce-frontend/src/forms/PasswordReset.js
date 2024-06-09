import React, { useState } from 'react';
import axiosInstance from '../api/axios';

// PasswordResetForm component for handling password reset requests
const PasswordResetForm = () => {
  const [email, setEmail] = useState('');  // State to manage the email input
  const [message, setMessage] = useState('');  // State to manage the message display

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent default form submission behavior
    try {
      // Send a POST request to the password reset endpoint with the email
      await axiosInstance.post('/password/reset/', { email });
      setMessage('Password reset email sent!');  // Set success message
    } catch (error) {
      setMessage('Error sending password reset email');  // Set error message
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
            onChange={(e) => setEmail(e.target.value)}  // Update email state on input change
            required
          />
        </div>
        <button type="submit" className="submit-button">Send Reset Email</button>
      </form>
      {message && <p className="message">{message}</p>}  // Display message if it exists
    </div>
  );
};

export default PasswordResetForm;
