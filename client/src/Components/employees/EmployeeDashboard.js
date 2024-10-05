import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './assets/profile.css';

const EmployeeDashboard = () => {
  const [employee, setEmployee] = useState({});
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [salary, setSalary] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [empId,setEmpId]=useState('')

  useEffect(() => {
    // Fetch employee data by email when component mounts
    fetchEmployeeData();
  }, []);

  const fetchEmployeeData = async () => {
    try {
      const response = await axios.get(`http://localhost:3004/api/employee/${localStorage.getItem('email')}`);
      if (response.data.employee.length === 0) {
        setMessage('Your profile is incomplete, please provide your details');
      } else {
        setEmployee(response.data.employee); // Assuming the API returns an array of employees
        localStorage.setItem('empId', response.data.employee.empId);
        setMessage('');
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
      setMessage('Your profile is incomplete, please provide your details');
    }
  };

  const handleUpdateName = async () => {
    try {
      await axios.put(`http://localhost:3004/api/employee/${employee._id}`, { name,category,address });
      fetchEmployeeData();
      setName('');
      setEmpId('');
      setCategory('');
      setAddress('');

    } catch (error) {
      console.error('Error updating employee data:', error);
      setMessage('An error occurred while updating employee data.');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await axios.delete(`http://localhost:3004/api/employee/${employee._id}`);
      setMessage('Employee account deleted successfully');
      setEmployee({}); // Clear employee data after deletion
    } catch (error) {
      console.error('Error deleting employee account:', error);
      setMessage('An error occurred while deleting employee account.');
    }
  };

  const handleAddDetails = async () => {
    try {
      const response = await axios.post('http://localhost:3004/api/employee', {
        empId, 
        email: localStorage.getItem('email'),
        name,
        category,
        
        address
      });
      setEmployee(response.data.employee);
      setMessage('Employee details added successfully');
    } catch (error) {
      console.error('Error adding employee details:', error);
      setMessage('An error occurred while adding employee details.');
    }
  };

  return (
    <div align='center'className='profile'>
      {message && <p>{message}</p>}
      <h2>Employee Profile</h2>
      <div>
        <table border="2px" cellSpacing="0" width="800">
        <tr><th>Employee ID </th><td>{employee?.empId}</td> </tr>
        <tr><th>Name </th><td> {employee?.name}</td> </tr>
        <tr><th>Email </th><td> {employee?.email}</td> </tr>
        <tr><th>Category  </th><td>{employee?.category}</td> </tr>  
        
        <tr><th>Address  </th><td>{employee?.address}</td> </tr>
        </table>
      </div>
      <input type="text" placeholder="Employee Id" value={empId} onChange={(e) => setEmpId(e.target.value)}  required/><br/>

      <input type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} required/><br/>
      <input type="text" placeholder="Enter Category" value={category} onChange={(e) => setCategory(e.target.value)} required/><br/>
      
      <input type="text" placeholder="Enter Address" value={address} onChange={(e) => setAddress(e.target.value)}required /><br/>
      {!employee?.empId && <button onClick={handleAddDetails}>Add Details</button>}
      <button className='auth-btn' onClick={handleUpdateName}>Update</button>
      
    </div>
  );
};

export default EmployeeDashboard;
