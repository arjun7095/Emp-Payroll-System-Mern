import React, { useState } from 'react';
import axios from 'axios';
import AdminComponents from './AdminComponents';
import EmployeeComponents from './EmployeeComponents';
import './App.css';
import Register from './Register';

function App() {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state to track login status
  const [redirectToRegister, setRedirectToRegister] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3004/api/login', { email, password });
      if (response.data.success) {
        setRole(response.data.user.role);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('email', email);
        setMessage('Login successful!');
        alert('Login successful!');
        setIsLoggedIn(true); // Set login status to true
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  const handleRegisterClick = () => {
    setRedirectToRegister(true);
  };

  return (
    
      <div style={ {margin:'0'}}>
        {!isLoggedIn && !redirectToRegister && (
          <>
            <div align='center' className='login' style={{backgroundImage:'url("images/home2.jpg")',backgroundSize:'cover'}}>
              <h1>Login</h1>
              <form className='login-form' onSubmit={handleSubmit}>
                <label>Email:</label><br /><input type="text" placeholder="example@gmail.com" value={email} onChange={(e) => setUsername(e.target.value)} /><br />
                <label>Password:</label><br /><input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
                <button className='auth-btn' type="submit">Login</button><br/>
                <p>If you dont have an account ,please click here to 
                <button className='auth-btn' type="button" onClick={handleRegisterClick}>Register</button></p>
              </form>
            </div>
            {message && <p>{message}</p>}
          </>
        )}
        {isLoggedIn && role === 'admin' && <AdminComponents />}
        {isLoggedIn && role === 'employee' && <EmployeeComponents />}
        {redirectToRegister && <Register />}
      </div>
    
  );
}

export default App;
