import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file for styling
import { GoogleLogin } from '@react-oauth/google';

function Login() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Submit handler for login form
  const submiteddata = async (data) => {
    const { name, password } = data;
    setLoading(true); // Start loading state

    try {
      // Fetch the users data from the server
      const res = await fetch("http://localhost:4000/users");

      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }

      const users = await res.json();

      
      const user = users.find((user) => user.name === name && user.password === password);

      if (user) {
      
        alert("Login successful");
        navigate('/Profile',{state:user});
      } else {
        // If user not found, prompt signup
        alert("Invalid credentials, please sign up first");
        navigate('/Signup');
      }

    } catch (error) {
      // If an error occurs during fetch
      alert(error.message);
    } finally {
      setLoading(false); // Stop loading state
    }

    reset(); // Reset form after submission
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit(submiteddata)}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <p className="error-message">{errors.name.message}</p>}

          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register('password', { required: 'Password is required' })}
          />
          <GoogleLogin
           onSuccess={credentialResponse => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
          
        
      />

          {errors.password && <p className="error-message">{errors.password.message}</p>}

          <input type="submit" value={loading ? 'Logging in...' : 'Login'} disabled={loading} />


          <div className="signup-link">
            <p>Don't have an account? <Link to="/signup">Signup</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
