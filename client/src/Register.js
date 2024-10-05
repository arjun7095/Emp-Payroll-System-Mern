import React, { useState } from "react";
import axios from 'axios';



function Register(){
const [username,setUsername]=useState('');
const [email,setEmail]=useState('');
const [role,setRole]=useState('');
const [password,setPassword]=useState('');
const [messege,setMessege]=useState('');


function handleRegistration(){
    let empObj={};
    empObj.username=username;
    empObj.email=email;
    empObj.role=role;
    empObj.password=password;

    axios.post('http://localhost:3004/api/register/employee', empObj)
    .then((resData) => {
        setMessege(resData.data.status);
        setUsername('');
        setEmail('');
        setRole('');
        setPassword('');
    });
}



    return(
        <div  align='center'className="registration-container"  style={{backgroundImage:'url("images/home2.jpg")',backgroundSize:'cover',height:'100vh'}}>
      <h2 style={{color:'white'}}>Registration</h2>
      <fieldset  className="field" align='left' style={ { border:'1px solid white',width:'30%',padding:'20px',color:'white'}}>
      <form onSubmit={handleRegistration}>
        
     
          <label > Username:</label><br/>
          <input type="text"id="name"value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your Full name" required/><br/>
         
        
          <label>Email:</label><br/>
          <input type="email" id="email"value={email}onChange={(e) => setEmail(e.target.value)} placeholder="example@gmail.com"required/><br/>
          
          <label>Role:</label><br/>
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="">Select category</option>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
            
          </select><br/>
          <label >Password:</label><br/>
          <input type="password"id="password"value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Ser your Password"required/><br/>

        

        <button className='auth-btn' type="submit">Register</button>
        <button className='auth-btn' type="submit"><a href="/">Login</a></button>
       
        
        <p>{messege}</p>
      </form>
      </fieldset>
        
      
    </div>
    )
}

export default Register;