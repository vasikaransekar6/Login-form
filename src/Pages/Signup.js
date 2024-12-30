import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { adduser } from './Thunkslice';
import './Signup.css'; 
import { useNavigate } from 'react-router-dom';


const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required("Password is required"),
  confirmpassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required("Confirm password is required"),
});

function Signup() {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const submitteddata = (data) => {
    dispatch(adduser(data));
    reset(); 
    navigate('/')

  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit(submitteddata)}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            {...register('name')}
          />
          {errors.name && <p className="error-message">{errors.name.message}</p>}

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register('email')}
          />
          {errors.email && <p className="error-message">{errors.email.message}</p>} 

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            {...register('password')}
          />
          {errors.password && <p className="error-message">{errors.password.message}</p>} 

          <label htmlFor="confirmpassword">Confirm Password</label>
          <input
            type="password"
            id="confirmpassword"
            {...register('confirmpassword')}
          />
          {errors.confirmpassword && <p className="error-message">{errors.confirmpassword.message}</p>} 

          <button type="submit">Submit</button>
        </form>

        <div className="form-footer">
          <p>Already have an account? <a href="/">Login</a></p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
