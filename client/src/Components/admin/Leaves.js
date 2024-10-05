import React, { useState } from 'react';
import axios from 'axios';
import './assets/Leaves.css';

const Leaves = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [error, setError] = useState(null);

  
  function fetchLeaveRequests() {
    let url = "http://localhost:3004/api/admin/new/leaves/";
    axios.get(url).then((resData) => {
      setLeaveRequests(resData.data);
      
    });
  }

  const handleStatusChange = async (index, newStatus) => {
    try {
      const updatedRequests = [...leaveRequests];
      const modifiedRequest = updatedRequests[index];
      modifiedRequest.status = newStatus;

      // Update the leave request in the backend
      await axios.put(`http://localhost:3004/api/admin/leaves/${modifiedRequest._id}`, {
        status: newStatus
      });

      // Remove the modified request from the local state
      const filteredRequests = updatedRequests.filter((request, idx) => idx !== index);
      setLeaveRequests(filteredRequests);
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred while updating leave status.');
    }
  };

  return (
    <div align='center'className='leaves'>
      <h2>Leave Requests</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button className='auth-btn' onClick={fetchLeaveRequests}>Get data</button>
      <h1></h1>
      {leaveRequests.length > 0 &&  (
        <table  border="2px" cellSpacing="0" width="1000">
          <thead>
            <tr style={{ borderBottom: '1px solid #ddd' }}>
              <th style={{ padding: '8px', textAlign: 'left' }}>Employee ID</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>Employee Name</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>Leave Type</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>Start Date</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>End Date</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>Reason</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((leave,index) => (
              leave.status === 'Pending' &&(
              <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '8px' }}>{leave.empId}</td>
                <td style={{ padding: '8px' }}>{leave.name}</td>
                <td style={{ padding: '8px' }}>{leave.leaveType}</td>
                <td style={{ padding: '8px' }}>{leave.startDate}</td>
                <td style={{ padding: '8px' }}>{leave.endDate}</td>
                <td style={{ padding: '8px' }}>{leave.reason}</td>
                <td style={{ padding: '8px' }}>{leave.status}</td>
                <td style={{ padding: '8px' }}>
                  <button className='auth-btn' onClick={() => handleStatusChange(index, 'Approved')}>Approve</button>
                  <button className='auth-btn' onClick={() => handleStatusChange(index, 'Rejected')}>Reject</button>
                </td>
              </tr>
              )
            ))}
          </tbody>
        </table>
      )}
      {leaveRequests.length === 0 && (
        <p>No leave requests available.</p>
      )}
    </div>
  );
};

export default Leaves;
