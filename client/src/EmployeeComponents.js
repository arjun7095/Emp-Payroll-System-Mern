// EmployeeComponents.js

import React from 'react'; 
import { BrowserRouter as Router, Route,Routes,  NavLink } from 'react-router-dom';

import EmployeeDashboard from './Components/employees/EmployeeDashboard';
import Schedule from './Components/employees/Schedule';
import Attendance from './Components/employees/Attendance';
import Timesheet from './Components/employees/Timesheet';
import Leave from './Components/employees/Leave';
import Salary from './Components/employees/Salary';
import './AdminsComponents.css';



function EmployeeComponents() {
  const handleLogout = () => {
    window.location.href='http://localhost:3000/';
};

  return (
    <Router>

      <div align='left' style={{ backgroundImage: 'url("images/home2.jpg")', backgroundSize: 'cover', padding: '10px', color: 'white' }}>
        <ul>
          <li className='heading'>Mphasis EPM System</li>
          <li><NavLink className='link' to="/">Profile</NavLink></li>
          <li><NavLink className='link' to="/schedule">Schedule</NavLink></li>
          <li><NavLink className='link' to="/attendance">Attendance</NavLink></li>
          <li><NavLink className='link' to="/timesheet">Timesheet</NavLink></li>
          <li><NavLink className='link' to="/leave">Leave</NavLink></li>
          <li><NavLink className='link' to="/salary">Salary</NavLink></li>
          <li><button style={ {fontSize:'15px',marginLeft:'0px'}} className='auth-btn' type='button' onClick={handleLogout}>Logout</button></li>
         
        </ul>
      </div>
      <Routes>

        <Route path="/" element={<EmployeeDashboard />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/timesheet" element={<Timesheet />} />
        <Route path="/leave" element={<Leave />} />
        <Route path="/salary" element={<Salary />} />
        
      </Routes>
    </Router>

  );

};


export default EmployeeComponents;
