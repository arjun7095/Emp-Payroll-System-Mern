import React, { useState} from 'react';
import axios from 'axios';
import './assets/AdminDashboard.css';

function AdminDashboard() {
  const [EmpArray, setEmpArray] = useState([]);
  const [empId, setempId] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [category, setcategory] = useState("");
  const [address, setaddress] = useState("");
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [showModal, setShowModal] = useState(false);

  function getDataButton_click() {
    let url = "http://localhost:3004/api/admin/employees/";
    axios.get(url).then((resData) => {
      setEmpArray(resData.data);
    });
  }

  
  function clearFields()
{
    setempId("");
    setname("");
    setemail(""); 
    setcategory(""); 
    setaddress("");
}

  function updateEmp_click() {
    if(!selectedEmp)
    {
     alert("Please choose the record you want to update");
     return;
    }
    
    const updatedEmp = {
     empId: empId,
     name: name,
     email: email,
     category : category,
     address:address,
    };
      
    const url = "http://localhost:3004/api/admin/employees/";
    
    axios.put(url, updatedEmp)
      .then((resData) => {
        alert(resData.data.status);
        getDataButton_click();
        clearFields();
        setSelectedEmp(null);
      });
    
}
const editEmp = (emp) => {
  setempId(emp.empId);
  setname(emp.name);
  setemail(emp.email);
  setcategory(emp.category);
  setaddress(emp.address);
  setSelectedEmp(emp);
};
  function deleteEmp_click(empId) {
    
  let flag = window.confirm("Are you sure want to delete?");    
  if(  flag === false   )
  {
      return;
  }

  let url = "http://localhost:3004/api/admin/employees/" + empId;
  axios.delete(url).then( (resData) => 
  {       
    alert(resData.data.status);
    getDataButton_click();
  });
  }

  

  const viewEmp = (emp) => {
    setSelectedEmp(emp);
    setShowModal(true);
  };

  let resultArray = EmpArray.map((item) => {
    return (
      <tr key={item.empId}>
        <td>{item.empId}</td>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.address}</td>
        
        <td align='center'>
          <a href="javascript:void(0);" onClick={() => deleteEmp_click(item.empId)}>
            <img src="images/delete.png" width="20" alt="Delete" />
          </a>
        </td>
        <td align='center'>
          <a href="javascript:void(0);" onClick={() => editEmp(item)}>
            <img src="images/select.png" width="20" alt="Update" />
          </a>
        </td>
      </tr>
    );
  });

  return (
    <div className='admin-dash' style={{backgroundImage:'url("images/home2.jpg")',backgroundSize:'cover',height:'100vh'}}>
      <h2> Admin Dashboard </h2>
      <hr />
      <div align='center'className='get'>
      <input className='auth-btn' type="button" onClick={getDataButton_click} value="Get Data" />
      </div>
      <table border="2px" cellSpacing="0" width="1000"align='center'>
        <thead>
          <tr>
            <th>EmpID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Address</th>
            <th colSpan={3}>Action</th>
          </tr>
        </thead>
        <tbody>{resultArray}</tbody>
      </table>
      <div className='select' align='center'>
      <hr/>
            <input type="text" placeholder="Emp ID" value={empId} onChange={ (e) => setempId(e.target.value)} />
            <input type="text" placeholder="Name" value={name} onChange={ (e) => setname(e.target.value)} />
            <input type="text" placeholder="Email" value={email} onChange={ (e) => setemail(e.target.value)} />
            <input type="text" placeholder="Category" value={category} onChange={ (e) => setcategory(e.target.value)} />
            
            <input type="text" placeholder="Address" value={address} onChange={ (e) => setaddress(e.target.value)} />
      <hr/>

      <input className='auth-btn' type="button" onClick={updateEmp_click} value="Update"/>

      </div>
    </div>
  );
}

export default AdminDashboard;
