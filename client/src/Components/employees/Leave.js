import React, { useState } from 'react';
import axios from 'axios';
import './assets/leave.css';

const EmployeeLeaves = () => {
  const [empId,setEmpId]=useState('');
  const [name,setName]=useState('');
  const [leaveType,setLeaveType]=useState('');
  const [startDate,setStartDate]=useState('');
  const [endDate,setEndDate]=useState('');
  const [reason,setReason]=useState('');
  const [status,setStatus]=useState('Pending');

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    let leaveData={};
    leaveData.empId=parseInt(empId);
    leaveData.name=name;
    leaveData.leaveType=leaveType;
    leaveData.startDate=startDate;
    leaveData.endDate=endDate;
    leaveData.reason=reason;
    leaveData.status = status ;
    try {
      
      await axios.post('http://localhost:3004/api/employee/leave', leaveData);
      alert('Leave application submitted successfully!');
      // Reset form after submission
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit leave application. Please try again later.');
    }
  };

  return (
    <div align='center' className='leave'>
      <h2>Apply for Leave</h2>
      <form onSubmit={handleSubmit}>
        <label>Employee ID:</label>
        <input type="text" name="empId" value={empId} onChange={(e) => setEmpId(e.target.value)} required placeholder='Enter Employee Id'/><br/>
        <label>Name:</label>
        <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} required placeholder='enter name'/><br/>
        <label>Leave Type:</label>
        <select name="leaveType" value={leaveType} onChange={(e) => setLeaveType(e.target.value)} required><br/>
          <option value="">Select Leave Type</option>
          <option value="Sick Leave">Sick Leave</option>
          <option value="Vacation">Vacation</option>
          {/* Add more leave types as needed */}
        </select><br/>
        <label>Start Date:</label>
        <input type="date" name="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} required /><br/>
        <label>End Date:</label>
        <input type="date" name="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} required /><br/>
        <label>Reason:</label>
        <textarea name="reason" value={reason} onChange={(e) => setReason(e.target.value)} required placeholder='enter reason'/><br/>
        <button className='auth-btn' type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EmployeeLeaves;
