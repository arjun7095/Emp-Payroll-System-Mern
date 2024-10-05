// AdminComponents.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';

import AdminDashboard from './Components/admin/AdminDashboard';
import WorkSchedule from './Components/admin/WorkSchedule';
import Leaves from './Components/admin/Leaves';
import Timesheet from './Components/admin/TimeSheet';
import Salary from './Components/admin/Salary';
import './AdminsComponents.css'


function AdminComponents() {
  const handleLogout = () => {
    window.location.href='http://localhost:3000/';
};
  return(
   <Router>
      <div align='left' style={{backgroundImage:'url("images/home2.jpg")',backgroundSize:'cover',padding:'10px',color:'white'}}>
        <ul>
          <li className='heading'>Mphasis EPM System</li>
          <li><NavLink className='link' to="/">Dashboard</NavLink></li>
          <li><NavLink className='link' to="/admin/work-schedule">Work Schedule</NavLink></li>
          <li><NavLink className='link' to="/admin/leaves">Leaves</NavLink></li>
          <li><NavLink className='link' to="/admin/timesheet">Timesheet</NavLink></li>
          <li><NavLink className='link' to="/admin/salary">Salary</NavLink></li>
          <li><button style={ {fontSize:'15px',marginLeft:'0px'}} className='auth-btn' type='button' onClick={handleLogout}>Logout</button></li>
          
        </ul>
        </div>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/admin/work-schedule" element={<WorkSchedule />} />
        <Route path="/admin/leaves" element={<Leaves />} />
        <Route path="/admin/timesheet" element={<Timesheet />} />
        <Route path="/admin/salary" element={<Salary />} />
      </Routes>
    </Router>
  );
}

export default AdminComponents;
