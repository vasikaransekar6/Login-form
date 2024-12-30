import React, {  useState } from 'react';
import './Profile.css'; 
import { useDispatch,  } from 'react-redux';
import {  updateuser } from './Thunkslice';
import { useLocation } from 'react-router-dom';

function Profile() {

  const dispatch=useDispatch()
  const [dp, setDp] = useState(null);
  const data=useLocation()

  console.log(data);
  

  
  


  const handleImageChange = (e) => {
    const file = e.target.files[0]
    
   
  console.log(
    dispatch(updateuser({dp:setDp(URL.createObjectURL(file)),id:data.state.id})))
    
     
     

  }
  


  

  
  
  return (
    <div className="profile">
      <h2>Set WhatsApp DP</h2>
      <form >
       
        <div>
          <label>Upload DP:</label>
          <div className="file-input-wrapper">
            <input
              type="file"
              id="file-input"
              accept="image/*"
              onChange={handleImageChange}
              className="file-input"
            />
            <label htmlFor="file-input" className="file-input-btn">+</label>
          </div>
        </div>
         <img src={dp}  style={{ width: '100px', height: '100px', borderRadius: '50%',border:'1px solid black'}} />
      </form>
        
      <p>{data.state.name}</p>
      <p>{data.state.email}</p>
      <p>{data.state.password}</p>
    
    </div>


  );
}

export default Profile;
