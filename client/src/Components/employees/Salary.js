import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Salary = () => {
  const [salaryData, setSalaryData] = useState([]);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch salary data for the logged-in employee based on month and year
    const fetchSalaryData = async () => {
      try {
        const empId = parseInt( localStorage.getItem('empId'));
        alert(empId)
        const response = await axios.get(`http://localhost:3004/api/employee/salary/${empId}/${year}/${month}`);
        setSalaryData(response.data.salaryData || []);
       
        setError(null);
      } catch (error) {
        setError(error.response?.data?.error || 'client An error occurred while fetching salary data.');
      }
    };

    if (month && year) {
      fetchSalaryData();
    }
  }, [month, year]);

  // Function to calculate PF deduction
  const calculatePFDeduction = (salary) => {
    return salary * 0.12; // Assuming PF deduction is 12% of the salary
  };

  // Function to calculate tax deduction (dummy implementation)
  const calculateTaxDeduction = (salary) => {
    return salary * 0.1; // Assuming tax deduction is 10% of the salary
  };

  const downloadPDF = () => {
    const input = document.getElementById('salary-table');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('payroll.pdf');
    });
  };

  return (
    <div align='center'>
      <h2>Salary Details</h2>
      <div>
        <label htmlFor="month">Select Month:</label>
        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          <option value="">Select Month</option>
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="04">April</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>
      <div>
        <label htmlFor="year">Select Year:</label>
        <select value={year} onChange={(e) => setYear(e.target.value)}>
          <option value="">Select Year</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          {/* Add options for all years */}
        </select>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <div id="salary-table" align='center'>
        <h1 align='center'>Mphasis EPM System</h1><br/>
        
        {month && year && <h2>Date: {month}/ {year}</h2>}
      
      <table border="2px" cellSpacing="0" width="800">
        <thead>
          <tr>
            <th>Date</th>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Salary</th>
            <th>PF</th>
            <th>Tax Deduction</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {salaryData.map((entry) => (
            <tr key={entry.date}>
              <td>{entry.month}/{entry.year}</td>
              <td>{entry.empId}</td>
              <td>{entry.name}</td>
              <td>{entry.salary}</td>
              <td>{calculatePFDeduction(entry.salary)}</td>
              <td>{calculateTaxDeduction(entry.salary)}</td>
              <td>{entry.salary - calculatePFDeduction(entry.salary) - calculateTaxDeduction(entry.salary)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button className='auth-btn' onClick={downloadPDF}>Download Receipt</button>
      </div>
      </div>
    </div>
  );
};

export default Salary;
