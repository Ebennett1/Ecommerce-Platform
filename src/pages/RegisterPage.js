import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from '../api/axios';

const RegisterPage = () => {
  // State to manage form data
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  // State to manage error messages
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission to register a new user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/register/', formData);
      console.log('Registration success:', response.data);
      navigate('/login');  // Navigate to login page on successful registration
    } catch (error) {
      setError(error.response.data);  // Set error message if registration fails
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="auth-container">
      <h1>Register</h1>
      {error && <div className="error">{JSON.stringify(error)}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="auth-button">Register</button>
      </form>
      <p>Already Have Account? <Link to="/login" className="auth-link">Login Here</Link></p>
    </div>
  );
};

export default RegisterPage;
